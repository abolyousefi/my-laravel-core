<?php

namespace MyLaravelCore\Traits;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;

trait Auditable
{
    /**
     * Boot the trait.
     */
    protected static function bootAuditable(): void
    {
        static::creating(function (Model $model) {
            $userId = Auth::id();
            if ($userId && empty($model->created_by)) {
                $model->created_by = $userId;
            }
            if ($userId && empty($model->updated_by)) {
                $model->updated_by = $userId;
            }
        });

        static::updating(function (Model $model) {
            $userId = Auth::id();
            if ($userId) {
                $model->updated_by = $userId;
            }
        });

        if (method_exists(static::class, 'bootSoftDeletes')) {
            static::deleting(function (Model $model) {
                if (!method_exists($model, 'isForceDeleting') || !$model->isForceDeleting()) {
                    $userId = Auth::id();
                    if ($userId && array_key_exists('deleted_by', $model->getAttributes())) {
                        $model->deleted_by = $userId;
                        $model->saveQuietly();
                    }
                }
            });
        }
    }

    /**
     * User model class name configured in core config.
     */
    public function getAuditUserModel(): string
    {
        return config('core.audit.user_model', 'App\\Models\\User');
    }

    /**
     * Creator relationship.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo($this->getAuditUserModel(), 'created_by');
    }

    /**
     * Updater relationship.
     */
    public function updater(): BelongsTo
    {
        return $this->belongsTo($this->getAuditUserModel(), 'updated_by');
    }

    /**
     * Deleter relationship.
     */
    public function deleter(): BelongsTo
    {
        return $this->belongsTo($this->getAuditUserModel(), 'deleted_by');
    }
}
