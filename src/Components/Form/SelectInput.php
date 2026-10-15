<?php

namespace MyLaravelCore\Components\Form;

use Illuminate\Contracts\View\View;

class SelectInput extends BaseFormComponent
{
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = null,
        public array $options = [],
        public bool $multiple = false,
        public bool $searchable = true,
        public string $placeholder = 'انتخاب کنید',
        public bool $clearable = true,
        public ?string $ajaxRoute = null,
        public ?string $parentField = null,
        public ?string $parentRoute = null,
        public bool $tags = false,
        public ?int $maxSelections = null,
        bool $required = false,
        bool $disabled = false,
        bool $readonly = false,
        ?string $hint = null,
        string $dir = 'auto',
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
        return view('core::components.form.select-input');
    }
}
