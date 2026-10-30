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

    <div class="input-group core-number-group">
        @if($showButtons)
            <button class="btn btn-outline-secondary btn-decrement" type="button" tabindex="-1">
                <i class="fa fa-minus"></i>
            </button>
        @endif

        <input
            type="text"
            name="{{ $name }}"
            id="{{ $elementId }}"
            value="{{ $value }}"
            dir="ltr"
            @if($placeholder) placeholder="{{ $placeholder }}" @endif
            @if($required) required @endif
            @if($disabled) disabled @endif
            @if($readonly) readonly @endif
            {{ $attributes->merge(['class' => 'form-control text-center' . ($resolvedError ? ' is-invalid' : '')]) }}
            data-component="number-input"
            data-min="{{ $min }}"
            data-max="{{ $max }}"
            data-step="{{ $step }}"
            data-decimals="{{ $decimals }}"
            data-thousand-separator="{{ $thousandSeparator ? 'true' : 'false' }}"
            data-separator="{{ $separator }}"
            data-persian-digits="{{ $persianDigits ? 'true' : 'false' }}"
        >

        @if($unit)
            <span class="input-group-text">{{ $unit }}</span>
        @endif

        @if($showButtons)
            <button class="btn btn-outline-secondary btn-increment" type="button" tabindex="-1">
                <i class="fa fa-plus"></i>
            </button>
        @endif

        @if($resolvedError)
            <div class="invalid-feedback d-block">{{ $resolvedError }}</div>
        @endif
    </div>

    @if($hint && !$resolvedError)
        <div class="form-text text-muted">{{ $hint }}</div>
    @endif
</div>
