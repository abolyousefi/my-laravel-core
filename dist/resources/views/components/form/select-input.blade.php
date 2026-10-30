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

    <div class="core-select-wrapper position-relative">
        <select
            name="{{ $name }}{{ $multiple && !str_ends_with($name, '[]') ? '[]' : '' }}"
            id="{{ $elementId }}"
            dir="{{ $dir }}"
            @if($multiple) multiple @endif
            @if($required) required @endif
            @if($disabled) disabled @endif
            {{ $attributes->merge(['class' => 'form-select core-select' . ($resolvedError ? ' is-invalid' : '')]) }}
            data-component="select-input"
            data-searchable="{{ $searchable ? 'true' : 'false' }}"
            data-clearable="{{ $clearable ? 'true' : 'false' }}"
            data-placeholder="{{ $placeholder }}"
            @if($ajaxRoute) data-ajax-route="{{ $ajaxRoute }}" @endif
            @if($parentField) data-parent-field="{{ $parentField }}" @endif
            @if($parentRoute) data-parent-route="{{ $parentRoute }}" @endif
            @if($tags) data-tags="true" @endif
            @if($maxSelections) data-max-selections="{{ $maxSelections }}" @endif
        >
            @if(!$multiple && $placeholder)
                <option value="">{{ $placeholder }}</option>
            @endif

            @foreach($options as $key => $opt)
                @php
                    $optValue = is_array($opt) ? ($opt['id'] ?? $opt['value'] ?? $key) : (is_object($opt) ? ($opt->id ?? $opt->value ?? $key) : $key);
                    $optLabel = is_array($opt) ? ($opt['title'] ?? $opt['name'] ?? $opt['label'] ?? $optValue) : (is_object($opt) ? ($opt->title ?? $opt->name ?? $opt->label ?? $optValue) : $opt);
                    $isSelected = false;
                    if ($multiple && is_array($value)) {
                        $isSelected = in_array((string) $optValue, array_map('strval', $value), true);
                    } else {
                        $isSelected = ((string) $optValue === (string) $value);
                    }
                @endphp
                <option value="{{ $optValue }}" @if($isSelected) selected @endif>
                    {{ $optLabel }}
                </option>
            @endforeach
        </select>

        @if($resolvedError)
            <div class="invalid-feedback d-block">{{ $resolvedError }}</div>
        @endif
    </div>

    @if($hint && !$resolvedError)
        <div class="form-text text-muted">{{ $hint }}</div>
    @endif
</div>
