<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum PersonType: int
{
    use EnumTools;

    case REAL = 1;
    case LEGAL = 2;
}
