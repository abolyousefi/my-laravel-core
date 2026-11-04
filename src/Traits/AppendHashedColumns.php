<?php

namespace MyLaravelCore\Traits;

use MyLaravelCore\Enums\EncryptMethod;

trait AppendHashedColumns
{
    public static function bootAppendHashedColumns(): void
    {
        static::retrieved(function ($model) {
            $model->appendHashedIdIfEnabled();
        });
    }

    public function initializeAppendHashedColumns(): void
    {
        $this->appendHashedIdIfEnabled();
    }

    protected function appendHashedIdIfEnabled(): void
    {
        $method = config('core.encrypt_method', config('abolframe.encrypt_method', EncryptMethod::APP_KEY->value));
        $methodValue = $method instanceof EncryptMethod ? $method->value : (string) $method;

        if ($methodValue !== EncryptMethod::NONE->value && !in_array('hashed_id', $this->appends, true)) {
            $this->appends[] = 'hashed_id';
        }
    }

    public function getHashedIdAttribute(): ?string
    {
        $key = $this->getKey();
        if ($key === null) {
            return null;
        }

        return function_exists('encryptStaticValue') ? encryptStaticValue($key) : encrypt((string) $key);
    }
}
