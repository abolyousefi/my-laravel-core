<?php

namespace MyLaravelCore\Enums;

use MyLaravelCore\Traits\EnumTools;

enum FileExtensionType: string
{
    use EnumTools;

    case IMAGE = 'image';
    case VIDEO = 'video';
    case AUDIO = 'audio';
    case DOCUMENT = 'document';
    case SPREADSHEET = 'spreadsheet';
    case PRESENTATION = 'presentation';
    case ARCHIVE = 'archive';
    case CODE = 'code';
    case FONT = 'font';
    case EBOOK = 'ebook';
    case DATABASE = 'database';
    case EXECUTABLE = 'executable';
    case DISK_IMAGE = 'disk_image';
    case VECTOR = 'vector';
    case EMAIL = 'email';
    case CERTIFICATE = 'certificate';
    case CONFIG = 'config';
    case THREE_D = '3d';
    case TEXT = 'text';
    case OTHER = 'other';
}
