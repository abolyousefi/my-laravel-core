<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum ConfirmationStatus: int
{
    use EnumTools;

    case PENDING = 0;
    case CONFIRMED = 1;
    case NOT_CONFIRMED = 2;
}
