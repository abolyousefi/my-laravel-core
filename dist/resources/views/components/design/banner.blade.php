<div class="core-banner alert alert-{{ $type }} p-4 rounded-3 border-0 shadow-sm position-relative {{ $class }}" id="{{ $id }}">
    <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
        <div class="d-flex align-items-center gap-3">
            @if($illustration)
                <img src="{{ $illustration }}" alt="Banner" class="img-fluid" style="max-height: 60px;">
            @elseif($icon)
                <div class="banner-icon-box bg-white p-3 rounded-circle shadow-sm">
                    <i class="fa {{ $icon }} fa-2x text-{{ $type }}"></i>
                </div>
            @endif

            <div>
                @if($title)
                    <h5 class="fw-bold mb-1">{{ $title }}</h5>
                @endif
                @if($description)
                    <p class="mb-0 text-muted">{{ $description }}</p>
                @endif
                {{ $slot }}
            </div>
        </div>

        @if(!empty($actions))
            <div class="d-flex align-items-center gap-2">
                @foreach($actions as $action)
                    @if(!empty($action['dismiss']))
                        <button type="button" class="btn btn-outline-secondary btn-sm" data-bs-dismiss="alert">
                            {{ $action['label'] ?? 'بستن' }}
                        </button>
                    @else
                        <a href="{{ $action['url'] ?? '#' }}" class="btn btn-{{ $action['variant'] ?? 'primary' }} btn-sm">
                            {{ $action['label'] }}
                        </a>
                    @endif
                @endforeach
            </div>
        @endif

        @if($dismissible)
            <button type="button" class="btn-close position-absolute top-0 end-0 m-3" data-bs-dismiss="alert" aria-label="بستن"></button>
        @endif
    </div>
</div>
