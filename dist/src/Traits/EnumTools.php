<?php

namespace MyLaravelCore\Traits;

use Illuminate\Support\Str;

trait EnumTools
{
    /**
     * Get all enum case names.
     *
     * @return array<int, string>
     */
    public static function names(): array
    {
        return array_column(self::cases(), 'name');
    }

    /**
     * Get all enum case backed values.
     *
     * @return array<int, int|string>
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    /**
     * Get associative array of [value => name], or [name => value] when $reverse is true.
     *
     * @return array<int|string, int|string>
     */
    public static function array(bool $reverse = false): array
    {
        $names = self::names();
        $values = self::values();

        if (empty($values)) {
            return $reverse ? array_combine($names, $names) : array_combine($names, $names);
        }

        return $reverse
            ? array_combine($names, $values)
            : array_combine($values, $names);
    }

    /**
     * Get translated label for this enum case.
     */
    public function label(?string $moduleName = null, ?string $prefix = null): string
    {
        $enumSnake = Str::snake(class_basename(static::class));
        $caseLower = strtolower($this->name);
        $baseKey = ($prefix ? trim($prefix, '.') . '.' : 'enum.') . "{$enumSnake}.{$caseLower}";
        $key = $moduleName ? "{$moduleName}::{$baseKey}" : $baseKey;

        $translated = __($key);
        if ($translated !== $key) {
            return $translated;
        }

        // Default Persian fallbacks for common cases
        $defaultLabels = [
            'yes' => 'بله',
            'no' => 'خیر',
            'true' => 'بله',
            'false' => 'خیر',
            'active' => 'فعال',
            'inactive' => 'غیرفعال',
            'pending' => 'در حال بررسی',
            'confirmed' => 'تایید شده',
            'not_confirmed' => 'تایید نشده',
            'male' => 'مرد',
            'female' => 'زن',
            'read' => 'خوانده شده',
            'not_read' => 'خوانده نشده',
            'create' => 'ایجاد',
            'update' => 'ویرایش',
            'delete' => 'حذف',
            'real' => 'حقیقی',
            'legal' => 'حقوقی',
        ];

        return $defaultLabels[$caseLower] ?? Str::headline($this->name);
    }

    /**
     * Build options array for x-checkbox-group and x-radio-group.
     *
     * @return array<int, array{label: string, value: int|string}>
     */
    public static function componentOptions(?string $moduleName = null, ?string $prefix = null): array
    {
        return array_map(
            fn (self $case) => [
                'label' => $case->label($moduleName, $prefix),
                'value' => $case->value ?? $case->name,
            ],
            self::cases()
        );
    }

    /**
     * Build items array for x-select-input.
     *
     * @return array<int, array<string, mixed>>
     */
    public static function selectComponentItems(
        ?string $moduleName = null,
        bool $shouldEncryptValue = false,
        ?string $prefix = null
    ): array {
        return array_map(
            function (self $case) use ($moduleName, $shouldEncryptValue, $prefix) {
                $rawValue = $case->value ?? $case->name;
                return [
                    'name' => $case->label($moduleName, $prefix),
                    'label' => $case->label($moduleName, $prefix),
                    'id' => $shouldEncryptValue && function_exists('encryptStaticValue')
                        ? encryptStaticValue($rawValue)
                        : $rawValue,
                    'value' => $shouldEncryptValue && function_exists('encryptStaticValue')
                        ? encryptStaticValue($rawValue)
                        : $rawValue,
                    'selected' => false,
                    'is_active' => true,
                ];
            },
            self::cases()
        );
    }

    /**
     * Build items array for multiselect components.
     *
     * @return array<int, array<string, mixed>>
     */
    public static function multiselectComponentItems(
        ?string $moduleName = null,
        bool $shouldEncryptValue = false,
        ?string $prefix = null
    ): array {
        return self::selectComponentItems($moduleName, $shouldEncryptValue, $prefix);
    }

    /**
     * Convert current enum case value to boolean.
     */
    public function asBool(): bool
    {
        return (bool) ($this->value ?? false);
    }
}
