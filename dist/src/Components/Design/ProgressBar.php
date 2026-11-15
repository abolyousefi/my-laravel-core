<?php

namespace MyLaravelCore\Components\Design;

use MyLaravelCore\Components\BaseComponent;

class ProgressBar extends BaseComponent
{
    public string $elementId;
    public float|int $value;
    public float|int $max;
    public ?string $label;
    public string $variant;
    public string $size;
    public bool $striped;
    public bool $animated;
    public bool $showPercentage;
    public bool $stacked;

    public function __construct(
        float|int $value = 0,
        float|int $max = 100,
        ?string $label = null,
        string $variant = 'primary',
        string $size = 'md',
        bool $striped = false,
        bool $animated = false,
        bool $showPercentage = true,
        bool $stacked = false,
        ?string $id = null,
        ?string $class = null,
        ?string $error = null,
        ?string $permission = null
    ) {
        parent::__construct($id, $class, $error, $permission);
        $this->value = $value;
        $this->max = $max;
        $this->label = $label;
        $this->variant = $variant;
        $this->size = $size;
        $this->striped = $striped;
        $this->animated = $animated;
        $this->showPercentage = $showPercentage;
        $this->stacked = $stacked;
        $this->elementId = $this->resolveId('progress-bar');
    }

    public function render()
    {
        return view('core::components.design.progress-bar');
    }
}