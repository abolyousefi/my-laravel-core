<?php

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for Alert.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class Alert extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public string $type = 'info',
        public ?string $title = null,
        public ?string $message = null,
        public ?string $icon = null,
        public bool $dismissible = false,
        public bool $outline = false,
        public string $size = 'md',
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
