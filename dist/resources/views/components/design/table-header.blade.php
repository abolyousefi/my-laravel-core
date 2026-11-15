<div class="core-table-header {{ $class }}" id="{{ $elementId }}" data-component="table-header" data-component-id="{{ $elementId }}">
    <div class="core-table-header-info">
        <div class="core-table-header-title-row">
            <h4 class="core-table-header-title">{{ $title }}</h4>
            @if($totalCount !== null)
                <span class="core-badge core-badge-secondary">{{ $totalCount }}</span>
            @endif
        </div>
        @if($subtitle)<p class="core-table-header-subtitle">{{ $subtitle }}</p>@endif
    </div>
    <div class="core-table-header-actions">
        @if($searchable)
            <input type="search" name="{{ $searchName }}" value="{{ request($searchName) }}" placeholder="{{ $searchPlaceholder }}" class="core-input core-table-search-input" />
        @endif
        @if($exportUrl)
            <a href="{{ $exportUrl }}" class="core-btn core-btn-outline-secondary core-btn-sm">خروجی اکسل</a>
        @endif
        @if($createUrl)
            <a href="{{ $createUrl }}" class="core-btn core-btn-primary core-btn-sm">+ {{ $createLabel }}</a>
        @endif
        {{ $slot }}
    </div>
</div>
