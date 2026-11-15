<?php

namespace MyLaravelCore\Support\Localization;

class Localization
{
    public function getCurrentLanguage(): string
    {
        return app()->getLocale() ?: config('app.locale', 'fa');
    }

    public function getPortal(): string
    {
        return (string) config('core.localization.portal', config('abolframe.portal', 'admin'));
    }

    public function isLocalized(): bool
    {
        return (bool) config('core.localization.enabled', config('abolframe.localized', false));
    }
}
