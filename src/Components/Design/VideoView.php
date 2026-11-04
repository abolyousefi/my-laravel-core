<?php

namespace MyLaravelCore\Components\Design;

use MyLaravelCore\Components\BaseComponent;

class VideoView extends BaseComponent
{
    public string $elementId;
    public string $src;
    public ?string $poster;
    public ?string $title;
    public bool $controls;
    public bool $autoplay;
    public bool $loop;
    public bool $muted;
    public ?string $width;
    public ?string $height;
    public string $aspectRatio;

    public function __construct(
        string $src = '',
        ?string $poster = null,
        ?string $title = null,
        bool $controls = true,
        bool $autoplay = false,
        bool $loop = false,
        bool $muted = false,
        ?string $width = '100%',
        ?string $height = null,
        string $aspectRatio = '16/9',
        ?string $id = null,
        ?string $class = null,
        ?string $error = null,
        ?string $permission = null
    ) {
        parent::__construct($id, $class, $error, $permission);
        $this->src = $src;
        $this->poster = $poster;
        $this->title = $title;
        $this->controls = $controls;
        $this->autoplay = $autoplay;
        $this->loop = $loop;
        $this->muted = $muted;
        $this->width = $width;
        $this->height = $height;
        $this->aspectRatio = $aspectRatio;
        $this->elementId = $this->resolveId('video');
    }

    public function render()
    {
        return view('core::components.design.video');
    }
}