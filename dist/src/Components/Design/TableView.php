<?php

namespace MyLaravelCore\Components\Design;

use Illuminate\Contracts\View\View;
use MyLaravelCore\Components\BaseComponent;
use MyLaravelCore\Tables\BaseTable;

class TableView extends BaseComponent
{
    public function __construct(
        public ?BaseTable $table = null,
        ?string $id = null,
        ?string $class = null
    ) {
        parent::__construct($id, $class);
    }

    public function render(): View|string
    {
        if ($this->table) {
            return $this->table->render();
        }

        return view('core::components.design.table-view');
    }
}
