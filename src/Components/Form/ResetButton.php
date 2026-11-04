<?php

namespace MyLaravelCore\Components\Form;

use MyLaravelCore\Components\BaseComponent;

class ResetButton extends BaseComponent
{
    public function __construct(
        public string $title = 'بازنشانی',
        public string $variant = 'light',
        public string $appearance = 'outline',
        public string $size = 'md',
        public ?string $icon = 'fa-rotate-left'
    ) {
    }

    protected function viewName(): string
    {
        return 'core::components.form.reset-button';
    }
}