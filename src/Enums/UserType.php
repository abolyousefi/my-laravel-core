<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum UserType: int
{
    use EnumTools;

    case ALL = 0;
    case USERS = 1;
}
