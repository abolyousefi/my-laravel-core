<div class="core-field mb-3 {{ $class }}">
    @if($label)
        <label for="{{ $elementId }}" class="form-label d-flex align-items-center justify-content-between">
            <span>
                {{ $label }}
                @if($required)
                    <span class="text-danger ms-1" title="اجباری">*</span>
                @endif
            </span>
        </label>
    @endif

    <div class="core-editor-wrapper"
         data-component="editor"
         data-height="{{ $height }}"
         data-toolbar="{{ is_array($toolbar) ? json_encode($toolbar) : $toolbar }}"
         data-direction="{{ $direction }}"
         @if($uploadRoute) data-upload-route="{{ $uploadRoute }}" @endif
         @if($maxLength) data-max-length="{{ $maxLength }}" @endif
    >
        <div class="core-editor-toolbar border rounded-top bg-light p-2 d-flex flex-wrap gap-1 align-items-center">
            <button type="button" class="btn btn-sm btn-light border" data-command="bold" title="بولد"><i class="fa fa-bold"></i></button>
            <button type="button" class="btn btn-sm btn-light border" data-command="italic" title="ایتالیک"><i class="fa fa-italic"></i></button>
            <button type="button" class="btn btn-sm btn-light border" data-command="underline" title="زیرخط"><i class="fa fa-underline"></i></button>
            <span class="vr mx-1"></span>
            <button type="button" class="btn btn-sm btn-light border" data-command="justifyRight" title="راست‌چین"><i class="fa fa-align-right"></i></button>
            <button type="button" class="btn btn-sm btn-light border" data-command="justifyCenter" title="وسط‌چین"><i class="fa fa-align-center"></i></button>
            <button type="button" class="btn btn-sm btn-light border" data-command="justifyLeft" title="چپ‌چین"><i class="fa fa-align-left"></i></button>
            <span class="vr mx-1"></span>
            <button type="button" class="btn btn-sm btn-light border" data-command="insertUnorderedList" title="لیست نقطه‌ای"><i class="fa fa-list-ul"></i></button>
            <button type="button" class="btn btn-sm btn-light border" data-command="insertOrderedList" title="لیست شماره‌ای"><i class="fa fa-list-ol"></i></button>
            <button type="button" class="btn btn-sm btn-light border" data-command="createLink" title="افزودن لینک"><i class="fa fa-link"></i></button>
            @if($uploadRoute)
                <button type="button" class="btn btn-sm btn-light border" data-command="insertImage" title="آپلود تصویر"><i class="fa fa-image"></i></button>
            @endif
            <button type="button" class="btn btn-sm btn-light border ms-auto" data-command="removeFormat" title="پاکسازی استایل"><i class="fa fa-eraser"></i></button>
        </div>

        <div class="core-editor-content border border-top-0 rounded-bottom p-3 bg-white"
             contenteditable="true"
             style="min-height: {{ $height }}px; max-height: {{ $height * 2 }}px; overflow-y: auto;"
             dir="{{ $direction }}"
        >{!! $value !!}</div>

        <textarea name="{{ $name }}" id="{{ $elementId }}" class="d-none" @if($required) required @endif>{{ $value }}</textarea>
    </div>

    @if($resolvedError)
        <div class="invalid-feedback d-block">{{ $resolvedError }}</div>
    @endif

    @if($hint && !$resolvedError)
        <div class="form-text text-muted">{{ $hint }}</div>
    @endif
</div>
