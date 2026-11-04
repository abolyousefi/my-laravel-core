<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum EncryptMethod: string
{
    use EnumTools;

    case NONE = 'none';
    case APP_KEY = 'app_key';
    case SESSION_SALT = 'session_salt';
}
