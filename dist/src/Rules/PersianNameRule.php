<?php

namespace MyLaravelCore\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class PersianNameRule implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!is_string($value) || !preg_match('/^[\x{0600}-\x{06FF}\s]+$/u', $value)) {
            $fail(':attribute وارد شده باید تنها شامل حروف فارسی و فاصله باشد.');
        }
    }
}