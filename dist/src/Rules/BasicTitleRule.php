<?php

namespace MyLaravelCore\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class BasicTitleRule implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!is_string($value) || !preg_match('/^[\x{0600}-\x{06FF}0-9\s\(\)\-_]+$/u', $value)) {
            $fail(':attribute وارد شده باید تنها شامل حروف فارسی، اعداد، فاصله، پرانتز، خط تیره (-) و زیرخط (_) باشد.');
        }
    }
}