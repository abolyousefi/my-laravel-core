<span class="badge {{ $outline ? 'badge-outline-' . $variant : 'bg-' . $variant }} {{ $pill ? 'rounded-pill' : '' }} {{ $size !== 'md' ? 'badge-' . $size : '' }} {{ $class }}" id="{{ $id }}">
    @if($dot)
        <span class="badge-dot bg-{{ $variant }} me-1"></span>
    @endif
    @if($icon)
        <i class="fa {{ $icon }} me-1"></i>
    @endif
    {{ $slot }}
</span>
