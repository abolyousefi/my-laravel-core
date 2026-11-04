<?php

namespace MyLaravelCore\Support\DeleteDependency\DTO;

class DeletableState
{
    public function __construct(
        protected bool $allowed,
        protected ?string $message = null
    ) {
    }

    public function canDelete(): bool
    {
        return $this->allowed;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function toArray(): array
    {
        return [
            'can_delete' => $this->allowed,
            'message' => $this->message,
        ];
    }
}
