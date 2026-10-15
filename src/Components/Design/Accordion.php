<?php

namespace MyLaravelCore\Components\Design;

use Illuminate\Contracts\View\View;
use MyLaravelCore\Components\BaseComponent;

class Accordion extends BaseComponent
{
    public function __construct(
        public string $type = 'single', // single, multiple
        public ?int $activeIndex = null,
        ?string $id = null,
        ?string $class = null
    ) {
        parent::__construct($id, $class);
        $this->id = $this->resolveId('acc');
    }

    public function render(): View
    {
        return view('core::components.design.accordion');
    }
}
