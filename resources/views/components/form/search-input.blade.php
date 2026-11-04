<div class="core-field core-search-field {{ $class }}" data-component="search-input" data-component-id="{{ $elementId }}" data-ajax-url="{{ $ajaxUrl }}" data-min-chars="{{ $minChars }}" data-debounce="{{ $debounce }}">
    @if($label)
        <label class="core-label" for="{{ $elementId }}" data-label-for="{{ $elementId }}">{{ $label }}</label>
    @endif
    <div class="core-search-box">
        <span class="core-search-icon">🔍</span>
        <input
            type="search"
            id="{{ $elementId }}"
            name="{{ $name }}"
            value="{{ $value }}"
            placeholder="{{ $placeholder }}"
            class="core-input core-search-input"
            @if($disabled) disabled @endif
            @if($readonly) readonly @endif
            {{ $attributes }}
        />
        @if($clearable)
            <button type="button" class="core-search-clear" data-clear-search="{{ $elementId }}" aria-label="پاک کردن">×</button>
        @endif
    </div>
    <div class="core-search-results" data-results-for="{{ $elementId }}"></div>
    @if($hint)<small class="core-hint" data-hint-for="{{ $elementId }}">{{ $hint }}</small>@endif
</div>
