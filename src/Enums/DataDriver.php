<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum DataDriver: string
{
    use EnumTools;

    case MODEL = 'model';
    case RAW = 'raw';
    case COLLECTION = 'collection';
    case ARRAY = 'array';
}
