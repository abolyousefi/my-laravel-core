<?php

namespace MyLaravelCore\Components\Design;

use Illuminate\Contracts\View\View;
use MyLaravelCore\Components\BaseComponent;

class Link extends BaseComponent
{
    public function __construct(
        public string $href,
        public ?string $label = null,
        public ?string $icon = null,
        public string $iconPosition = 'left',
        public string $variant = 'primary',
        public bool $underline = true,
        public bool $external = false,
        public ?string $target = null,
        ?string $id = null,
        ?string $class = null
    ) {
        parent::__construct($id, $class);

        if ($this->external && $this->target === null) {
            $this->target = '_blank';
        }
    }

    public function render(): View
    {
        return view('core::components.design.link');
    }
}
