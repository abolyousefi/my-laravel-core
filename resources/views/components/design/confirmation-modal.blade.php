<div class="core-modal core-confirmation-modal {{ $class }}" id="{{ $elementId }}" data-component="confirmation-modal" data-component-id="{{ $elementId }}" role="dialog" aria-hidden="true">
    <div class="core-modal-dialog core-modal-sm">
        <div class="core-modal-content">
            <div class="core-modal-header">
                <h5 class="core-modal-title">{{ $title }}</h5>
                <button type="button" class="core-modal-close" data-modal-close="{{ $elementId }}">×</button>
            </div>
            <div class="core-modal-body">
                <p class="core-confirmation-message">{{ $message }}</p>
                {{ $slot }}
            </div>
            <div class="core-modal-footer">
                <button type="button" class="core-btn core-btn-secondary" data-modal-close="{{ $elementId }}">{{ $cancelText }}</button>
                @if($actionUrl)
                    <form action="{{ $actionUrl }}" method="POST" class="d-inline">
                        @csrf
                        @if(strtoupper($method) !== 'POST') @method($method) @endif
                        <button type="submit" class="core-btn core-btn-{{ $variant }}" data-confirm-btn="{{ $elementId }}">{{ $confirmText }}</button>
                    </form>
                @else
                    <button type="button" class="core-btn core-btn-{{ $variant }}" data-confirm-btn="{{ $elementId }}">{{ $confirmText }}</button>
                @endif
            </div>
        </div>
    </div>
</div>
