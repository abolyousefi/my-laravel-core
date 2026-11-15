<div class="core-field core-slug-field {{ $class }}" data-component="slug-input" data-component-id="{{ $elementId }}" data-source="{{ $source }}" data-separator="{{ $separator }}" data-persian="{{ $persian ? 'true' : 'false' }}">
    @if($label)
        <label class="core-label" for="{{ $elementId }}" data-label-for="{{ $elementId }}">
            {{ $label }}
            @if($required)<span class="core-required">*</span>@endif
        </label>
    @endif
    <div class="core-slug-group" dir="ltr">
        @if($prefixUrl)
            <span class="core-slug-prefix">{{ rtrim($prefixUrl, '/') }}/</span>
        @endif
        <input
            type="text"
            id="{{ $elementId }}"
            name="{{ $name }}"
            value="{{ $value }}"
            class="core-input {{ $resolvedError ? 'core-input-error' : '' }}"
            @if($required) required @endif
            @if($disabled) disabled @endif
            @if($readonly) readonly @endif
            {{ $attributes }}
        />
    </div>
    @if($hint)<small class="core-hint" data-hint-for="{{ $elementId }}">{{ $hint }}</small>@endif
    @if($resolvedError)<span class="core-error" data-error-for="{{ $elementId }}">{{ $resolvedError }}</span>@endif
</div>
