@if($href)
    <a href="{{ $href }}" id="{{ $elementId }}" role="tab" class="core-tab-item {{ $active ? 'is-active' : '' }} {{ $disabled ? 'is-disabled' : '' }} {{ $class }}" data-tab-target="{{ $name }}">
        @if($icon)<i class="{{ $icon }}"></i>@endif
        <span>{{ $title ?: $slot }}</span>
        @if($badge !== null)<span class="core-tab-badge">{{ $badge }}</span>@endif
    </a>
@else
    <button type="button" id="{{ $elementId }}" role="tab" class="core-tab-item {{ $active ? 'is-active' : '' }} {{ $disabled ? 'is-disabled' : '' }} {{ $class }}" data-tab-target="{{ $name }}" @if($disabled) disabled @endif>
        @if($icon)<i class="{{ $icon }}"></i>@endif
        <span>{{ $title ?: $slot }}</span>
        @if($badge !== null)<span class="core-tab-badge">{{ $badge }}</span>@endif
    </button>
@endif
