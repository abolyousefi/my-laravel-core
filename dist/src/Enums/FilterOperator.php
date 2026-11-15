<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum FilterOperator: string
{
    use EnumTools;

    case Equals = 'eq';
    case Contains = 'contains';
    case StartsWith = 'starts_with';
    case EndsWith = 'ends_with';
    case GreaterThan = 'gt';
    case LessThan = 'lt';
    case Between = 'between';
    case In = 'in';
}
