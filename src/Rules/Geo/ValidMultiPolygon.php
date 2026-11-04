<?php

namespace MyLaravelCore\Rules\Geo;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidMultiPolygon implements ValidationRule
{
    public function __construct(protected int $minPoints = 3)
    {
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!is_array($value) || empty($value)) {
            $fail('فیلد :attribute باید شامل حداقل یک چندضلعی معتبر باشد.');
            return;
        }

        $polyRule = new ValidPolygon($this->minPoints);
        foreach ($value as $polygon) {
            $failed = false;
            $polyRule->validate($attribute, $polygon, function (string $msg) use (&$failed, $fail) {
                $failed = true;
                $fail($msg);
            });
            if ($failed) {
                return;
            }
        }
    }
}