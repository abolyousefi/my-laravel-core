<?php

namespace MyLaravelCore\Tables\Columns;

class ToggleColumn extends Column
{
    protected ?string $endpoint = null;

    public function endpoint(string $endpoint): static
    {
        $this->endpoint = $endpoint;
        return $this;
    }

    public function renderCell(mixed $row): string
    {
        $checked = (bool) $this->getValue($row);
        $id = data_get($row, 'id');
        $field = $this->key;

        $checkedAttr = $checked ? 'checked' : '';
        $endpointAttr = $this->endpoint ? ' data-core-toggle-url="' . htmlspecialchars($this->endpoint) . '"' : '';

        return '<div class="form-check form-switch d-inline-block m-0">
            <input class="form-check-input" type="checkbox" role="switch" data-core-toggle-field="' . htmlspecialchars($field) . '" data-core-toggle-id="' . htmlspecialchars((string)$id) . '"' . $endpointAttr . ' ' . $checkedAttr . '>
        </div>';
    }
}
