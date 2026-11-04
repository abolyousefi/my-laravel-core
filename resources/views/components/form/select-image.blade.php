<div class="core-field core-select-image {{ $class }}" id="{{ $elementId }}" data-component="select-image" data-component-id="{{ $elementId }}">
    @if($label)
        <label class="core-label" data-label-for="{{ $elementId }}">
            {{ $label }}
            @if($required)<span class="core-required">*</span>@endif
        </label>
    @endif
    <div class="core-select-image-grid" style="grid-template-columns: repeat({{ $columns }}, minmax(0, 1fr));">
        @php $selectedValues = is_array($value) ? $value : ($value !== null ? [$value] : []); @endphp
        @foreach($options as $optKey => $opt)
            @php
                $optVal = is_array($opt) ? ($opt['value'] ?? $optKey) : $optKey;
                $optImg = is_array($opt) ? ($opt['image'] ?? $opt['src'] ?? '') : $opt;
                $optTitle = is_array($opt) ? ($opt['label'] ?? $opt['title'] ?? $optVal) : $optKey;
                $isChecked = in_array((string) $optVal, array_map('strval', $selectedValues), true);
            @endphp
            <label class="core-select-image-card {{ $isChecked ? 'is-selected' : '' }}">
                <input
                    type="{{ $multiple ? 'checkbox' : 'radio' }}"
                    name="{{ $multiple ? $name . '[]' : $name }}"
                    value="{{ $optVal }}"
                    class="core-select-image-input"
                    @if($isChecked) checked @endif
                    @if($disabled) disabled @endif
                />
                @if($optImg)
                    <img src="{{ $optImg }}" alt="{{ $optTitle }}" class="core-select-image-thumb" />
                @endif
                <span class="core-select-image-title">{{ $optTitle }}</span>
            </label>
        @endforeach
    </div>
    @if($hint)<small class="core-hint" data-hint-for="{{ $elementId }}">{{ $hint }}</small>@endif
    @if($resolvedError)<span class="core-error" data-error-for="{{ $elementId }}">{{ $resolvedError }}</span>@endif
</div>
