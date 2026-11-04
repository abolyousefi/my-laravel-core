<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum LogType: int
{
    use EnumTools;

    case CREATE = 1;
    case UPDATE = 2;
    case DELETE = 3;
}
