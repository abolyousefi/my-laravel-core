<?php

namespace MyLaravelCore\Support\Generators\Banner;

class Banner
{
    protected ?string $key = null;
    protected string $label = '';
    protected mixed $value = '';
    protected ?string $icon = null;

    public static function make(): self
    {
        return new self();
    }

    public function key(string $key): self
    {
        $this->key = $key;
        return $this;
    }

    public function label(string $label): self
    {
        $this->label = $label;
        return $this;
    }

    public function value(mixed $value): self
    {
        $this->value = $value;
        return $this;
    }

    public function icon(?string $icon): self
    {
        $this->icon = $icon;
        return $this;
    }

    public function getKey(): ?string
    {
        return $this->key;
    }

    public function getLabel(): string
    {
        return $this->label;
    }

    public function getValue(): mixed
    {
        return is_callable($this->value) ? ($this->value)() : $this->value;
    }

    public function getIcon(): ?string
    {
        return $this->icon;
    }
}