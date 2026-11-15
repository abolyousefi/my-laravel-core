<?php

namespace MyLaravelCore\Support\FileManager;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use MyLaravelCore\Services\UploaderService;

class FileManager
{
    /**
     * In-memory registry of uploaded/registered files when no DB table is used.
     *
     * @var array<int, object>
     */
    protected array $files = [];

    public function url(int|string|null $fileId): ?string
    {
        if (empty($fileId)) {
            return null;
        }

        if (is_string($fileId) && (str_starts_with($fileId, 'http://') || str_starts_with($fileId, 'https://') || str_starts_with($fileId, '/'))) {
            return $fileId;
        }

        $file = $this->find((int) $fileId);
        if ($file && isset($file->url)) {
            return $file->url;
        }
        if ($file && isset($file->path)) {
            return Storage::disk(config('core.uploader.disk', 'public'))->url($file->path);
        }

        return null;
    }

    public function find(?int $fileId): ?object
    {
        if (!$fileId) {
            return null;
        }

        if (isset($this->files[$fileId])) {
            return $this->files[$fileId];
        }

        $modelClass = config('core.uploader.file_model');
        if ($modelClass && class_exists($modelClass)) {
            return $modelClass::query()->find($fileId);
        }

        return null;
    }

    public function registerFile(int $id, string $path, string $name, ?string $url = null): object
    {
        $obj = (object) [
            'id' => $id,
            'path' => $path,
            'name' => $name,
            'url' => $url ?? Storage::disk(config('core.uploader.disk', 'public'))->url($path),
        ];

        $this->files[$id] = $obj;
        return $obj;
    }

    public function upload(
        string $field,
        string $dbField = '',
        string $fileTypeCode = 'GENERAL',
        mixed $fileType = null,
        ?object $entity = null,
        ?string $module = null,
        bool $isPublic = true
    ): ?object {
        $uploadedFile = request()->file($field);
        if (!$uploadedFile instanceof UploadedFile) {
            return null;
        }

        $disk = $isPublic ? config('core.uploader.disk', 'public') : 'local';
        $dir = trim(config('core.uploader.base_directory', 'uploads') . '/' . strtolower($module ?: $fileTypeCode), '/');

        /** @var UploaderService $uploader */
        $uploader = app(UploaderService::class);
        $meta = $uploader->upload($uploadedFile, $dir, $disk);

        $fileId = random_int(1000, 999999);
        $fileObj = $this->registerFile($fileId, $meta['path'], $meta['original_name'], $meta['url']);

        if ($entity !== null && $dbField !== '') {
            $entity->{$dbField} = $fileObj->id;
        }

        return $fileObj;
    }
}
