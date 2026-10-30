<?php

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for RadioGroup.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class RadioGroup extends \MyLaravelCore\Components\Form\BaseFormComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        public array $options = [],
        mixed $value = null,
        public int $columns = 1,
        public bool $inline = false,
        public string $variant = 'primary',
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
