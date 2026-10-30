@php
    $imgClasses = 'img-fluid '
        . ($circle ? ' rounded-circle' : ($rounded ? ' rounded' : ''))
        . ($thumbnail ? ' img-thumbnail' : '')
        . ' ' . $class;
@endphp

@if($ratio)
    <div class="ratio ratio-{{ str_replace(':', 'x', $ratio) }}">
        <img
            src="{{ $src }}"
            alt="{{ $alt }}"
            @if($width) width="{{ $width }}" @endif
            @if($height) height="{{ $height }}" @endif
            @if($lazy) loading="lazy" @endif
            class="{{ trim($imgClasses) }} object-fit-cover"
            id="{{ $id }}"
            {{ $attributes }}
        >
    </div>
@else
    @if($lightbox)
        <a href="{{ $src }}" target="_blank" data-lightbox="gallery">
            <img
                src="{{ $src }}"
                alt="{{ $alt }}"
                @if($width) width="{{ $width }}" @endif
                @if($height) height="{{ $height }}" @endif
                @if($lazy) loading="lazy" @endif
                class="{{ trim($imgClasses) }}"
                id="{{ $id }}"
                {{ $attributes }}
            >
        </a>
    @else
        <img
            src="{{ $src }}"
            alt="{{ $alt }}"
            @if($width) width="{{ $width }}" @endif
            @if($height) height="{{ $height }}" @endif
            @if($lazy) loading="lazy" @endif
            class="{{ trim($imgClasses) }}"
            id="{{ $id }}"
            {{ $attributes }}
        >
    @endif
@endif
