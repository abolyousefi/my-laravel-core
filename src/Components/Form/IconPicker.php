<?php

namespace MyLaravelCore\Components\Form;

use Illuminate\Contracts\View\View;

class IconPicker extends BaseFormComponent
{
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = null,
        public string $iconSet = 'fontawesome',
        public bool $searchable = true,
        public bool $categories = true,
        public bool $preview = true,
        bool $required = false,
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
            required: $required,
            disabled: $disabled,
            hint: $hint,
            id: $id,
            class: $class,
            error: $error
        );
    }

    public function render(): View
    {
        return view('core::components.form.icon-picker');
    }
}
