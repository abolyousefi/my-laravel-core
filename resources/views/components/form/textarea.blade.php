<div class="core-field mb-3 {{ $class }}">
    @if($label)
        <div class="d-flex align-items-center justify-content-between mb-1">
            <label for="{{ $elementId }}" class="form-label mb-0">
                {{ $label }}
                @if($required)
                    <span class="text-danger ms-1" title="اجباری">*</span>
                @endif
            </label>

            @if($showCounter && $maxlength)
                <span class="badge bg-light text-muted border counter-badge" id="{{ $elementId }}_counter">
                    <span class="current-count">{{ mb_strlen((string) $value, 'UTF-8') }}</span> / {{ $maxlength }}
                </span>
            @endif
        </div>
    @endif

    <textarea
        name="{{ $name }}"
        id="{{ $elementId }}"
        rows="{{ $rows }}"
        dir="{{ $dir }}"
        @if($placeholder) placeholder="{{ $placeholder }}" @endif
        @if($required) required @endif
        @if($disabled) disabled @endif
        @if($readonly) readonly @endif
        @if($maxlength) maxlength="{{ $maxlength }}" @endif
        {{ $attributes->merge(['class' => 'form-control' . ($resolvedError ? ' is-invalid' : '')]) }}
        data-component="textarea"
        @if($autoResize) data-auto-resize="true" @endif
    >{{ $value }}</textarea>

    @if($resolvedError)
        <div class="invalid-feedback d-block">{{ $resolvedError }}</div>
    @endif

    @if($hint && !$resolvedError)
        <div class="form-text text-muted">{{ $hint }}</div>
    @endif
</div>
