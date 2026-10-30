<div class="core-field mb-3 {{ $class }}"
     data-component="tag-collector"
     data-name="{{ $name }}"
     data-suggestions="{{ json_encode($suggestions) }}"
     data-allow-custom="{{ $allowCustom ? 'true' : 'false' }}"
>
    @if($label)
        <label class="form-label mb-2 fw-bold">
            {{ $label }}
            @if($required)
                <span class="text-danger ms-1" title="اجباری">*</span>
            @endif
        </label>
    @endif

    <div class="tag-collector-rows d-flex flex-column gap-2 mb-2" id="{{ $elementId }}_tags">
        @php $tagIndex = 0; @endphp
        @foreach($tags as $key => $val)
            @php
                $tagKey = is_array($val) ? ($val['key'] ?? $key) : $key;
                $tagVal = is_array($val) ? ($val['value'] ?? '') : $val;
            @endphp
            <div class="tag-row d-flex align-items-center gap-2">
                <input
                    type="text"
                    name="{{ $name }}[{{ $tagIndex }}][key]"
                    value="{{ $tagKey }}"
                    placeholder="{{ $keyLabel }}"
                    class="form-control form-control-sm"
                    style="max-width: 180px;"
                    required
                >
                <input
                    type="text"
                    name="{{ $name }}[{{ $tagIndex }}][value]"
                    value="{{ $tagVal }}"
                    placeholder="{{ $valueLabel }}"
                    class="form-control form-control-sm flex-grow-1"
                    required
                >
                <button type="button" class="btn btn-sm btn-outline-danger btn-remove-tag">
                    <i class="fa fa-times"></i>
                </button>
            </div>
            @php $tagIndex++; @endphp
        @endforeach
    </div>

    <button type="button" class="btn btn-sm btn-outline-primary btn-add-tag">
        <i class="fa fa-plus me-1"></i> افزودن {{ $keyLabel }} / {{ $valueLabel }}
    </button>

    <template id="{{ $elementId }}_tag_template">
        <div class="tag-row d-flex align-items-center gap-2">
            <input
                type="text"
                name="{{ $name }}[__INDEX__][key]"
                placeholder="{{ $keyLabel }}"
                class="form-control form-control-sm"
                style="max-width: 180px;"
                required
            >
            <input
                type="text"
                name="{{ $name }}[__INDEX__][value]"
                placeholder="{{ $valueLabel }}"
                class="form-control form-control-sm flex-grow-1"
                required
            >
            <button type="button" class="btn btn-sm btn-outline-danger btn-remove-tag">
                <i class="fa fa-times"></i>
            </button>
        </div>
    </template>

    @if($resolvedError)
        <div class="invalid-feedback d-block">{{ $resolvedError }}</div>
    @endif

    @if($hint && !$resolvedError)
        <div class="form-text text-muted">{{ $hint }}</div>
    @endif
</div>
