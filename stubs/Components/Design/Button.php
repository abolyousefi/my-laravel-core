<?php

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for Button.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class Button extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public string $variant = 'primary',
        public string $size = 'md',
        public ?string $icon = null,
        public string $iconPosition = 'left',
        public string $type = 'button',
        public bool $outline = false,
        public bool $pill = false,
        public bool $block = false,
        public bool $disabled = false,
        public bool $loading = false,
        public ?string $href = null,
        public ?string $target = null,
        public ?string $confirm = null,
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
