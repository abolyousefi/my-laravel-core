<?php

namespace MyLaravelCore\Components\Form;

use Illuminate\Contracts\View\View;

class Editor extends BaseFormComponent
{
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = null,
        public int $height = 300,
        public string|array $toolbar = 'full', // minimal, standard, full
        public string $direction = 'rtl',
        public ?string $placeholder = null,
        public ?string $uploadRoute = null,
        public ?int $maxLength = null,
        bool $required = false,
        bool $disabled = false,
        bool $readonly = false,
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
            readonly: $readonly,
            hint: $hint,
            dir: $direction,
            id: $id,
            class: $class,
            error: $error
        );
    }

    public function render(): View
    {
        return view('core::components.form.editor');
    }
}
