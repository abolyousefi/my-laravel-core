<div class="accordion-item {{ $class }}">
    <h2 class="accordion-header" id="{{ $id }}_heading">
        <button
            class="accordion-button {{ $expanded ? '' : 'collapsed' }} d-flex align-items-center gap-2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#{{ $id }}_collapse"
            aria-expanded="{{ $expanded ? 'true' : 'false' }}"
            aria-controls="{{ $id }}_collapse"
        >
            @if($icon)
                <i class="fa {{ $icon }} text-primary"></i>
            @endif
            <span>{{ $title }}</span>
        </button>
    </h2>
    <div
        id="{{ $id }}_collapse"
        class="accordion-collapse collapse {{ $expanded ? 'show' : '' }}"
        aria-labelledby="{{ $id }}_heading"
    >
        <div class="accordion-body">
            {{ $slot }}
        </div>
    </div>
</div>
