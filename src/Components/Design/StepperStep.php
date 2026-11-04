<?php

namespace MyLaravelCore\Components\Design;

use MyLaravelCore\Components\BaseComponent;

class StepperStep extends BaseComponent
{
    public string $elementId;
    public int $index;
    public string $title;
    public ?string $subtitle;
    public ?string $icon;
    public string $status;
    public bool $active;

    public function __construct(
        int $index = 1,
        string $title = '',
        ?string $subtitle = null,
        ?string $icon = null,
        string $status = 'pending',
        bool $active = false,
        ?string $id = null,
        ?string $class = null,
        ?string $error = null,
        ?string $permission = null
    ) {
        parent::__construct($id, $class, $error, $permission);
        $this->index = $index;
        $this->title = $title;
        $this->subtitle = $subtitle;
        $this->icon = $icon;
        $this->status = $status;
        $this->active = $active;
        $this->elementId = $this->resolveId('stepper-step');
    }

    public function render()
    {
        return view('core::components.design.stepper-step');
    }
}