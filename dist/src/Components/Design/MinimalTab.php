<?php

namespace MyLaravelCore\Components\Design;

use MyLaravelCore\Components\BaseComponent;

class MinimalTab extends BaseComponent
{
    public string $elementId;
    public array $tabs;
    public ?string $activeTab;
    public string $size;

    public function __construct(
        array $tabs = [],
        ?string $activeTab = null,
        string $size = 'sm',
        ?string $id = null,
        ?string $class = null,
        ?string $error = null,
        ?string $permission = null
    ) {
        parent::__construct($id, $class, $error, $permission);
        $this->tabs = $tabs;
        $this->activeTab = $activeTab;
        $this->size = $size;
        $this->elementId = $this->resolveId('minimal-tab');
    }

    public function render()
    {
        return view('core::components.design.minimal-tab');
    }
}