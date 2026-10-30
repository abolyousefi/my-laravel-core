<?php

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for Badge.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class Badge extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public string $variant = 'primary',
        public string $size = 'md',
        public bool $pill = false,
        public bool $outline = false,
        public bool $dot = false,
        public ?string $icon = null,
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
