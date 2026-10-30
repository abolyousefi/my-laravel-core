<?php

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for TagCollector.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class TagCollector extends \MyLaravelCore\Components\Form\BaseFormComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        public array $tags = [],
        public string $keyLabel = 'کلید',
        public string $valueLabel = 'مقدار',
        public array $suggestions = [],
        public bool $allowCustom = true,
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
