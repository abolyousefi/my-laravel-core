<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="{{ $dir }}" data-bs-theme="{{ $theme }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ $title ? $title . ' | ' : '' }}{{ config('app.name', 'Laravel') }}</title>

    <!-- Google Fonts: Vazirmatn -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- Bootstrap 5 RTL CSS -->
    @if($dir === 'rtl')
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css">
    @else
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    @endif

    <!-- FontAwesome 6 -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

    <!-- Core UI Styles -->
    @coreStyles

    <!-- Custom View Styles -->
    {{ $styles ?? '' }}
</head>
<body class="bg-light {{ $class }}" id="{{ $id }}">
    <div id="app" class="d-flex flex-column min-vh-100">

        {{-- Top Navigation Bar --}}
        @if($navbar)
            <header class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm border-bottom py-2">
                <div class="container-fluid px-3 px-lg-4">
                    <a class="navbar-brand d-flex align-items-center gap-2 fw-bold" href="{{ $brandUrl }}">
                        <i class="fa fa-cubes text-primary fs-4"></i>
                        <span>{{ $brand }}</span>
                    </a>

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#coreNavbarNav" aria-controls="coreNavbarNav" aria-expanded="false" aria-label="منو">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="coreNavbarNav">
                        @if(isset($nav))
                            {{ $nav }}
                        @else
                            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                                <li class="nav-item">
                                    <a class="nav-link {{ request()->is('/') ? 'active' : '' }}" href="{{ url('/') }}">
                                        <i class="fa fa-home me-1"></i> صفحه اصلی
                                    </a>
                                </li>
                            </ul>
                        @endif

                        <ul class="navbar-nav ms-auto align-items-center gap-2">
                            @if(isset($navActions))
                                {{ $navActions }}
                            @endif

                            @auth
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle d-flex align-items-center gap-2 text-white" href="#" id="coreUserDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center" style="width: 32px; height: 32px;">
                                            <i class="fa fa-user small"></i>
                                        </div>
                                        <span>{{ auth()->user()->name ?? 'کاربر' }}</span>
                                    </a>
                                    <ul class="dropdown-menu dropdown-menu-end shadow border-0" aria-labelledby="coreUserDropdown">
                                        @if(Route::has('profile'))
                                            <li><a class="dropdown-item" href="{{ route('profile') }}"><i class="fa fa-user-cog me-2"></i> پروفایل من</a></li>
                                        @endif
                                        <li><hr class="dropdown-divider"></li>
                                        <li>
                                            <form method="POST" action="{{ route('logout') }}">
                                                @csrf
                                                <button type="submit" class="dropdown-item text-danger">
                                                    <i class="fa fa-sign-out-alt me-2"></i> خروج از سیستم
                                                </button>
                                            </form>
                                        </li>
                                    </ul>
                                </li>
                            @else
                                @if(Route::has('login'))
                                    <li class="nav-item">
                                        <a class="btn btn-outline-light btn-sm px-3" href="{{ route('login') }}">
                                            <i class="fa fa-sign-in-alt me-1"></i> ورود
                                        </a>
                                    </li>
                                @endif
                            @endauth
                        </ul>
                    </div>
                </div>
            </header>
        @endif

        {{-- Page Header / Breadcrumbs --}}
        @if(isset($header))
            <div class="bg-white border-bottom py-3 shadow-sm mb-3">
                <div class="{{ $container ?: 'container-fluid px-4' }}">
                    {{ $header }}
                </div>
            </div>
        @endif

        {{-- Main Content Area --}}
        <main class="flex-grow-1 py-4">
            <div class="{{ $container ?: 'w-100' }}">

                {{-- Automated Session Alerts --}}
                @if($alerts)
                    @if(session('success'))
                        <x-alert type="success" :dismissible="true">
                            {{ session('success') }}
                        </x-alert>
                    @endif

                    @if(session('error'))
                        <x-alert type="danger" :dismissible="true">
                            {{ session('error') }}
                        </x-alert>
                    @endif

                    @if(session('warning'))
                        <x-alert type="warning" :dismissible="true">
                            {{ session('warning') }}
                        </x-alert>
                    @endif

                    @if(session('info'))
                        <x-alert type="info" :dismissible="true">
                            {{ session('info') }}
                        </x-alert>
                    @endif
                @endif

                {{-- Page Main Content Slot --}}
                @if($sidebar && isset($sidebarContent))
                    <div class="row g-4">
                        <aside class="col-lg-3 col-md-4">
                            <div class="card border-0 shadow-sm p-3">
                                {{ $sidebarContent }}
                            </div>
                        </aside>
                        <section class="col-lg-9 col-md-8">
                            {{ $slot }}
                        </section>
                    </div>
                @else
                    {{ $slot }}
                @endif
            </div>
        </main>

        {{-- Footer --}}
        @if($footer)
            <footer class="bg-white border-top py-3 mt-auto text-center text-muted small">
                <div class="container d-flex flex-wrap justify-content-between align-items-center">
                    <span>
                        &copy; {{ date('Y') }} <strong>{{ $brand }}</strong>. تمامی حقوق محفوظ است.
                    </span>
                    <span class="text-secondary">
                        طراحی و توسعه با <span class="text-primary font-monospace">My Laravel Core</span>
                    </span>
                </div>
            </footer>
        @endif
    </div>

    <!-- Bootstrap 5 Bundle JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <!-- Core UI Scripts -->
    @coreScripts

    <!-- Custom View Scripts -->
    {{ $scripts ?? '' }}
</body>
</html>
