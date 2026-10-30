<?php

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for DropdownButton.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class DropdownButton extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public string $label = 'عملیات',
        public string $variant = 'primary',
        public string $size = 'md',
        public array $items = [],
        public string $align = 'end',
        public bool $split = false,
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
