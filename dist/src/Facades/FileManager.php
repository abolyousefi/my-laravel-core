<?php

namespace MyLaravelCore\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static string|null url(int|string|null $fileId)
 * @method static object|null find(?int $fileId)
 * @method static object registerFile(int $id, string $path, string $name, ?string $url = null)
 * @method static object|null upload(string $field, string $dbField = '', string $fileTypeCode = 'GENERAL', mixed $fileType = null, ?object $entity = null, ?string $module = null, bool $isPublic = true)
 * @see \MyLaravelCore\Support\FileManager\FileManager
 */
class FileManager extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return \MyLaravelCore\Support\FileManager\FileManager::class;
    }
}
