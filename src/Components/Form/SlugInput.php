<?php

namespace MyLaravelCore\Components\Form;

class SlugInput extends BaseFormComponent
{
    public ?string $source;
    public string $separator;
    public ?string $prefixUrl;
    public bool $persian;

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
        ?string $source = null,
        string $separator = '-',
        ?string $prefixUrl = null,
        bool $persian = true
    ) {
        parent::__construct($name, $label, $value, $required, $disabled, $readonly, $hint, $dir, $id, $class, $error, $permission);
        $this->source = $source;
        $this->separator = $separator;
        $this->prefixUrl = $prefixUrl;
        $this->persian = $persian;
    }

    public function render()
    {
        return view('core::components.form.slug-input');
    }
}