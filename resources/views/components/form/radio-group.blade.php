<div class="core-field mb-3 {{ $class }}" data-component="radio-group">
    @if($label)
        <label class="form-label d-block mb-2">
            {{ $label }}
            @if($required)
                <span class="text-danger ms-1" title="اجباری">*</span>
            @endif
        </label>
    @endif

    <div class="@if($inline) d-flex flex-wrap gap-3 @else row row-cols-1 row-cols-md-{{ $columns }} g-2 @endif" id="{{ $elementId }}">
        @foreach($options as $key => $opt)
            @php
                $optValue = is_array($opt) ? ($opt['id'] ?? $opt['value'] ?? $key) : (is_object($opt) ? ($opt->id ?? $opt->value ?? $key) : $key);
                $optLabel = is_array($opt) ? ($opt['title'] ?? $opt['name'] ?? $opt['label'] ?? $optValue) : (is_object($opt) ? ($opt->title ?? $opt->name ?? $opt->label ?? $optValue) : $opt);
                $optChecked = ((string) $optValue === (string) $value);
                $itemRadioId = $elementId . '_' . $loop->index;
            @endphp
            <div class="{{ $inline ? '' : 'col' }}">
                <div class="form-check form-check-{{ $variant }} {{ $inline ? 'form-check-inline' : '' }}">
                    <input
                        type="radio"
                        name="{{ $name }}"
                        id="{{ $itemRadioId }}"
                        value="{{ $optValue }}"
                        @if($optChecked) checked @endif
                        @if($disabled) disabled @endif
                        class="form-check-input {{ $resolvedError ? 'is-invalid' : '' }}"
                    >
                    <label class="form-check-label user-select-none" for="{{ $itemRadioId }}">
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
