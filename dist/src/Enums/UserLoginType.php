<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum UserLoginType: int
{
    use EnumTools;

    case PASSWORD = 1;
    case OTP_SMS = 2;
    case OTP_EMAIL = 4;
    case TWO_FACTOR = 8;

    /**
     * Compose an array of UserLoginType cases/values into an integer bitmask.
     *
     * @param array<int, self|int> $types
     */
    public static function composeLoginTypeMask(array $types): int
    {
        $mask = 0;
        foreach ($types as $type) {
            $value = $type instanceof self ? $type->value : (int) $type;
            $mask |= $value;
        }

        return $mask;
    }

    /**
     * Parse an integer bitmask into an array of matching UserLoginType enum cases.
     *
     * @return array<int, self>
     */
    public static function parseLoginTypeMask(int $mask): array
    {
        $matched = [];
        foreach (self::cases() as $case) {
            if (($mask & $case->value) === $case->value) {
                $matched[] = $case;
            }
        }

        return $matched;
    }
}
