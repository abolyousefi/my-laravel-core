<div class="core-field mb-3 {{ $class }}">
    @if($label)
        <label for="{{ $elementId }}" class="form-label d-flex align-items-center justify-content-between">
            <span>
                {{ $label }}
                @if($required)
                    <span class="text-danger ms-1" title="اجباری">*</span>
                @endif
            </span>
        </label>
    @endif

    <div class="input-group core-datepicker-group">
        <span class="input-group-text cursor-pointer">
            <i class="fa {{ $mode === 'time' ? 'fa-clock' : 'fa-calendar-alt' }}"></i>
        </span>

        <input
            type="text"
            name="{{ $name }}"
            id="{{ $elementId }}"
            value="{{ $value }}"
            dir="{{ $dir }}"
            @if($placeholder) placeholder="{{ $placeholder }}" @endif
            @if($required) required @endif
            @if($disabled) disabled @endif
            @if($readonly) readonly @endif
            {{ $attributes->merge(['class' => 'form-control core-datetime-input' . ($resolvedError ? ' is-invalid' : '')]) }}
            data-component="datetime-picker"
            data-calendar="{{ $calendar }}"
            data-mode="{{ $mode }}"
            data-format="{{ $format }}"
            data-output-format="{{ $outputFormat }}"
            @if($minDate) data-min-date="{{ $minDate }}" @endif
            @if($maxDate) data-max-date="{{ $maxDate }}" @endif
            @if($disablePast) data-disable-past="true" @endif
            @if($disableFuture) data-disable-future="true" @endif
            @if($withTime) data-with-time="true" @endif
            data-time-step="{{ $timeStep }}"
        >

        @if($resolvedError)
            <div class="invalid-feedback d-block">{{ $resolvedError }}</div>
        @endif
    </div>

    @if($hint && !$resolvedError)
        <div class="form-text text-muted">{{ $hint }}</div>
    @endif
</div>
