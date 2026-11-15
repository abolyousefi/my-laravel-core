<?php

namespace MyLaravelCore\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class NumberSeparatorRule implements ValidationRule
{
    public function __construct(
        protected int|float $max = 999999999999,
        protected bool $isString = false,
        protected int|float|null $min = null
    ) {
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $formattedMax = function_exists('numberSeparator') ? numberSeparator($this->max) : number_format($this->max);

        if ($this->isString) {
            if (mb_strlen((string) $value, 'UTF-8') > $this->max) {
                $fail("طول فیلد :attribute نباید بیشتر از {$formattedMax} کاراکتر باشد.");
            }
            return;
        }

        $clean = str_replace(',', '', function_exists('english_digits') ? english_digits((string) $value) : (string) $value);
        if (!is_numeric($clean) || (float) $clean > $this->max) {
            $fail("مقدار فیلد :attribute نباید بزرگ‌تر از {$formattedMax} باشد.");
            return;
        }

        if ($this->min !== null && (float) $clean < $this->min) {
            $formattedMin = function_exists('numberSeparator') ? numberSeparator($this->min) : number_format($this->min);
            $fail("مقدار فیلد :attribute نباید کوچک‌تر از {$formattedMin} باشد.");
        }
    }
}