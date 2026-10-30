<?php

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for Tooltip.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class Tooltip extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public string $text,
        public string $placement = 'top',
        public string $variant = 'dark',
        public string $trigger = 'hover',
        public int $delay = 200,
        public bool $html = false,
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
