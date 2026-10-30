<?php

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for Editor.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class Editor extends \MyLaravelCore\Components\Form\BaseFormComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = null,
        public int $height = 300,
        public array|string $toolbar = 'full',
        public string $direction = 'rtl',
        public ?string $placeholder = null,
        public ?string $uploadRoute = null,
        public ?int $maxLength = null,
        bool $required = false,
        bool $disabled = false,
        bool $readonly = false,
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
