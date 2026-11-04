<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum SettingType: int
{
    use EnumTools;

    case TEXT = 1;
    case NUMBER = 2;
    case RADIO_GROUP = 3;
    case IMAGE = 4;
    case FILE = 5;
    case SELECT = 6;
    case MULTI_SELECT = 7;
    case TEXTAREA = 8;
    case EDITOR = 9;
    case JSON = 10;
}
