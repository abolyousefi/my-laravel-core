<?php

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for IconPicker.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class IconPicker extends \MyLaravelCore\Components\Form\BaseFormComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = null,
        public string $iconSet = 'fontawesome',
        public bool $searchable = true,
        public bool $categories = true,
        public bool $preview = true,
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
