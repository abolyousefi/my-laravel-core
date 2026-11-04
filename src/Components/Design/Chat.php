<?php

namespace MyLaravelCore\Components\Design;

use MyLaravelCore\Components\BaseComponent;

class Chat extends BaseComponent
{
    public string $elementId;
    public iterable $messages;
    public int|string|null $currentUserId;
    public string $title;
    public string $placeholder;
    public ?string $sendUrl;
    public bool $allowAttachment;
    public string $height;

    public function __construct(
        iterable $messages = [],
        int|string|null $currentUserId = null,
        string $title = 'گفتگو',
        string $placeholder = 'پیام خود را بنویسید...',
        ?string $sendUrl = null,
        bool $allowAttachment = true,
        string $height = '420px',
        ?string $id = null,
        ?string $class = null,
        ?string $error = null,
        ?string $permission = null
    ) {
        parent::__construct($id, $class, $error, $permission);
        $this->messages = $messages;
        $this->currentUserId = $currentUserId;
        $this->title = $title;
        $this->placeholder = $placeholder;
        $this->sendUrl = $sendUrl;
        $this->allowAttachment = $allowAttachment;
        $this->height = $height;
        $this->elementId = $this->resolveId('chat');
    }

    public function render()
    {
        return view('core::components.design.chat');
    }
}