<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum LocationType: string
{
    use EnumTools;

    case COUNTRY = 'country';
    case PROVINCE = 'province';
    case CITY = 'city';
    case DISTRICT = 'district';
    case RURAL_DISTRICT = 'rural_district';
    case VILLAGE = 'village';
    case NEIGHBORHOOD = 'neighborhood';
}
