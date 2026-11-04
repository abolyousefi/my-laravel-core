@php $resolvedStatus = $active ? 'active' : $status; @endphp
<div class="core-stepper-step is-{{ $resolvedStatus }} {{ $class }}" id="{{ $elementId }}" data-step-index="{{ $index }}">
    <span class="core-stepper-indicator">
        @if($icon)<i class="{{ $icon }}"></i>@else{{ $index }}@endif
    </span>
    <div class="core-stepper-label">
        <strong>{{ $title }}</strong>
        @if($subtitle)<small>{{ $subtitle }}</small>@endif
    </div>
    @if($slot->isNotEmpty())
        <div class="core-stepper-content">{{ $slot }}</div>
    @endif
</div>
