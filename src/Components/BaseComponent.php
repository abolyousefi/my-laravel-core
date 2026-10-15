<?php

namespace MyLaravelCore\Components;

use Illuminate\View\Component;

abstract class BaseComponent extends Component
{
    public ?string $id;
    public ?string $class;
    public ?string $error;

    public function __construct(
        ?string $id = null,
        ?string $class = null,
        ?string $error = null
    ) {
        $this->id = $id;
        $this->class = $class;
        $this->error = $error;
    }

    /**
     * Resolve unique element ID.
     */
    public function resolveId(?string $name = null): string
    {
        if (!empty($this->id)) {
            return $this->id;
        }

        if (!empty($name)) {
            $clean = preg_replace('/[^a-zA-Z0-9_-]/', '_', trim($name, '[]'));
            return 'field_' . $clean . '_' . substr(md5(uniqid((string) mt_rand(), true)), 0, 6);
        }

        return 'el_' . substr(md5(uniqid((string) mt_rand(), true)), 0, 8);
    }

    /**
     * Check if a field has validation error from session errors.
     */
    public function resolveError(?string $name = null): ?string
    {
        if ($this->error !== null) {
            return $this->error;
        }

        if ($name && function_exists('session') && session()->has('errors')) {
            $errors = session('errors');
            $dotName = str_replace(['[', ']'], ['.', ''], $name);
            $dotName = rtrim($dotName, '.');
            if ($errors->has($dotName)) {
                return $errors->first($dotName);
            }
        }

        return null;
    }
}
