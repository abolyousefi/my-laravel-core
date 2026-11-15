<?php

namespace MyLaravelCore\Tables\Columns;

class ImageColumn extends Column
{
    protected int $height = 40;
    protected ?int $imageWidth = null;
    protected string $rounded = 'rounded-3';
    protected ?string $defaultImage = null;

    public function size(int $size): static
    {
        $this->height = $size;
        $this->imageWidth = $size;
        return $this;
    }

    public function height(int $height): static
    {
        $this->height = $height;
        return $this;
    }

    public function imageWidth(int $width): static
    {
        $this->imageWidth = $width;
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

        $w = $this->imageWidth ?: $this->height;

        if (!$src) {
            return '<div class="bg-light border text-muted d-inline-flex align-items-center justify-content-center ' . $this->rounded . '" style="width:' . $w . 'px;height:' . $this->height . 'px;"><i class="fa fa-image"></i></div>';
        }

        $style = 'height:' . $this->height . 'px;width:' . $w . 'px;object-fit:cover;';

        return '<img src="' . htmlspecialchars((string) $src) . '" class="' . $this->rounded . ' border shadow-sm" style="' . $style . '" alt="تصویر" loading="lazy">';
    }
}
