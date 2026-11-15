<figure class="core-video-wrapper {{ $class }}" id="{{ $elementId }}" data-component="video" data-component-id="{{ $elementId }}">
    <video
        src="{{ $src }}"
        @if($poster) poster="{{ $poster }}" @endif
        @if($controls) controls @endif
        @if($autoplay) autoplay @endif
        @if($loop) loop @endif
        @if($muted) muted @endif
        style="width: {{ $width }}; @if($height) height: {{ $height }}; @endif aspect-ratio: {{ $aspectRatio }};"
        class="core-video-player"
        {{ $attributes }}
    ></video>
    @if($title)
        <figcaption class="core-video-caption">{{ $title }}</figcaption>
    @endif
</figure>
