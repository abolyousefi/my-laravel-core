<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum DestroyType: int
{
    use EnumTools;

    case ATOMIC = 1;
    case PARTIAL = 2;
}
