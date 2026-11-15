<?php

namespace MyLaravelCore\Components\Form;

class RepeaterInputs extends BaseFormComponent
{
    public int $minItems;
    public int $maxItems;
    public string $addButtonText;
    public bool $sortable;
    public bool $collapsible;

    public function __construct(
        string $name = 'field',
        ?string $label = null,
        mixed $value = null,
        bool $required = false,
        bool $disabled = false,
        bool $readonly = false,
        ?string $hint = null,
        string $dir = 'auto',
        ?string $id = null,
        ?string $class = null,
        ?string $error = null,
        ?string $permission = null,
        int $minItems = 0,
        int $maxItems = 50,
        string $addButtonText = 'افزودن ردیف',
        bool $sortable = true,
        bool $collapsible = false
    ) {
        parent::__construct($name, $label, $value, $required, $disabled, $readonly, $hint, $dir, $id, $class, $error, $permission);
        $this->minItems = $minItems;
        $this->maxItems = $maxItems;
        $this->addButtonText = $addButtonText;
        $this->sortable = $sortable;
        $this->collapsible = $collapsible;
    }

    public function render()
    {
        return view('core::components.form.repeater-inputs');
    }
}