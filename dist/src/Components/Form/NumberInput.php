<?php

namespace MyLaravelCore\Components\Form;

use Illuminate\Contracts\View\View;

class NumberInput extends BaseFormComponent
{
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
        parent::__construct(
            name: $name,
            label: $label,
            value: $value,
            required: $required,
            disabled: $disabled,
            readonly: $readonly,
            hint: $hint,
            dir: $dir,
            id: $id,
            class: $class,
            error: $error
        );
    }

    public function render(): View
    {
        return view('core::components.form.number-input');
    }
}
