<div class="core-field mb-3 {{ $class }}"
     data-component="item-collector"
     data-name="{{ $name }}"
     data-min="{{ $minItems }}"
     @if($maxItems) data-max="{{ $maxItems }}" @endif
>
    @if($label)
        <div class="d-flex align-items-center justify-content-between mb-2">
            <label class="form-label mb-0 fw-bold">
                {{ $label }}
                @if($required)
                    <span class="text-danger ms-1" title="اجباری">*</span>
                @endif
            </label>
        </div>
    @endif

    <div class="core-item-collector-container d-flex flex-column gap-2 mb-2" id="{{ $elementId }}_items">
        @forelse($items as $index => $item)
            <div class="collector-row card p-2 bg-light border d-flex flex-row align-items-center gap-2">
                @if($sortable)
                    <div class="drag-handle text-muted cursor-grab px-1">
                        <i class="fa fa-grip-vertical"></i>
                    </div>
                @endif

                <div class="row g-2 flex-grow-1 align-items-center">
                    @foreach($fields as $field)
                        @php
                            $fName = $field['name'];
                            $fLabel = $field['label'] ?? $fName;
                            $fType = $field['type'] ?? 'text';
                            $fValue = is_array($item) ? ($item[$fName] ?? '') : ($item->{$fName} ?? '');
                            $inputName = "{$name}[{$index}][{$fName}]";
                        @endphp
                        <div class="col">
                            @if($fType === 'select')
                                <select name="{{ $inputName }}" class="form-select form-select-sm" required>
                                    <option value="">{{ $fLabel }}</option>
                                    @foreach($field['options'] ?? [] as $optVal => $optTitle)
                                        <option value="{{ $optVal }}" @if((string)$optVal === (string)$fValue) selected @endif>
                                            {{ $optTitle }}
                                        </option>
                                    @endforeach
                                </select>
                            @else
                                <input
                                    type="{{ $fType }}"
                                    name="{{ $inputName }}"
                                    value="{{ $fValue }}"
                                    placeholder="{{ $fLabel }}"
                                    class="form-control form-control-sm"
                                    required
                                >
                            @endif
                        </div>
                    @endforeach
                </div>

                @if($removable)
                    <button type="button" class="btn btn-sm btn-outline-danger btn-remove-row">
                        <i class="fa fa-trash"></i>
                    </button>
                @endif
            </div>
        @empty
            {{-- Initial row if minItems > 0 --}}
        @endforelse
    </div>

    <button type="button" class="btn btn-sm btn-outline-primary btn-add-row" data-target="{{ $elementId }}_items">
        <i class="fa fa-plus me-1"></i> {{ $addLabel }}
    </button>

    {{-- Hidden row template for JS --}}
    <template id="{{ $elementId }}_template">
        <div class="collector-row card p-2 bg-light border d-flex flex-row align-items-center gap-2">
            @if($sortable)
                <div class="drag-handle text-muted cursor-grab px-1">
                    <i class="fa fa-grip-vertical"></i>
                </div>
            @endif
            <div class="row g-2 flex-grow-1 align-items-center">
                @foreach($fields as $field)
                    @php
                        $fName = $field['name'];
                        $fLabel = $field['label'] ?? $fName;
                        $fType = $field['type'] ?? 'text';
                    @endphp
                    <div class="col">
                        @if($fType === 'select')
                            <select name="{{ $name }}[__INDEX__][{{ $fName }}]" class="form-select form-select-sm" required>
                                <option value="">{{ $fLabel }}</option>
                                @foreach($field['options'] ?? [] as $optVal => $optTitle)
                                    <option value="{{ $optVal }}">{{ $optTitle }}</option>
                                @endforeach
                            </select>
                        @else
                            <input
                                type="{{ $fType }}"
                                name="{{ $name }}[__INDEX__][{{ $fName }}]"
                                placeholder="{{ $fLabel }}"
                                class="form-control form-control-sm"
                                required
                            >
                        @endif
                    </div>
                @endforeach
            </div>
            @if($removable)
                <button type="button" class="btn btn-sm btn-outline-danger btn-remove-row">
                    <i class="fa fa-trash"></i>
                </button>
            @endif
        </div>
    </template>

    @if($resolvedError)
        <div class="invalid-feedback d-block">{{ $resolvedError }}</div>
    @endif

    @if($hint && !$resolvedError)
        <div class="form-text text-muted">{{ $hint }}</div>
    @endif
</div>
