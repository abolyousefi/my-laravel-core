<?php

namespace MyLaravelCore\Support\Validation;

use Illuminate\Support\Facades\Validator;
use MyLaravelCore\Support\Jalali\Jalali;

class JalaliValidationRegistrar
{
    public static function register(): void
    {
        // Meta FormValidation pass-through rules
        foreach (['force_remote', 'no_form_validation', 'disable_validation_cache'] as $metaRule) {
            Validator::extend($metaRule, fn () => true);
        }

        Validator::extend('jalali_date', function ($attribute, $value, $parameters) {
            $format = $parameters[0] ?? 'Y-m-d';
            return self::parseStrict($value, $format, false) !== null;
        }, ':attribute معتبر نمی باشد.');

        Validator::extend('jalali_datetime', function ($attribute, $value, $parameters) {
            $format = $parameters[0] ?? 'Y-m-d H:i:s';
            return self::parseStrict($value, $format, true) !== null;
        }, ':attribute معتبر نمی باشد.');

        $comparisons = [
            'equal' => fn (Jalali $a, Jalali $b) => $a->eq($b),
            'not_equal' => fn (Jalali $a, Jalali $b) => $a->ne($b),
            'after' => fn (Jalali $a, Jalali $b) => $a->gt($b),
            'after_equal' => fn (Jalali $a, Jalali $b) => $a->gte($b),
            'before' => fn (Jalali $a, Jalali $b) => $a->lt($b),
            'before_equal' => fn (Jalali $a, Jalali $b) => $a->lte($b),
        ];

        $messages = [
            'equal' => ':attribute برابر :date نمی باشد.',
            'not_equal' => ':attribute نباید برابر :date باشد.',
            'after' => ':attribute باید بعد از :date باشد.',
            'after_equal' => ':attribute باید بعد یا برابر :date باشد.',
            'before' => ':attribute باید قبل از :date باشد.',
            'before_equal' => ':attribute باید قبل یا برابر :date باشد.',
        ];

        foreach ($comparisons as $op => $comparator) {
            foreach (['jalali_date_' . $op => false, 'jalali_datetime_' . $op => true] as $ruleName => $withTime) {
                Validator::extend($ruleName, function ($attribute, $value, $parameters, $validator) use ($comparator, $withTime) {
                    $targetRaw = $parameters[0] ?? null;
                    $format = $parameters[1] ?? ($withTime ? 'Y-m-d H:i:s' : 'Y-m-d');
                    if (!$targetRaw) {
                        return false;
                    }

                    // Resolve if target is another field name in data
                    $data = $validator->getData();
                    $targetStr = array_key_exists($targetRaw, $data) ? (string) $data[$targetRaw] : $targetRaw;

                    $parsedValue = self::parseStrict($value, $format, $withTime);
                    $parsedTarget = self::parseStrict($targetStr, $format, $withTime);

                    if (!$parsedValue || !$parsedTarget) {
                        return false;
                    }

                    return $comparator($parsedValue, $parsedTarget);
                }, $messages[$op]);

                Validator::replacer($ruleName, function ($message, $attribute, $rule, $parameters) {
                    $dateStr = $parameters[0] ?? '';
                    $persianDate = function_exists('persian_digits') ? persian_digits($dateStr) : $dateStr;
                    return str_replace(':date', $persianDate, $message);
                });
            }
        }
    }

    protected static function parseStrict(mixed $value, string $format, bool $allowTime): ?Jalali
    {
        if (!is_string($value) && !is_numeric($value)) {
            return null;
        }

        $str = function_exists('english_digits') ? english_digits(trim((string) $value)) : trim((string) $value);
        if ($str === '') {
            return null;
        }

        // Check separator consistency with format
        if (str_contains($format, '.') && !str_contains($str, '.')) {
            return null;
        }
        if (str_contains($format, '/') && !str_contains($str, '/')) {
            return null;
        }
        if (str_contains($format, '-') && !str_contains($str, '-')) {
            return null;
        }

        $normalized = str_replace('.', '/', $str);

        try {
            return Jalali::parse($normalized);
        } catch (\Throwable) {
            return null;
        }
    }
}