<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum IsRead: int
{
    use EnumTools;

    case READ = 1;
    case NOT_READ = 0;
}
