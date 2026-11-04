@if($divider)
    <div class="core-dropdown-divider" role="separator"></div>
@else
    <a
        href="{{ $disabled ? 'javascript:void(0)' : $href }}"
        id="{{ $elementId }}"
        class="core-dropdown-item {{ $variant ? 'core-dropdown-item-' . $variant : '' }} {{ $disabled ? 'is-disabled' : '' }} {{ $class }}"
        @if($confirmMessage) data-confirm="{{ $confirmMessage }}" @endif
        @if($disabled) aria-disabled="true" tabindex="-1" @endif
        {{ $attributes }}
    >
        @if($icon)<i class="core-dropdown-icon {{ $icon }}"></i>@endif
        <span>{{ $label ?? $slot }}</span>
    </a>
@endif
