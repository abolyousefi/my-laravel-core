<div class="core-stat-card core-stat-card-{{ $variant }} {{ $class }}" id="{{ $elementId }}" data-component="stat-card" data-component-id="{{ $elementId }}">
    <div class="core-stat-card-main">
        <div class="core-stat-card-info">
            <span class="core-stat-card-title">{{ $title }}</span>
            <div class="core-stat-card-value">
                <strong>{{ $value }}</strong>
                @if($unit)<small class="core-stat-card-unit">{{ $unit }}</small>@endif
            </div>
        </div>
        @if($icon)
            <div class="core-stat-card-icon"><i class="{{ $icon }}"></i></div>
        @endif
    </div>
    @if($trend || $description || $slot->isNotEmpty())
        <div class="core-stat-card-footer">
            @if($trend)
                <span class="core-stat-trend {{ str_starts_with($trend, '-') ? 'is-down' : 'is-up' }}">{{ $trend }}</span>
            @endif
            @if($trendLabel)<span class="core-stat-trend-label">{{ $trendLabel }}</span>@endif
            @if($description)<p class="core-stat-description">{{ $description }}</p>@endif
            {{ $slot }}
        </div>
    @endif
</div>
