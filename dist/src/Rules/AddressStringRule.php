<?php

namespace MyLaravelCore\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class AddressStringRule implements ValidationRule
{
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $clean = function_exists('english_digits') ? english_digits(trim((string) $value)) : trim((string) $value);
        if ($clean === '' || preg_match('/^\d+$/', $clean)) {
            $fail(':attribute نمی‌تواند فقط شامل عدد باشد.');
        }
    }
}