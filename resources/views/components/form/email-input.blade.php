<div class="core-field core-email-field {{ $class }}" data-component="email-input" data-component-id="{{ $elementId }}">
    @if($label)
        <label class="core-label" for="{{ $elementId }}" data-label-for="{{ $elementId }}">
            {{ $label }}
            @if($required)<span class="core-required">*</span>@endif
        </label>
    @endif
    <input
        type="email"
        id="{{ $elementId }}"
        name="{{ $name }}"
        value="{{ $value }}"
        dir="ltr"
        placeholder="{{ $placeholder }}"
        class="core-input {{ $resolvedError ? 'core-input-error' : '' }}"
        @if(!empty($domains)) data-domains="{{ json_encode($domains) }}" @endif
        @if($required) required @endif
        @if($disabled) disabled @endif
        @if($readonly) readonly @endif
        {{ $attributes }}
    />
    @if($hint)<small class="core-hint" data-hint-for="{{ $elementId }}">{{ $hint }}</small>@endif
    @if($resolvedError)<span class="core-error" data-error-for="{{ $elementId }}">{{ $resolvedError }}</span>@endif
</div>
