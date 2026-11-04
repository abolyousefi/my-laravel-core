<?php

namespace MyLaravelCore\Tables\Enums;

use MyLaravelCore\Traits\EnumTools;

enum Driver: string
{
    use EnumTools;

    case MODEL = 'model';
    case RAW = 'raw';
    case API = 'api';
}