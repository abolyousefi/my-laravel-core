<?php

namespace MyLaravelCore\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class UrlRule implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $str = trim((string) $value);
        if ($str === '') {
            return;
        }

        $candidate = preg_match('#^https?://#i', $str) ? $str : 'https://' . $str;
        if (!filter_var($candidate, FILTER_VALIDATE_URL) || !preg_match('/\.[a-z]{2,}/i', parse_url($candidate, PHP_URL_HOST) ?? '')) {
            $fail('فرمت :attribute معتبر نمی‌باشد.');
        }
    }
}