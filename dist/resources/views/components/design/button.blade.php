@php
    $btnClasses = 'btn '
        . ($outline ? 'btn-outline-' . $variant : 'btn-' . $variant)
        . ($size !== 'md' ? ' btn-' . $size : '')
        . ($pill ? ' rounded-pill' : '')
        . ($block ? ' w-100' : '')
        . ' ' . $class;
@endphp

@if($href)
    <a
        href="{{ $href }}"
        @if($target) target="{{ $target }}" @endif
        id="{{ $id }}"
        {{ $attributes->merge(['class' => $btnClasses . ($disabled ? ' disabled' : '')]) }}
        @if($confirm) data-confirm="{{ $confirm }}" @endif
    >
        @if($loading)
            <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
        @elseif($icon && $iconPosition === 'right')
            <i class="fa {{ $icon }} ms-1"></i>
        @endif

        {{ $slot }}

        @if(!$loading && $icon && $iconPosition === 'left')
            <i class="fa {{ $icon }} me-1"></i>
        @endif
    </a>
@else
    <button
        type="{{ $type }}"
        id="{{ $id }}"
        @if($disabled || $loading) disabled @endif
        {{ $attributes->merge(['class' => $btnClasses]) }}
        @if($confirm) data-confirm="{{ $confirm }}" @endif
        data-component="button"
    >
        @if($loading)
            <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
        @elseif($icon && $iconPosition === 'right')
            <i class="fa {{ $icon }} ms-1"></i>
        @endif

        {{ $slot }}

        @if(!$loading && $icon && $iconPosition === 'left')
            <i class="fa {{ $icon }} me-1"></i>
        @endif
    </button>
@endif
