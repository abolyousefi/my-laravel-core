<?php

namespace MyLaravelCore\Components\Design;

use Illuminate\Contracts\View\View;
use MyLaravelCore\Components\BaseComponent;

class DataItem extends BaseComponent
{
    public function __construct(
        public string $label = '',
        public mixed $value = '-',
        public ?string $dir = null,
        public ?string $valueClass = null,
        public ?string $badgeVariant = null,
        ?string $id = null,
        ?string $class = null,
        ?string $permission = null
    ) {
        parent::__construct($id, $class, null, $permission);
    }

    public function render(): View
    {
        return view('core::components.design.data-item');
    }
}