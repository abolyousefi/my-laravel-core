<?php

namespace MyLaravelCore\Tables\Columns;

class TextColumn extends Column
{
    protected ?int $limit = null;
    protected bool $copyable = false;
    protected bool $badge = false;
    protected string $badgeVariant = 'secondary';
    protected bool $bold = false;

    public function limit(int $limit): static
    {
        $this->limit = $limit;
        return $this;
    }

    public function copyable(bool $copyable = true): static
    {
        $this->copyable = $copyable;
        return $this;
    }

    public function badge(string $variant = 'secondary'): static
    {
        $this->badge = true;
        $this->badgeVariant = $variant;
        return $this;
    }

    public function bold(bool $bold = true): static
    {
        $this->bold = $bold;
        return $this;
    }

    public function renderCell(mixed $row): string
    {
        $val = (string) $this->getValue($row);

        if ($this->limit && mb_strlen($val) > $this->limit) {
            $val = mb_substr($val, 0, $this->limit) . '...';
        }

        $html = htmlspecialchars($val);

        if ($this->bold) {
            $html = '<strong>' . $html . '</strong>';
        }

        if ($this->badge) {
            $html = '<span class="badge bg-' . $this->badgeVariant . '">' . $html . '</span>';
        }

        if ($this->copyable) {
            $html .= ' <button type="button" class="btn btn-sm btn-link p-0 text-muted ms-1" data-core-copy="' . htmlspecialchars((string)$this->getValue($row)) . '" title="کپی"><i class="fa fa-copy"></i></button>';
        }

        $sub = $this->getSubtitle($row);
        if ($sub) {
            $html .= '<div class="small text-muted mt-1">' . htmlspecialchars($sub) . '</div>';
        }

        return $html;
    }
}
