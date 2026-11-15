<?php

namespace MyLaravelCore\Components\Form;

class ColorInput extends BaseFormComponent
{
    public array $presets;
    public string $format;

    public function __construct(
        string $name = 'field',
        ?string $label = null,
        mixed $value = null,
        bool $required = false,
        bool $disabled = false,
        bool $readonly = false,
        ?string $hint = null,
        string $dir = 'auto',
        ?string $id = null,
        ?string $class = null,
        ?string $error = null,
        ?string $permission = null,
        array $presets = [],
        string $format = 'hex'
    ) {
        parent::__construct($name, $label, $value, $required, $disabled, $readonly, $hint, $dir, $id, $class, $error, $permission);
        $this->presets = $presets;
        $this->format = $format;
        $this->presets = !empty($presets) ? $presets : (function_exists('presetColors') ? presetColors() : ['#0f766e', '#2563eb', '#16a34a', '#d97706', '#dc2626']);
    }

    public function render()
    {
        return view('core::components.form.color-input');
    }
}