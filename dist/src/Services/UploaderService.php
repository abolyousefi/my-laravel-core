<?php

namespace MyLaravelCore\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use InvalidArgumentException;
use MyLaravelCore\Contracts\UploaderInterface;

class UploaderService implements UploaderInterface
{
    /**
     * Upload single file.
     */
    public function upload(
        UploadedFile $file,
        ?string $directory = null,
        ?string $disk = null,
        ?string $customName = null
    ): array {
        $disk = $disk ?: config('core.uploader.disk', 'public');
        $baseDir = config('core.uploader.base_directory', 'uploads');
        $directory = $directory ? trim($directory, '/') : date('Y/m');
        $targetPath = $baseDir . '/' . $directory;

        $extension = strtolower($file->getClientOriginalExtension());
        $originalName = $file->getClientOriginalName();
        $size = $file->getSize();
        $mime = $file->getMimeType() ?: 'application/octet-stream';

        $fileName = $customName ?: (Str::random(24) . '_' . time() . '.' . $extension);
        $storedPath = $file->storeAs($targetPath, $fileName, $disk);

        $url = Storage::disk($disk)->url($storedPath);

        return [
            'name' => $fileName,
            'original_name' => $originalName,
            'path' => $storedPath,
            'url' => $url,
            'size' => $size,
            'mime' => $mime,
            'extension' => $extension,
            'disk' => $disk,
        ];
    }

    /**
     * Upload multiple files.
     */
    public function uploadMultiple(
        array $files,
        ?string $directory = null,
        ?string $disk = null
    ): array {
        $uploaded = [];
        foreach ($files as $file) {
            if ($file instanceof UploadedFile) {
                $uploaded[] = $this->upload($file, $directory, $disk);
            }
        }
        return $uploaded;
    }

    /**
     * Delete a file.
     */
    public function delete(string $path, ?string $disk = null): bool
    {
        $disk = $disk ?: config('core.uploader.disk', 'public');
        if (Storage::disk($disk)->exists($path)) {
            return Storage::disk($disk)->delete($path);
        }
        return false;
    }

    /**
     * Get file URL.
     */
    public function url(string $path, ?string $disk = null, int $expirationMinutes = 60): string
    {
        $disk = $disk ?: config('core.uploader.disk', 'public');
        $storage = Storage::disk($disk);

        if ($disk === 'local' || $disk === 'private') {
            if (method_exists($storage, 'temporaryUrl')) {
                return $storage->temporaryUrl($path, now()->addMinutes($expirationMinutes));
            }
        }

        return $storage->url($path);
    }
}
