@php
    $iconClasses = 'fa ' . $name
        . ($size !== 'md' ? ' fa-' . $size : '')
        . ($color ? ' text-' . $color : '')
        . ($spin ? ' fa-spin' : '')
        . ($flip ? ' fa-flip-' . $flip : '')
        . ($rotate ? ' fa-rotate-' . $rotate : '')
        . ($fixedWidth ? ' fa-fw' : '')
        . ' ' . $class;
@endphp
<i class="{{ trim($iconClasses) }}" id="{{ $id }}" {{ $attributes }}></i>
