<?php

namespace MyLaravelCore\Components\Form;

use Illuminate\Contracts\View\View;

class ItemCollector extends BaseFormComponent
{
    public function __construct(
        string $name,
        ?string $label = null,
        public array $items = [],
        public array $fields = [],
        public int $minItems = 0,
        public ?int $maxItems = null,
        public bool $sortable = true,
        public bool $removable = true,
        public string $addLabel = 'افزودن آیتم',
        public ?string $template = null,
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
            value: $items,
            required: $required,
            disabled: $disabled,
            hint: $hint,
            id: $id,
            class: $class,
            error: $error
        );

        $dotName = str_replace(['[', ']'], ['.', ''], $name);
        $dotName = rtrim($dotName, '.');
        $oldItems = old($dotName);
        if (is_array($oldItems)) {
            $this->items = $oldItems;
        }
    }

    public function render(): View
    {
        return view('core::components.form.item-collector');
    }
}
