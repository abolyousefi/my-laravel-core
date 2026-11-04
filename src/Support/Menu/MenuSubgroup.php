<?php

namespace MyLaravelCore\Support\Menu;

class MenuSubgroup extends MenuGroup
{
    protected ?string $parent = null;

    public static function make(): self
    {
        return new self();
    }

    public function parent(string $parent): self
    {
        $this->parent = $parent;
        return $this;
    }

    public function getParent(): ?string
    {
        return $this->parent;
    }
}