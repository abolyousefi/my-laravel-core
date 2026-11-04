<?php

namespace MyLaravelCore\Support\BladeLayout;

class BladeLayoutManager
{
    protected array $generators = [];
    protected array $sharedData = [];
    protected array $additionalBlades = [];
    protected NavbarBadgeManager $badgeManager;
    protected NavbarSubtitleManager $subtitleManager;

    public function __construct()
    {
        $this->badgeManager = new NavbarBadgeManager();
        $this->subtitleManager = new NavbarSubtitleManager();
    }

    public function table(string|object|null $class = null): mixed
    {
        if ($class === null) {
            return $this->generators['table']['default'] ?? false;
        }
        $instance = is_string($class) ? app($class) : $class;
        $this->generators['table']['default'] = $instance;
        return $instance;
    }

    public function tab(string|object|null $class = null, string $name = 'default'): mixed
    {
        if ($class === null || (is_string($class) && !class_exists($class) && isset($this->generators['tab'][$class]))) {
            $key = ($class !== null && is_string($class)) ? $class : $name;
            return $this->generators['tab'][$key] ?? false;
        }
        $instance = is_string($class) ? app($class) : $class;
        $this->generators['tab'][$name] = $instance;
        return $instance;
    }

    public function section(string|object|null $class = null): mixed
    {
        if ($class === null) {
            return $this->generators['section']['default'] ?? false;
        }
        $instance = is_string($class) ? app($class) : $class;
        $this->generators['section']['default'] = $instance;
        return $instance;
    }

    public function banner(string|object|null $class = null): mixed
    {
        if ($class === null) {
            return $this->generators['banner']['default'] ?? false;
        }
        $instance = is_string($class) ? app($class) : $class;
        $this->generators['banner']['default'] = $instance;
        return $instance;
    }

    public function filter(string|object|null $class = null): mixed
    {
        if ($class === null) {
            return $this->generators['filter']['default'] ?? false;
        }
        $instance = is_string($class) ? app($class) : $class;
        $this->generators['filter']['default'] = $instance;
        return $instance;
    }

    public function audit(string|object|null $class = null): mixed
    {
        if ($class === null) {
            return $this->generators['audit']['default'] ?? false;
        }
        $instance = is_string($class) ? app($class) : $class;
        $this->generators['audit']['default'] = $instance;
        return $instance;
    }

    public function exists(string $type, string $name = 'default'): bool
    {
        return isset($this->generators[$type][$name]);
    }

    public function data(array|string|null $key = null, mixed $value = null): mixed
    {
        if ($key === null) {
            return $this->sharedData;
        }

        if (is_array($key)) {
            $this->sharedData = array_merge($this->sharedData, $key);
            return $this->sharedData;
        }

        if (func_num_args() === 1) {
            return $this->sharedData[$key] ?? null;
        }

        $this->sharedData[$key] = $value;
        return $value;
    }

    public function setTableFilters(string $table, ?string $routeName = null, array $filters = []): void
    {
        $sessionKey = 'table_generator.' . md5($table . '|' . ($routeName ?? ''));
        session([$sessionKey => $filters]);
    }

    public function clearTableFilters(string $table, ?string $routeName = null): void
    {
        $sessionKey = 'table_generator.' . md5($table . '|' . ($routeName ?? ''));
        session()->forget($sessionKey);
    }

    public function getTableFilters(string $table, ?string $routeName = null): array
    {
        $sessionKey = 'table_generator.' . md5($table . '|' . ($routeName ?? ''));
        return (array) session($sessionKey, []);
    }

    public function addAdditionalBlades(string|array $views): void
    {
        foreach ((array) $views as $v) {
            if (!in_array($v, $this->additionalBlades, true)) {
                $this->additionalBlades[] = $v;
            }
        }
    }

    public function clearAdditionalBlades(): void
    {
        $this->additionalBlades = [];
    }

    public function getAdditionalBlades(): array
    {
        return $this->additionalBlades;
    }

    public function navbarBadges(): NavbarBadgeManager
    {
        return $this->badgeManager;
    }

    public function navbarUserMenuSubtitleManager(): NavbarSubtitleManager
    {
        return $this->subtitleManager;
    }
}