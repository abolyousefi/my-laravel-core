<?php

namespace MyLaravelCore\Tables\Columns;

class CurrencyColumn extends Column
{
    protected string $unit = 'تومان'; // toman, rial
    protected bool $showWords = false;

    public function toman(): static
    {
        $this->unit = 'تومان';
        return $this;
    }

    public function rial(): static
    {
        $this->unit = 'ریال';
        return $this;
    }

    public function showWords(bool $show = true): static
    {
        $this->showWords = $show;
        return $this;
    }

    public function renderCell(mixed $row): string
    {
        $val = $this->getValue($row);
        if ($val === null || $val === '') {
            return '<span class="text-muted">—</span>';
        }

        $formatted = number_format((float) $val);
        $html = '<span class="fw-bold">' . persian_digits($formatted) . '</span> <small class="text-muted">' . $this->unit . '</small>';

        if ($this->showWords && function_exists('number_to_words_fa')) {
            $words = number_to_words_fa((float) $val) . ' ' . $this->unit;
            $html .= '<div class="small text-muted" style="font-size: 0.75rem;">' . htmlspecialchars($words) . '</div>';
        }

        return $html;
    }
}
