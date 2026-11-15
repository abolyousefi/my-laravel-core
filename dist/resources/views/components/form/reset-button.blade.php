@php
    $btnClass = $appearance === 'outline' ? "btn-outline-{$variant}" : "btn-{$variant}";
    $sizeClass = match($size) {
        'sm' => 'btn-sm',
        'lg' => 'btn-lg',
        default => '',
    };
@endphp
<button type="reset" {{ $attributes->merge(['class' => "btn {$btnClass} {$sizeClass} d-inline-flex align-items-center gap-2"]) }}>
    @if($icon)
        <i class="fa {{ $icon }}"></i>
    @endif
    <span>{{ $title }}</span>
</button>