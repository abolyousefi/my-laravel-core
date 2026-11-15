<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum DiscountType: int
{
    use EnumTools;

    case PERCENT = 1;
    case AMOUNT = 2;
}
