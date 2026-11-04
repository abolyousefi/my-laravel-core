<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum FileType: int
{
    use EnumTools;

    case GENERAL = 0;
    case USER = 1;
    case USER_DOCUMENT = 2;
    case SETTING = 3;
}
