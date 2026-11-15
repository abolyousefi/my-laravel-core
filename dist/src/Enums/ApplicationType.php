<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum ApplicationType: string
{
    use EnumTools;

    case PANEL = 'panel';
    case API = 'api';
}
