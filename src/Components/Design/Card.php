<?php

namespace MyLaravelCore\Components\Design;

use Illuminate\Contracts\View\View;
use MyLaravelCore\Components\BaseComponent;

class Card extends BaseComponent
{
    public function __construct(
        public ?string $title = null,
        public ?string $subtitle = null,
        public ?string $icon = null,
        public bool $collapsible = false,
        public bool $collapsed = false,
        public bool $bordered = true,
        public string $shadow = 'sm', // none, sm, md, lg
        public string $padding = 'md', // none, sm, md, lg
        public array $headerActions = [],
        ?string $id = null,
        ?string $class = null
    ) {
        parent::__construct($id, $class);
    }

    public function render(): View
    {
        return view('core::components.design.card');
    }
}
