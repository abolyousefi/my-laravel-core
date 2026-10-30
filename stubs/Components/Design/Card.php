<?php

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for Card.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class Card extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public ?string $title = null,
        public ?string $subtitle = null,
        public ?string $icon = null,
        public string $iconColor = 'warning',
        public ?string $badge = null,
        public string $badgeVariant = 'warning',
        public bool $collapsible = false,
        public bool $collapsed = false,
        public bool $bordered = false,
        public string $shadow = 'sm',
        public string $rounded = '4',
        public string|int $padding = '4',
        public string $bg = 'white',
        public bool $hover = false,
        public bool $headerBorder = true,
        public ?string $image = null,
        public ?string $imageAlt = null,
        public string $imageHeight = '200px',
        public array $headerActions = [],
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
