<?php

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for NumberInput.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class NumberInput extends \MyLaravelCore\Components\Form\BaseFormComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = null,
        public int|float|null $min = null,
        public int|float|null $max = null,
        public int|float $step = 1,
        public int $decimals = 0,
        public bool $thousandSeparator = true,
        public string $separator = ',',
        public bool $showButtons = true,
        public bool $persianDigits = true,
        public ?string $unit = null,
        public ?string $placeholder = null,
        bool $required = false,
        bool $disabled = false,
        bool $readonly = false,
        ?string $hint = null,
        string $dir = 'ltr',
        ?string $id = null,
        ?string $class = null,
        ?string $error = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}
