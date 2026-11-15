<div class="core-tag-collector-input {{ $class }}" data-tag-field="{{ $name }}" data-tag-type="{{ $type }}">
    @if($label)
        <label class="core-label" for="{{ $elementId }}">{{ $label }}</label>
    @endif
    @if($type === 'select')
        <select id="{{ $elementId }}" name="{{ $name }}" class="core-select" @if($disabled) disabled @endif>
            @foreach($options as $k => $v)
                <option value="{{ $k }}">{{ $v }}</option>
            @endforeach
        </select>
    @else
        <input type="{{ $type }}" id="{{ $elementId }}" name="{{ $name }}" value="{{ $value }}" placeholder="{{ $placeholder }}" class="core-input" @if($disabled) disabled @endif />
    @endif
</div>
