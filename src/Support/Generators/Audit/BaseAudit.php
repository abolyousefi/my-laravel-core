<?php

namespace MyLaravelCore\Support\Generators\Audit;

use Closure;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

abstract class BaseAudit
{
    protected string $title = 'لاگ تغییرات';
    protected string $userIdentifierField = 'national_code';
    protected string $userIdentifierLabel = 'کد ملی';
    protected ?string $userIdentifierMask = null;
    protected array $resources = [];
    protected int $perPage = 20;
    protected ?Closure $userRouteResolver = null;
    protected ?Model $entity = null;
    protected ?string $entityType = null;
    protected int|string|null $entityId = null;
    protected ?Closure $queryScope = null;
    public array $with = ['userable'];

    abstract public function fields(): array;

    public function setTitle(string $title): self
    {
        $this->title = $title;
        return $this;
    }

    public function setUserIdentifierField(string $field, string $label, ?string $mask = null): self
    {
        $this->userIdentifierField = $field;
        $this->userIdentifierLabel = $label;
        $this->userIdentifierMask = $mask;
        return $this;
    }

    public function setResource(array $resources): self
    {
        $this->resources = $resources;
        return $this;
    }

    public function setPerPage(int $perPage): self
    {
        $this->perPage = $perPage;
        return $this;
    }

    public function setUserRoute(Closure $resolver): self
    {
        $this->userRouteResolver = $resolver;
        return $this;
    }

    public function setEntity(Model $entity): self
    {
        $this->entity = $entity;
        $this->entityType = get_class($entity);
        $this->entityId = $entity->getKey();
        return $this;
    }

    public function setEntityIdentity(string $entityType, int|string $entityId): self
    {
        $this->entityType = $entityType;
        $this->entityId = $entityId;
        return $this;
    }

    public function setQueryScope(Closure $scope): self
    {
        $this->queryScope = $scope;
        return $this;
    }

    public function getLogs(): Collection
    {
        return collect();
    }

    public function getLogsCount(): int
    {
        return $this->getLogs()->count();
    }

    public function render(): string
    {
        return '<div class="card x-audit-generator"><div class="card-header fw-bold">' . e($this->title) . '</div><div class="card-body"></div></div>';
    }
}