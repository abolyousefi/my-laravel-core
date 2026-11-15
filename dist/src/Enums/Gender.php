<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum Gender: int
{
    use EnumTools;

    case FEMALE = 0;
    case MALE = 1;
}
