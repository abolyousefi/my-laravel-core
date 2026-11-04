<?php

namespace MyLaravelCore\Support\DeleteDependency\Services;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use MyLaravelCore\Enums\DestroyType;

class DestroyService
{
    protected ?string $modelClass = null;
    protected mixed $targets = [];
    protected DestroyType $destroyType = DestroyType::ATOMIC;
    protected array $errors = [];
    protected int $deletedCount = 0;

    public function __construct(?string $modelClass = null)
    {
        $this->modelClass = $modelClass;
    }

    public function model(string $modelClass): self
    {
        $this->modelClass = $modelClass;
        return $this;
    }

    public function target(mixed $targets): self
    {
        $this->targets = $targets;
        return $this;
    }

    public function atomic(): self
    {
        $this->destroyType = DestroyType::ATOMIC;
        return $this;
    }

    public function partial(): self
    {
        $this->destroyType = DestroyType::PARTIAL;
        return $this;
    }

    public function type(DestroyType $type): self
    {
        $this->destroyType = $type;
        return $this;
    }

    public function execute(): self
    {
        $this->errors = [];
        $this->deletedCount = 0;

        $records = $this->resolveTargets();

        if ($this->destroyType === DestroyType::ATOMIC) {
            DB::beginTransaction();
            try {
                foreach ($records as $record) {
                    $msg = method_exists($record, 'getDeleteErrorMessage')
                        ? $record->getDeleteErrorMessage()
                        : null;

                    if ($msg !== null) {
                        $this->errors[$record->getKey()] = $msg;
                        DB::rollBack();
                        $this->deletedCount = 0;
                        return $this;
                    }

                    $record->delete();
                    $this->deletedCount++;
                }
                DB::commit();
            } catch (\Throwable $e) {
                DB::rollBack();
                $this->errors[] = $e->getMessage();
            }

            return $this;
        }

        // PARTIAL mode
        foreach ($records as $record) {
            $msg = method_exists($record, 'getDeleteErrorMessage')
                ? $record->getDeleteErrorMessage()
                : null;

            if ($msg !== null) {
                $this->errors[$record->getKey()] = $msg;
                continue;
            }

            $record->delete();
            $this->deletedCount++;
        }

        return $this;
    }

    public function hasError(): bool
    {
        return !empty($this->errors);
    }

    public function getErrors(): array
    {
        return $this->errors;
    }

    public function getMessage(): ?string
    {
        if (empty($this->errors)) {
            return null;
        }

        return implode(' | ', array_values($this->errors));
    }

    public function getDeletedCount(): int
    {
        return $this->deletedCount;
    }

    /**
     * @return Collection<int, Model>
     */
    protected function resolveTargets(): Collection
    {
        if ($this->targets instanceof Model) {
            return collect([$this->targets]);
        }

        if ($this->targets instanceof Collection) {
            if ($this->targets->first() instanceof Model) {
                return $this->targets;
            }
            $ids = $this->targets->all();
        } elseif (is_array($this->targets)) {
            if (($this->targets[0] ?? null) instanceof Model) {
                return collect($this->targets);
            }
            $ids = $this->targets;
        } else {
            $ids = [$this->targets];
        }

        if ($this->modelClass && class_exists($this->modelClass)) {
            return $this->modelClass::query()->whereIn((new $this->modelClass())->getKeyName(), $ids)->get();
        }

        return collect();
    }
}
