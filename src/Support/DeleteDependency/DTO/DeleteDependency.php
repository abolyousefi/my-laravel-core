<?php

namespace MyLaravelCore\Support\DeleteDependency\DTO;

use Closure;

class DeleteDependency
{
    public const TYPE_RELATION = 'relation';
    public const TYPE_CONDITION = 'condition';

    protected string $type;
    protected ?string $relationName = null;
    protected Closure|bool|null $conditionRule = null;
    protected string $labelKey = '';

    protected function __construct(string $type)
    {
        $this->type = $type;
    }

    public static function relation(string $relationName): self
    {
        $dto = new self(self::TYPE_RELATION);
        $dto->relationName = $relationName;
        return $dto;
    }

    public static function condition(Closure|bool $condition): self
    {
        $dto = new self(self::TYPE_CONDITION);
        $dto->conditionRule = $condition;
        return $dto;
    }

    public function label(string $labelKey): self
    {
        $this->labelKey = $labelKey;
        return $this;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function getRelationName(): ?string
    {
        return $this->relationName;
    }

    public function getConditionRule(): Closure|bool|null
    {
        return $this->conditionRule;
    }

    public function getLabel(): string
    {
        return __($this->labelKey);
    }

    public function getRawLabel(): string
    {
        return $this->labelKey;
    }
}
