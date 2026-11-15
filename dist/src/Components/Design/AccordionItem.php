<?php

namespace MyLaravelCore\Components\Design;

use Illuminate\Contracts\View\View;
use MyLaravelCore\Components\BaseComponent;

class AccordionItem extends BaseComponent
{
    public function __construct(
        public string $title,
        public ?string $icon = null,
        public bool $expanded = false,
        ?string $id = null,
        ?string $class = null
    ) {
        parent::__construct($id, $class);
        $this->id = $this->resolveId('acc_item');
    }

    public function render(): View
    {
        return view('core::components.design.accordion-item');
    }
}
