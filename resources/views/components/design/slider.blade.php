<div
    class="core-slider {{ $class }}"
    id="{{ $elementId }}"
    data-component="slider"
    data-component-id="{{ $elementId }}"
    data-autoplay="{{ $autoplay ? 'true' : 'false' }}"
    data-interval="{{ $interval }}"
    data-loop="{{ $loop ? 'true' : 'false' }}"
    data-slides-per-view="{{ $slidesPerView }}"
    style="min-height: {{ $height }};"
>
    <div class="core-slider-track" data-slider-track="{{ $elementId }}">
        @foreach($slides as $slide)
            <div class="core-slider-item">
                @if(!empty($slide['image']))
                    <img src="{{ $slide['image'] }}" alt="{{ $slide['title'] ?? '' }}" class="core-slider-img" />
                @endif
                @if(!empty($slide['title']) || !empty($slide['caption']))
                    <div class="core-slider-caption">
                        @if(!empty($slide['title']))<h5>{{ $slide['title'] }}</h5>@endif
                        @if(!empty($slide['caption']))<p>{{ $slide['caption'] }}</p>@endif
                    </div>
                @endif
            </div>
        @endforeach
        {{ $slot }}
    </div>
    @if($arrows)
        <button type="button" class="core-slider-arrow core-slider-prev" data-slider-prev="{{ $elementId }}" aria-label="قبلی">‹</button>
        <button type="button" class="core-slider-arrow core-slider-next" data-slider-next="{{ $elementId }}" aria-label="بعدی">›</button>
    @endif
    @if($dots)
        <div class="core-slider-dots" data-slider-dots="{{ $elementId }}"></div>
    @endif
</div>
