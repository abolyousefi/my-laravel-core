<?php

namespace MyLaravelCore\Components\Design;

use Illuminate\Contracts\View\View;
use MyLaravelCore\Components\BaseComponent;

class Tooltip extends BaseComponent
{
    public function __construct(
        public string $text,
        public string $placement = 'top', // top, bottom, left, right
        public string $variant = 'dark', // dark, light, primary
        public string $trigger = 'hover', // hover, click, focus
        public int $delay = 200, // ms
        public bool $html = false,
        ?string $id = null,
        ?string $class = null
    ) {
        parent::__construct($id, $class);
    }

    public function render(): View
    {
        return view('core::components.design.tooltip');
    }
}
