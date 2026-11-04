<?php

namespace MyLaravelCore\Support\Geo;

class GeometryValidationResult
{
    /**
     * @param array<int, array{code: string, message: string, context: array<string, mixed>}> $errors
     */
    public function __construct(
        protected array $errors = []
    ) {
    }

    public static function pass(): self
    {
        return new self([]);
    }

    public static function fail(string $code, string $message, array $context = []): self
    {
        return new self([
            [
                'code' => $code,
                'message' => $message,
                'context' => $context,
            ],
        ]);
    }

    public function addError(string $code, string $message, array $context = []): self
    {
        $this->errors[] = [
            'code' => $code,
            'message' => $message,
            'context' => $context,
        ];
        return $this;
    }

    public function merge(self $other): self
    {
        foreach ($other->getErrors() as $err) {
            $this->errors[] = $err;
        }
        return $this;
    }

    public function isValid(): bool
    {
        return empty($this->errors);
    }

    public function getErrors(): array
    {
        return $this->errors;
    }

    public function toArray(): array
    {
        return [
            'valid' => $this->isValid(),
            'errors' => $this->errors,
        ];
    }
}