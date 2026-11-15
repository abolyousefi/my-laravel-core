<?php

namespace MyLaravelCore\Components\Design;

use Illuminate\Contracts\View\View;
use MyLaravelCore\Components\BaseComponent;

class Button extends BaseComponent
{
    public function __construct(
        public string $variant = 'primary', // primary, secondary, success, danger, warning, info, light, dark, link
        public string $size = 'md', // xs, sm, md, lg
        public ?string $icon = null,
        public string $iconPosition = 'left',
        public string $type = 'button', // button, submit, reset
        public bool $outline = false,
        public bool $pill = false,
        public bool $block = false,
        public bool $disabled = false,
        public bool $loading = false,
        public ?string $href = null,
        public ?string $target = null,
        public ?string $confirm = null,
        ?string $id = null,
        ?string $class = null
    ) {
        parent::__construct($id, $class);
    }

    public function render(): View
    {
        return view('core::components.design.button');
    }
}
