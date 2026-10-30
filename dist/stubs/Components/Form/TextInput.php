<?php

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for TextInput.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class TextInput extends \MyLaravelCore\Components\Form\BaseFormComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = null,
        public string $type = 'text',
        public ?string $placeholder = null,
        bool $required = false,
        bool $disabled = false,
        bool $readonly = false,
        ?string $hint = null,
        public ?string $icon = null,
        public string $iconPosition = 'right',
        public string $size = 'md',
        public ?int $maxlength = null,
        public ?int $minlength = null,
        public ?string $pattern = null,
        public ?string $autocomplete = null,
        string $dir = 'auto',
        public ?string $addon = null,
        public string $addonPosition = 'left',
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
