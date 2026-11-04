<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum BooleanState: int
{
    use EnumTools;

    case TRUE = 1;
    case FALSE = 0;
}
