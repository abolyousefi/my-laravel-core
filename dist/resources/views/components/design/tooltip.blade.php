<span
    class="d-inline-block core-tooltip-wrapper {{ $class }}"
    id="{{ $id }}"
    data-bs-toggle="tooltip"
    data-bs-placement="{{ $placement }}"
    @if($html) data-bs-html="true" @endif
    data-bs-custom-class="tooltip-{{ $variant }}"
    data-bs-delay='{"show":{{ $delay }},"hide":100}'
    title="{{ $text }}"
    {{ $attributes }}
>
    {{ $slot }}
</span>
