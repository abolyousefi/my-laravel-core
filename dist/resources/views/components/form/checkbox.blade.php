<div class="core-field mb-3 {{ $class }}">
    <div class="form-check form-check-{{ $variant }} {{ $size !== 'md' ? 'form-check-' . $size : '' }}">
        <input
            type="checkbox"
            name="{{ $name }}"
            id="{{ $elementId }}"
            value="{{ $value }}"
            @if($checked) checked @endif
            @if($disabled) disabled @endif
            {{ $attributes->merge(['class' => 'form-check-input' . ($resolvedError ? ' is-invalid' : '')]) }}
            data-component="checkbox"
        >
        @if($label)
            <label class="form-check-label user-select-none" for="{{ $elementId }}">
                {{ $label }}
            </label>
        @endif
    </div>

    @if($resolvedError)
        <div class="invalid-feedback d-block">{{ $resolvedError }}</div>
    @endif

    @if($hint && !$resolvedError)
        <div class="form-text text-muted">{{ $hint }}</div>
    @endif
</div>
