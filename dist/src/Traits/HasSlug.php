<?php

namespace MyLaravelCore\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

trait HasSlug
{
    /**
     * Boot the trait.
     */
    protected static function bootHasSlug(): void
    {
        static::creating(function (Model $model) {
            $slugSource = $model->getSlugSourceColumn();
            $slugColumn = $model->getSlugColumnName();

            if (empty($model->{$slugColumn}) && !empty($model->{$slugSource})) {
                $model->{$slugColumn} = $model->generateUniqueSlug($model->{$slugSource});
            }
        });
    }

    /**
     * Source attribute to generate slug from (default: 'title' or 'name').
     */
    public function getSlugSourceColumn(): string
    {
        if (property_exists($this, 'slugSource')) {
            return $this->slugSource;
        }

        return isset($this->attributes['title']) ? 'title' : 'name';
    }

    /**
     * Target column to store slug in (default: 'slug').
     */
    public function getSlugColumnName(): string
    {
        return property_exists($this, 'slugColumn') ? $this->slugColumn : 'slug';
    }

    /**
     * Generate unique slug by checking database.
     */
    public function generateUniqueSlug(string $value): string
    {
        $slug = slugify_fa($value);
        $originalSlug = $slug;
        $count = 1;

        $slugColumn = $this->getSlugColumnName();
        $keyName = $this->getKeyName();

        while (static::where($slugColumn, $slug)
            ->when($this->exists, fn ($q) => $q->where($keyName, '!=', $this->getKey()))
            ->exists()) {
            $count++;
            $slug = "{$originalSlug}-{$count}";
        }

        return $slug;
    }

    /**
     * Scope query by slug.
     */
    public function scopeWhereSlug(Builder $query, string $slug): Builder
    {
        return $query->where($this->getSlugColumnName(), $slug);
    }

    /**
     * Find model by slug.
     */
    public static function findBySlug(string $slug): ?static
    {
        return static::where((new static)->getSlugColumnName(), $slug)->first();
    }
}
