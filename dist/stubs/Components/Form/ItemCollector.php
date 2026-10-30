<?php

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for ItemCollector.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class ItemCollector extends \MyLaravelCore\Components\Form\BaseFormComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        public array $items = [],
        public array $fields = [],
        public int $minItems = 0,
        public ?int $maxItems = null,
        public bool $sortable = true,
        public bool $removable = true,
        public string $addLabel = 'افزودن آیتم',
        public ?string $template = null,
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
