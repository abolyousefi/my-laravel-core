<?php

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for Link.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class Link extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public string $href,
        public ?string $label = null,
        public ?string $icon = null,
        public string $iconPosition = 'left',
        public string $variant = 'primary',
        public bool $underline = true,
        public bool $external = false,
        public ?string $target = null,
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
