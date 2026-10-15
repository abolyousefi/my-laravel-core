<div
    class="modal fade {{ $class }}"
    id="{{ $id }}"
    tabindex="-1"
    aria-labelledby="{{ $id }}_title"
    aria-hidden="true"
    @if($static) data-bs-backdrop="static" data-bs-keyboard="false" @else
        @if(!$closeOnBackdrop) data-bs-backdrop="static" @endif
        @if(!$closeOnEsc) data-bs-keyboard="false" @endif
    @endif
    data-component="modal"
>
    <div class="modal-dialog {{ $size !== 'md' ? ($size === 'full' ? 'modal-fullscreen' : 'modal-' . $size) : '' }} {{ $centered ? 'modal-dialog-centered' : '' }} {{ $scrollable ? 'modal-dialog-scrollable' : '' }}">
        <div class="modal-content border-0 shadow">
            @if(isset($header))
                {{ $header }}
            @elseif($title || $showCloseButton)
                <div class="modal-header">
                    @if($title)
                        <h5 class="modal-title fw-bold" id="{{ $id }}_title">{{ $title }}</h5>
                    @endif
                    @if($showCloseButton)
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="بستن"></button>
                    @endif
                </div>
            @endif

            <div class="modal-body">
                {{ $slot }}
            </div>

            @if(isset($footer))
                <div class="modal-footer">
                    {{ $footer }}
                </div>
            @endif
        </div>
    </div>
</div>
