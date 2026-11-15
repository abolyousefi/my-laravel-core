<?php

namespace MyLaravelCore\Support\Generators\Audit;

use Closure;

class AuditField
{
    protected string $name;
    protected string $label = '';
    protected ?Closure $transformer = null;

    public function __construct(string $name)
    {
        $this->name = $name;
        $this->label = $name;
    }

    public static function make(string $name): self
    {
        return new self($name);
    }

    public function label(string $label): self
    {
        $this->label = $label;
        return $this;
    }

    public function transform(Closure $transformer): self
    {
        $this->transformer = $transformer;
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

    public function formatValue(mixed $value, mixed $log = null): string
    {
        if ($this->transformer) {
            return (string) ($this->transformer)($value, $log);
        }

        if ($value === null) {
            return '-';
        }
        if (is_bool($value)) {
            return $value ? 'بله' : 'خیر';
        }
        if (is_array($value) || is_object($value)) {
            return json_encode($value, JSON_UNESCAPED_UNICODE) ?: '-';
        }

        return (string) $value;
    }
}