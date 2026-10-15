<?php

namespace MyLaravelCore\Components\Design;

use Illuminate\Contracts\View\View;
use MyLaravelCore\Components\BaseComponent;

class Timeline extends BaseComponent
{
    public function __construct(
        public array $items = [],
        public string $direction = 'vertical', // vertical, horizontal
        public string $color = 'primary',
        public bool $animated = false,
        ?string $id = null,
        ?string $class = null
    ) {
        parent::__construct($id, $class);
    }

    public function render(): View
    {
        return view('core::components.design.timeline');
    }
}
