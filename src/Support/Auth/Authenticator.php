<?php

namespace MyLaravelCore\Support\Auth;

use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Contracts\Auth\StatefulGuard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class Authenticator
{
    protected ?string $guardName = null;

    public function __construct(?string $guardName = null)
    {
        $this->guardName = $guardName;
    }

    public function guard(?string $name = null): Guard|StatefulGuard
    {
        return Auth::guard($name ?? $this->guardName);
    }

    public function user(): ?Authenticatable
    {
        return $this->guard()->user();
    }

    public function id(): int|string|null
    {
        return $this->guard()->id();
    }

    public function check(): bool
    {
        return $this->guard()->check();
    }

    public function logout(?Request $request = null): bool
    {
        $request = $request ?? request();
        $guard = $this->guard();

        if (method_exists($guard, 'logout')) {
            $guard->logout();
        }

        if ($request && $request->hasSession()) {
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }

        return true;
    }
}
