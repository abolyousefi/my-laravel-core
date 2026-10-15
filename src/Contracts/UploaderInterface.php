<?php

namespace MyLaravelCore\Contracts;

use Illuminate\Http\UploadedFile;

interface UploaderInterface
{
    /**
     * Upload a single file to the specified disk and directory.
     *
     * @param UploadedFile $file
     * @param string|null $directory
     * @param string|null $disk
     * @param string|null $customName
     * @return array{name: string, original_name: string, path: string, url: string, size: int, mime: string, extension: string}
     */
    public function upload(UploadedFile $file, ?string $directory = null, ?string $disk = null, ?string $customName = null): array;

    /**
     * Upload multiple files.
     *
     * @param array<UploadedFile> $files
     * @param string|null $directory
     * @param string|null $disk
     * @return array<array{name: string, original_name: string, path: string, url: string, size: int, mime: string, extension: string}>
     */
    public function uploadMultiple(array $files, ?string $directory = null, ?string $disk = null): array;

    /**
     * Delete a file by its path and disk.
     *
     * @param string $path
     * @param string|null $disk
     * @return bool
     */
    public function delete(string $path, ?string $disk = null): bool;

    /**
     * Get temporary or permanent download/view URL.
     *
     * @param string $path
     * @param string|null $disk
     * @param int $expirationMinutes
     * @return string
     */
    public function url(string $path, ?string $disk = null, int $expirationMinutes = 60): string;
}
