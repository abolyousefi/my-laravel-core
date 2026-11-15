<?php

namespace MyLaravelCore\Components\Form;

use Illuminate\Contracts\View\View;

class FilePicker extends BaseFormComponent
{
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = null,
        public string $accept = '*',
        public int $maxSize = 10240, // KB
        public bool $multiple = false,
        public string $disk = 'public',
        public string $directory = 'uploads',
        public bool $preview = true,
        public bool $dropzone = true,
        public bool $sortable = false,
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
        return view('core::components.form.file-picker');
    }
}
