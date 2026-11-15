<?php

namespace MyLaravelCore\Components\Form;

class SearchInput extends BaseFormComponent
{
    public ?string $placeholder;
    public ?string $ajaxUrl;
    public int $minChars;
    public int $debounce;
    public bool $clearable;

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
        ?string $placeholder = 'جستجو...',
        ?string $ajaxUrl = null,
        int $minChars = 2,
        int $debounce = 300,
        bool $clearable = true
    ) {
        parent::__construct($name, $label, $value, $required, $disabled, $readonly, $hint, $dir, $id, $class, $error, $permission);
        $this->placeholder = $placeholder;
        $this->ajaxUrl = $ajaxUrl;
        $this->minChars = $minChars;
        $this->debounce = $debounce;
        $this->clearable = $clearable;
    }

    public function render()
    {
        return view('core::components.form.search-input');
    }
}