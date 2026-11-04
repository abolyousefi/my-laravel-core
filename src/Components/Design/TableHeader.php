<?php

namespace MyLaravelCore\Components\Design;

use MyLaravelCore\Components\BaseComponent;

class TableHeader extends BaseComponent
{
    public string $elementId;
    public string $title;
    public ?string $subtitle;
    public ?int $totalCount;
    public bool $searchable;
    public string $searchName;
    public string $searchPlaceholder;
    public ?string $exportUrl;
    public ?string $createUrl;
    public string $createLabel;

    public function __construct(
        string $title = '',
        ?string $subtitle = null,
        ?int $totalCount = null,
        bool $searchable = true,
        string $searchName = 'search',
        string $searchPlaceholder = 'جستجو در جدول...',
        ?string $exportUrl = null,
        ?string $createUrl = null,
        string $createLabel = 'ایجاد مورد جدید',
        ?string $id = null,
        ?string $class = null,
        ?string $error = null,
        ?string $permission = null
    ) {
        parent::__construct($id, $class, $error, $permission);
        $this->title = $title;
        $this->subtitle = $subtitle;
        $this->totalCount = $totalCount;
        $this->searchable = $searchable;
        $this->searchName = $searchName;
        $this->searchPlaceholder = $searchPlaceholder;
        $this->exportUrl = $exportUrl;
        $this->createUrl = $createUrl;
        $this->createLabel = $createLabel;
        $this->elementId = $this->resolveId('table-header');
    }

    public function render()
    {
        return view('core::components.design.table-header');
    }
}