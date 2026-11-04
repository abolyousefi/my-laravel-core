<?php

namespace MyLaravelCore\Support\Generators\Audit;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class AuditManager
{
    protected ?BaseAudit $audit = null;
    protected int $page = 1;
    protected bool $compact = false;

    public function config(BaseAudit|string $audit): self
    {
        $instance = new self();
        $instance->audit = is_string($audit) ? new $audit() : $audit;
        return $instance;
    }

    public function forEntity(Model $entity): self
    {
        $this->audit?->setEntity($entity);
        return $this;
    }

    public function page(int $page): self
    {
        $this->page = $page;
        return $this;
    }

    public function compactFields(bool $compact = true): self
    {
        $this->compact = $compact;
        return $this;
    }

    public function get(): Collection
    {
        return $this->audit ? $this->audit->getLogs() : collect();
    }

    public function count(): int
    {
        return $this->audit ? $this->audit->getLogsCount() : 0;
    }
}