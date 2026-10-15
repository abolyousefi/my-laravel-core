<?php

namespace MyLaravelCore\Components\Form;

use Illuminate\Contracts\View\View;

class TagInput extends BaseFormComponent
{
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = [],
        public array $suggestions = [],
        public ?int $maxTags = null,
        public bool $allowCustom = true,
        public string $separator = ',',
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
            $this->value = !empty($this->value) ? explode($this->separator, (string) $this->value) : [];
        }
    }

    public function render(): View
    {
        return view('core::components.form.tag-input');
    }
}
