<?php

namespace MyLaravelCore\Components\Design;

use Illuminate\Contracts\View\View;
use MyLaravelCore\Components\BaseComponent;

class Banner extends BaseComponent
{
    public function __construct(
        public string $type = 'info',
        public ?string $title = null,
        public ?string $description = null,
        public ?string $icon = null,
        public array $actions = [],
        public bool $dismissible = false,
        public ?string $illustration = null,
        ?string $id = null,
        ?string $class = null
    ) {
        parent::__construct($id, $class);
    }

    public function render(): View
    {
        return view('core::components.design.banner');
    }
}
