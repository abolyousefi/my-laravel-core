<?php

namespace MyLaravelCore\Tables\Filters;

class SelectFilter extends Filter
{
    /**
     * @var array<string, string>
     */
    protected array $options = [];

    public function options(array $options): static
    {
        $this->options = $options;
        return $this;
    }

    public function render(mixed $currentValue = null): string
    {
        $html = '<select name="' . htmlspecialchars($this->key) . '" class="form-select form-select-sm" onchange="this.form.submit()">';
        $html .= '<option value="">' . htmlspecialchars($this->label) . ' (همه)</option>';

        foreach ($this->options as $val => $text) {
            $selected = ((string)$currentValue === (string)$val) ? 'selected' : '';
            $html .= '<option value="' . htmlspecialchars((string)$val) . '" ' . $selected . '>' . htmlspecialchars($text) . '</option>';
        }

        $html .= '</select>';
        return $html;
    }
}
