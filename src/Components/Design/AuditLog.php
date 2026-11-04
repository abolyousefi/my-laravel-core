<?php

namespace MyLaravelCore\Components\Design;

use MyLaravelCore\Components\BaseComponent;

class AuditLog extends BaseComponent
{
    public string $elementId;
    public iterable $audits;
    public mixed $model;
    public string $title;
    public string $emptyText;
    public bool $showDetailModal;

    public function __construct(
        iterable $audits = [],
        mixed $model = null,
        string $title = 'تاریخچه تغییرات',
        string $emptyText = 'هیچ تغییری ثبت نشده است.',
        bool $showDetailModal = true,
        ?string $id = null,
        ?string $class = null,
        ?string $error = null,
        ?string $permission = null
    ) {
        parent::__construct($id, $class, $error, $permission);
        $this->audits = $audits;
        $this->model = $model;
        $this->title = $title;
        $this->emptyText = $emptyText;
        $this->showDetailModal = $showDetailModal;
        $this->elementId = $this->resolveId('audit-log');
    }

    public function render()
    {
        return view('core::components.design.audit-log');
    }
}