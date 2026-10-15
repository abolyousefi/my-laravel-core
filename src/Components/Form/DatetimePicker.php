<?php

namespace MyLaravelCore\Components\Form;

use Illuminate\Contracts\View\View;

class DatetimePicker extends BaseFormComponent
{
    public function __construct(
        string $name,
        ?string $label = null,
        mixed $value = null,
        public string $mode = 'date', // date, datetime, time
        public string $calendar = 'jalali', // jalali, gregorian, hijri
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
        if ($withTime && $mode === 'date') {
            $this->mode = 'datetime';
            if ($format === 'YYYY/MM/DD') {
                $format = 'YYYY/MM/DD HH:mm';
            }
            if ($outputFormat === 'YYYY-MM-DD') {
                $outputFormat = 'YYYY-MM-DD HH:mm:ss';
            }
        }

        parent::__construct(
            name: $name,
            label: $label,
            value: $value,
            required: $required,
            disabled: $disabled,
            readonly: $readonly,
            hint: $hint,
            dir: $dir,
            id: $id,
            class: $class,
            error: $error
        );

        $this->format = $format;
        $this->outputFormat = $outputFormat;
    }

    public function render(): View
    {
        return view('core::components.form.datetime-picker');
    }
}
