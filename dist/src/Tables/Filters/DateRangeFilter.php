<?php

namespace MyLaravelCore\Tables\Filters;

use Illuminate\Database\Eloquent\Builder;

class DateRangeFilter extends Filter
{
    public function apply(Builder $query, mixed $value): void
    {
        $from = request()->input($this->key . '_from');
        $to = request()->input($this->key . '_to');

        if ($from) {
            $fromGregorian = function_exists('to_gregorian') ? to_gregorian($from) : $from;
            $query->whereDate($this->key, '>=', $fromGregorian);
        }

        if ($to) {
            $toGregorian = function_exists('to_gregorian') ? to_gregorian($to) : $to;
            $query->whereDate($this->key, '<=', $toGregorian);
        }
    }

    public function render(mixed $currentValue = null): string
    {
        $from = htmlspecialchars((string) request()->input($this->key . '_from', ''));
        $to = htmlspecialchars((string) request()->input($this->key . '_to', ''));

        return '<div class="d-flex align-items-center gap-1">
            <input type="text" name="' . htmlspecialchars($this->key . '_from') . '" value="' . $from . '" class="form-control form-control-sm" placeholder="از تاریخ..." data-core-datepicker>
            <span class="text-muted small">تا</span>
            <input type="text" name="' . htmlspecialchars($this->key . '_to') . '" value="' . $to . '" class="form-control form-control-sm" placeholder="تا تاریخ..." data-core-datepicker>
        </div>';
    }
}
