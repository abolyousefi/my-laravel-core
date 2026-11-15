<?php

namespace MyLaravelCore\Support\BladeLayout;

class NavbarSubtitleManager
{
    protected mixed $subtitle = null;

    public function set(mixed $subtitle): self
    {
        $this->subtitle = $subtitle;
        return $this;
    }

    public function get(): ?string
    {
        if ($this->subtitle === null) {
            return null;
        }
        return is_callable($this->subtitle) ? (string) ($this->subtitle)() : (string) $this->subtitle;
    }
}