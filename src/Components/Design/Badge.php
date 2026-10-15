<?php

namespace MyLaravelCore\Components\Design;

use Illuminate\Contracts\View\View;
use MyLaravelCore\Components\BaseComponent;

class Badge extends BaseComponent
{
    public function __construct(
        public string $variant = 'primary', // primary, success, danger, warning, info, secondary, light, dark
        public string $size = 'md', // sm, md, lg
        public bool $pill = false,
        public bool $outline = false,
        public bool $dot = false,
        public ?string $icon = null,
        ?string $id = null,
        ?string $class = null
    ) {
        parent::__construct($id, $class);
    }

    public function render(): View
    {
        return view('core::components.design.badge');
    }
}
