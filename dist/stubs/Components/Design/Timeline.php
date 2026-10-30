<?php

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for Timeline.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class Timeline extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public array $items = [],
        public string $direction = 'vertical',
        public string $color = 'primary',
        public bool $animated = false,
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
