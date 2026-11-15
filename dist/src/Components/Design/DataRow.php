<?php

namespace MyLaravelCore\Components\Design;

use MyLaravelCore\Components\BaseComponent;

class DataRow extends BaseComponent
{
    public string $elementId;
    public string $label;
    public mixed $value;
    public ?string $icon;
    public bool $copyable;
    public ?string $badgeVariant;
    public int $colspan;

    public function __construct(
        string $label = '',
        mixed $value = null,
        ?string $icon = null,
        bool $copyable = false,
        ?string $badgeVariant = null,
        int $colspan = 1,
        ?string $id = null,
        ?string $class = null,
        ?string $error = null,
        ?string $permission = null
    ) {
        parent::__construct($id, $class, $error, $permission);
        $this->label = $label;
        $this->value = $value;
        $this->icon = $icon;
        $this->copyable = $copyable;
        $this->badgeVariant = $badgeVariant;
        $this->colspan = $colspan;
        $this->elementId = $this->resolveId('data-row');
    }

    public function render()
    {
        return view('core::components.design.data-row');
    }
}