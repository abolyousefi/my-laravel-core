<?php

namespace MyLaravelCore\Tables\Columns;

use MyLaravelCore\Tables\Actions\TableAction;

class ActionColumn extends Column
{
    /**
     * @var array<TableAction>
     */
    protected array $actions = [];

    public function __construct(string $label = 'عملیات')
    {
        parent::__construct('actions', $label);
        $this->alignCenter();
    }

    /**
     * @param array<TableAction> $actions
     */
    public function actions(array $actions): static
    {
        $this->actions = $actions;
        return $this;
    }

    public function renderCell(mixed $row): string
    {
        $html = '<div class="d-flex align-items-center justify-content-center gap-1">';

        foreach ($this->actions as $action) {
            $html .= $action->render($row);
        }

        $html .= '</div>';
        return $html;
    }
}
