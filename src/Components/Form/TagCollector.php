<?php

namespace MyLaravelCore\Components\Form;

use Illuminate\Contracts\View\View;

class TagCollector extends BaseFormComponent
{
    public function __construct(
        string $name,
        ?string $label = null,
        public array $tags = [],
        public string $keyLabel = 'کلید',
        public string $valueLabel = 'مقدار',
        public array $suggestions = [],
        public bool $allowCustom = true,
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
            value: $tags,
            required: $required,
            disabled: $disabled,
            hint: $hint,
            id: $id,
            class: $class,
            error: $error
        );

        $dotName = str_replace(['[', ']'], ['.', ''], $name);
        $dotName = rtrim($dotName, '.');
        $oldTags = old($dotName);
        if (is_array($oldTags)) {
            $this->tags = $oldTags;
        }
    }

    public function render(): View
    {
        return view('core::components.form.tag-collector');
    }
}
