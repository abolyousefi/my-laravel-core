<?php

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for TimelineItem.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class TimelineItem extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public string $title,
        public ?string $description = null,
        public ?string $time = null,
        public ?string $icon = 'fa-circle',
        public string $color = 'primary',
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
