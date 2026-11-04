<div class="core-chat {{ $class }}" id="{{ $elementId }}" data-component="chat" data-component-id="{{ $elementId }}" data-send-url="{{ $sendUrl }}">
    @if($title)
        <div class="core-chat-header">
            <h5 class="core-chat-title">{{ $title }}</h5>
        </div>
    @endif
    <div class="core-chat-messages" style="max-height: {{ $height }};" data-chat-messages="{{ $elementId }}">
        @foreach($messages as $msg)
            @php
                $senderId = is_array($msg) ? ($msg['user_id'] ?? null) : ($msg->user_id ?? null);
                $senderName = is_array($msg) ? ($msg['sender'] ?? 'کاربر') : ($msg->sender ?? 'کاربر');
                $text = is_array($msg) ? ($msg['text'] ?? $msg['body'] ?? '') : ($msg->text ?? $msg->body ?? '');
                $time = is_array($msg) ? ($msg['time'] ?? '') : ($msg->time ?? '');
                $isMine = $currentUserId !== null && (string)$senderId === (string)$currentUserId;
            @endphp
            <div class="core-chat-bubble {{ $isMine ? 'is-mine' : 'is-other' }}">
                <div class="core-chat-sender">{{ $senderName }}</div>
                <div class="core-chat-text">{{ $text }}</div>
                @if($time)<span class="core-chat-time">{{ $time }}</span>@endif
            </div>
        @endforeach
        {{ $slot }}
    </div>
    <div class="core-chat-footer">
        @if($allowAttachment)
            <label class="core-chat-attach-btn" title="پیوست فایل">
                📎 <input type="file" class="core-chat-file-input" hidden />
            </label>
        @endif
        <input type="text" class="core-input core-chat-input" placeholder="{{ $placeholder }}" data-chat-input="{{ $elementId }}" />
        <button type="button" class="core-btn core-btn-primary core-chat-send" data-chat-send="{{ $elementId }}">ارسال</button>
    </div>
</div>
