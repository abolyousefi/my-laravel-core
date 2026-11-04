<div class="core-field core-password-field {{ $class }}" data-component="password-input" data-component-id="{{ $elementId }}" data-show-strength="{{ $showStrength ? 'true' : 'false' }}">
    @if($label)
        <label class="core-label" for="{{ $elementId }}" data-label-for="{{ $elementId }}">
            {{ $label }}
            @if($required)<span class="core-required">*</span>@endif
        </label>
    @endif
    <div class="core-password-wrapper">
        <input
            type="password"
            id="{{ $elementId }}"
            name="{{ $name }}"
            value="{{ $value }}"
            dir="ltr"
            placeholder="{{ $placeholder }}"
            class="core-input {{ $resolvedError ? 'core-input-error' : '' }}"
            @if($required) required @endif
            @if($disabled) disabled @endif
            @if($readonly) readonly @endif
            {{ $attributes }}
        />
        @if($showToggle)
            <button type="button" class="core-password-toggle" data-toggle-password="{{ $elementId }}" aria-label="نمایش رمز عبور">👁</button>
        @endif
        @if($generateButton)
            <button type="button" class="core-password-generate" data-generate-password="{{ $elementId }}">تولید رمز</button>
        @endif
    </div>
    @if($showStrength)
        <div class="core-password-strength" data-strength-for="{{ $elementId }}"></div>
    @endif
    @if($hint)<small class="core-hint" data-hint-for="{{ $elementId }}">{{ $hint }}</small>@endif
    @if($resolvedError)<span class="core-error" data-error-for="{{ $elementId }}">{{ $resolvedError }}</span>@endif
</div>
