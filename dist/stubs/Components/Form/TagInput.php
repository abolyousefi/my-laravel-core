<?php

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for TagInput.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class TagInput extends \MyLaravelCore\Components\Form\BaseFormComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = [],
        public array $suggestions = [],
        public ?int $maxTags = null,
        public bool $allowCustom = true,
        public string $separator = ',',
        bool $required = false,
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
