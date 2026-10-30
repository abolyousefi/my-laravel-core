<?php

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for Modal.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class Modal extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public ?string $title = null,
        public string $size = 'md',
        public bool $centered = true,
        public bool $scrollable = false,
        public bool $closeOnBackdrop = true,
        public bool $closeOnEsc = true,
        public bool $showCloseButton = true,
        public bool $static = false,
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
