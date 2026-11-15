<?php

namespace MyLaravelCore\Components\Design;

use Illuminate\Contracts\View\View;
use MyLaravelCore\Components\BaseComponent;

class DataDisplay extends BaseComponent
{
    public function __construct(
        public int|string $cols = 3,
        public int|string|null $columns = null,
        public bool $bordered = false,
        public bool $alignValues = true,
        public ?string $title = null,
        ?string $id = null,
        ?string $class = null,
        ?string $permission = null
    ) {
        parent::__construct($id, $class, null, $permission);
        if ($columns !== null) {
            $this->cols = $columns;
        }
    }

    public function render(): View
    {
        return view('core::components.design.data-display');
    }
}