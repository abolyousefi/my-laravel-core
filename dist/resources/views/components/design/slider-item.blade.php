<div class="core-slider-item {{ $class }}" id="{{ $elementId }}">
    @if($image)
        <img src="{{ $image }}" alt="{{ $title ?? '' }}" class="core-slider-img" />
    @endif
    @if($title || $caption || $slot->isNotEmpty())
        <div class="core-slider-caption">
            @if($title)<h5>{{ $title }}</h5>@endif
            @if($caption)<p>{{ $caption }}</p>@endif
            {{ $slot }}
        </div>
    @endif
</div>
