<div class="core-modal core-audit-detail-modal {{ $class }}" id="{{ $elementId }}" data-component="audit-detail-modal" data-component-id="{{ $elementId }}" role="dialog" aria-hidden="true">
    <div class="core-modal-dialog core-modal-{{ $size }}">
        <div class="core-modal-content">
            <div class="core-modal-header">
                <h5 class="core-modal-title">{{ $title }}</h5>
                <button type="button" class="core-modal-close" data-modal-close="{{ $elementId }}">×</button>
            </div>
            <div class="core-modal-body" data-audit-detail-body="{{ $elementId }}">
                <table class="core-table core-audit-diff-table">
                    <thead>
                        <tr>
                            <th>فیلد</th>
                            <th>مقدار قبلی</th>
                            <th>مقدار جدید</th>
                        </tr>
                    </thead>
                    <tbody data-audit-diff-rows="{{ $elementId }}">
                        {{ $slot }}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>
