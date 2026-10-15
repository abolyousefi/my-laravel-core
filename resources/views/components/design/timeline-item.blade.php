<div class="timeline-item mb-4 d-flex gap-3 position-relative {{ $class }}" id="{{ $id }}">
    <div class="timeline-marker rounded-circle bg-{{ $color }} text-white d-flex align-items-center justify-content-center flex-shrink-0" style="width: 32px; height: 32px; z-index: 2;">
        <i class="fa {{ $icon ?: 'fa-circle' }} small"></i>
    </div>
    <div class="timeline-content flex-grow-1 bg-light p-3 rounded border">
        <div class="d-flex align-items-center justify-content-between mb-1">
            <h6 class="mb-0 fw-bold">{{ $title }}</h6>
            @if($time)
                <small class="text-muted">{{ $time }}</small>
            @endif
        </div>
        @if($description)
            <p class="mb-1 text-muted small">{{ $description }}</p>
        @endif
        {{ $slot }}
    </div>
</div>
