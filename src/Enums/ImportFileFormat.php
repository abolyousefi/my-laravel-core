<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum ImportFileFormat: string
{
    use EnumTools;

    case EXCEL = 'excel';
    case CSV = 'csv';
}
