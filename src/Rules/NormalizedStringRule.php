<?php

namespace MyLaravelCore\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class NormalizedStringRule implements ValidationRule
{
    public function __construct(
        protected int|float $max = 5000,
        protected bool $isEditor = false,
        protected int|float|null $min = null
    ) {
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $text = (string) $value;
        if ($this->isEditor) {
            $text = strip_tags($text);
            $text = html_entity_decode($text, ENT_QUOTES | ENT_HTML5, 'UTF-8');
            $text = str_replace(["\r\n", "\r", "\n"], '', $text);
        } else {
            $text = str_replace("\r\n", "\n", $text);
        }

        // Remove zero-width characters except standard ZWNJ if needed, normalize NBSP
        $text = str_replace("\xC2\xA0", ' ', $text);

        $len = mb_strlen($text, 'UTF-8');

        if ($this->min !== null && $len < $this->min) {
            $formattedMin = function_exists('numberSeparator') ? numberSeparator($this->min) : (string) $this->min;
            $fail("فیلد :attribute نباید کوچک‌تر از {$formattedMin} کاراکتر باشد.");
            return;
        }

        if ($len > $this->max) {
            $formattedMax = function_exists('numberSeparator') ? numberSeparator($this->max) : (string) $this->max;
            $fail("فیلد :attribute نباید بزرگ‌تر از {$formattedMax} باشد.");
        }
    }
}