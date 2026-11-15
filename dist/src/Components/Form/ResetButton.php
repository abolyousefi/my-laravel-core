<?php

namespace MyLaravelCore\Components\Form;

use Illuminate\Contracts\View\View;
use MyLaravelCore\Components\BaseComponent;

class ResetButton extends BaseComponent
{
    public function __construct(
        public string $title = 'بازنشانی',
        public string $variant = 'light',
        public string $appearance = 'outline',
        public string $size = 'md',
        public ?string $icon = 'fa-rotate-left',
        ?string $id = null,
        ?string $class = null,
        ?string $permission = null
    ) {
        parent::__construct($id, $class, null, $permission);
    }

    public function render(): View
    {
        return view('core::components.form.reset-button');
    }
}