<div class="core-field mb-3 {{ $class }}"
     data-component="nested-selects"
     @if($routeName) data-route="{{ route($routeName) }}" @endif
     data-label-col="{{ $labelColumn }}"
     data-parent-col="{{ $parentColumn }}"
>
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

    <div class="nested-selects-container d-flex flex-column gap-2" id="{{ $elementId }}_container">
        <select
            name="{{ $name }}"
            id="{{ $elementId }}"
            class="form-select nested-level-0 {{ $resolvedError ? 'is-invalid' : '' }}"
            @if($required) required @endif
            @if($disabled) disabled @endif
        >
            <option value="">{{ $placeholder }} (سطح ۱)</option>
            @if($source && class_exists($source))
                @php
                    $rootItems = $source::whereNull($parentColumn)->orWhere($parentColumn, 0)->get();
                @endphp
                @foreach($rootItems as $root)
                    <option value="{{ $root->id }}" @if((string)$root->id === (string)$value) selected @endif>
                        {{ $root->{$labelColumn} }}
                    </option>
                @endforeach
            @endif
        </select>
    </div>

    @if($resolvedError)
        <div class="invalid-feedback d-block">{{ $resolvedError }}</div>
    @endif

    @if($hint && !$resolvedError)
        <div class="form-text text-muted">{{ $hint }}</div>
    @endif
</div>
