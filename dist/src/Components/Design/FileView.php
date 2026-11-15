<?php

namespace MyLaravelCore\Components\Design;

use Illuminate\Contracts\View\View;
use MyLaravelCore\Components\BaseComponent;

class FileView extends BaseComponent
{
    public function __construct(
        public string $name,
        public string $url,
        public ?int $size = null, // KB
        public ?string $type = null,
        public ?string $icon = 'auto',
        public bool $downloadable = true,
        public bool $deletable = false,
        ?string $id = null,
        ?string $class = null
    ) {
        parent::__construct($id, $class);

        if ($this->icon === 'auto') {
            $ext = strtolower($this->type ?: pathinfo($name, PATHINFO_EXTENSION));
            $this->icon = match ($ext) {
                'pdf' => 'fa-file-pdf',
                'doc', 'docx' => 'fa-file-word',
                'xls', 'xlsx' => 'fa-file-excel',
                'zip', 'rar' => 'fa-file-archive',
                'jpg', 'jpeg', 'png', 'webp' => 'fa-file-image',
                default => 'fa-file',
            };
        }
    }

    public function render(): View
    {
        return view('core::components.design.file');
    }
}
