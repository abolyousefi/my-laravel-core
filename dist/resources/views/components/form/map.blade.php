<div class="core-field core-map-field {{ $class }}" id="{{ $elementId }}_wrapper" data-component="map" data-component-id="{{ $elementId }}" data-lat="{{ $lat }}" data-lng="{{ $lng }}" data-zoom="{{ $zoom }}" data-mode="{{ $mode }}" data-editable="{{ $editable ? 'true' : 'false' }}" data-tile-url="{{ $tileUrl }}" @if($boundary) data-boundary="{{ json_encode($boundary) }}" @endif>
    @if($label)
        <label class="core-label" data-label-for="{{ $elementId }}">
            {{ $label }}
            @if($required)<span class="core-required">*</span>@endif
        </label>
    @endif
    <div class="core-map-canvas" id="{{ $elementId }}_canvas" style="height: {{ $height }};"></div>
    <input type="hidden" id="{{ $elementId }}" name="{{ $name }}" value="{{ is_array($value) ? json_encode($value) : $value }}" />
    @if($hint)<small class="core-hint" data-hint-for="{{ $elementId }}">{{ $hint }}</small>@endif
    @if($resolvedError)<span class="core-error" data-error-for="{{ $elementId }}">{{ $resolvedError }}</span>@endif
</div>
