<?php

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for DataCard.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class DataCard extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public string $title,
        public mixed $value,
        public ?string $icon = null,
        public string $color = 'primary',
        public int|float|null $trend = null,
        public string $trendDirection = 'up',
        public ?string $trendLabel = null,
        public ?string $link = null,
        public bool $loading = false,
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
