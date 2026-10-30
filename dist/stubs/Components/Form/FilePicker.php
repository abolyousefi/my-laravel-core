<?php

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for FilePicker.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class FilePicker extends \MyLaravelCore\Components\Form\BaseFormComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = null,
        public string $accept = '*',
        public int $maxSize = 10240,
        public bool $multiple = false,
        public string $disk = 'public',
        public string $directory = 'uploads',
        public bool $preview = true,
        public bool $dropzone = true,
        public bool $sortable = false,
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
