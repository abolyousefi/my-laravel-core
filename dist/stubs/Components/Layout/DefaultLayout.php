<?php

namespace MyLaravelCore\Components\Layout;

/**
 * Stub definition for DefaultLayout.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class DefaultLayout extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
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
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}
