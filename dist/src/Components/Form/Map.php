<?php

namespace MyLaravelCore\Components\Form;

class Map extends BaseFormComponent
{
    public float $lat;
    public float $lng;
    public int $zoom;
    public string $height;
    public string $mode;
    public bool $searchable;
    public bool $editable;
    public ?array $boundary;
    public string $tileUrl;

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
        float $lat = 35.6892,
        float $lng = 51.3890,
        int $zoom = 13,
        string $height = '360px',
        string $mode = 'point',
        bool $searchable = true,
        bool $editable = true,
        ?array $boundary = null,
        string $tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    ) {
        parent::__construct($name, $label, $value, $required, $disabled, $readonly, $hint, $dir, $id, $class, $error, $permission);
        $this->lat = $lat;
        $this->lng = $lng;
        $this->zoom = $zoom;
        $this->height = $height;
        $this->mode = $mode;
        $this->searchable = $searchable;
        $this->editable = $editable;
        $this->boundary = $boundary;
        $this->tileUrl = $tileUrl;
    }

    public function render()
    {
        return view('core::components.form.map');
    }
}