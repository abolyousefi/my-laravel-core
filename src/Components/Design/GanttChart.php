<?php

namespace MyLaravelCore\Components\Design;

use MyLaravelCore\Components\BaseComponent;

class GanttChart extends BaseComponent
{
    public string $elementId;
    public array $tasks;
    public ?string $title;
    public string $viewMode;
    public string $height;

    public function __construct(
        array $tasks = [],
        ?string $title = null,
        string $viewMode = 'Day',
        string $height = '380px',
        ?string $id = null,
        ?string $class = null,
        ?string $error = null,
        ?string $permission = null
    ) {
        parent::__construct($id, $class, $error, $permission);
        $this->tasks = $tasks;
        $this->title = $title;
        $this->viewMode = $viewMode;
        $this->height = $height;
        $this->elementId = $this->resolveId('gantt-chart');
    }

    public function render()
    {
        return view('core::components.design.gantt-chart');
    }
}