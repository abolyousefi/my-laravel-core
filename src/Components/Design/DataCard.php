<?php

namespace MyLaravelCore\Components\Design;

use Illuminate\Contracts\View\View;
use MyLaravelCore\Components\BaseComponent;

class DataCard extends BaseComponent
{
    public function __construct(
        public string $title,
        public mixed $value,
        public ?string $icon = null,
        public string $color = 'primary',
        public int|float|null $trend = null,
        public string $trendDirection = 'up', // up, down
        public ?string $trendLabel = null,
        public ?string $link = null,
        public bool $loading = false,
        ?string $id = null,
        ?string $class = null
    ) {
        parent::__construct($id, $class);
    }

    public function render(): View
    {
        return view('core::components.design.data-card');
    }
}
