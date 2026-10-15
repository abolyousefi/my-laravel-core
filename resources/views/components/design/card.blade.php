<div class="card core-card {{ $bordered ? '' : 'border-0' }} {{ $shadow !== 'none' ? 'shadow-' . $shadow : '' }} {{ $class }}" id="{{ $id }}">
    @if($title || isset($headerActions) || !empty($headerActions))
        <div class="card-header bg-transparent d-flex align-items-center justify-content-between py-3">
            <div class="d-flex align-items-center gap-2">
                @if($icon)
                    <i class="fa {{ $icon }} text-primary fs-5"></i>
                @endif
                <div>
                    @if($title)
                        <h6 class="card-title mb-0 fw-bold">{{ $title }}</h6>
                    @endif
                    @if($subtitle)
                        <small class="text-muted">{{ $subtitle }}</small>
                    @endif
                </div>
            </div>

            <div class="card-header-actions d-flex align-items-center gap-2">
                @if(isset($headerActions))
                    {{ $headerActions }}
                @elseif(!empty($headerActions))
                    @foreach($headerActions as $act)
                        <a href="{{ $act['url'] ?? '#' }}" class="btn btn-sm btn-{{ $act['variant'] ?? 'light' }}">
                            @if(!empty($act['icon'])) <i class="fa {{ $act['icon'] }} me-1"></i> @endif
                            {{ $act['label'] ?? '' }}
                        </a>
                    @endforeach
                @endif

                @if($collapsible)
                    <button class="btn btn-sm btn-link text-muted p-0" type="button" data-bs-toggle="collapse" data-bs-target="#{{ $id }}_body" aria-expanded="{{ $collapsed ? 'false' : 'true' }}">
                        <i class="fa fa-chevron-down"></i>
                    </button>
                @endif
            </div>
        </div>
    @endif

    <div class="card-body p-{{ $padding }} {{ $collapsible ? 'collapse' . ($collapsed ? '' : ' show') : '' }}" id="{{ $id }}_body">
        {{ $slot }}
    </div>
</div>
