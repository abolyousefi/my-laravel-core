<div class="core-field mb-3 {{ $class }}" data-component="datetime-range-picker" data-calendar="{{ $calendar }}" data-mode="{{ $mode }}">
    @if($label)
        <label class="form-label d-flex align-items-center justify-content-between">
            <span>
                {{ $label }}
                @if($required)
                    <span class="text-danger ms-1" title="اجباری">*</span>
                @endif
            </span>
        </label>
    @endif

    <div class="input-group">
        <span class="input-group-text"><i class="fa fa-calendar-week"></i></span>
        <input
            type="text"
            name="{{ $resolvedStartName }}"
            id="{{ $elementId }}_start"
            value="{{ $resolvedStartValue }}"
            placeholder="از تاریخ"
            dir="{{ $dir }}"
            class="form-control text-center range-start-input {{ $resolvedError ? 'is-invalid' : '' }}"
            data-format="{{ $format }}"
            data-output-format="{{ $outputFormat }}"
            @if($required) required @endif
            @if($disabled) disabled @endif
        >
        <span class="input-group-text bg-light border-start-0 border-end-0">تا</span>
        <input
            type="text"
            name="{{ $resolvedEndName }}"
            id="{{ $elementId }}_end"
            value="{{ $resolvedEndValue }}"
            placeholder="تا تاریخ"
            dir="{{ $dir }}"
            class="form-control text-center range-end-input {{ $resolvedError ? 'is-invalid' : '' }}"
            data-format="{{ $format }}"
            data-output-format="{{ $outputFormat }}"
            @if($required) required @endif
            @if($disabled) disabled @endif
        >
        @if($presets)
            <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                بازه سریع
            </button>
            <ul class="dropdown-menu dropdown-menu-end core-range-presets">
                <li><button class="dropdown-item" type="button" data-preset="today">امروز</button></li>
                <li><button class="dropdown-item" type="button" data-preset="yesterday">دیروز</button></li>
                <li><button class="dropdown-item" type="button" data-preset="last7">۷ روز گذشته</button></li>
                <li><button class="dropdown-item" type="button" data-preset="last30">۳۰ روز گذشته</button></li>
                <li><hr class="dropdown-divider"></li>
                <li><button class="dropdown-item" type="button" data-preset="thisMonth">این ماه</button></li>
                <li><button class="dropdown-item" type="button" data-preset="thisYear">امسال</button></li>
            </ul>
        @endif
    </div>

    @if($resolvedError)
        <div class="invalid-feedback d-block">{{ $resolvedError }}</div>
    @endif

    @if($hint && !$resolvedError)
        <div class="form-text text-muted">{{ $hint }}</div>
    @endif
</div>
