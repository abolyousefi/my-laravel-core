<?php

namespace MyLaravelCore\Components\Design;

use MyLaravelCore\Components\BaseComponent;

class ProgressBarItem extends BaseComponent
{
    public string $elementId;
    public float|int $value;
    public ?string $label;
    public string $variant;
    public bool $striped;
    public bool $animated;

    public function __construct(
        float|int $value = 0,
        ?string $label = null,
        string $variant = 'primary',
        bool $striped = false,
        bool $animated = false,
        ?string $id = null,
        ?string $class = null,
        ?string $error = null,
        ?string $permission = null
    ) {
        parent::__construct($id, $class, $error, $permission);
        $this->value = $value;
        $this->label = $label;
        $this->variant = $variant;
        $this->striped = $striped;
        $this->animated = $animated;
        $this->elementId = $this->resolveId('progress-bar-item');
    }

    public function render()
    {
        return view('core::components.design.progress-bar-item');
    }
}