<?php

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for CheckboxGroup.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class CheckboxGroup extends \MyLaravelCore\Components\Form\BaseFormComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        public array $options = [],
        mixed $value = [],
        public int $columns = 2,
        public string $direction = 'rtl',
        public bool $selectAll = true,
        public ?int $min = null,
        public ?int $max = null,
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
