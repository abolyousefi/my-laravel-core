<div class="core-audit-log {{ $class }}" id="{{ $elementId }}" data-component="audit-log" data-component-id="{{ $elementId }}">
    @if($title)
        <div class="core-audit-log-header">
            <h4 class="core-audit-log-title">{{ $title }}</h4>
        </div>
    @endif
    <div class="core-audit-log-body">
        @php $auditList = is_iterable($audits) ? $audits : []; @endphp
        @forelse($auditList as $index => $audit)
            @php
                $event = is_array($audit) ? ($audit['event'] ?? 'updated') : ($audit->event ?? 'updated');
                $user = is_array($audit) ? ($audit['user'] ?? 'سیستم') : ($audit->user->name ?? 'سیستم');
                $date = is_array($audit) ? ($audit['created_at'] ?? '') : ($audit->created_at ?? '');
                $changes = is_array($audit) ? ($audit['changes'] ?? []) : ($audit->changes ?? []);
            @endphp
            <div class="core-audit-item" data-audit-event="{{ $event }}">
                <div class="core-audit-meta">
                    <span class="core-audit-user">{{ $user }}</span>
                    <span class="core-audit-event badge badge-{{ $event }}">{{ $event }}</span>
                    <time class="core-audit-date">{{ $date }}</time>
                </div>
                @if($showDetailModal && !empty($changes))
                    <button type="button" class="core-btn core-btn-xs core-audit-detail-trigger" data-audit-changes="{{ json_encode($changes) }}">
                        مشاهده جزئیات
                    </button>
                @endif
            </div>
        @empty
            <div class="core-audit-empty">{{ $emptyText }}</div>
        @endforelse
        {{ $slot }}
    </div>
</div>
