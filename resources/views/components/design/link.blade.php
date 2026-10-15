<a
    href="{{ $href }}"
    @if($target) target="{{ $target }}" @endif
    id="{{ $id }}"
    class="text-{{ $variant }} {{ $underline ? '' : 'text-decoration-none' }} d-inline-flex align-items-center gap-1 {{ $class }}"
    {{ $attributes }}
>
    @if($icon && $iconPosition === 'right')
        <i class="fa {{ $icon }}"></i>
    @endif

    <span>{{ $label ?: $slot }}</span>

    @if($icon && $iconPosition === 'left')
        <i class="fa {{ $icon }}"></i>
    @endif

    @if($external)
        <i class="fa fa-external-link-alt small text-muted ms-1" style="font-size: 0.75rem;"></i>
    @endif
</a>
