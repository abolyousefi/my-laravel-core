<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum DeleteDependencyMode: int
{
    use EnumTools;

    case FIRST = 1;
    case ALL = 2;
    case GENERAL = 3;
}
