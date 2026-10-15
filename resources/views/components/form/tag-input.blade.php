<div class="core-field mb-3 {{ $class }}">
    @if($label)
        <label for="{{ $elementId }}" class="form-label d-flex align-items-center justify-content-between">
            <span>
                {{ $label }}
                @if($required)
                    <span class="text-danger ms-1" title="اجباری">*</span>
                @endif
            </span>
            @if($maxTags)
                <small class="text-muted">حداکثر {{ $maxTags }} برچسب</small>
            @endif
        </label>
    @endif

    <div class="core-tag-input-container border rounded p-2 bg-white d-flex flex-wrap align-items-center gap-1 {{ $resolvedError ? 'border-danger' : '' }}"
         data-component="tag-input"
         data-separator="{{ $separator }}"
         @if($maxTags) data-max-tags="{{ $maxTags }}" @endif
         data-allow-custom="{{ $allowCustom ? 'true' : 'false' }}"
    >
        <div class="tags-badge-wrapper d-flex flex-wrap gap-1">
            @foreach((array)$value as $tagItem)
                @if(trim($tagItem) !== '')
                    <span class="badge bg-primary d-inline-flex align-items-center gap-1 py-1 px-2">
                        <span>{{ trim($tagItem) }}</span>
                        <i class="fa fa-times cursor-pointer btn-remove-single-tag" style="font-size: 0.75rem;"></i>
                    </span>
                @endif
            @endforeach
        </div>

        <input
            type="text"
            class="tag-text-input border-0 flex-grow-1 p-1 outline-none"
            placeholder="برچسب را وارد کرده و Enter بزنید..."
            style="min-width: 150px; outline: none;"
            @if(!empty($suggestions)) list="{{ $elementId }}_list" @endif
        >

        @if(!empty($suggestions))
            <datalist id="{{ $elementId }}_list">
                @foreach($suggestions as $sug)
                    <option value="{{ $sug }}"></option>
                @endforeach
            </datalist>
        @endif

        {{-- Hidden input holding serialized value --}}
        <input
            type="hidden"
            name="{{ $name }}"
            id="{{ $elementId }}"
            value="{{ is_array($value) ? implode($separator, $value) : $value }}"
            @if($required) required @endif
        >
    </div>

    @if($resolvedError)
        <div class="invalid-feedback d-block">{{ $resolvedError }}</div>
    @endif

    @if($hint && !$resolvedError)
        <div class="form-text text-muted">{{ $hint }}</div>
    @endif
</div>
