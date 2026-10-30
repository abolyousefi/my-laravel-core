<?php

namespace MyLaravelCore\Components\Form;

/**
 * Stub definition for DatetimePicker.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class DatetimePicker extends \MyLaravelCore\Components\Form\BaseFormComponent
{
    /**
     * Constructor signature.
     */
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = null,
        public string $mode = 'date',
        public string $calendar = 'jalali',
        public string $format = 'YYYY/MM/DD',
        public string $outputFormat = 'YYYY-MM-DD',
        public ?string $minDate = null,
        public ?string $maxDate = null,
        public bool $disablePast = false,
        public bool $disableFuture = false,
        public bool $inline = false,
        public bool $withTime = false,
        public int $timeStep = 15,
        public ?string $placeholder = null,
        bool $required = false,
        bool $disabled = false,
        bool $readonly = false,
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
