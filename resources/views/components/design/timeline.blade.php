<div class="core-timeline {{ $direction === 'horizontal' ? 'timeline-horizontal' : 'timeline-vertical' }} {{ $animated ? 'timeline-animated' : '' }} {{ $class }}" id="{{ $id }}">
    @if(!empty($items))
        @foreach($items as $item)
            <div class="timeline-item mb-4 d-flex gap-3 position-relative">
                <div class="timeline-marker rounded-circle bg-{{ $item['color'] ?? $color }} text-white d-flex align-items-center justify-content-center flex-shrink-0" style="width: 32px; height: 32px; z-index: 2;">
                    <i class="fa {{ $item['icon'] ?? 'fa-circle' }} small"></i>
                </div>
                <div class="timeline-content flex-grow-1 bg-light p-3 rounded border">
                    <div class="d-flex align-items-center justify-content-between mb-1">
                        <h6 class="mb-0 fw-bold">{{ $item['title'] ?? '' }}</h6>
                        @if(!empty($item['time']))
                            <small class="text-muted">{{ $item['time'] }}</small>
                        @endif
                    </div>
                    @if(!empty($item['description']))
                        <p class="mb-0 text-muted small">{{ $item['description'] }}</p>
                    @endif
                </div>
            </div>
        @endforeach
    @else
        {{ $slot }}
    @endif
</div>
