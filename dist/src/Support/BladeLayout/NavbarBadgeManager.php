<?php

namespace MyLaravelCore\Support\BladeLayout;

class NavbarBadgeManager
{
    protected array $badges = [];

    public function addMany(array $badges): self
    {
        foreach ($badges as $b) {
            $this->badges[] = $b;
        }
        return $this;
    }

    public function add(string $id, mixed $label, ?string $tooltip = null): self
    {
        $this->badges[$id] = [
            'id' => $id,
            'label' => $label,
            'tooltip' => $tooltip,
        ];
        return $this;
    }

    public function all(): array
    {
        return $this->badges;
    }
}