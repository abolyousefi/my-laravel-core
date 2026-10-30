<?php

namespace MyLaravelCore\Contracts;

/**
 * Stub definition for UploaderInterface.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
interface UploaderInterface
{
    /**
     * upload signature.
     */
    public function upload(
        Illuminate\Http\UploadedFile $file,
        ?string $directory = null,
        ?string $disk = null,
        ?string $customName = null
    ): array {
        // Protected implementation
    }

    /**
     * uploadMultiple signature.
     */
    public function uploadMultiple(
        array $files,
        ?string $directory = null,
        ?string $disk = null
    ): array {
        // Protected implementation
    }

    /**
     * delete signature.
     */
    public function delete(string $path, ?string $disk = null): bool {
        // Protected implementation
    }

    /**
     * url signature.
     */
    public function url(
        string $path,
        ?string $disk = null,
        int $expirationMinutes = 60
    ): string {
        // Protected implementation
    }

}
