<?php

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for DatetimeRangePicker.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class DatetimeRangePicker extends \MyLaravelCore\Components\Form\BaseFormComponent
{
    /**
     * Constructor signature.
     */
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
        public array|bool $presets = true,
        bool $required = false,
        bool $disabled = false,
        ?string $hint = null,
        string $dir = 'ltr',
        ?string $id = null,
        ?string $class = null,
        ?string $error = null
    ) {
        // Protected implementation
    }

    /**
     * render signature.
     */
    public function render(): Illuminate\Contracts\View\View {
        // Protected implementation
    }

}
