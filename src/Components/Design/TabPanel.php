<?php

namespace MyLaravelCore\Components\Design;

use MyLaravelCore\Components\BaseComponent;

class TabPanel extends BaseComponent
{
    public string $elementId;
    public string $name;
    public bool $active;
    public bool $lazy;

    public function __construct(
        string $name = 'tab',
        bool $active = false,
        bool $lazy = false,
        ?string $id = null,
        ?string $class = null,
        ?string $error = null,
        ?string $permission = null
    ) {
        parent::__construct($id, $class, $error, $permission);
        $this->name = $name;
        $this->active = $active;
        $this->lazy = $lazy;
        $this->elementId = $this->resolveId('tab-panel');
    }

    public function render()
    {
        return view('core::components.design.tab-panel');
    }
}