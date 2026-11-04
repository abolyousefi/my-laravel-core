<?php

namespace MyLaravelCore\Rules\Geo;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use MyLaravelCore\Support\Geo\GeometryValidator;

class ValidPoint implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $pt = GeometryValidator::normalizePoint($value);
        if ($pt === null || $pt['lat'] < -90 || $pt['lat'] > 90 || $pt['lng'] < -180 || $pt['lng'] > 180) {
            $fail('The :attribute must be a valid geographic point.');
        }
    }
}