<?php

namespace MyLaravelCore\Components\Design;

use MyLaravelCore\Components\BaseComponent;

class Stepper extends BaseComponent
{
    public string $elementId;
    public array $steps;
    public int $currentStep;
    public string $orientation;
    public bool $clickable;

    public function __construct(
        array $steps = [],
        int $currentStep = 1,
        string $orientation = 'horizontal',
        bool $clickable = true,
        ?string $id = null,
        ?string $class = null,
        ?string $error = null,
        ?string $permission = null
    ) {
        parent::__construct($id, $class, $error, $permission);
        $this->steps = $steps;
        $this->currentStep = $currentStep;
        $this->orientation = $orientation;
        $this->clickable = $clickable;
        $this->elementId = $this->resolveId('stepper');
    }

    public function render()
    {
        return view('core::components.design.stepper');
    }
}