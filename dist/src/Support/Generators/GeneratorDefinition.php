<?php

namespace MyLaravelCore\Support\Generators;

class GeneratorDefinition
{
    protected mixed $item = null;
    protected ?string $key = null;
    protected ?string $afterKey = null;
    protected ?string $beforeKey = null;
    protected bool $isRemove = false;

    public static function make(mixed $item): self
    {
        $def = new self();
        $def->item = $item;
        return $def;
    }

    public static function remove(string $key): self
    {
        $def = new self();
        $def->key = $key;
        $def->isRemove = true;
        return $def;
    }

    public function key(string $key): self
    {
        $this->key = $key;
        return $this;
    }

    public function after(string $key): self
    {
        $this->afterKey = $key;
        return $this;
    }

    public function before(string $key): self
    {
        $this->beforeKey = $key;
        return $this;
    }

    public function getItem(): mixed
    {
        return $this->item;
    }

    public function getKey(): ?string
    {
        return $this->key;
    }

    public function getAfterKey(): ?string
    {
        return $this->afterKey;
    }

    public function getBeforeKey(): ?string
    {
        return $this->beforeKey;
    }

    public function isRemoved(): bool
    {
        return $this->isRemove;
    }
}