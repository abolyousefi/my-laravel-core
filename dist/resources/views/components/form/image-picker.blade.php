<div class="core-field core-image-picker {{ $class }}" id="{{ $elementId }}_wrapper" data-component="image-picker" data-component-id="{{ $elementId }}" data-aspect-ratio="{{ $aspectRatio }}" data-cropper="{{ $cropper ? 'true' : 'false' }}" data-max-size="{{ $maxSize }}">
    @if($label)
        <label class="core-label" for="{{ $elementId }}" data-label-for="{{ $elementId }}">
            {{ $label }}
            @if($required)<span class="core-required">*</span>@endif
        </label>
    @endif
    <div class="core-image-picker-box">
        <div class="core-image-picker-preview">
            @if(!empty($value))
                <img src="{{ is_array($value) ? ($value[0] ?? '') : $value }}" alt="{{ $label ?? $name }}" class="core-image-preview-img" />
            @else
                <span class="core-image-picker-placeholder">انتخاب یا رهاسازی تصویر</span>
            @endif
        </div>
        <input
            type="file"
            id="{{ $elementId }}"
            name="{{ $multiple ? $name . '[]' : $name }}"
            accept="{{ $accept }}"
            class="core-image-picker-input"
            @if($multiple) multiple @endif
            @if($disabled) disabled @endif
            @if($required && empty($value)) required @endif
            {{ $attributes }}
        />
    </div>
    @if($hint)<small class="core-hint" data-hint-for="{{ $elementId }}">{{ $hint }}</small>@endif
    @if($resolvedError)<span class="core-error" data-error-for="{{ $elementId }}">{{ $resolvedError }}</span>@endif
</div>
