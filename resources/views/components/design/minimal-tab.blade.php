<div class="core-minimal-tabs core-minimal-tabs-{{ $size }} {{ $class }}" id="{{ $elementId }}" data-component="minimal-tab" data-component-id="{{ $elementId }}">
    <div class="core-minimal-tabs-bar" role="tablist">
        @foreach($tabs as $tKey => $tTitle)
            @php $isActive = $activeTab ? ($activeTab === (string)$tKey) : $loop->first; @endphp
            <button type="button" role="tab" class="core-minimal-tab-item {{ $isActive ? 'is-active' : '' }}" data-tab-target="{{ $tKey }}">
                {{ $tTitle }}
            </button>
        @endforeach
        {{ $slot }}
    </div>
</div>
