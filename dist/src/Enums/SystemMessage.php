<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum SystemMessage: int
{
    use EnumTools;

    case FAIL = 0;
    case SUCCESS = 1;
    case INTERNAL_ERROR = 10;
    case DATA_NOT_FOUND = 11;
    case PAGE_NOT_FOUND = 12;
    case BAD_DATA = 13;
    case SELECT_INVALID_DATA = 14;
    case SELECT_INVALID_FILTER_CONFIGURATION = 15;
}
