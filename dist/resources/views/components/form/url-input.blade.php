<div class="core-field core-url-field {{ $class }}" data-component="url-input" data-component-id="{{ $elementId }}">
    @if($label)
        <label class="core-label" for="{{ $elementId }}" data-label-for="{{ $elementId }}">
            {{ $label }}
            @if($required)<span class="core-required">*</span>@endif
        </label>
    @endif
    <div class="core-input-group">
        <input
            type="url"
            id="{{ $elementId }}"
            name="{{ $name }}"
            value="{{ $value }}"
            dir="ltr"
            placeholder="{{ $placeholder }}"
            data-protocol="{{ $protocol }}"
            class="core-input {{ $resolvedError ? 'core-input-error' : '' }}"
            @if($required) required @endif
            @if($disabled) disabled @endif
            @if($readonly) readonly @endif
            {{ $attributes }}
        />
        @if($showPreviewLink && !empty($value))
            <a href="{{ $value }}" target="_blank" rel="noopener noreferrer" class="core-url-preview-btn" title="باز کردن لینک">↗</a>
        @endif
    </div>
    @if($hint)<small class="core-hint" data-hint-for="{{ $elementId }}">{{ $hint }}</small>@endif
    @if($resolvedError)<span class="core-error" data-error-for="{{ $elementId }}">{{ $resolvedError }}</span>@endif
</div>
