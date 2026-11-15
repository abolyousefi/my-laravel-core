<?php

namespace MyLaravelCore\Components\Layout;

use Illuminate\Contracts\View\View;
use MyLaravelCore\Components\BaseComponent;

class DefaultLayout extends BaseComponent
{
    public function __construct(
        public ?string $title = null,
        public string $dir = 'rtl',
        public bool $navbar = true,
        public bool $sidebar = false,
        public string|bool $container = 'container',
        public bool $footer = true,
        public bool $alerts = true,
        public string $theme = 'light',
        public ?string $brand = null,
        public ?string $brandUrl = null,
        ?string $id = null,
        ?string $class = null
    ) {
        parent::__construct($id, $class);

        $this->dir = $dir ?: config('core.ui.direction', 'rtl');
        $this->brand = $brand ?: (function_exists('config') ? config('app.name', 'Laravel') : 'Laravel');
        $this->brandUrl = $brandUrl ?: (function_exists('app') && app()->bound('url') ? url('/') : '/');
    }

    public function render(): View
    {
        return view('core::components.layout.default-layout');
    }
}
