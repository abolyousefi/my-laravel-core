<?php

namespace MyLaravelCore\Components\Form;

use Illuminate\Contracts\View\View;

class NestedSelects extends BaseFormComponent
{
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = null,
        public ?string $source = null,
        public ?string $routeName = null,
        public string $labelColumn = 'title',
        public string $parentColumn = 'parent_id',
        public string $placeholder = 'انتخاب کنید',
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
        return view('core::components.form.nested-selects');
    }
}
