@php
    $plateVal = is_array($value) ? $value : ['part1' => '', 'letter' => 'ب', 'part2' => '', 'iran' => ''];
    $letters = ['الف','ب','پ','ت','ث','ج','د','ز','س','ش','ص','ط','ع','ف','ق','ک','گ','ل','م','ن','و','ه','ی',' معلولین','تشریفات','D','S'];
@endphp
<div class="core-field core-plate-field {{ $class }}" id="{{ $elementId }}" data-component="plate-input" data-component-id="{{ $elementId }}" data-plate-type="{{ $plateType }}">
    @if($label)
        <label class="core-label" data-label-for="{{ $elementId }}">
            {{ $label }}
            @if($required)<span class="core-required">*</span>@endif
        </label>
    @endif
    <div class="core-plate-box core-plate-{{ $plateType }}" dir="ltr">
        <span class="core-plate-flag">I.R. IRAN</span>
        <input type="text" name="{{ $name }}[part1]" value="{{ $plateVal['part1'] ?? '' }}" maxlength="2" placeholder="12" class="core-plate-part core-plate-part1" @if($disabled) disabled @endif @if($readonly) readonly @endif />
        <select name="{{ $name }}[letter]" class="core-plate-letter" @if($disabled) disabled @endif>
            @foreach($letters as $ltr)
                <option value="{{ $ltr }}" @if(($plateVal['letter'] ?? '') === $ltr) selected @endif>{{ $ltr }}</option>
            @endforeach
        </select>
        <input type="text" name="{{ $name }}[part2]" value="{{ $plateVal['part2'] ?? '' }}" maxlength="3" placeholder="345" class="core-plate-part core-plate-part2" @if($disabled) disabled @endif @if($readonly) readonly @endif />
        <div class="core-plate-iran">
            <small>ایران</small>
            <input type="text" name="{{ $name }}[iran]" value="{{ $plateVal['iran'] ?? '' }}" maxlength="2" placeholder="67" class="core-plate-part core-plate-iran-code" @if($disabled) disabled @endif @if($readonly) readonly @endif />
        </div>
    </div>
    @if($hint)<small class="core-hint" data-hint-for="{{ $elementId }}">{{ $hint }}</small>@endif
    @if($resolvedError)<span class="core-error" data-error-for="{{ $elementId }}">{{ $resolvedError }}</span>@endif
</div>
