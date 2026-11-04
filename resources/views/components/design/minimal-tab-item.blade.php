<button
    type="button"
    id="{{ $elementId }}"
    role="tab"
    class="core-minimal-tab-item {{ $active ? 'is-active' : '' }} {{ $disabled ? 'is-disabled' : '' }} {{ $class }}"
    data-tab-target="{{ $name }}"
    @if($disabled) disabled @endif
>
    @if($icon)<i class="{{ $icon }}"></i>@endif
    <span>{{ $title ?: $slot }}</span>
    @if($count !== null)<small class="core-minimal-tab-count">({{ $count }})</small>@endif
</button>
