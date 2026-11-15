<?php

namespace MyLaravelCore\Components\Design;

use MyLaravelCore\Components\BaseComponent;

class Slider extends BaseComponent
{
    public string $elementId;
    public array $slides;
    public bool $autoplay;
    public int $interval;
    public bool $arrows;
    public bool $dots;
    public bool $loop;
    public int $slidesPerView;
    public string $height;

    public function __construct(
        array $slides = [],
        bool $autoplay = true,
        int $interval = 4000,
        bool $arrows = true,
        bool $dots = true,
        bool $loop = true,
        int $slidesPerView = 1,
        string $height = '320px',
        ?string $id = null,
        ?string $class = null,
        ?string $error = null,
        ?string $permission = null
    ) {
        parent::__construct($id, $class, $error, $permission);
        $this->slides = $slides;
        $this->autoplay = $autoplay;
        $this->interval = $interval;
        $this->arrows = $arrows;
        $this->dots = $dots;
        $this->loop = $loop;
        $this->slidesPerView = $slidesPerView;
        $this->height = $height;
        $this->elementId = $this->resolveId('slider');
    }

    public function render()
    {
        return view('core::components.design.slider');
    }
}