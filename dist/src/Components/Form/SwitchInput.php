<?php

namespace MyLaravelCore\Components\Form;

class SwitchInput extends BaseFormComponent
{
    public bool $checked;
    public ?string $activeText;
    public ?string $inactiveText;
    public string $size;
    public string $variant;

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
        bool $checked = false,
        ?string $activeText = null,
        ?string $inactiveText = null,
        string $size = 'md',
        string $variant = 'primary'
    ) {
        parent::__construct($name, $label, $value, $required, $disabled, $readonly, $hint, $dir, $id, $class, $error, $permission);
        $this->checked = $checked;
        $this->activeText = $activeText;
        $this->inactiveText = $inactiveText;
        $this->size = $size;
        $this->variant = $variant;
        $this->checked = (bool) old($this->name, $checked || $this->value);
    }

    public function render()
    {
        return view('core::components.form.switch-input');
    }
}