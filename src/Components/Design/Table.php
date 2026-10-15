<?php

namespace MyLaravelCore\Components\Design;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Contracts\View\View;
use MyLaravelCore\Components\BaseComponent;

class Table extends BaseComponent
{
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
        parent::__construct($id, $class);
    }

    /**
     * Resolve attribute value using dot notation.
     */
    public function resolveValue(mixed $row, string $key): mixed
    {
        return data_get($row, $key);
    }

    /**
     * Determine if rows is a paginator instance.
     */
    public function isPaginator(): bool
    {
        return $this->rows instanceof LengthAwarePaginator;
    }

    public function render(): View
    {
        return view('core::components.design.table');
    }
}
