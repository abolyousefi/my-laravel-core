<?php

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for Accordion.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class Accordion extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public string $type = 'single',
        public ?int $activeIndex = null,
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
