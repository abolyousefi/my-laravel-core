<div
    class="core-high-chart {{ $class }}"
    id="{{ $elementId }}"
    data-component="high-chart"
    data-component-id="{{ $elementId }}"
    data-chart-type="{{ $type }}"
    data-title="{{ $title }}"
    data-subtitle="{{ $subtitle }}"
    data-categories="{{ json_encode($categories) }}"
    data-series="{{ json_encode($series) }}"
    data-options="{{ json_encode($options) }}"
    style="min-height: {{ $height }};"
>
    @if($title)
        <div class="core-chart-header">
            <h5 class="core-chart-title">{{ $title }}</h5>
            @if($subtitle)<small class="core-chart-subtitle">{{ $subtitle }}</small>@endif
        </div>
    @endif
    <div class="core-chart-canvas" id="{{ $elementId }}_canvas"></div>
</div>
