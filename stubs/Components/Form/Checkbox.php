<?php

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for Checkbox.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class Checkbox extends \MyLaravelCore\Components\Form\BaseFormComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = 1,
        public bool $checked = false,
        public string $size = 'md',
        public string $variant = 'primary',
        bool $disabled = false,
        ?string $hint = null,
        ?string $id = null,
        ?string $class = null,
        ?string $error = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}
