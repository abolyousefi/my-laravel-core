<?php

namespace MyLaravelCore\Components\Design;

use Illuminate\Contracts\View\View;
use MyLaravelCore\Components\BaseComponent;

class Icon extends BaseComponent
{
    public function __construct(
        public string $name,
        public string $size = 'md', // xs, sm, md, lg, xl, 2xl, 3xl
        public ?string $color = null,
        public bool $spin = false,
        public ?string $flip = null, // horizontal, vertical, both
        public ?int $rotate = null, // 90, 180, 270
        public bool $fixedWidth = false,
        ?string $id = null,
        ?string $class = null
    ) {
        parent::__construct($id, $class);
    }

    public function render(): View
    {
        return view('core::components.design.icon');
    }
}
