<div class="core-field core-switch-field {{ $class }}" data-component="switch-input" data-component-id="{{ $elementId }}">
    <label class="core-switch-wrapper core-switch-{{ $size }} core-switch-{{ $variant }}" for="{{ $elementId }}">
        <input
            type="checkbox"
            id="{{ $elementId }}"
            name="{{ $name }}"
            value="{{ $value ?? 1 }}"
            class="core-switch-input"
            @if($checked) checked @endif
            @if($disabled) disabled @endif
            @if($readonly) readonly @endif
            @if($required) required @endif
            {{ $attributes }}
        />
        <span class="core-switch-slider"></span>
        @if($label)
            <span class="core-switch-label">
                {{ $label }}
                @if($required)<span class="core-required">*</span>@endif
            </span>
        @endif
        @if($activeText || $inactiveText)
            <span class="core-switch-state-text" data-active="{{ $activeText }}" data-inactive="{{ $inactiveText }}">
                {{ $checked ? $activeText : $inactiveText }}
            </span>
        @endif
    </label>
    @if($hint)<small class="core-hint" data-hint-for="{{ $elementId }}">{{ $hint }}</small>@endif
    @if($resolvedError)<span class="core-error" data-error-for="{{ $elementId }}">{{ $resolvedError }}</span>@endif
</div>
