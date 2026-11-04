<?php

namespace MyLaravelCore\Components\Design;

use MyLaravelCore\Components\BaseComponent;

class TabItem extends BaseComponent
{
    public string $elementId;
    public string $name;
    public string $title;
    public ?string $icon;
    public string|int|null $badge;
    public bool $active;
    public bool $disabled;
    public ?string $href;

    public function __construct(
        string $name = 'tab',
        string $title = '',
        ?string $icon = null,
        string|int|null $badge = null,
        bool $active = false,
        bool $disabled = false,
        ?string $href = null,
        ?string $id = null,
        ?string $class = null,
        ?string $error = null,
        ?string $permission = null
    ) {
        parent::__construct($id, $class, $error, $permission);
        $this->name = $name;
        $this->title = $title;
        $this->icon = $icon;
        $this->badge = $badge;
        $this->active = $active;
        $this->disabled = $disabled;
        $this->href = $href;
        $this->elementId = $this->resolveId('tab-item');
    }

    public function render()
    {
        return view('core::components.design.tab-item');
    }
}