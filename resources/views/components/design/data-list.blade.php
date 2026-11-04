<div class="core-data-list {{ $bordered ? 'is-bordered' : '' }} {{ $striped ? 'is-striped' : '' }} {{ $class }}" id="{{ $elementId }}" data-component="data-list" data-component-id="{{ $elementId }}">
    @if($title)
        <div class="core-data-list-header">
            <h5 class="core-data-list-title">{{ $title }}</h5>
        </div>
    @endif
    <dl class="core-data-list-grid" style="grid-template-columns: repeat({{ $columns }}, minmax(0, 1fr));">
        @foreach($items as $label => $val)
            <div class="core-data-row">
                <dt class="core-data-row-label">{{ is_array($val) ? ($val['label'] ?? $label) : $label }}</dt>
                <dd class="core-data-row-value">{{ is_array($val) ? ($val['value'] ?? '-') : $val }}</dd>
            </div>
        @endforeach
        {{ $slot }}
    </dl>
</div>
