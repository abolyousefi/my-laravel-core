<div
    class="core-tabs core-tabs-{{ $variant }} {{ $vertical ? 'is-vertical' : '' }} {{ $class }}"
    id="{{ $elementId }}"
    data-component="tab"
    data-component-id="{{ $elementId }}"
    data-active-tab="{{ $activeTab }}"
    @if($persistKey) data-persist-key="{{ $persistKey }}" @endif
>
    @if(!empty($tabs))
        <div class="core-tabs-nav" role="tablist">
            @foreach($tabs as $tKey => $tab)
                @php
                    $tName = is_array($tab) ? ($tab['name'] ?? $tKey) : $tKey;
                    $tTitle = is_array($tab) ? ($tab['title'] ?? $tName) : $tab;
                    $tIcon = is_array($tab) ? ($tab['icon'] ?? null) : null;
                    $tBadge = is_array($tab) ? ($tab['badge'] ?? null) : null;
                    $isActive = $activeTab ? ($activeTab === (string)$tName) : $loop->first;
                @endphp
                <button
                    type="button"
                    role="tab"
                    class="core-tab-item {{ $isActive ? 'is-active' : '' }}"
                    data-tab-target="{{ $tName }}"
                    aria-selected="{{ $isActive ? 'true' : 'false' }}"
                >
                    @if($tIcon)<i class="{{ $tIcon }}"></i>@endif
                    <span>{{ $tTitle }}</span>
                    @if($tBadge !== null)<span class="core-tab-badge">{{ $tBadge }}</span>@endif
                </button>
            @endforeach
        </div>
    @endif
    <div class="core-tabs-content">
        {{ $slot }}
    </div>
</div>
