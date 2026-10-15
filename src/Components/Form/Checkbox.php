<?php

namespace MyLaravelCore\Components\Form;

use Illuminate\Contracts\View\View;

class Checkbox extends BaseFormComponent
{
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = 1,
        public bool $checked = false,
        public string $size = 'md',
        public string $variant = 'primary',
        bool $disabled = false,
        ?string $hint = null,
        ?string $id = null,
        ?string $class = null,
        ?string $error = null
    ) {
        parent::__construct(
            name: $name,
            label: $label,
            value: $value,
            disabled: $disabled,
            hint: $hint,
            id: $id,
            class: $class,
            error: $error
        );

        $dotName = str_replace(['[', ']'], ['.', ''], $name);
        $dotName = rtrim($dotName, '.');
        if (old($dotName) !== null) {
            $this->checked = (bool) old($dotName);
        }
    }

    public function render(): View
    {
        return view('core::components.form.checkbox');
    }
}
