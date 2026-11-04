<?php

namespace MyLaravelCore\Components\Form;

class TagCollectorInput extends BaseFormComponent
{
    public string $type;
    public ?string $placeholder;
    public array $options;

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
        string $type = 'text',
        ?string $placeholder = null,
        array $options = []
    ) {
        parent::__construct($name, $label, $value, $required, $disabled, $readonly, $hint, $dir, $id, $class, $error, $permission);
        $this->type = $type;
        $this->placeholder = $placeholder;
        $this->options = $options;
    }

    public function render()
    {
        return view('core::components.form.tag-collector-input');
    }
}