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

    <div class="@if($icon || $addon) input-group @endif">
        @if($addon && $addonPosition === 'right')
            <span class="input-group-text">{{ $addon }}</span>
        @endif

        @if($icon && $iconPosition === 'right')
            <span class="input-group-text"><i class="fa {{ $icon }}"></i></span>
        @endif

        <input
            type="{{ $type }}"
            name="{{ $name }}"
            id="{{ $elementId }}"
            value="{{ $value }}"
            dir="{{ $dir }}"
            @if($placeholder) placeholder="{{ $placeholder }}" @endif
            @if($required) required @endif
            @if($disabled) disabled @endif
            @if($readonly) readonly @endif
            @if($maxlength) maxlength="{{ $maxlength }}" @endif
            @if($minlength) minlength="{{ $minlength }}" @endif
            @if($pattern) pattern="{{ $pattern }}" @endif
            @if($autocomplete) autocomplete="{{ $autocomplete }}" @endif
            {{ $attributes->merge(['class' => 'form-control ' . ($size !== 'md' ? 'form-control-' . $size : '') . ($resolvedError ? ' is-invalid' : '')]) }}
            data-component="text-input"
        >

        @if($icon && $iconPosition === 'left')
            <span class="input-group-text"><i class="fa {{ $icon }}"></i></span>
        @endif

        @if($addon && $addonPosition === 'left')
            <span class="input-group-text">{{ $addon }}</span>
        @endif

        @if($resolvedError)
            <div class="invalid-feedback d-block">{{ $resolvedError }}</div>
        @endif
    </div>

    @if($hint && !$resolvedError)
        <div class="form-text text-muted">{{ $hint }}</div>
    @endif
</div>
