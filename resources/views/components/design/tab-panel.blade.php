<div
    class="core-tab-panel {{ $active ? 'is-active' : '' }} {{ $class }}"
    id="{{ $elementId }}"
    role="tabpanel"
    data-tab-panel="{{ $name }}"
    data-lazy="{{ $lazy ? 'true' : 'false' }}"
    @if(!$active) hidden @endif
>
    {{ $slot }}
</div>
