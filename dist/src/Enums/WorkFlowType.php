<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum WorkFlowType: int
{
    use EnumTools;

    case VIEW = 1;
    case CHANGE = 2;
    case SET = 3;
}
