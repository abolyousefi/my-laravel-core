<?php

namespace MyLaravelCore\Components\Design;

use MyLaravelCore\Components\BaseComponent;

class StatCard extends BaseComponent
{
    public string $elementId;
    public string $title;
    public string|int|float $value;
    public ?string $unit;
    public ?string $icon;
    public string $variant;
    public ?string $trend;
    public ?string $trendLabel;
    public ?string $description;
    public ?string $href;

    public function __construct(
        string $title = '',
        string|int|float $value = 0,
        ?string $unit = null,
        ?string $icon = null,
        string $variant = 'primary',
        ?string $trend = null,
        ?string $trendLabel = null,
        ?string $description = null,
        ?string $href = null,
        ?string $id = null,
        ?string $class = null,
        ?string $error = null,
        ?string $permission = null
    ) {
        parent::__construct($id, $class, $error, $permission);
        $this->title = $title;
        $this->value = $value;
        $this->unit = $unit;
        $this->icon = $icon;
        $this->variant = $variant;
        $this->trend = $trend;
        $this->trendLabel = $trendLabel;
        $this->description = $description;
        $this->href = $href;
        $this->elementId = $this->resolveId('stat-card');
    }

    public function render()
    {
        return view('core::components.design.stat-card');
    }
}