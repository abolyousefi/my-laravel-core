<?php

namespace MyLaravelCore\Traits;

/**
 * Stub definition for HasStatus.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
trait HasStatus
{
    /**
     * isActive signature.
     */
    public function isActive(): bool {
        // Protected implementation
    }

    /**
     * isStatus signature.
     */
    public function isStatus(mixed $status): bool {
        // Protected implementation
    }

    /**
     * getStatusValue signature.
     */
    public function getStatusValue(): mixed {
        // Protected implementation
    }

    /**
     * getStatusColumnName signature.
     */
    public function getStatusColumnName(): string {
        // Protected implementation
    }

    /**
     * activate signature.
     */
    public function activate(): bool {
        // Protected implementation
    }

    /**
     * deactivate signature.
     */
    public function deactivate(): bool {
        // Protected implementation
    }

    /**
     * toggleStatus signature.
     */
    public function toggleStatus(): bool {
        // Protected implementation
    }

    /**
     * scopeActive signature.
     */
    public function scopeActive(Illuminate\Database\Eloquent\Builder $query): Illuminate\Database\Eloquent\Builder {
        // Protected implementation
    }

    /**
     * scopeInactive signature.
     */
    public function scopeInactive(Illuminate\Database\Eloquent\Builder $query): Illuminate\Database\Eloquent\Builder {
        // Protected implementation
    }

    /**
     * scopeStatus signature.
     */
    public function scopeStatus(Illuminate\Database\Eloquent\Builder $query, mixed $status): Illuminate\Database\Eloquent\Builder {
        // Protected implementation
    }

}
