<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum CacheType
{
    use EnumTools;

    case ROLE;
    case PERMISSION;
    case PERMISSION_CATEGORY;
    case PERMISSION_TITLE;
    case ALL;
}
