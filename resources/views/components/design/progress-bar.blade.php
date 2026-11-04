@php
    $percent = $max > 0 ? round(min(100, max(0, ($value / $max) * 100)), 1) : 0;
@endphp
<div class="core-progress-wrapper {{ $class }}" id="{{ $elementId }}" data-component="progress-bar" data-component-id="{{ $elementId }}" data-value="{{ $value }}" data-max="{{ $max }}">
    @if($label || $showPercentage)
        <div class="core-progress-meta">
            @if($label)<span class="core-progress-label">{{ $label }}</span>@endif
            @if($showPercentage)<span class="core-progress-percent" data-progress-text="{{ $elementId }}">{{ $percent }}%</span>@endif
        </div>
    @endif
    <div class="core-progress core-progress-{{ $size }}" role="progressbar" aria-valuenow="{{ $value }}" aria-valuemin="0" aria-valuemax="{{ $max }}">
        @if($stacked || $slot->isNotEmpty())
            {{ $slot }}
        @else
            <div
                class="core-progress-bar core-progress-bar-{{ $variant }} {{ $striped ? 'is-striped' : '' }} {{ $animated ? 'is-animated' : '' }}"
                data-progress-fill="{{ $elementId }}"
                style="width: {{ $percent }}%;"
            ></div>
        @endif
    </div>
</div>
