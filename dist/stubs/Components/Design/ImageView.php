<?php

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for ImageView.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class ImageView extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public string $src,
        public string $alt = '',
        public string|int|null $width = null,
        public string|int|null $height = null,
        public ?string $ratio = null,
        public bool $rounded = false,
        public bool $circle = false,
        public bool $thumbnail = false,
        public bool $lazy = true,
        public ?string $placeholder = null,
        public bool $lightbox = false,
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
