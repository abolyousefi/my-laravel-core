<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum FileFormat: string
{
    use EnumTools;

    case EXCEL = 'excel';
    case HTML = 'html';
    case CSV = 'csv';
    case XML = 'xml';
    case PDF = 'pdf';
}
