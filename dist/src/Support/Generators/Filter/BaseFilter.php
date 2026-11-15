<?php

namespace MyLaravelCore\Support\Generators\Filter;

use MyLaravelCore\Facades\BladeLayout;

abstract class BaseFilter
{
    protected static array $storedValues = [];

    abstract public function filters(): array;

    public function defaults(): array
    {
        return [];
    }

    public static function values(): array
    {
        $instance = new static();
        $key = static::class;
        return array_merge($instance->defaults(), self::$storedValues[$key] ?? [], request()->only(
            array_map(fn (Filter $f) => $f->getId(), $instance->filters())
        ));
    }

    public static function value(string $id): mixed
    {
        $vals = static::values();
        return $vals[$id] ?? null;
    }

    public function getCurrentValues(): array
    {
        return static::values();
    }

    public static function setValues(array $values): void
    {
        self::$storedValues[static::class] = array_merge(self::$storedValues[static::class] ?? [], $values);
    }

    public static function setValue(string $id, mixed $value): void
    {
        self::$storedValues[static::class][$id] = $value;
    }

    public function exists(): bool
    {
        return !empty($this->filters());
    }

    public function __get(string $name): mixed
    {
        return BladeLayout::data($name);
    }

    public function render(): string
    {
        return '';
    }
}