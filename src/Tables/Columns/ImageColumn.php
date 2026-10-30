<?php

namespace MyLaravelCore\Tables\Columns;

class ImageColumn extends Column
{
    protected int $height = 40;
    protected ?int $width = null;
    protected string $rounded = 'rounded-3'; // rounded-circle, rounded-3, rounded-pill
    protected ?string $defaultImage = null;

    public function height(int $height): static
    {
        $this->height = $height;
        return $this;
    }

    public function width(int $width): static
    {
        $this->width = $width;
        return $this;
    }

    public function rounded(string $rounded = 'rounded-3'): static
    {
        $this->rounded = str_starts_with($rounded, 'rounded') ? $rounded : 'rounded-' . $rounded;
        return $this;
    }

    public function circle(): static
    {
        return $this->rounded('rounded-circle');
    }

    public function default(string $url): static
    {
        $this->defaultImage = $url;
        return $this;
    }

    public function renderCell(mixed $row): string
    {
        $src = $this->getValue($row);
        if (!$src && $this->defaultImage) {
            $src = $this->defaultImage;
        }

        if (!$src) {
            return '<div class="bg-light border text-muted d-flex align-items-center justify-content-center ' . $this->rounded . '" style="width:' . $this->height . 'px;height:' . $this->height . 'px;"><i class="fa fa-image"></i></div>';
        }

        $style = 'height:' . $this->height . 'px;object-fit:cover;';
        if ($this->width) {
            $style .= 'width:' . $this->width . 'px;';
        } else {
            $style .= 'width:' . $this->height . 'px;';
        }

        return '<img src="' . htmlspecialchars($src) . '" class="' . $this->rounded . ' border shadow-sm" style="' . $style . '" alt="تصویر" loading="lazy">';
    }
}
