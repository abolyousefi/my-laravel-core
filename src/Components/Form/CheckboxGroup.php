<?php

namespace MyLaravelCore\Components\Form;

use Illuminate\Contracts\View\View;

class CheckboxGroup extends BaseFormComponent
{
    public function __construct(
        string $name,
        ?string $label = null,
        public array $options = [],
        mixed $value = [],
        public int $columns = 2,
        public string $direction = 'rtl',
        public bool $selectAll = true,
        public ?int $min = null,
        public ?int $max = null,
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

        if (!is_array($this->value)) {
            $this->value = $this->value ? [(string) $this->value] : [];
        }
    }

    public function render(): View
    {
        return view('core::components.form.checkbox-group');
    }
}
