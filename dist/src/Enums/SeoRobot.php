<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum SeoRobot: int
{
    use EnumTools;

    case INDEX_FOLLOW = 1;
    case INDEX_NOFOLLOW = 2;
    case NOINDEX_FOLLOW = 3;
    case NOINDEX_NOFOLLOW = 4;
}
