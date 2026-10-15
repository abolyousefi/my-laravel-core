<?php

namespace MyLaravelCore\Components\Form;

use Illuminate\Contracts\View\View;

class Textarea extends BaseFormComponent
{
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = null,
        public int $rows = 4,
        public ?int $maxlength = null,
        public bool $showCounter = true,
        public bool $autoResize = false,
        public ?string $placeholder = null,
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
        return view('core::components.form.textarea');
    }
}
