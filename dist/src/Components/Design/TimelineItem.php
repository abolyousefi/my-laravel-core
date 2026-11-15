<?php

namespace MyLaravelCore\Components\Design;

use Illuminate\Contracts\View\View;
use MyLaravelCore\Components\BaseComponent;

class TimelineItem extends BaseComponent
{
    public function __construct(
        public string $title,
        public ?string $description = null,
        public ?string $time = null,
        public ?string $icon = 'fa-circle',
        public string $color = 'primary',
        ?string $id = null,
        ?string $class = null
    ) {
        parent::__construct($id, $class);
    }

    public function render(): View
    {
        return view('core::components.design.timeline-item');
    }
}
