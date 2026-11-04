<?php

namespace MyLaravelCore\Components\Design;

use MyLaravelCore\Components\BaseComponent;

class SliderItem extends BaseComponent
{
    public string $elementId;
    public ?string $image;
    public ?string $title;
    public ?string $caption;
    public ?string $href;

    public function __construct(
        ?string $image = null,
        ?string $title = null,
        ?string $caption = null,
        ?string $href = null,
        ?string $id = null,
        ?string $class = null,
        ?string $error = null,
        ?string $permission = null
    ) {
        parent::__construct($id, $class, $error, $permission);
        $this->image = $image;
        $this->title = $title;
        $this->caption = $caption;
        $this->href = $href;
        $this->elementId = $this->resolveId('slider-item');
    }

    public function render()
    {
        return view('core::components.design.slider-item');
    }
}