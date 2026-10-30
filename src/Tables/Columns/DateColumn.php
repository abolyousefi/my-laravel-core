<?php

namespace MyLaravelCore\Tables\Columns;

class DateColumn extends Column
{
    protected bool $jalali = true;
    protected string $format = 'Y/m/d H:i';
    protected bool $timeAgo = false;

    public function jalali(bool $jalali = true): static
    {
        $this->jalali = $jalali;
        return $this;
    }

    public function format(string|\Closure $format): static
    {
        if ($format instanceof \Closure) {
            return parent::format($format);
        }
        $this->format = $format;
        return $this;
    }

    public function dateFormat(string $format): static
    {
        $this->format = $format;
        return $this;
    }

    public function timeAgo(bool $timeAgo = true): static
    {
        $this->timeAgo = $timeAgo;
        return $this;
    }

    public function renderCell(mixed $row): string
    {
        $val = $this->getValue($row);
        if (!$val) {
            return '<span class="text-muted">—</span>';
        }

        if ($this->timeAgo && function_exists('jdate_ago')) {
            $ago = jdate_ago($val);
            $exact = function_exists('jdate_format') ? jdate_format($val, $this->format) : (string) $val;
            return '<span title="' . htmlspecialchars($exact) . '">' . htmlspecialchars($ago) . '</span>';
        }

        if ($this->jalali && function_exists('jdate_format')) {
            return '<span dir="ltr">' . htmlspecialchars(jdate_format($val, $this->format)) . '</span>';
        }

        return htmlspecialchars((string) $val);
    }
}
