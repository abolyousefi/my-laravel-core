<?php

namespace MyLaravelCore\Components\Form;

use Illuminate\Contracts\View\View;

class RadioGroup extends BaseFormComponent
{
    public function __construct(
        string $name,
        ?string $label = null,
        public array $options = [],
        mixed $value = null,
        public int $columns = 1,
        public bool $inline = false,
        public string $variant = 'primary',
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
        return view('core::components.form.radio-group');
    }
}
