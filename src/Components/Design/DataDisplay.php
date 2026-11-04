<?php

namespace MyLaravelCore\Components\Design;

use MyLaravelCore\Components\BaseComponent;

class DataDisplay extends BaseComponent
{
    public function __construct(
        public int|string $cols = 3,
        public bool $alignValues = true,
        public ?string $title = null
    ) {
    }

    protected function viewName(): string
    {
        return 'core::components.design.data-display';
    }
}