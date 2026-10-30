<?php

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for FileView.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class FileView extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public string $name,
        public string $url,
        public ?int $size = null,
        public ?string $type = null,
        public ?string $icon = 'auto',
        public bool $downloadable = true,
        public bool $deletable = false,
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
