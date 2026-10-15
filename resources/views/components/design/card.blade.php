<div class="card core-card {{ $bordered ? 'border' : 'border-0' }} {{ $shadow !== 'none' ? 'shadow-' . $shadow : '' }} rounded-{{ $rounded }} bg-{{ $bg }} {{ $hover ? 'hover-shadow transition-all' : '' }} {{ $class }}" id="{{ $id }}" {{ $attributes }}>
    {{-- Card Top Image --}}
    @if($image)
        <div class="position-relative overflow-hidden rounded-top-{{ $rounded }}">
            <img src="{{ $image }}" alt="{{ $imageAlt ?? $title ?? 'Card Image' }}" class="card-img-top w-100" style="height: {{ $imageHeight }}; object-fit: cover;">
            @if(isset($imageOverlay))
                <div class="position-absolute top-0 start-0 w-100 h-100 d-flex p-3">
                    {{ $imageOverlay }}
                </div>
            @endif
        </div>
    @endif

    {{-- Card Header --}}
    @if(isset($header))
        <div class="card-header bg-transparent {{ $headerBorder ? 'border-bottom' : 'border-0' }} py-3 px-{{ $padding }}">
            {{ $header }}
        </div>
    @elseif($title || $icon || $badge || isset($actions) || !empty($headerActions) || $collapsible)
        <div class="card-header bg-transparent {{ $headerBorder ? 'border-bottom' : 'border-0' }} d-flex align-items-center justify-content-between py-3 px-{{ $padding }}">
            <div class="d-flex align-items-center gap-2">
                @if($icon)
                    <div class="text-{{ $iconColor }} fs-5 d-flex align-items-center justify-content-center">
                        <i class="fa {{ $icon }}"></i>
                    </div>
                @endif
                <div>
                    @if($title)
                        <h5 class="card-title mb-0 fw-bold text-dark">{{ $title }}</h5>
                    @endif
                    @if($subtitle)
                        <small class="text-muted d-block mt-1">{{ $subtitle }}</small>
                    @endif
                </div>
                @if($badge)
                    <span class="badge bg-{{ $badgeVariant }}-subtle text-{{ $badgeVariant }} rounded-pill ms-2">
                        {{ $badge }}
                    </span>
                @endif
            </div>

            <div class="card-header-actions d-flex align-items-center gap-2">
                @if(isset($actions))
                    {{ $actions }}
                @elseif(!empty($headerActions))
                    @foreach($headerActions as $act)
                        <a href="{{ $act['url'] ?? '#' }}" class="btn btn-sm btn-{{ $act['variant'] ?? 'light' }} rounded-pill">
                            @if(!empty($act['icon'])) <i class="fa {{ $act['icon'] }} me-1"></i> @endif
                            {{ $act['label'] ?? '' }}
                        </a>
                    @endforeach
                @endif

                @if($collapsible)
                    <button class="btn btn-sm btn-link text-muted p-0" type="button" data-bs-toggle="collapse" data-bs-target="#{{ $id }}_body" aria-expanded="{{ $collapsed ? 'false' : 'true' }}" aria-label="Toggle">
                        <i class="fa fa-chevron-down"></i>
                    </button>
                @endif
            </div>
        </div>
    @endif

    {{-- Card Body --}}
    <div class="card-body p-{{ $padding }} {{ $collapsible ? 'collapse' . ($collapsed ? '' : ' show') : '' }}" id="{{ $id }}_body">
        {{ $slot }}
    </div>

    {{-- Card Footer --}}
    @if(isset($footer))
        <div class="card-footer bg-transparent border-top py-3 px-{{ $padding }}">
            {{ $footer }}
        </div>
    @endif
</div>
