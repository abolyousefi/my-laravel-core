<div class="core-field mb-3 {{ $class }}">
    @if($label)
        <label for="{{ $elementId }}" class="form-label d-flex align-items-center justify-content-between">
            <span>
                {{ $label }}
                @if($required)
                    <span class="text-danger ms-1" title="اجباری">*</span>
                @endif
            </span>
            <small class="text-muted">حداکثر {{ round($maxSize / 1024, 1) }} مگابایت</small>
        </label>
    @endif

    <div class="core-file-picker position-relative border rounded p-3 text-center bg-light {{ $dropzone ? 'dropzone-active' : '' }}"
         data-component="file-picker"
         data-multiple="{{ $multiple ? 'true' : 'false' }}"
         data-max-size="{{ $maxSize }}"
         data-preview="{{ $preview ? 'true' : 'false' }}"
    >
        <input
            type="file"
            name="{{ $name }}{{ $multiple && !str_ends_with($name, '[]') ? '[]' : '' }}"
            id="{{ $elementId }}"
            class="position-absolute top-0 start-0 w-100 h-100 opacity-0 cursor-pointer core-file-input"
            accept="{{ $accept }}"
            @if($multiple) multiple @endif
            @if($required && empty($value)) required @endif
            @if($disabled) disabled @endif
        >

        <div class="file-picker-placeholder py-3">
            <div class="mb-2">
                <i class="fa fa-cloud-upload-alt fa-2x text-primary"></i>
            </div>
            <div class="fw-semibold">فایل را اینجا بکشید یا <span class="text-primary text-decoration-underline">کلیک کنید</span></div>
            <div class="text-muted small mt-1">فرمت‌های مجاز: {{ $accept === '*' ? 'همه فرمت‌ها' : $accept }}</div>
        </div>

        <div class="file-picker-preview-container d-flex flex-wrap gap-2 mt-2 justify-content-center">
            @if(!empty($value))
                @php
                    $values = is_array($value) ? $value : [$value];
                @endphp
                @foreach($values as $v)
                    <div class="file-preview-item position-relative border rounded p-2 bg-white shadow-sm d-flex align-items-center gap-2">
                        <i class="fa fa-file-alt text-primary"></i>
                        <span class="small text-truncate" style="max-width: 150px;">{{ basename($v) }}</span>
                    </div>
                @endforeach
            @endif
        </div>
    </div>

    @if($resolvedError)
        <div class="invalid-feedback d-block">{{ $resolvedError }}</div>
    @endif

    @if($hint && !$resolvedError)
        <div class="form-text text-muted">{{ $hint }}</div>
    @endif
</div>
