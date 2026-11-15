<div {{ $attributes->merge(['class' => 'col x-data-item']) }}>
    <div class="p-3 rounded-3 bg-light border h-100 d-flex flex-column justify-content-center">
        <small class="text-muted d-block mb-1">{{ $label }}</small>
        <div @if($dir) dir="{{ $dir }}" @endif class="fw-semibold {{ $valueClass }}">
            @if($badgeVariant)
                <span class="badge bg-{{ $badgeVariant }}">{{ $slot->isEmpty() ? ($value ?? '-') : $slot }}</span>
            @else
                {{ $slot->isEmpty() ? ($value ?? '-') : $slot }}
            @endif
        </div>
    </div>
</div>