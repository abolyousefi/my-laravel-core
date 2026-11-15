<?php

namespace MyLaravelCore\Components\Design;

use Illuminate\Contracts\View\View;
use MyLaravelCore\Components\BaseComponent;

class DropdownButton extends BaseComponent
{
    public function __construct(
        public string $label = 'عملیات',
        public string $variant = 'primary',
        public string $size = 'md',
        public array $items = [],
        public string $align = 'end', // start, end
        public bool $split = false,
        ?string $id = null,
        ?string $class = null
    ) {
        parent::__construct($id, $class);
    }

    public function render(): View
    {
        return view('core::components.design.dropdown-button');
    }
}
