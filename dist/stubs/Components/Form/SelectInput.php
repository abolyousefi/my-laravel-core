<?php

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for SelectInput.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class SelectInput extends \MyLaravelCore\Components\Form\BaseFormComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = null,
        public array $options = [],
        public bool $multiple = false,
        public bool $searchable = true,
        public string $placeholder = 'انتخاب کنید',
        public bool $clearable = true,
        public ?string $ajaxRoute = null,
        public ?string $parentField = null,
        public ?string $parentRoute = null,
        public bool $tags = false,
        public ?int $maxSelections = null,
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
