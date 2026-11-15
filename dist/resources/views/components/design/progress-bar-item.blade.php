<div
    id="{{ $elementId }}"
    class="core-progress-bar core-progress-bar-{{ $variant }} {{ $striped ? 'is-striped' : '' }} {{ $animated ? 'is-animated' : '' }} {{ $class }}"
    style="width: {{ min(100, max(0, $value)) }}%;"
    role="progressbar"
    aria-valuenow="{{ $value }}"
    title="{{ $label ?? ($value . '%') }}"
>
    @if($label)<span>{{ $label }}</span>@endif
</div>
