<?php

namespace MyLaravelCore\Tables\Actions;

use Closure;

class TableAction
{
    protected string $name;
    protected string $label;
    protected ?string $icon = null;
    protected string $variant = 'light';
    protected string|Closure|null $url = null;
    protected ?string $confirmMessage = null;
    protected ?string $modalTarget = null;
    protected ?Closure $visibleCallback = null;

    public function __construct(string $name, string $label)
    {
        $this->name = $name;
        $this->label = $label;
    }

    public static function make(string $name, string $label): static
    {
        return new static($name, $label);
    }

    public function icon(string $icon): static
    {
        $this->icon = $icon;
        return $this;
    }

    public function variant(string $variant): static
    {
        $this->variant = $variant;
        return $this;
    }

    public function url(string|Closure $url): static
    {
        $this->url = $url;
        return $this;
    }

    public function confirm(string $message = 'آیا از انجام این عملیات مطمئن هستید؟'): static
    {
        $this->confirmMessage = $message;
        return $this;
    }

    public function modal(string $modalTarget): static
    {
        $this->modalTarget = $modalTarget;
        return $this;
    }

    public function visible(Closure $callback): static
    {
        $this->visibleCallback = $callback;
        return $this;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getLabel(): string
    {
        return $this->label;
    }

    public function render(mixed $row): string
    {
        if ($this->visibleCallback && !($this->visibleCallback)($row)) {
            return '';
        }

        $href = '#';
        if ($this->url instanceof Closure) {
            $href = ($this->url)($row);
        } elseif (is_string($this->url)) {
            $href = $this->url;
        }

        $confirmAttr = $this->confirmMessage ? ' data-core-confirm="' . htmlspecialchars($this->confirmMessage) . '"' : '';
        $modalAttr = $this->modalTarget ? ' data-bs-toggle="modal" data-bs-target="' . htmlspecialchars($this->modalTarget) . '"' : '';
        $iconHtml = $this->icon ? '<i class="fa ' . $this->icon . '"></i>' : '';

        return '<a href="' . htmlspecialchars($href) . '" class="btn btn-sm btn-' . $this->variant . ' border px-2 py-1" title="' . htmlspecialchars($this->label) . '"' . $confirmAttr . $modalAttr . '>' . $iconHtml . ' <span class="d-none d-md-inline">' . htmlspecialchars($this->label) . '</span></a>';
    }
}
