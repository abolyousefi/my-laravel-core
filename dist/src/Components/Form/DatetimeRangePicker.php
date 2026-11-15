<?php

namespace MyLaravelCore\Components\Form;

use Illuminate\Contracts\View\View;

class DatetimeRangePicker extends BaseFormComponent
{
    public string $resolvedStartName;
    public string $resolvedEndName;
    public mixed $resolvedStartValue;
    public mixed $resolvedEndValue;

    public function __construct(
        string $name,
        ?string $label = null,
        public ?string $startName = null,
        public ?string $endName = null,
        public mixed $startValue = null,
        public mixed $endValue = null,
        public string $mode = 'date',
        public string $calendar = 'jalali',
        public string $format = 'YYYY/MM/DD',
        public string $outputFormat = 'YYYY-MM-DD',
        public bool|array $presets = true,
        bool $required = false,
        bool $disabled = false,
        ?string $hint = null,
        string $dir = 'ltr',
        ?string $id = null,
        ?string $class = null,
        ?string $error = null
    ) {
        parent::__construct(
            name: $name,
            label: $label,
            value: null,
            required: $required,
            disabled: $disabled,
            hint: $hint,
            dir: $dir,
            id: $id,
            class: $class,
            error: $error
        );

        $this->resolvedStartName = $startName ?: "{$name}_start";
        $this->resolvedEndName = $endName ?: "{$name}_end";

        $this->resolvedStartValue = old($this->resolvedStartName, $startValue);
        $this->resolvedEndValue = old($this->resolvedEndName, $endValue);
    }

    public function render(): View
    {
        return view('core::components.form.datetime-range-picker');
    }
}
