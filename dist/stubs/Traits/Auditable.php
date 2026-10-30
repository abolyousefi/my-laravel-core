<?php

namespace MyLaravelCore\Traits;

/**
 * Stub definition for Auditable.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
trait Auditable
{
    /**
     * getAuditUserModel signature.
     */
    public function getAuditUserModel(): string {
        // Protected implementation
    }

    /**
     * creator signature.
     */
    public function creator(): Illuminate\Database\Eloquent\Relations\BelongsTo {
        // Protected implementation
    }

    /**
     * updater signature.
     */
    public function updater(): Illuminate\Database\Eloquent\Relations\BelongsTo {
        // Protected implementation
    }

    /**
     * deleter signature.
     */
    public function deleter(): Illuminate\Database\Eloquent\Relations\BelongsTo {
        // Protected implementation
    }

}
