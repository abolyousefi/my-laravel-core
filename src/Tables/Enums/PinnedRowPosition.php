<?php

namespace MyLaravelCore\Tables\Enums;

use MyLaravelCore\Traits\EnumTools;

enum PinnedRowPosition: string
{
    use EnumTools;

    case TOP = 'top';
    case BOTTOM = 'bottom';
}