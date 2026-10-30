<?php

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for Textarea.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class Textarea extends \MyLaravelCore\Components\Form\BaseFormComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = null,
        public int $rows = 4,
        public ?int $maxlength = null,
        public bool $showCounter = true,
        public bool $autoResize = false,
        public ?string $placeholder = null,
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

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}
