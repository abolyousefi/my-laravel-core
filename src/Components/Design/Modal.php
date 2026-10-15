<?php

namespace MyLaravelCore\Components\Design;

use Illuminate\Contracts\View\View;
use MyLaravelCore\Components\BaseComponent;

class Modal extends BaseComponent
{
    public function __construct(
        public ?string $title = null,
        public string $size = 'md', // sm, md, lg, xl, full
        public bool $centered = true,
        public bool $scrollable = false,
        public bool $closeOnBackdrop = true,
        public bool $closeOnEsc = true,
        public bool $showCloseButton = true,
        public bool $static = false,
        ?string $id = null,
        ?string $class = null
    ) {
        parent::__construct($id, $class);
        $this->id = $this->resolveId('modal');
    }

    public function render(): View
    {
        return view('core::components.design.modal');
    }
}
