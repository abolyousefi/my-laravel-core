<?php

namespace MyLaravelCore\Components\Form;

use MyLaravelCore\Components\BaseComponent;

abstract class BaseFormComponent extends BaseComponent
{
    public string $name;
    public ?string $label;
    public mixed $value;
    public bool $required;
    public bool $disabled;
    public bool $readonly;
    public ?string $hint;
    public string $dir;
    public string $elementId;
    public ?string $resolvedError;

    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = null,
        bool $required = false,
        bool $disabled = false,
        bool $readonly = false,
        ?string $hint = null,
        string $dir = 'auto',
        ?string $id = null,
        ?string $class = null,
        ?string $error = null
    ) {
        parent::__construct($id, $class, $error);

        $this->name = $name;
        $this->label = $label;
        $this->required = $required;
        $this->disabled = $disabled;
        $this->readonly = $readonly;
        $this->hint = $hint;
        $this->dir = $dir;

        $dotName = str_replace(['[', ']'], ['.', ''], $name);
        $dotName = rtrim($dotName, '.');
        $this->value = old($dotName, $value);

        $this->elementId = $this->resolveId($name);
        $this->resolvedError = $this->resolveError($name);
    }
}
