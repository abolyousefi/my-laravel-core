<div class="core-field core-color-field {{ $class }}" data-component="color-input" data-component-id="{{ $elementId }}" data-format="{{ $format }}">
    @if($label)
        <label class="core-label" for="{{ $elementId }}" data-label-for="{{ $elementId }}">
            {{ $label }}
            @if($required)<span class="core-required">*</span>@endif
        </label>
    @endif
    <div class="core-color-input-group">
        <input
            type="color"
            id="{{ $elementId }}"
            name="{{ $name }}"
            value="{{ $value ?: '#0f766e' }}"
            class="core-color-picker"
            @if($disabled) disabled @endif
            @if($readonly) readonly @endif
            {{ $attributes }}
        />
        <input
            type="text"
            value="{{ $value ?: '#0f766e' }}"
            dir="ltr"
            class="core-input core-color-text"
            data-color-text-for="{{ $elementId }}"
            @if($disabled) disabled @endif
            @if($readonly) readonly @endif
        />
    </div>
    @if(!empty($presets))
        <div class="core-color-presets">
            @foreach($presets as $presetColor)
                <button type="button" class="core-color-swatch" style="background-color: {{ $presetColor }};" data-color-preset="{{ $presetColor }}" data-target="{{ $elementId }}" title="{{ $presetColor }}"></button>
            @endforeach
        </div>
    @endif
    @if($hint)<small class="core-hint" data-hint-for="{{ $elementId }}">{{ $hint }}</small>@endif
    @if($resolvedError)<span class="core-error" data-error-for="{{ $elementId }}">{{ $resolvedError }}</span>@endif
</div>
