<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum ImportFieldType: string
{
    use EnumTools;

    case TEXT = 'text';
    case LINK = 'link';
}
