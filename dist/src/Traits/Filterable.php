<?php

namespace MyLaravelCore\Traits;

use Illuminate\Database\Eloquent\Builder;

trait Filterable
{
    /**
     * Scope to dynamically filter query based on parameters or request.
     *
     * @param Builder $query
     * @param array<string, mixed> $filters
     */
    public function scopeFilter(Builder $query, array $filters = []): Builder
    {
        if (empty($filters) && function_exists('request')) {
            $filters = request()->query();
        }

        // 1. General keyword search: ?search=keyword or ?q=keyword
        $keyword = $filters['search'] ?? $filters['q'] ?? null;
        if (!empty($keyword)) {
            $searchable = property_exists($this, 'searchable') ? $this->searchable : ['title', 'name'];
            $query->where(function (Builder $q) use ($searchable, $keyword) {
                foreach ($searchable as $index => $field) {
                    if (str_contains($field, '.')) {
                        [$relation, $relationField] = explode('.', $field, 2);
                        $method = $index === 0 ? 'whereHas' : 'orWhereHas';
                        $q->{$method}($relation, function ($relQ) use ($relationField, $keyword) {
                            $relQ->where($relationField, 'LIKE', "%{$keyword}%");
                        });
                    } else {
                        $method = $index === 0 ? 'where' : 'orWhere';
                        $q->{$method}($field, 'LIKE', "%{$keyword}%");
                    }
                }
            });
        }

        // 2. Exact match filters
        $filterable = property_exists($this, 'filterable') ? $this->filterable : [];
        foreach ($filterable as $field) {
            if (isset($filters[$field]) && $filters[$field] !== '') {
                $query->where($field, $filters[$field]);
            }
        }

        // 3. Date range filters: ?from_date=... & ?to_date=...
        $dateColumn = property_exists($this, 'dateFilterColumn') ? $this->dateFilterColumn : 'created_at';
        if (!empty($filters['from_date'])) {
            $from = to_gregorian($filters['from_date']);
            $query->whereDate($dateColumn, '>=', $from);
        }
        if (!empty($filters['to_date'])) {
            $to = to_gregorian($filters['to_date']);
            $query->whereDate($dateColumn, '<=', $to);
        }

        // 4. Sorting: ?sort_by=id&sort_order=desc
        $sortBy = $filters['sort_by'] ?? property_exists($this, 'defaultSortBy') ? $this->defaultSortBy : 'id';
        $sortOrder = strtolower($filters['sort_order'] ?? 'desc') === 'asc' ? 'asc' : 'desc';

        if (!empty($sortBy)) {
            $query->orderBy($sortBy, $sortOrder);
        }

        return $query;
    }
}
