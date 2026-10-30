<?php

namespace MyLaravelCore\Tables\Filters;

use Illuminate\Database\Eloquent\Builder;

class TrashedFilter extends Filter
{
    public function __construct()
    {
        parent::__construct('trashed', 'آیتم‌های حذف‌شده');
    }

    public function apply(Builder $query, mixed $value): void
    {
        if ($value === 'with') {
            $query->withTrashed();
        } elseif ($value === 'only') {
            $query->onlyTrashed();
        }
    }

    public function render(mixed $currentValue = null): string
    {
        $val = (string) request()->input('trashed', '');

        return '<select name="trashed" class="form-select form-select-sm" onchange="this.form.submit()">
            <option value="">بدون حذف‌شده‌ها</option>
            <option value="with" ' . ($val === 'with' ? 'selected' : '') . '>همراه با حذف‌شده‌ها</option>
            <option value="only" ' . ($val === 'only' ? 'selected' : '') . '>فقط حذف‌شده‌ها</option>
        </select>';
    }
}
