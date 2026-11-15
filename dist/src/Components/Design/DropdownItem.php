<?php

namespace MyLaravelCore\Components\Design;

use MyLaravelCore\Components\BaseComponent;

class DropdownItem extends BaseComponent
{
    public string $elementId;
    public ?string $label;
    public string $href;
    public ?string $icon;
    public ?string $variant;
    public bool $disabled;
    public bool $divider;
    public ?string $confirmMessage;

    public function __construct(
        ?string $label = null,
        string $href = '#',
        ?string $icon = null,
        ?string $variant = null,
        bool $disabled = false,
        bool $divider = false,
        ?string $confirmMessage = null,
        ?string $id = null,
        ?string $class = null,
        ?string $error = null,
        ?string $permission = null
    ) {
        parent::__construct($id, $class, $error, $permission);
        $this->label = $label;
        $this->href = $href;
        $this->icon = $icon;
        $this->variant = $variant;
        $this->disabled = $disabled;
        $this->divider = $divider;
        $this->confirmMessage = $confirmMessage;
        $this->elementId = $this->resolveId('dropdown-item');
    }

    public function render()
    {
        return view('core::components.design.dropdown-item');
    }
}