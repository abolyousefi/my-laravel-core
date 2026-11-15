<?php

namespace MyLaravelCore\Rules\Geo;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use MyLaravelCore\Support\Geo\GeometryValidator;

class ValidPolygon implements ValidationRule
{
    public function __construct(protected int $minPoints = 3)
    {
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!is_array($value) || count($value) < $this->minPoints) {
            $fail("حداقل {$this->minPoints} نقطه برای :attribute الزامی است.");
            return;
        }

        $distinct = [];
        foreach ($value as $pt) {
            $norm = GeometryValidator::normalizePoint($pt);
            if ($norm === null || $norm['lat'] < -90 || $norm['lat'] > 90 || $norm['lng'] < -180 || $norm['lng'] > 180) {
                $fail('مختصات یکی از نقاط :attribute نامعتبر است.');
                return;
            }
            $distinct[$norm['lat'] . ',' . $norm['lng']] = true;
        }

        if (count($distinct) < $this->minPoints) {
            $fail("حداقل {$this->minPoints} نقطه متمایز برای :attribute الزامی است.");
        }
    }
}