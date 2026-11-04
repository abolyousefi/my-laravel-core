<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum AbolFrameComponent: string
{
    use EnumTools;

    case NONE = 'none';
    case ACCESS_HUB = 'abolframe-access-hub';
    case PANEL_KIT = 'abolframe-panel-kit';
    case APP = 'abolframe-app';
    case NOTIFICATION = 'abolframe-notification';
}