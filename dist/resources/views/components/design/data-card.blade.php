<div class="card core-data-card border-0 shadow-sm rounded-3 h-100 position-relative overflow-hidden {{ $class }}" id="{{ $id }}">
    <div class="card-body p-3 d-flex flex-column justify-content-between">
        <div class="d-flex align-items-center justify-content-between mb-3">
            <div>
                <span class="text-muted small fw-semibold d-block">{{ $title }}</span>
                <h3 class="fw-bold mb-0 mt-1">{{ $value }}</h3>
            </div>
            @if($icon)
                <div class="data-card-icon rounded-3 p-3 bg-{{ $color }} bg-opacity-10 text-{{ $color }} d-flex align-items-center justify-content-center">
                    <i class="fa {{ $icon }} fs-4"></i>
                </div>
            @endif
        </div>

        @if($trend !== null || $trendLabel)
            <div class="d-flex align-items-center gap-2 mt-auto">
                @if($trend !== null)
                    <span class="badge {{ $trendDirection === 'up' ? 'bg-success' : 'bg-danger' }} bg-opacity-10 text-{{ $trendDirection === 'up' ? 'success' : 'danger' }} d-inline-flex align-items-center gap-1">
                        <i class="fa {{ $trendDirection === 'up' ? 'fa-arrow-up' : 'fa-arrow-down' }}"></i>
                        <span>{{ abs($trend) }}%</span>
                    </span>
                @endif
                @if($trendLabel)
                    <small class="text-muted">{{ $trendLabel }}</small>
                @endif
            </div>
        @endif
    </div>

    @if($link)
        <a href="{{ $link }}" class="stretched-link" aria-label="{{ $title }}"></a>
    @endif
</div>
