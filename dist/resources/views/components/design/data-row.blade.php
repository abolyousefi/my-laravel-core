<div class="core-data-row {{ $class }}" id="{{ $elementId }}" style="grid-column: span {{ $colspan }};">
    <dt class="core-data-row-label">
        @if($icon)<i class="{{ $icon }}"></i>@endif
        <span>{{ $label }}</span>
    </dt>
    <dd class="core-data-row-value">
        @if($slot->isNotEmpty())
            {{ $slot }}
        @elseif($badgeVariant)
            <span class="core-badge core-badge-{{ $badgeVariant }}">{{ $value ?? '-' }}</span>
        @else
            <span>{{ $value ?? '-' }}</span>
        @endif
        @if($copyable && !empty($value))
            <button type="button" class="core-copy-btn" data-copy-value="{{ $value }}" title="کپی">📋</button>
        @endif
    </dd>
</div>
