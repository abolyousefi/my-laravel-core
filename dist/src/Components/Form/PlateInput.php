<?php

namespace MyLaravelCore\Components\Form;

class PlateInput extends BaseFormComponent
{
    public string $plateType;

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
        string $plateType = 'car'
    ) {
        parent::__construct($name, $label, $value, $required, $disabled, $readonly, $hint, $dir, $id, $class, $error, $permission);
        $this->plateType = $plateType;
    }

    public function render()
    {
        return view('core::components.form.plate-input');
    }
}