<div class="core-field mb-3 {{ $class }}" data-component="checkbox-group" @if($min) data-min="{{ $min }}" @endif @if($max) data-max="{{ $max }}" @endif>
    @if($label || $selectAll)
        <div class="d-flex align-items-center justify-content-between mb-2">
            @if($label)
                <label class="form-label mb-0">
                    {{ $label }}
                    @if($required)
                        <span class="text-danger ms-1" title="اجباری">*</span>
                    @endif
                </label>
            @endif

            @if($selectAll && count($options) > 1)
                <button type="button" class="btn btn-sm btn-link text-decoration-none p-0 text-primary btn-select-all" data-target="{{ $elementId }}">
                    <i class="fa fa-check-double me-1"></i> انتخاب همه
                </button>
            @endif
        </div>
    @endif

    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-{{ $columns }} g-2" id="{{ $elementId }}">
        @foreach($options as $key => $opt)
            @php
                $optValue = is_array($opt) ? ($opt['id'] ?? $opt['value'] ?? $key) : (is_object($opt) ? ($opt->id ?? $opt->value ?? $key) : $key);
                $optLabel = is_array($opt) ? ($opt['title'] ?? $opt['name'] ?? $opt['label'] ?? $optValue) : (is_object($opt) ? ($opt->title ?? $opt->name ?? $opt->label ?? $optValue) : $opt);
                $optChecked = in_array((string) $optValue, array_map('strval', (array) $value), true);
                $itemInputId = $elementId . '_' . $loop->index;
            @endphp
            <div class="col">
                <div class="form-check">
                    <input
                        type="checkbox"
                        name="{{ $name }}"
                        id="{{ $itemInputId }}"
                        value="{{ $optValue }}"
                        @if($optChecked) checked @endif
                        @if($disabled) disabled @endif
                        class="form-check-input group-item {{ $resolvedError ? 'is-invalid' : '' }}"
                    >
                    <label class="form-check-label user-select-none" for="{{ $itemInputId }}">
                        {{ $optLabel }}
                    </label>
                </div>
            </div>
        @endforeach
    </div>

    @if($resolvedError)
        <div class="invalid-feedback d-block">{{ $resolvedError }}</div>
    @endif

    @if($hint && !$resolvedError)
        <div class="form-text text-muted">{{ $hint }}</div>
    @endif
</div>
