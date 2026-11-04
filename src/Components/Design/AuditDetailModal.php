<?php

namespace MyLaravelCore\Components\Design;

use MyLaravelCore\Components\BaseComponent;

class AuditDetailModal extends BaseComponent
{
    public string $elementId;
    public string $title;
    public string $size;

    public function __construct(
        string $title = 'جزئیات تغییرات (Audit)',
        string $size = 'lg',
        ?string $id = null,
        ?string $class = null,
        ?string $error = null,
        ?string $permission = null
    ) {
        parent::__construct($id, $class, $error, $permission);
        $this->title = $title;
        $this->size = $size;
        $this->elementId = $this->resolveId('audit-detail-modal');
    }

    public function render()
    {
        return view('core::components.design.audit-detail-modal');
    }
}