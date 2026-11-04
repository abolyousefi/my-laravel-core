<?php

namespace MyLaravelCore\Components\Form;

class ImagePicker extends BaseFormComponent
{
    public string $accept;
    public int $maxSize;
    public ?string $aspectRatio;
    public bool $cropper;
    public ?int $width;
    public ?int $height;
    public bool $multiple;

    public function __construct(
        string $name = 'field',
        ?string $label = null,
        mixed $value = null,
        bool $required = false,
        bool $disabled = false,
        bool $readonly = false,
        ?string $hint = null,
        string $dir = 'auto',
        ?string $id = null,
        ?string $class = null,
        ?string $error = null,
        ?string $permission = null,
        string $accept = 'image/png,image/jpeg,image/webp',
        int $maxSize = 5120,
        ?string $aspectRatio = null,
        bool $cropper = false,
        ?int $width = null,
        ?int $height = null,
        bool $multiple = false
    ) {
        parent::__construct($name, $label, $value, $required, $disabled, $readonly, $hint, $dir, $id, $class, $error, $permission);
        $this->accept = $accept;
        $this->maxSize = $maxSize;
        $this->aspectRatio = $aspectRatio;
        $this->cropper = $cropper;
        $this->width = $width;
        $this->height = $height;
        $this->multiple = $multiple;
    }

    public function render()
    {
        return view('core::components.form.image-picker');
    }
}