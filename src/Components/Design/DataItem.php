<?php

namespace MyLaravelCore\Components\Design;

use MyLaravelCore\Components\BaseComponent;

class DataItem extends BaseComponent
{
    public function __construct(
        public string $label = '',
        public mixed $value = '-',
        public ?string $dir = null,
        public ?string $valueClass = null,
        public ?string $badgeVariant = null
    ) {
    }

    protected function viewName(): string
    {
        return 'core::components.design.data-item';
    }
}