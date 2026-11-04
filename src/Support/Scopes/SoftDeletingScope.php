<?php

namespace MyLaravelCore\Support\Scopes;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;
use MyLaravelCore\Enums\IsDeleted;

class SoftDeletingScope implements Scope
{
    /**
     * All of the extensions to be added to the builder.
     *
     * @var array<int, string>
     */
    protected array $extensions = ['Restore', 'WithTrashed', 'WithoutTrashed', 'OnlyTrashed'];

    /**
     * Apply the scope to a given Eloquent query builder.
     */
    public function apply(Builder $builder, Model $model): void
    {
        $column = $this->getIsDeletedColumn($builder);
        $builder->where($column, IsDeleted::NO->value);
    }

    /**
     * Extend the query builder with the needed functions.
     */
    public function extend(Builder $builder): void
    {
        foreach ($this->extensions as $extension) {
            $this->{"add{$extension}"}($builder);
        }
    }

    protected function getIsDeletedColumn(Builder $builder): string
    {
        $model = $builder->getModel();
        if (method_exists($model, 'getQualifiedIsDeletedColumn')) {
            return $model->getQualifiedIsDeletedColumn();
        }

        return $model->qualifyColumn('is_deleted');
    }

    protected function addRestore(Builder $builder): void
    {
        $builder->macro('restore', function (Builder $builder) {
            $builder->withTrashed();

            return $builder->update([
                'is_deleted' => IsDeleted::NO->value,
                'deleted_at' => null,
            ]);
        });
    }

    protected function addWithTrashed(Builder $builder): void
    {
        $builder->macro('withTrashed', function (Builder $builder, bool $withTrashed = true) {
            if (!$withTrashed) {
                return $builder->withoutTrashed();
            }

            return $builder->withoutGlobalScope($this);
        });
    }

    protected function addWithoutTrashed(Builder $builder): void
    {
        $builder->macro('withoutTrashed', function (Builder $builder) {
            $column = $this->getIsDeletedColumn($builder);

            $builder->withoutGlobalScope($this)->where($column, IsDeleted::NO->value);

            return $builder;
        });
    }

    protected function addOnlyTrashed(Builder $builder): void
    {
        $builder->macro('onlyTrashed', function (Builder $builder) {
            $column = $this->getIsDeletedColumn($builder);

            $builder->withoutGlobalScope($this)->where($column, IsDeleted::YES->value);

            return $builder;
        });
    }
}
