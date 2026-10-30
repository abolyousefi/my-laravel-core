<?php

namespace MyLaravelCore\Traits;

/**
 * Stub definition for HasUuid.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
trait HasUuid
{
    /**
     * initializeHasUuid signature.
     */
    public function initializeHasUuid(): void {
        // Protected implementation
    }

    /**
     * getUuidColumnName signature.
     */
    public function getUuidColumnName(): string {
        // Protected implementation
    }

    /**
     * scopeWhereUuid signature.
     */
    public function scopeWhereUuid(Illuminate\Database\Eloquent\Builder $query, string $uuid): Illuminate\Database\Eloquent\Builder {
        // Protected implementation
    }

    /**
     * findByUuid signature.
     */
    public static function findByUuid(string $uuid): ?static {
        // Protected implementation
    }

    /**
     * findByUuidOrFail signature.
     */
    public static function findByUuidOrFail(string $uuid): static {
        // Protected implementation
    }

}
