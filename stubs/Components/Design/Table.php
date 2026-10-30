<?php

namespace MyLaravelCore\Components\Design;

/**
 * Stub definition for Table.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class Table extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        public array $columns = [],
        public mixed $rows = [],
        public ?string $title = null,
        public ?string $subtitle = null,
        public ?string $icon = null,
        public bool $searchable = true,
        public string $searchField = 'search',
        public string $searchPlaceholder = 'جستجو در اطلاعات...',
        public ?string $searchAction = null,
        public bool $striped = false,
        public bool $hover = true,
        public bool $bordered = false,
        public bool $card = true,
        public bool $pagination = true,
        public string $emptyMessage = 'هیچ رکوردی برای نمایش یافت نشد.',
        public string $emptyIcon = 'fa-folder-open',
        ?string $id = null,
        ?string $class = null
    ) {
        // Protected implementation
    }

    /**
     * resolveValue signature.
     */
    public function resolveValue(mixed $row, string $key): mixed {
        // Protected implementation
    }

    /**
     * isPaginator signature.
     */
    public function isPaginator(): bool {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}
