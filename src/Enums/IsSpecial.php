<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum IsSpecial: int
{
    use EnumTools;

    case YES = 1;
    case NO = 0;
}
