<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum ReactionType: int
{
    use EnumTools;

    case LIKE = 1;
    case DISLIKE = 2;
}
