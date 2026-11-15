<div class="core-repeater-column {{ $class }}" data-column-name="{{ $name }}" data-column-type="{{ $type }}" @if($width) style="width: {{ $width }};" @endif>
    @if($label)
        <label class="core-label" for="{{ $elementId }}">
            {{ $label }}
            @if($required)<span class="core-required">*</span>@endif
        </label>
    @endif
    @if($slot->isNotEmpty())
        {{ $slot }}
    @elseif($type === 'select')
        <select id="{{ $elementId }}" name="{{ $name }}" class="core-select" @if($disabled) disabled @endif @if($required) required @endif>
            @foreach($options as $k => $v)
                <option value="{{ $k }}" @if((string)$value === (string)$k) selected @endif>{{ $v }}</option>
            @endforeach
        </select>
    @else
        <input type="{{ $type }}" id="{{ $elementId }}" name="{{ $name }}" value="{{ $value }}" placeholder="{{ $placeholder }}" class="core-input" @if($disabled) disabled @endif @if($readonly) readonly @endif @if($required) required @endif />
    @endif
</div>
