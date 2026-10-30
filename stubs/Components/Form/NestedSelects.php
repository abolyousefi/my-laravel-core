<?php

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for NestedSelects.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class NestedSelects extends \MyLaravelCore\Components\Form\BaseFormComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = null,
        public ?string $source = null,
        public ?string $routeName = null,
        public string $labelColumn = 'title',
        public string $parentColumn = 'parent_id',
        public string $placeholder = 'انتخاب کنید',
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
