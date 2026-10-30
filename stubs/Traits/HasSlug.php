<?php

namespace MyLaravelCore\Traits;

/**
 * Stub definition for HasSlug.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
trait HasSlug
{
    /**
     * getSlugSourceColumn signature.
     */
    public function getSlugSourceColumn(): string {
        // Protected implementation
    }

    /**
     * getSlugColumnName signature.
     */
    public function getSlugColumnName(): string {
        // Protected implementation
    }

    /**
     * generateUniqueSlug signature.
     */
    public function generateUniqueSlug(string $value): string {
        // Protected implementation
    }

    /**
     * scopeWhereSlug signature.
     */
    public function scopeWhereSlug(Illuminate\Database\Eloquent\Builder $query, string $slug): Illuminate\Database\Eloquent\Builder {
        // Protected implementation
    }

    /**
     * findBySlug signature.
     */
    public static function findBySlug(string $slug): ?static {
        // Protected implementation
    }

}
