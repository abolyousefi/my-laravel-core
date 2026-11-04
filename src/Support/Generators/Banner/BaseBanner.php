<?php

namespace MyLaravelCore\Support\Generators\Banner;

use MyLaravelCore\Facades\BladeLayout;

abstract class BaseBanner
{
    public function items(): array
    {
        return [];
    }

    public function configure(): void
    {
    }

    protected function extensionDefinitions(): array
    {
        return [];
    }

    public function __get(string $name): mixed
    {
        return BladeLayout::data($name);
    }

    public function render(): string
    {
        $this->configure();
        $html = '<div class="card x-banner-generator mb-3"><div class="card-body d-flex flex-wrap gap-4 align-items-center">';
        foreach ($this->items() as $item) {
            if (!$item instanceof Banner) {
                continue;
            }
            $iconHtml = $item->getIcon() ? '<i class="' . e($item->getIcon()) . ' text-primary me-2"></i>' : '';
            $html .= sprintf(
                '<div class="d-flex align-items-center">%s<span class="text-muted me-1">%s:</span><span class="fw-bold">%s</span></div>',
                $iconHtml,
                e($item->getLabel()),
                (string) $item->getValue()
            );
        }
        $html .= '</div></div>';
        return $html;
    }
}