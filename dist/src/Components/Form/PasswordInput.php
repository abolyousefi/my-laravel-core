<?php

namespace MyLaravelCore\Components\Form;

class PasswordInput extends BaseFormComponent
{
    public ?string $placeholder;
    public bool $showToggle;
    public bool $showStrength;
    public bool $generateButton;

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
        ?string $placeholder = null,
        bool $showToggle = true,
        bool $showStrength = false,
        bool $generateButton = false
    ) {
        parent::__construct($name, $label, $value, $required, $disabled, $readonly, $hint, $dir, $id, $class, $error, $permission);
        $this->placeholder = $placeholder;
        $this->showToggle = $showToggle;
        $this->showStrength = $showStrength;
        $this->generateButton = $generateButton;
        $this->dir = 'ltr';
    }

    public function render()
    {
        return view('core::components.form.password-input');
    }
}