<?php

namespace MyLaravelCore\Components\Form;

class EmailInput extends BaseFormComponent
{
    public ?string $placeholder;
    public array $domains;

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
        ?string $placeholder = 'example@domain.com',
        array $domains = []
    ) {
        parent::__construct($name, $label, $value, $required, $disabled, $readonly, $hint, $dir, $id, $class, $error, $permission);
        $this->placeholder = $placeholder;
        $this->domains = $domains;
        $this->dir = 'ltr';
    }

    public function render()
    {
        return view('core::components.form.email-input');
    }
}