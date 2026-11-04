<?php

namespace MyLaravelCore\Components\Form;

class UrlInput extends BaseFormComponent
{
    public ?string $placeholder;
    public string $protocol;
    public bool $showPreviewLink;

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
        ?string $placeholder = 'https://example.com',
        string $protocol = 'https://',
        bool $showPreviewLink = true
    ) {
        parent::__construct($name, $label, $value, $required, $disabled, $readonly, $hint, $dir, $id, $class, $error, $permission);
        $this->placeholder = $placeholder;
        $this->protocol = $protocol;
        $this->showPreviewLink = $showPreviewLink;
        $this->dir = 'ltr';
    }

    public function render()
    {
        return view('core::components.form.url-input');
    }
}