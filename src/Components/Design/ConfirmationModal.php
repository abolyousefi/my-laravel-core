<?php

namespace MyLaravelCore\Components\Design;

use MyLaravelCore\Components\BaseComponent;

class ConfirmationModal extends BaseComponent
{
    public string $elementId;
    public string $title;
    public string $message;
    public string $confirmText;
    public string $cancelText;
    public string $variant;
    public ?string $actionUrl;
    public string $method;

    public function __construct(
        string $title = 'تأیید عملیات',
        string $message = 'آیا از انجام این عملیات اطمینان دارید؟',
        string $confirmText = 'بله، تأیید',
        string $cancelText = 'انصراف',
        string $variant = 'danger',
        ?string $actionUrl = null,
        string $method = 'POST',
        ?string $id = null,
        ?string $class = null,
        ?string $error = null,
        ?string $permission = null
    ) {
        parent::__construct($id, $class, $error, $permission);
        $this->title = $title;
        $this->message = $message;
        $this->confirmText = $confirmText;
        $this->cancelText = $cancelText;
        $this->variant = $variant;
        $this->actionUrl = $actionUrl;
        $this->method = $method;
        $this->elementId = $this->resolveId('confirmation-modal');
    }

    public function render()
    {
        return view('core::components.design.confirmation-modal');
    }
}