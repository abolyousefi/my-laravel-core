<?php

namespace MyLaravelCore\Events;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class WorkflowTransitioned
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public readonly Model $model,
        public readonly string $workflow,
        public readonly string|int|null $fromStatus,
        public readonly string|int $toStatus,
        public readonly mixed $actor = null,
        public readonly ?string $note = null,
    ) {
    }
}
