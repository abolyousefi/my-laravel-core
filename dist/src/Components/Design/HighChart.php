<?php

namespace MyLaravelCore\Components\Design;

use MyLaravelCore\Components\BaseComponent;

class HighChart extends BaseComponent
{
    public string $elementId;
    public string $type;
    public ?string $title;
    public ?string $subtitle;
    public array $categories;
    public array $series;
    public array $options;
    public string $height;

    public function __construct(
        string $type = 'line',
        ?string $title = null,
        ?string $subtitle = null,
        array $categories = [],
        array $series = [],
        array $options = [],
        string $height = '360px',
        ?string $id = null,
        ?string $class = null,
        ?string $error = null,
        ?string $permission = null
    ) {
        parent::__construct($id, $class, $error, $permission);
        $this->type = $type;
        $this->title = $title;
        $this->subtitle = $subtitle;
        $this->categories = $categories;
        $this->series = $series;
        $this->options = $options;
        $this->height = $height;
        $this->elementId = $this->resolveId('high-chart');
    }

    public function render()
    {
        return view('core::components.design.high-chart');
    }
}