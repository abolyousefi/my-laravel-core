# راهنمای نصب و راه‌اندازی زیرساخت (Installation Guide)

زیرساخت **My Laravel Core** به گونه‌ای طراحی شده است که به سادگی به عنوان یک پکیج لاراول (یا ماژول اختصاصی پروژه) نصب شده و تمامی ابزارهای لازم شامل کامپوننت‌های Blade فارسی و RTL، سرویس‌های پرداخت و پیامک، آپلود فایل، و جنریتورهای Artisan را در اختیار شما قرار دهد.

---

## ۱. نیازمندی‌ها
- **PHP:** نسخه 8.2 یا بالاتر
- **Laravel:** نسخه‌های 10.x، 11.x، یا 12.x
- **Bootstrap:** نسخه 5.x RTL
- **FontAwesome:** نسخه 6.x

---

## ۲. نصب از طریق Composer

### حالت الف) استفاده در قالب مخزن محلی (Local Path Repository)
اگر پکیج در پوشه‌ای در کنار پروژه شما قرار دارد (مثلاً `packages/my-laravel-core` یا `../my-laravel-core`)، در فایل `composer.json` پروژه اصلی خود آرایه `repositories` را اضافه کنید:

```json
"repositories": [
    {
        "type": "path",
        "url": "../my-laravel-core"
    }
],
"require": {
    "my-laravel/core": "@dev"
}
```

سپس دستور زیر را اجرا کنید:
```bash
composer update my-laravel/core
```

---

## ۳. اجرای دستور راه‌اندازی (Core Install)

پس از نصب پکیج، دستور اختصاصی زیر را اجرا کنید تا کانفیگ‌ها، استایل‌ها، و اسکریپت‌ها به طور کامل پابلیش شوند:

```bash
php artisan core:install
```

یا برای پابلیش جداگانه هر بخش:
```bash
# پابلیش فقط فایل تنظیمات
php artisan vendor:publish --tag=core-config

# پابلیش استایل‌ها و اسکریپت‌های JS
php artisan vendor:publish --tag=core-assets

# پابلیش ویوهای کامپوننت‌ها (جهت سفارشی‌سازی)
php artisan vendor:publish --tag=core-views
```

---

## ۴. افزودن استایل و اسکریپت به قالب اصلی (`layouts/app.blade.php`)

در فایل لایه‌اوت اصلی پروژه خود، دایرکتیوهای پکیج را قرار دهید:

```blade
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ config('app.name', 'My Laravel App') }}</title>

    <!-- Bootstrap 5 RTL & FontAwesome 6 -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

    <!-- Core UI Stylesheet -->
    @coreStyles
</head>
<body dir="rtl">

    <main class="py-4">
        @yield('content')
    </main>

    <!-- Bootstrap JS Bundle -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

    <!-- Core UI Scripts -->
    @coreScripts
</body>
</html>
```

---

## ۵. دستورات کاربردی کدجنریتور (Artisan Generators)

برای ساخت سریع منابع CRUD، سرویس‌ها، و تریت‌ها:

```bash
# ساخت ساختار کامل CRUD (Model, Migration, Controller, Request, Blade Views)
php artisan make:core-crud Product

# ساخت کنترلر و ریسورس فقط به صورت API
php artisan make:core-crud Product --api

# ساخت کلاس سرویس اختصاصی در app/Services
php artisan make:core-service OrderService

# ساخت تریت اختصاصی در app/Traits
php artisan make:core-trait HasDiscount
```
