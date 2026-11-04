<?php

namespace MyLaravelCore\Support\DataProvider;

use BackedEnum;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Schema;
use UnitEnum;

class DataProvider
{
    protected mixed $source = null;
    protected ?bool $activeFilter = null; // null = auto (true if is_active column exists), true = onlyActives, false = withoutActives, ignored via $ignoreActive
    protected bool $ignoreActive = false;
    protected mixed $onlyStatusValue = null;
    protected mixed $withoutStatusValue = null;
    protected bool $shouldSort = false;
    protected bool $shouldLatest = false;
    protected array $additionalIdsOrObjects = [];
    protected ?string $moduleName = null;
    protected string $labelColumn = 'name';
    protected string $valueColumn = 'id';
    protected bool $encryptValue = false;

    /**
     * Set data source (Model class string, Eloquent Builder, Collection, array, or Enum class string).
     */
    public function source(mixed $source): self
    {
        $instance = new self();
        $instance->source = $source;
        return $instance;
    }

    public function onlyActives(): self
    {
        $this->activeFilter = true;
        $this->ignoreActive = false;
        return $this;
    }

    public function ignoreActiveFilter(): self
    {
        $this->ignoreActive = true;
        $this->activeFilter = null;
        return $this;
    }

    public function withoutActives(): self
    {
        $this->activeFilter = false;
        $this->ignoreActive = false;
        return $this;
    }

    public function onlyStatus(mixed $status): self
    {
        $this->onlyStatusValue = $status instanceof BackedEnum ? $status->value : $status;
        return $this;
    }

    public function withoutStatus(mixed $status): self
    {
        $this->withoutStatusValue = $status instanceof BackedEnum ? $status->value : $status;
        return $this;
    }

    public function sort(): self
    {
        $this->shouldSort = true;
        return $this;
    }

    public function latest(): self
    {
        $this->shouldLatest = true;
        return $this;
    }

    public function available(): self
    {
        return $this->onlyActives()->sort();
    }

    public function add(mixed $objectOrIdOrIds): self
    {
        if (is_array($objectOrIdOrIds) || $objectOrIdOrIds instanceof Collection) {
            foreach ($objectOrIdOrIds as $item) {
                $this->additionalIdsOrObjects[] = $item;
            }
        } elseif ($objectOrIdOrIds !== null) {
            $this->additionalIdsOrObjects[] = $objectOrIdOrIds;
        }

        return $this;
    }

    public function moduleName(?string $moduleName): self
    {
        $this->moduleName = $moduleName;
        return $this;
    }

    public function label(string $column): self
    {
        $this->labelColumn = $column;
        return $this;
    }

    public function value(string $column): self
    {
        $this->valueColumn = $column;
        return $this;
    }

    public function shouldEncryptValue(bool $encrypt = true): self
    {
        $this->encryptValue = $encrypt;
        return $this;
    }

    /**
     * Retrieve final collection/array of items.
     */
    public function get(): Collection
    {
        if (is_string($this->source) && enum_exists($this->source)) {
            return collect($this->source::cases());
        }

        if ($this->source instanceof Collection) {
            return $this->source;
        }

        if (is_array($this->source)) {
            return collect($this->source);
        }

        $query = $this->resolveQuery();
        if (!$query) {
            return collect();
        }

        $model = $query->getModel();
        $table = $model->getTable();

        // Apply active filter
        if (!$this->ignoreActive) {
            $hasActiveCol = in_array('is_active', $model->getFillable(), true)
                || $this->safeHasColumn($table, 'is_active');

            if ($hasActiveCol) {
                $filterState = $this->activeFilter ?? true; // default true when is_active exists
                $query->where($model->qualifyColumn('is_active'), $filterState ? 1 : 0);
            }
        }

        if ($this->onlyStatusValue !== null) {
            $query->where($model->qualifyColumn('status'), $this->onlyStatusValue);
        }

        if ($this->withoutStatusValue !== null) {
            $query->where($model->qualifyColumn('status'), '!=', $this->withoutStatusValue);
        }

        if ($this->shouldSort) {
            $sortCol = $this->resolveSortColumn($model, $table);
            if ($sortCol) {
                $query->orderBy($model->qualifyColumn($sortCol), 'asc');
            }
        }

        if ($this->shouldLatest) {
            $query->latest($model->qualifyColumn('created_at'));
        }

        $results = $query->get();

        // Merge additional objects or IDs (e.g. inactive currently-selected record in edit form)
        if (!empty($this->additionalIdsOrObjects)) {
            $idsToFetch = [];
            $extraModels = [];

            foreach ($this->additionalIdsOrObjects as $extra) {
                if ($extra instanceof Model) {
                    $extraModels[] = $extra;
                } elseif (is_scalar($extra)) {
                    $idsToFetch[] = $extra;
                }
            }

            if (!empty($idsToFetch)) {
                $fetched = $model->newQuery()->whereIn($model->getKeyName(), $idsToFetch)->get();
                foreach ($fetched as $f) {
                    $extraModels[] = $f;
                }
            }

            foreach ($extraModels as $extraModel) {
                if (!$results->contains($model->getKeyName(), $extraModel->getKey())) {
                    $results->push($extraModel);
                }
            }
        }

        return $results;
    }

    /**
     * Format data for x-select-input component.
     *
     * @return array<int, array<string, mixed>>
     */
    public function formatSelectOptions(): array
    {
        if (is_string($this->source) && enum_exists($this->source)) {
            if (method_exists($this->source, 'selectComponentItems')) {
                return $this->source::selectComponentItems($this->moduleName, $this->encryptValue);
            }
        }

        return $this->get()->map(function ($item) {
            if ($item instanceof UnitEnum) {
                $rawVal = $item instanceof BackedEnum ? $item->value : $item->name;
                $label = method_exists($item, 'label') ? $item->label($this->moduleName) : $item->name;
                $val = ($this->encryptValue && function_exists('encryptStaticValue'))
                    ? encryptStaticValue($rawVal)
                    : $rawVal;

                return [
                    'name' => $label,
                    'label' => $label,
                    'id' => $val,
                    'value' => $val,
                    'selected' => false,
                    'is_active' => true,
                ];
            }

            $rawVal = data_get($item, $this->valueColumn);
            $label = data_get($item, $this->labelColumn)
                ?? data_get($item, 'title')
                ?? (string) $rawVal;
            $val = ($this->encryptValue && function_exists('encryptStaticValue'))
                ? encryptStaticValue($rawVal)
                : $rawVal;

            return [
                'name' => $label,
                'label' => $label,
                'id' => $val,
                'value' => $val,
                'selected' => false,
                'is_active' => (bool) (data_get($item, 'is_active', true)),
            ];
        })->values()->all();
    }

    /**
     * Format data for x-checkbox-group and x-radio-group components.
     *
     * @return array<int, array{label: string, value: mixed}>
     */
    public function formatComponentOptions(): array
    {
        if (is_string($this->source) && enum_exists($this->source)) {
            if (method_exists($this->source, 'componentOptions')) {
                return $this->source::componentOptions($this->moduleName);
            }
        }

        return $this->get()->map(function ($item) {
            if ($item instanceof UnitEnum) {
                $rawVal = $item instanceof BackedEnum ? $item->value : $item->name;
                $label = method_exists($item, 'label') ? $item->label($this->moduleName) : $item->name;
                return [
                    'label' => $label,
                    'value' => ($this->encryptValue && function_exists('encryptStaticValue'))
                        ? encryptStaticValue($rawVal)
                        : $rawVal,
                ];
            }

            $rawVal = data_get($item, $this->valueColumn);
            $label = data_get($item, $this->labelColumn)
                ?? data_get($item, 'title')
                ?? (string) $rawVal;

            return [
                'label' => (string) $label,
                'value' => ($this->encryptValue && function_exists('encryptStaticValue'))
                    ? encryptStaticValue($rawVal)
                    : $rawVal,
            ];
        })->values()->all();
    }

    protected function resolveQuery(): ?Builder
    {
        if ($this->source instanceof Builder) {
            return clone $this->source;
        }

        if (is_string($this->source) && class_exists($this->source) && is_subclass_of($this->source, Model::class)) {
            return $this->source::query();
        }

        if ($this->source instanceof Model) {
            return $this->source->newQuery();
        }

        return null;
    }

    protected function resolveSortColumn(Model $model, string $table): ?string
    {
        $fillable = $model->getFillable();
        foreach (['sort', 'name', 'title'] as $candidate) {
            if (in_array($candidate, $fillable, true) || $this->safeHasColumn($table, $candidate)) {
                return $candidate;
            }
        }

        return null;
    }

    protected function safeHasColumn(string $table, string $column): bool
    {
        try {
            return Schema::hasColumn($table, $column);
        } catch (\Throwable) {
            return false;
        }
    }
}
