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
        public string $iconColor = 'warning',
        public ?string $badge = null,
        public string $badgeVariant = 'warning',
        public bool $collapsible = false,
        public bool $collapsed = false,
        public bool $bordered = false,
        public string $shadow = 'sm', // none, sm, md, lg
        public string $rounded = '4', // 0, 1, 2, 3, 4, 5, pill
        public string|int $padding = '4', // 0, 1, 2, 3, 4, 5
        public string $bg = 'white', // white, light, dark, primary, etc.
        public bool $hover = false,
        public bool $headerBorder = true,
        public ?string $image = null,
        public ?string $imageAlt = null,
        public string $imageHeight = '200px',
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
