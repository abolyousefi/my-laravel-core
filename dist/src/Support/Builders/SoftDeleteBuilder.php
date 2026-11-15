<?php

namespace MyLaravelCore\Support\Builders;

use Illuminate\Database\Eloquent\Builder;

class SoftDeleteBuilder extends Builder
{
    /**
     * Execute delete on each matching model individually so deleting/deleted/trashed events
     * and deleter column tracking run for every record.
     */
    public function delete(): mixed
    {
        if (isset($this->onDelete)) {
            return call_user_func($this->onDelete, $this);
        }

        $count = 0;
        foreach ($this->get() as $model) {
            if ($model->delete()) {
                $count++;
            }
        }

        return $count;
    }
}
