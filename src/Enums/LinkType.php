<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum LinkType: int
{
    use EnumTools;

    case INTERNAL = 1;
    case EXTERNAL = 2;
}
