<?php

namespace MyLaravelCore\Components\Form;

class SelectImage extends BaseFormComponent
{
    public array $options;
    public bool $multiple;
    public int $columns;

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
        array $options = [],
        bool $multiple = false,
        int $columns = 4
    ) {
        parent::__construct($name, $label, $value, $required, $disabled, $readonly, $hint, $dir, $id, $class, $error, $permission);
        $this->options = $options;
        $this->multiple = $multiple;
        $this->columns = $columns;
    }

    public function render()
    {
        return view('core::components.form.select-image');
    }
}