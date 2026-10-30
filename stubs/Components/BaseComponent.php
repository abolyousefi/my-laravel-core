<?php

namespace MyLaravelCore\Components;

/**
 * Stub definition for BaseComponent.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
abstract class BaseComponent extends \Illuminate\View\Component
{
    /**
     * Constructor signature.
     */
    public function __construct(
        ?string $id = null,
        ?string $class = null,
        ?string $error = null
    ) {
        // Protected implementation
    }

    /**
     * resolveId signature.
     */
    public function resolveId(?string $name = null): string {
        // Protected implementation
    }

    /**
     * resolveError signature.
     */
    public function resolveError(?string $name = null): ?string {
        // Protected implementation
    }

}
