<?php

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for Banner.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class Banner extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
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
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}
