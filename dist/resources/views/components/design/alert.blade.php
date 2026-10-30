<div class="alert alert-{{ $type }} {{ $outline ? 'alert-outline' : '' }} {{ $size !== 'md' ? 'alert-' . $size : '' }} {{ $dismissible ? 'alert-dismissible fade show' : '' }} {{ $class }}" role="alert" id="{{ $id }}">
    <div class="d-flex align-items-center">
        @if($icon)
            <i class="fa {{ $icon }} me-2 flex-shrink-0 fs-5"></i>
        @endif
        <div class="flex-grow-1">
            @if($title)
                <h6 class="alert-heading mb-1 fw-bold">{{ $title }}</h6>
            @endif
            @if($message)
                <div>{{ $message }}</div>
            @else
                <div>{{ $slot }}</div>
            @endif
        </div>
        @if($dismissible)
            <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert" aria-label="بستن"></button>
        @endif
    </div>
</div>
