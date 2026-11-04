<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum Source: string
{
    use EnumTools;

    case LOCAL = 'local';
    case DATABASE = 'database';
}
