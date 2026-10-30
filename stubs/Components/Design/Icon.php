<?php

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for Icon.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class Icon extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public string $name,
        public string $size = 'md',
        public ?string $color = null,
        public bool $spin = false,
        public ?string $flip = null,
        public ?int $rotate = null,
        public bool $fixedWidth = false,
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
