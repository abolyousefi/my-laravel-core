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

    <div class="input-group core-icon-picker" data-component="icon-picker" data-set="{{ $iconSet }}">
        <span class="input-group-text icon-preview-box bg-white">
            <i class="fa {{ $value ?: 'fa-icons' }} {{ $value ? 'text-primary' : 'text-muted' }}"></i>
        </span>

        <input
            type="text"
            name="{{ $name }}"
            id="{{ $elementId }}"
            value="{{ $value }}"
            placeholder="انتخاب آیکون (مثال: fa-user)"
            dir="ltr"
            @if($required) required @endif
            @if($disabled) disabled @endif
            @if($readonly) readonly @endif
            {{ $attributes->merge(['class' => 'form-control icon-input' . ($resolvedError ? ' is-invalid' : '')]) }}
        >

        <button class="btn btn-outline-secondary btn-browse-icons" type="button">
            <i class="fa fa-search me-1"></i> انتخاب
        </button>
    </div>

    @if($resolvedError)
        <div class="invalid-feedback d-block">{{ $resolvedError }}</div>
    @endif

    @if($hint && !$resolvedError)
        <div class="form-text text-muted">{{ $hint }}</div>
    @endif
</div>
