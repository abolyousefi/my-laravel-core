<?php

namespace MyLaravelCore\Rules\Geo;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidUtmPoint implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (is_string($value)) {
            $parts = array_map('trim', explode(',', $value));
            if (count($parts) < 2 || count($parts) > 3 || !is_numeric($parts[0]) || !is_numeric($parts[1])) {
                $fail('مختصات UTM در :attribute نامعتبر است.');
                return;
            }
            if (isset($parts[2])) {
                $z = filter_var($parts[2], FILTER_VALIDATE_INT);
                if ($z === false || $z < 1 || $z > 60) {
                    $fail('ناحیه (Zone) در مختصات UTM باید عددی بین ۱ تا ۶۰ باشد.');
                }
            }
            return;
        }

        if (!is_array($value) || !isset($value['x'], $value['y']) || !is_numeric($value['x']) || !is_numeric($value['y'])) {
            $fail('مختصات UTM در :attribute نامعتبر است.');
            return;
        }

        $zone = $value['z'] ?? $value['zone'] ?? null;
        if ($zone !== null) {
            $z = filter_var($zone, FILTER_VALIDATE_INT);
            if ($z === false || $z < 1 || $z > 60) {
                $fail('ناحیه (Zone) در مختصات UTM باید عددی بین ۱ تا ۶۰ باشد.');
            }
        }
    }
}