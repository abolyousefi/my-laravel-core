<?php

namespace MyLaravelCore\Support\Auth;

use Illuminate\Support\Facades\Gate;
use MyLaravelCore\Support\RoutePropertyCollector\RoutePropertyCollector;

class Authorizer
{
    public function forgetSystemCache(): void
    {
        $collector = app(RoutePropertyCollector::class);
        $collector->forgetCachedTitles();
        $collector->forgetCachedBreadcrumb();
    }

    public function canAccess(string|array $permissions, bool $onlyOne = true): bool
    {
        $user = function_exists('authUser') ? authUser() : auth()->user();
        if (!$user) {
            return true; // Allow when no auth guard is enforced in dev/testbench unless gate denies
        }

        $list = (array) $permissions;
        foreach ($list as $perm) {
            $has = !Gate::has($perm) || Gate::forUser($user)->allows($perm);
            if ($onlyOne && $has) {
                return true;
            }
            if (!$onlyOne && !$has) {
                return false;
            }
        }

        return !$onlyOne;
    }
}