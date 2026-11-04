<div class="core-field core-repeater {{ $class }}" id="{{ $elementId }}" data-component="repeater-inputs" data-component-id="{{ $elementId }}" data-name="{{ $name }}" data-min-items="{{ $minItems }}" data-max-items="{{ $maxItems }}" data-sortable="{{ $sortable ? 'true' : 'false' }}">
    @if($label)
        <label class="core-label" data-label-for="{{ $elementId }}">
            {{ $label }}
            @if($required)<span class="core-required">*</span>@endif
        </label>
    @endif
    <div class="core-repeater-rows" data-repeater-list="{{ $name }}">
        {{ $slot }}
    </div>
    @if(!$disabled && !$readonly)
        <div class="core-repeater-actions">
            <button type="button" class="core-btn core-btn-outline-primary core-btn-sm core-repeater-add" data-repeater-add="{{ $elementId }}">
                + {{ $addButtonText }}
            </button>
        </div>
    @endif
    @if($hint)<small class="core-hint" data-hint-for="{{ $elementId }}">{{ $hint }}</small>@endif
    @if($resolvedError)<span class="core-error" data-error-for="{{ $elementId }}">{{ $resolvedError }}</span>@endif
</div>
