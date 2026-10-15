<?php

namespace MyLaravelCore\Components\Design;

use Illuminate\Contracts\View\View;
use MyLaravelCore\Components\BaseComponent;

class ImageView extends BaseComponent
{
    public function __construct(
        public string $src,
        public string $alt = '',
        public int|string|null $width = null,
        public int|string|null $height = null,
        public ?string $ratio = null, // 1x1, 4x3, 16x9, 21x9
        public bool $rounded = false,
        public bool $circle = false,
        public bool $thumbnail = false,
        public bool $lazy = true,
        public ?string $placeholder = null,
        public bool $lightbox = false,
        ?string $id = null,
        ?string $class = null
    ) {
        parent::__construct($id, $class);
    }

    public function render(): View
    {
        return view('core::components.design.image');
    }
}
