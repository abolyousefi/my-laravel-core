<?php

namespace MyLaravelCore\Components\Design;

use MyLaravelCore\Components\BaseComponent;

class DataList extends BaseComponent
{
    public string $elementId;
    public array $items;
    public ?string $title;
    public int $columns;
    public bool $bordered;
    public bool $striped;

    public function __construct(
        array $items = [],
        ?string $title = null,
        int $columns = 2,
        bool $bordered = true,
        bool $striped = false,
        ?string $id = null,
        ?string $class = null,
        ?string $error = null,
        ?string $permission = null
    ) {
        parent::__construct($id, $class, $error, $permission);
        $this->items = $items;
        $this->title = $title;
        $this->columns = $columns;
        $this->bordered = $bordered;
        $this->striped = $striped;
        $this->elementId = $this->resolveId('data-list');
    }

    public function render()
    {
        return view('core::components.design.data-list');
    }
}