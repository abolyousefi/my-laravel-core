<?php

namespace MyLaravelCore\Tables;

use Closure;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use MyLaravelCore\Tables\Actions\TableAction;
use MyLaravelCore\Tables\Columns\Column;
use MyLaravelCore\Tables\Columns\TextColumn;
use MyLaravelCore\Tables\Enums\Driver;
use MyLaravelCore\Tables\Enums\PinnedRowPosition;
use MyLaravelCore\Tables\Filters\Filter;

abstract class BaseTable
{
    protected ?string $model = null;
    protected ?Builder $builder = null;
    protected Driver $driver = Driver::MODEL;
    protected mixed $resource = null;
    protected Collection $rawData;
    protected string $title = 'لیست اطلاعات';
    protected ?string $subtitle = null;
    protected ?string $icon = 'fa-table-list';
    protected bool $searchable = true;
    protected string $searchPlaceholder = 'جستجو در اطلاعات...';
    protected string $searchField = 'search';
    protected int $perPage = 15;
    protected bool $striped = false;
    protected bool $hover = true;
    protected bool $bordered = false;
    protected bool $card = true;
    protected bool $pagination = true;
    protected bool $showingRecords = true;
    protected bool $showingPaginationSizes = true;
    protected bool $showRecordCountBadge = true;
    protected bool $reorderButtonDisabled = false;
    protected bool $onlyOnFilter = false;
    protected string $filterContainerClass = 'gy-3';
    protected array|Closure $rowAttributes = [];
    protected ?Closure $customReorderQuery = null;
    protected ?string $importClass = null;
    protected ?string $importRoute = null;
    protected ?string $exportClass = null;
    protected ?string $exportRoute = null;
    protected string $emptyMessage = 'هیچ رکوردی برای نمایش یافت نشد.';
    protected string $emptyIcon = 'fa-folder-open';

    protected array $definedColumns = [];
    protected array $definedFilters = [];
    protected array $definedColumnActions = [];
    protected array $definedToolbarButtons = [];
    protected array $definedToggles = [];
    protected array $definedBulkButtons = [];
    protected array $pinnedRows = [
        'top' => [],
        'bottom' => [],
    ];

    public function __construct(?Builder $builder = null)
    {
        $this->rawData = collect();
        if ($builder) {
            $this->builder = $builder;
        } elseif ($this->model && class_exists($this->model)) {
            $this->builder = $this->model::query();
        }
    }

    public static function make(?Builder $builder = null): static
    {
        return new static($builder);
    }

    public function columns()
    {
        return [];
    }

    public function columnActions(): void
    {
    }

    public function filters()
    {
        return [];
    }

    public function toolbar(): void
    {
    }

    public function bulkOperations(): void
    {
    }

    public function actions(): array
    {
        return [];
    }

    public function bulkActions(): array
    {
        return [];
    }

    /* =========================================================================
     * CONFIGURATION & DRIVER METHODS (Document 08)
     * ========================================================================= */

    public function setTitle(string $title): static
    {
        $this->title = $title;
        return $this;
    }

    public function title(string $title): static
    {
        return $this->setTitle($title);
    }

    public function setDriver(Driver $driver): static
    {
        $this->driver = $driver;
        return $this;
    }

    public function setResource(mixed $resource): static
    {
        $this->resource = $resource;
        if (is_string($resource) && class_exists($resource) && is_subclass_of($resource, Model::class)) {
            $this->model = $resource;
            $this->builder = $resource::query();
        }
        return $this;
    }

    public function setData(iterable $data): static
    {
        $this->rawData = collect($data)->map(fn ($row) => is_array($row) ? (object) $row : $row);
        return $this;
    }

    public function getQueryBuilder(): ?Builder
    {
        if (!$this->builder && $this->model && class_exists($this->model)) {
            $this->builder = $this->model::query();
        }
        return $this->builder;
    }

    public function query(Builder $builder): static
    {
        $this->builder = $builder;
        return $this;
    }

    public function icon(string $icon): static
    {
        $this->icon = $icon;
        return $this;
    }

    public function perPage(int $perPage): static
    {
        $this->perPage = $perPage;
        return $this;
    }

    public function setCustomReorderQuery(Closure $callback): static
    {
        $this->customReorderQuery = $callback;
        return $this;
    }

    public function disableReorderButton(bool $disable = true): static
    {
        $this->reorderButtonDisabled = $disable;
        return $this;
    }

    public function setFilterContainerClass(string $class): static
    {
        $this->filterContainerClass = $class;
        return $this;
    }

    public function setRowAttributes(array|Closure $attributes): static
    {
        $this->rowAttributes = $attributes;
        return $this;
    }

    public function displayDataOnFilter(bool $state = true): static
    {
        $this->onlyOnFilter = $state;
        return $this;
    }

    public function setImport(string $importClass): static
    {
        $this->importClass = $importClass;
        return $this;
    }

    public function setImportRoute(string $routeName): static
    {
        $this->importRoute = $routeName;
        return $this;
    }

    public function setExport(string $exportClass): static
    {
        $this->exportClass = $exportClass;
        return $this;
    }

    public function setExportRoute(string $routeName): static
    {
        $this->exportRoute = $routeName;
        return $this;
    }

    public function setShowingRecords(bool $show = true): static
    {
        $this->showingRecords = $show;
        return $this;
    }

    public function setShowingPaginationSizes(bool $show = true): static
    {
        $this->showingPaginationSizes = $show;
        return $this;
    }

    public function withoutCard(): static
    {
        $this->card = false;
        return $this;
    }

    public function hideRecordCountBadge(): static
    {
        $this->showRecordCountBadge = false;
        return $this;
    }

    /* =========================================================================
     * ADD COLUMNS, FILTERS, ACTIONS, TOOLBAR, TOGGLES, BULK & PINNED ROWS
     * ========================================================================= */

    public function addColumn(
        string $name,
        string $label = '',
        string|Closure $type = 'text',
        bool $sortable = false,
        ?string $sortCast = null,
        ?string $labelClass = null,
        string $bodyAlign = 'right',
        ?string $direction = null,
        ?string $width = null,
        ?string $mergeGroup = null,
        ?string $groupBreakLineSection = null,
        string|Closure|null $tooltip = null,
        ?string $permission = null,
        bool|Closure $visibility = true,
        ?Closure $valueVisibility = null,
        bool $centered = false,
        array $options = [],
        ?string $generatorKey = null
    ): static {
        $this->definedColumns[] = compact(
            'name', 'label', 'type', 'sortable', 'sortCast', 'labelClass',
            'bodyAlign', 'direction', 'width', 'mergeGroup', 'groupBreakLineSection',
            'tooltip', 'permission', 'visibility', 'valueVisibility', 'centered',
            'options', 'generatorKey'
        );
        return $this;
    }

    public function addFilter(
        string $name,
        string $elementName,
        string $elementType = 'text',
        ?string $label = null,
        bool $range = false,
        ?string $operator = null,
        string $class = 'col-md-4',
        array $data = [],
        ?string $cast = null,
        ?Closure $validator = null,
        ?string $permission = null,
        bool|Closure $visibility = true,
        bool $withBreakLine = false,
        array $options = []
    ): static {
        $this->definedFilters[] = compact(
            'name', 'elementName', 'elementType', 'label', 'range', 'operator',
            'class', 'data', 'cast', 'validator', 'permission', 'visibility',
            'withBreakLine', 'options'
        );
        return $this;
    }

    public function addColumnAction(
        string $type,
        string $title,
        string|Closure $target = '#',
        string $targetMethod = 'GET',
        ?Closure $visibility = null,
        bool|Closure $disabled = false,
        string $style = 'dropdown',
        mixed $variant = 'primary',
        mixed $appearance = 'outline',
        string $class = '',
        string $iconClass = '',
        string|Closure|null $tooltip = null,
        string|Closure|null $disabledTooltip = null,
        string|array|Closure|null $permission = null,
        bool $permissionOnlyOne = true,
        array|Closure $attributes = [],
        bool $confirmation = false,
        string|Closure|null $confirmationMessage = null,
        string $confirmationType = 'danger',
        ?string $confirmationIcon = null,
        ?string $confirmButtonText = null,
        ?string $cancelButtonText = null,
        ?string $confirmationConfirmCallback = null,
        ?string $generatorKey = null
    ): static {
        $this->definedColumnActions[] = compact(
            'type', 'title', 'target', 'targetMethod', 'visibility', 'disabled',
            'style', 'variant', 'appearance', 'class', 'iconClass', 'tooltip',
            'disabledTooltip', 'permission', 'permissionOnlyOne', 'attributes',
            'confirmation', 'confirmationMessage', 'confirmationType',
            'confirmationIcon', 'confirmButtonText', 'cancelButtonText',
            'confirmationConfirmCallback', 'generatorKey'
        );
        return $this;
    }

    public function addToolbarButton(
        string $title,
        ?string $route = null,
        string $class = '',
        string $icon = '',
        mixed $variant = 'primary',
        bool|Closure $disabled = false,
        string|Closure|null $tooltip = null,
        ?string $disabledTooltip = null,
        mixed $appearance = 'solid',
        array $attributes = [],
        ?string $permission = null
    ): static {
        $this->definedToolbarButtons[] = compact(
            'title', 'route', 'class', 'icon', 'variant', 'disabled',
            'tooltip', 'disabledTooltip', 'appearance', 'attributes', 'permission'
        );
        return $this;
    }

    public function addToggle(
        string $name,
        ?string $label = null,
        bool $default = false,
        bool|Closure $visibility = true
    ): static {
        $this->definedToggles[$name] = compact('name', 'label', 'default', 'visibility');
        return $this;
    }

    public function toggleIsOn(string $name): bool
    {
        $sessionKey = 'table_generator.toggles.' . md5(static::class . '.' . $name);
        if (function_exists('session') && session()->has($sessionKey)) {
            return (bool) session($sessionKey);
        }
        return (bool) ($this->definedToggles[$name]['default'] ?? false);
    }

    public function addBulkOperationButton(
        string $id,
        string $title,
        string $route,
        string $elementClass = '',
        string $icon = '',
        bool $disabled = false,
        ?string $tooltip = null,
        ?string $disabledTooltip = null,
        ?bool $confirmation = null,
        ?string $confirmationMessage = null,
        ?string $confirmationIcon = null,
        string $confirmationType = 'danger',
        ?string $confirmButtonText = null,
        ?string $cancelButtonText = null,
        ?string $permission = null,
        array $attributes = []
    ): static {
        $this->definedBulkButtons[] = compact(
            'id', 'title', 'route', 'elementClass', 'icon', 'disabled',
            'tooltip', 'disabledTooltip', 'confirmation', 'confirmationMessage',
            'confirmationIcon', 'confirmationType', 'confirmButtonText',
            'cancelButtonText', 'permission', 'attributes'
        );
        return $this;
    }

    public function addPinnedRow(array $row, ?PinnedRowPosition $position = null): static
    {
        $pos = ($position ?? PinnedRowPosition::BOTTOM)->value;
        $this->pinnedRows[$pos][] = (object) $row;
        return $this;
    }

    public function setPinnedRows(iterable $rows, ?PinnedRowPosition $position = null): static
    {
        $pos = ($position ?? PinnedRowPosition::BOTTOM)->value;
        $this->pinnedRows[$pos] = [];
        foreach ($rows as $row) {
            $this->pinnedRows[$pos][] = is_array($row) ? (object) $row : $row;
        }
        return $this;
    }

    public function getPinnedRows(?PinnedRowPosition $position = null): Collection
    {
        if ($position !== null) {
            return collect($this->pinnedRows[$position->value] ?? []);
        }
        return collect(array_merge($this->pinnedRows['top'], $this->pinnedRows['bottom']));
    }

    public function hasPinnedRows(?PinnedRowPosition $position = null): bool
    {
        return $this->getPinnedRows($position)->isNotEmpty();
    }

    /**
     * Build SQL CASE expression for sortable polymorphic (morphTo) column labels.
     */
    public function morphLabelSql(string $name, string $types, array $labels): string
    {
        $typeCol = "{$name}_type";
        $idCol = "{$name}_id";
        $cases = [];

        foreach ($labels as $typeValue => $subqueryCallback) {
            $escapedType = addslashes((string) $typeValue);
            $subSql = $subqueryCallback($idCol);
            $cases[] = "WHEN {$typeCol} = '{$escapedType}' THEN ({$subSql})";
        }

        return '(CASE ' . implode(' ', $cases) . ' ELSE NULL END)';
    }

    /* =========================================================================
     * EXECUTION & RENDERING
     * ========================================================================= */

    /**
     * @return array<int, Column>
     */
    protected function resolveColumnObjects(): array
    {
        $this->definedColumns = [];
        $ret = $this->columns();

        if (is_array($ret) && !empty($ret)) {
            return $ret;
        }

        $cols = [];
        foreach ($this->definedColumns as $def) {
            $vis = is_callable($def['visibility']) ? (bool) ($def['visibility'])() : (bool) $def['visibility'];
            if (!$vis) {
                continue;
            }

            $col = TextColumn::make($def['name'], $def['label'])
                ->sortable($def['sortable'])
                ->align($def['bodyAlign']);

            if ($def['width']) {
                $col->width($def['width']);
            }
            if ($def['type'] instanceof Closure) {
                $fn = $def['type'];
                $col->format(fn ($val, $row) => $fn($val, $row));
            }
            $cols[] = $col;
        }

        return $cols;
    }

    public function getRows(): LengthAwarePaginator|array
    {
        if ($this->driver === Driver::RAW) {
            return $this->rawData->all();
        }

        $query = $this->builder ? clone $this->builder : null;
        if (!$query && $this->model && class_exists($this->model)) {
            $query = $this->model::query();
        }

        if (!$query) {
            return [];
        }

        $columns = $this->resolveColumnObjects();

        // Apply Search across searchable columns
        $search = request()->input($this->searchField);
        $searchableCols = array_filter($columns, fn (Column $c) => $c->isSearchable());
        if ($search && !empty($searchableCols)) {
            $query->where(function (Builder $q) use ($search, $searchableCols) {
                foreach ($searchableCols as $col) {
                    $q->orWhere($col->getKey(), 'like', "%{$search}%");
                }
            });
        }

        // Apply Filters
        $filterList = $this->filters();
        if (is_array($filterList)) {
            foreach ($filterList as $filter) {
                if ($filter instanceof Filter) {
                    $val = request()->input($filter->getKey());
                    $filter->apply($query, $val);
                }
            }
        }

        // Apply Sorting
        $sortCol = request()->input('sort');
        $sortDir = strtolower(request()->input('direction', 'desc')) === 'asc' ? 'asc' : 'desc';
        if ($sortCol) {
            $query->orderBy($sortCol, $sortDir);
        } else {
            $query->latest();
        }

        if ($this->pagination) {
            return $query->paginate($this->perPage)->withQueryString();
        }

        return $query->get()->all();
    }

    public function render(): string
    {
        $rows = $this->getRows();
        $columns = $this->resolveColumnObjects();
        $filterList = $this->filters();
        $filters = is_array($filterList) ? $filterList : [];
        $bulkActions = $this->bulkActions();

        $html = '';

        if ($this->card) {
            $html .= '<div class="card border shadow-sm rounded-4 overflow-hidden mb-4">';
            $html .= '<div class="card-header bg-white border-bottom p-3 d-flex flex-wrap align-items-center justify-content-between gap-3">';
            $html .= '<div class="d-flex align-items-center gap-2">';
            if ($this->icon) {
                $html .= '<i class="fa ' . $this->icon . ' text-primary fs-5"></i>';
            }
            $html .= '<h5 class="m-0 fw-bold">' . htmlspecialchars($this->title) . '</h5>';
            if ($this->showRecordCountBadge && $rows instanceof LengthAwarePaginator) {
                $html .= '<span class="badge bg-light text-muted border">' . persian_digits($rows->total()) . ' مورد</span>';
            }
            $html .= '</div>';

            $html .= '<div class="d-flex flex-wrap align-items-center gap-2">';
            if ($this->searchable) {
                $searchVal = htmlspecialchars((string) request()->input($this->searchField, ''));
                $html .= '<form method="GET" class="d-flex align-items-center position-relative">';
                $html .= '<input type="text" name="' . htmlspecialchars($this->searchField) . '" value="' . $searchVal . '" class="form-control form-control-sm pe-4 rounded-3" placeholder="' . htmlspecialchars($this->searchPlaceholder) . '" style="min-width: 220px;" data-core-table-search>';
                $html .= '<i class="fa fa-search position-absolute end-0 me-2 text-muted" style="pointer-events: none;"></i>';
                $html .= '</form>';
            }

            if (!empty($filters)) {
                $html .= '<form method="GET" class="d-flex flex-wrap align-items-center gap-2">';
                foreach ($filters as $filter) {
                    if ($filter instanceof Filter) {
                        $html .= $filter->render(request()->input($filter->getKey()));
                    }
                }
                $html .= '</form>';
            }
            $html .= '</div>';
            $html .= '</div>';
        }

        if (!empty($bulkActions)) {
            $html .= '<div class="bg-primary-subtle border-bottom px-3 py-2 d-none align-items-center justify-content-between" data-core-bulk-bar>';
            $html .= '<div class="d-flex align-items-center gap-2">';
            $html .= '<span class="badge bg-primary rounded-pill" data-core-selected-count>0</span>';
            $html .= '<span class="small fw-bold">مورد انتخاب شده است</span>';
            $html .= '</div>';
            $html .= '<div class="d-flex align-items-center gap-2">';
            foreach ($bulkActions as $ba) {
                $html .= '<button type="button" class="btn btn-sm btn-' . $ba->variant . ' border" data-core-bulk-action="' . $ba->getName() . '">';
                $html .= $ba->getLabel();
                $html .= '</button>';
            }
            $html .= '</div>';
            $html .= '</div>';
        }

        $html .= '<div class="table-responsive">';
        $tableClass = 'table align-middle mb-0';
        if ($this->striped) $tableClass .= ' table-striped';
        if ($this->hover) $tableClass .= ' table-hover';
        if ($this->bordered) $tableClass .= ' table-bordered';

        $html .= '<table class="' . $tableClass . '">';
        $html .= '<thead class="table-light border-bottom"><tr>';

        if (!empty($bulkActions)) {
            $html .= '<th style="width: 40px;" class="text-center"><input type="checkbox" class="form-check-input" data-core-check-all></th>';
        }

        foreach ($columns as $column) {
            $alignClass = match ($column->getAlign()) {
                'center' => 'text-center',
                'left' => 'text-start',
                default => 'text-end',
            };
            $widthStyle = $column->getWidth() ? 'style="width:' . $column->getWidth() . ';"' : '';

            $html .= '<th class="' . $alignClass . '" ' . $widthStyle . '>';
            if ($column->isSortable()) {
                $currentSort = request()->input('sort');
                $currentDir = request()->input('direction', 'desc');
                $nextDir = ($currentSort === $column->getKey() && $currentDir === 'desc') ? 'asc' : 'desc';
                $url = request()->fullUrlWithQuery(['sort' => $column->getKey(), 'direction' => $nextDir]);

                $icon = 'fa-sort text-muted';
                if ($currentSort === $column->getKey()) {
                    $icon = $currentDir === 'asc' ? 'fa-sort-up text-primary' : 'fa-sort-down text-primary';
                }

                $html .= '<a href="' . $url . '" class="text-decoration-none text-dark d-inline-flex align-items-center gap-1">';
                $html .= htmlspecialchars($column->getLabel());
                $html .= '<i class="fa ' . $icon . '"></i>';
                $html .= '</a>';
            } else {
                $html .= htmlspecialchars($column->getLabel());
            }
            $html .= '</th>';
        }

        $html .= '</tr></thead><tbody>';

        // Top pinned rows
        foreach ($this->pinnedRows['top'] as $pRow) {
            $html .= '<tr class="x-table-pinned-row table-secondary fw-bold">';
            if (!empty($bulkActions)) $html .= '<td></td>';
            foreach ($columns as $column) {
                $html .= '<td>' . $column->renderCell($pRow) . '</td>';
            }
            $html .= '</tr>';
        }

        $records = ($rows instanceof LengthAwarePaginator) ? $rows->items() : $rows;

        if (empty($records)) {
            $colSpan = count($columns) + (!empty($bulkActions) ? 1 : 0);
            $html .= '<tr><td colspan="' . $colSpan . '" class="text-center py-5 text-muted">';
            if ($this->emptyIcon) {
                $html .= '<i class="fa ' . $this->emptyIcon . ' fs-1 mb-2 d-block opacity-50"></i>';
            }
            $html .= '<span>' . htmlspecialchars($this->emptyMessage) . '</span></td></tr>';
        } else {
            foreach ($records as $row) {
                $rowId = data_get($row, 'id');
                $html .= '<tr data-row-id="' . htmlspecialchars((string) $rowId) . '">';
                if (!empty($bulkActions)) {
                    $html .= '<td class="text-center"><input type="checkbox" class="form-check-input" value="' . htmlspecialchars((string) $rowId) . '" data-core-row-check></td>';
                }
                foreach ($columns as $column) {
                    $alignClass = match ($column->getAlign()) {
                        'center' => 'text-center',
                        'left' => 'text-start',
                        default => 'text-end',
                    };
                    $html .= '<td class="' . $alignClass . '">' . $column->renderCell($row) . '</td>';
                }
                $html .= '</tr>';
            }
        }

        // Bottom pinned rows
        foreach ($this->pinnedRows['bottom'] as $pRow) {
            $html .= '<tr class="x-table-pinned-row table-secondary fw-bold">';
            if (!empty($bulkActions)) $html .= '<td></td>';
            foreach ($columns as $column) {
                $html .= '<td>' . $column->renderCell($pRow) . '</td>';
            }
            $html .= '</tr>';
        }

        $html .= '</tbody></table></div>';

        if ($rows instanceof LengthAwarePaginator && $rows->hasPages()) {
            $html .= '<div class="card-footer bg-white border-top p-3 d-flex flex-wrap align-items-center justify-content-between gap-3">';
            if ($this->showingRecords) {
                $html .= '<small class="text-muted">نمایش ' . persian_digits($rows->firstItem()) . ' تا ' . persian_digits($rows->lastItem()) . ' از ' . persian_digits($rows->total()) . ' مورد</small>';
            }
            $html .= '<div class="pagination-wrapper">' . $rows->links('pagination::bootstrap-5') . '</div>';
            $html .= '</div>';
        }

        if ($this->card) {
            $html .= '</div>';
        }

        return $html;
    }

    public function __toString(): string
    {
        return $this->render();
    }
}