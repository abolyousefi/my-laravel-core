<?php

namespace MyLaravelCore\Tables\Columns;

class BadgeColumn extends Column
{
    /**
     * @var array<string, array{label?: string, variant?: string, icon?: string}>
     */
    protected array $map = [];
    protected string $defaultVariant = 'secondary';

    /**
     * Map value to label and variant.
     * e.g. ['active' => ['label' => 'فعال', 'variant' => 'success'], 'pending' => ['label' => 'در انتظار', 'variant' => 'warning']]
     */
    public function map(array $map): static
    {
        $this->map = $map;
        return $this;
    }

    public function defaultVariant(string $variant): static
    {
        $this->defaultVariant = $variant;
        return $this;
    }

    public function renderCell(mixed $row): string
    {
        $val = (string) $this->getValue($row);
        $config = $this->map[$val] ?? null;

        $label = $val;
        $variant = $this->defaultVariant;
        $icon = null;

        if (is_array($config)) {
            $label = $config['label'] ?? $val;
            $variant = $config['variant'] ?? $this->defaultVariant;
            $icon = $config['icon'] ?? null;
        } elseif (is_string($config)) {
            $variant = $config;
        }

        $iconHtml = $icon ? '<i class="fa ' . $icon . ' me-1"></i>' : '';
        return '<span class="badge bg-' . $variant . '">' . $iconHtml . htmlspecialchars($label) . '</span>';
    }
}
