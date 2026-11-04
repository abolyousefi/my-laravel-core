<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum FileDiskDriver: int
{
    use EnumTools;

    case LOCAL = 1;
    case SFTP = 2;
    case S3 = 3;
}
