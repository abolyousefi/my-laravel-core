<?php

namespace MyLaravelCore\Components\Form;

use Illuminate\Contracts\View\View;

class TextInput extends BaseFormComponent
{
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = null,
        public string $type = 'text',
        public ?string $placeholder = null,
        bool $required = false,
        bool $disabled = false,
        bool $readonly = false,
        ?string $hint = null,
        public ?string $icon = null,
        public string $iconPosition = 'right',
        public string $size = 'md',
        public ?int $maxlength = null,
        public ?int $minlength = null,
        public ?string $pattern = null,
        public ?string $autocomplete = null,
        string $dir = 'auto',
        public ?string $addon = null,
        public string $addonPosition = 'left',
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
        return view('core::components.form.text-input');
    }
}
