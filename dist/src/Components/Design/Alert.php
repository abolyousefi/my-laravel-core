<?php

namespace MyLaravelCore\Components\Design;

use Illuminate\Contracts\View\View;
use MyLaravelCore\Components\BaseComponent;

class Alert extends BaseComponent
{
    public function __construct(
        public string $type = 'info', // success, danger, warning, info
        public ?string $title = null,
        public ?string $message = null,
        public ?string $icon = null,
        public bool $dismissible = false,
        public bool $outline = false,
        public string $size = 'md',
        ?string $id = null,
        ?string $class = null
    ) {
        parent::__construct($id, $class);

        if ($this->icon === null) {
            $this->icon = match ($this->type) {
                'success' => 'fa-check-circle',
                'danger', 'error' => 'fa-times-circle',
                'warning' => 'fa-exclamation-triangle',
                default => 'fa-info-circle',
            };
        }
    }

    public function render(): View
    {
        return view('core::components.design.alert');
    }
}
