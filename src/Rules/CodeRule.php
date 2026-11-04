<?php

namespace MyLaravelCore\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class CodeRule implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!is_string($value) || !preg_match('/^[-a-zA-Z0-9_]+$/', $value)) {
            $fail(':attribute وارد شده باید تنها شامل اعداد، حروف لاتین، خط تیره (-) و زیرخط (_) باشد.');
        }
    }
}