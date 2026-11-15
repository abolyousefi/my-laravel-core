<?php

namespace MyLaravelCore\Components\Design;

use MyLaravelCore\Components\BaseComponent;

class TableColumn extends BaseComponent
{
    public string $elementId;
    public string $name;
    public string $label;
    public bool $sortable;
    public ?string $sortDirection;
    public string $align;
    public ?string $width;
    public bool $hidden;
    public ?string $pinned;

    public function __construct(
        string $name = '',
        string $label = '',
        bool $sortable = false,
        ?string $sortDirection = null,
        string $align = 'right',
        ?string $width = null,
        bool $hidden = false,
        ?string $pinned = null,
        ?string $id = null,
        ?string $class = null,
        ?string $error = null,
        ?string $permission = null
    ) {
        parent::__construct($id, $class, $error, $permission);
        $this->name = $name;
        $this->label = $label;
        $this->sortable = $sortable;
        $this->sortDirection = $sortDirection;
        $this->align = $align;
        $this->width = $width;
        $this->hidden = $hidden;
        $this->pinned = $pinned;
        $this->elementId = $this->resolveId('table-column');
    }

    public function render()
    {
        return view('core::components.design.table-column');
    }
}