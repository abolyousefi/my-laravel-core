<?php

namespace MyLaravelCore\Tables;

use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Request;
use MyLaravelCore\Tables\Actions\TableAction;
use MyLaravelCore\Tables\Columns\Column;
use MyLaravelCore\Tables\Filters\Filter;

abstract class BaseTable
{
    /**
     * Associated Eloquent model class.
     *
     * @var class-string<Model>|null
     */
    protected ?string $model = null;

    protected ?Builder $builder = null;
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
    protected string $emptyMessage = 'هیچ رکوردی برای نمایش یافت نشد.';
    protected string $emptyIcon = 'fa-folder-open';

    public function __construct(?Builder $builder = null)
    {
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

    /**
     * Define table columns.
     *
     * @return array<Column>
     */
    abstract public function columns(): array;

    /**
     * Define table filters.
     *
     * @return array<Filter>
     */
    public function filters(): array
    {
        return [];
    }

    /**
     * Define row actions.
     *
     * @return array<TableAction>
     */
    public function actions(): array
    {
        return [];
    }

    /**
     * Define bulk actions.
     *
     * @return array<TableAction>
     */
    public function bulkActions(): array
    {
        return [];
    }

    public function query(Builder $builder): static
    {
        $this->builder = $builder;
        return $this;
    }

    public function title(string $title): static
    {
        $this->title = $title;
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

    /**
     * Execute query with search, filters, sort, and pagination.
     */
    public function getRows(): LengthAwarePaginator|array
    {
        $query = $this->builder ? clone $this->builder : null;
        if (!$query && $this->model && class_exists($this->model)) {
            $query = $this->model::query();
        }

        if (!$query) {
            return [];
        }

        // Apply Search across searchable columns
        $search = request()->input($this->searchField);
        $searchableCols = array_filter($this->columns(), fn(Column $c) => $c->isSearchable());
        if ($search && !empty($searchableCols)) {
            $query->where(function (Builder $q) use ($search, $searchableCols) {
                foreach ($searchableCols as $col) {
                    $q->orWhere($col->getKey(), 'like', "%{$search}%");
                }
            });
        }

        // Apply Filters
        foreach ($this->filters() as $filter) {
            $val = request()->input($filter->getKey());
            $filter->apply($query, $val);
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

    /**
     * Render the table HTML.
     */
    public function render(): string
    {
        $rows = $this->getRows();
        $columns = $this->columns();
        $filters = $this->filters();
        $bulkActions = $this->bulkActions();

        $html = '';

        if ($this->card) {
            $html .= '<div class="card border shadow-sm rounded-4 overflow-hidden mb-4">';
            // Header
            $html .= '<div class="card-header bg-white border-bottom p-3 d-flex flex-wrap align-items-center justify-content-between gap-3">';
            $html .= '<div class="d-flex align-items-center gap-2">';
            if ($this->icon) {
                $html .= '<i class="fa ' . $this->icon . ' text-primary fs-5"></i>';
            }
            $html .= '<h5 class="m-0 fw-bold">' . htmlspecialchars($this->title) . '</h5>';
            if ($rows instanceof LengthAwarePaginator) {
                $html .= '<span class="badge bg-light text-muted border">' . persian_digits($rows->total()) . ' مورد</span>';
            }
            $html .= '</div>';

            // Top Toolbar: Search & Filters
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
                    $html .= $filter->render(request()->input($filter->getKey()));
                }
                $html .= '</form>';
            }
            $html .= '</div>';
            $html .= '</div>'; // card-header
        }

        // Bulk action bar (hidden until checkboxes checked)
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

        // Table container
        $html .= '<div class="table-responsive">';
        $tableClass = 'table align-middle mb-0';
        if ($this->striped) $tableClass .= ' table-striped';
        if ($this->hover) $tableClass .= ' table-hover';
        if ($this->bordered) $tableClass .= ' table-bordered';

        $html .= '<table class="' . $tableClass . '">';
        $html .= '<thead class="table-light border-bottom">';
        $html .= '<tr>';

        if (!empty($bulkActions)) {
            $html .= '<th style="width: 40px;" class="text-center">';
            $html .= '<input type="checkbox" class="form-check-input" data-core-check-all>';
            $html .= '</th>';
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

        $html .= '</tr>';
        $html .= '</thead>';
        $html .= '<tbody>';

        $records = ($rows instanceof LengthAwarePaginator) ? $rows->items() : $rows;

        if (empty($records)) {
            $colSpan = count($columns) + (!empty($bulkActions) ? 1 : 0);
            $html .= '<tr>';
            $html .= '<td colspan="' . $colSpan . '" class="text-center py-5 text-muted">';
            if ($this->emptyIcon) {
                $html .= '<i class="fa ' . $this->emptyIcon . ' fs-1 mb-2 d-block opacity-50"></i>';
            }
            $html .= '<span>' . htmlspecialchars($this->emptyMessage) . '</span>';
            $html .= '</td>';
            $html .= '</tr>';
        } else {
            foreach ($records as $row) {
                $rowId = data_get($row, 'id');
                $html .= '<tr data-row-id="' . htmlspecialchars((string)$rowId) . '">';

                if (!empty($bulkActions)) {
                    $html .= '<td class="text-center">';
                    $html .= '<input type="checkbox" class="form-check-input" value="' . htmlspecialchars((string)$rowId) . '" data-core-row-check>';
                    $html .= '</td>';
                }

                foreach ($columns as $column) {
                    $alignClass = match ($column->getAlign()) {
                        'center' => 'text-center',
                        'left' => 'text-start',
                        default => 'text-end',
                    };
                    $html .= '<td class="' . $alignClass . '">';
                    $html .= $column->renderCell($row);
                    $html .= '</td>';
                }

                $html .= '</tr>';
            }
        }

        $html .= '</tbody>';
        $html .= '</table>';
        $html .= '</div>'; // table-responsive

        // Footer / Pagination
        if ($rows instanceof LengthAwarePaginator && $rows->hasPages()) {
            $html .= '<div class="card-footer bg-white border-top p-3 d-flex flex-wrap align-items-center justify-content-between gap-3">';
            $html .= '<small class="text-muted">نمایش ' . persian_digits($rows->firstItem()) . ' تا ' . persian_digits($rows->lastItem()) . ' از ' . persian_digits($rows->total()) . ' مورد</small>';
            $html .= '<div class="pagination-wrapper">' . $rows->links('pagination::bootstrap-5') . '</div>';
            $html .= '</div>';
        }

        if ($this->card) {
            $html .= '</div>'; // card
        }

        return $html;
    }

    public function __toString(): string
    {
        return $this->render();
    }
}
