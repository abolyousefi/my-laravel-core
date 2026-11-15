<?php

namespace MyLaravelCore\Components\Design;

use MyLaravelCore\Components\BaseComponent;

class TabComponent extends BaseComponent
{
    public string $elementId;
    public array $tabs;
    public ?string $activeTab;
    public string $variant;
    public bool $vertical;
    public ?string $persistKey;

    public function __construct(
        array $tabs = [],
        ?string $activeTab = null,
        string $variant = 'default',
        bool $vertical = false,
        ?string $persistKey = null,
        ?string $id = null,
        ?string $class = null,
        ?string $error = null,
        ?string $permission = null
    ) {
        parent::__construct($id, $class, $error, $permission);
        $this->tabs = $tabs;
        $this->activeTab = $activeTab;
        $this->variant = $variant;
        $this->vertical = $vertical;
        $this->persistKey = $persistKey;
        $this->elementId = $this->resolveId('tab');
    }

    public function render()
    {
        return view('core::components.design.tab');
    }
}