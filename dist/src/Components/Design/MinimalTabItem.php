<?php

namespace MyLaravelCore\Components\Design;

use MyLaravelCore\Components\BaseComponent;

class MinimalTabItem extends BaseComponent
{
    public string $elementId;
    public string $name;
    public string $title;
    public ?string $icon;
    public ?int $count;
    public bool $active;
    public bool $disabled;

    public function __construct(
        string $name = 'tab',
        string $title = '',
        ?string $icon = null,
        ?int $count = null,
        bool $active = false,
        bool $disabled = false,
        ?string $id = null,
        ?string $class = null,
        ?string $error = null,
        ?string $permission = null
    ) {
        parent::__construct($id, $class, $error, $permission);
        $this->name = $name;
        $this->title = $title;
        $this->icon = $icon;
        $this->count = $count;
        $this->active = $active;
        $this->disabled = $disabled;
        $this->elementId = $this->resolveId('minimal-tab-item');
    }

    public function render()
    {
        return view('core::components.design.minimal-tab-item');
    }
}