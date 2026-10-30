<?php

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for BaseFormComponent.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
abstract class BaseFormComponent extends \MyLaravelCore\Components\BaseComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = null,
        bool $required = false,
        bool $disabled = false,
        bool $readonly = false,
        ?string $hint = null,
        string $dir = 'auto',
        ?string $id = null,
        ?string $class = null,
        ?string $error = null
    ) {
        // Protected implementation
    }

}
