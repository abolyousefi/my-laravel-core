<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum FileDiskAuthType: int
{
    use EnumTools;

    case NO_AUTH = 0;
    case BASIC = 1;
    case SSH_KEY_BASED = 2;
}
