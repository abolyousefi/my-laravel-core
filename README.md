# 🚀 My Laravel Core Infrastructure

[![Latest Version](https://img.shields.io/badge/version-1.0.0-blue.svg?style=flat-square)](https://github.com/my-laravel/core)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE)
[![PHP Version](https://img.shields.io/badge/php-%5E8.2-777bb4.svg?style=flat-square)](https://php.net)
[![Laravel Support](https://img.shields.io/badge/laravel-10.x%20%7C%2011.x%20%7C%2012.x-red.svg?style=flat-square)](https://laravel.com)

یک زیرساخت فوق‌العاده مدرن، ماژولار و سازمانی (Enterprise Core Framework) برای پروژه‌های **لاراول (Laravel)**، بهینه‌سازی‌شده برای زبان فارسی و چیدمان **RTL** با بیش از ۳۳ کامپوننت Blade، سرویس‌های آپلود، پرداخت اینترنتی، پیامک، تاریخ شمسی، ژنراتورهای Artisan و توابع کمکی کاربردی.

---

## 📁 ساختار پکیج (Package Architecture)

```text
my-laravel-core/
├── src/
│   ├── Commands/        # دستورات Artisan و Generatorها (make:core-crud, core:install)
│   ├── Components/      # کلاس‌های کامپوننت Blade و ساختار UI پایه
│   │   ├── Form/        # ۱۶ کامپوننت فرم (text-input, datetime-picker, ...)
│   │   └── Design/      # ۱۷ کامپوننت نمایشی (card, data-card, modal, timeline, ...)
│   ├── Helpers/         # توابع کمکی گلوبال (تاریخ شمسی، ارقام فارسی، تبدیل ریال/تومان، ...)
│   ├── Services/        # سرویس‌های زیرساختی (آپلود فایل، مدیریت درگاه، پیامک، پاسخ API)
│   ├── Traits/          # تریت‌های مدل‌ها (HasUuid, HasSlug, Filterable, Auditable, HasStatus)
│   ├── Contracts/       # اینترفیس‌های استانداردسازی (Payment, SMS, Uploader, Filter)
│   ├── Facades/         # Core Facade
│   └── Providers/       # CoreServiceProvider برای ثبت خودکار در لاراول
├── config/
│   └── core.php         # تنظیمات پایه و قابل تغییر پکیج
├── resources/
│   ├── views/
│   │   └── components/  # ویوهای .blade.php کامپوننت‌ها (RTL & Bootstrap 5)
│   └── assets/
│       ├── css/core.css # استایل‌های استاندارد کامپوننت‌ها و متغیرهای تم
│       └── js/core.js   # کنترلرهای جاوااسکریپت و چرخه رویدادها
├── docs/
│   ├── installation.md  # مستندات کامل نصب و راه‌اندازی
│   ├── components.md    # راهنمای استفاده از کامپوننت‌های فرم و دیزاین
│   ├── helpers.md       # لیست متدها و خروجی‌های توابع کمکی
│   └── services.md      # راهنمای سرویس‌ها و تریت‌های مدل
├── tests/               # تست‌های Unit برای متدها و کنترلرها
├── composer.json        # تنظیمات پکیج و PSR-4 Autoload
└── README.md            # معرفی اولیه و راهنمای شروع سریع
```

---

## ✨ ویژگی‌های برجسته (Key Highlights)

1. **لایه‌بندی آماده و کامپوننت‌های مدرن Blade با چیدمان RTL:**
   - **لایه‌بندی اصلی (`<x-default-layout>`):** بارگذاری خودکار اسکلت HTML5، متاتگ‌ها، نوبار، فوتر، فونت Vazirmatn، استایل‌ها، و پیام‌های سشن.
   - **۱۶ کامپوننت فرم:** `text-input`, `textarea`, `number-input`, `select-input`, `checkbox`, `checkbox-group`, `radio-group`, `datetime-picker`, `datetime-range-picker`, `editor`, `file-picker`, `icon-picker`, `item-collector`, `tag-collector`, `tag-input`, `nested-selects`.
   - **۱۷ کامپوننت نمایشی:** `alert`, `badge`, `banner`, `button`, `dropdown-button`, `card`, `data-card`, `file`, `icon`, `image`, `link`, `modal`, `timeline`, `timeline-item`, `tooltip`, `accordion`, `accordion-item`.
2. **پشتیبانی کامل از تاریخ و تقویم جلالی (شمسی):** بدون وابستگی به اکستنشن‌های سنگین با محاسبات دقیق میلادی به شمسی و برعکس.
3. **توابع کمکی فارسی:** اعتبارسنجی الگوریتم ۱۰ رقمی کد ملی، اعتبارسنجی شماره کارت‌های شتاب (Luhn)، تبدیل عدد به حروف فارسی، فرمت‌بندی ریال و تومان.
4. **تریت‌های کاربردی Eloquent:**
   - `HasUuid`: تولید خودکار UUID.
   - `HasSlug`: تولید خودکار اسلاگ فارسی منحصر‌به‌فرد.
   - `Auditable`: ثبت خودکار کاربر سازنده، ویرایش‌کننده و حذف‌کننده.
   - `HasStatus`: متدهای فعال/غیرفعال‌سازی و اسکوپ‌های کوئری.
   - `Filterable`: فیلتر، مرتب‌سازی و جستجوی داینامیک از Query String.
5. **سرویس‌های سازمانی آماده:**
   - **UploaderService:** آپلود پوشه‌ای با تاریخ، سایزبندی و اعتبارسنجی.
   - **PaymentManager:** سیستم پرداخت متمرکز با درایورهای Zarinpal و Mock.
   - **SmsManager:** ارسال پیامک معمولی و پترن/کد تایید با کاوه‌نگار و لاگ محلی.
   - **ApiResponse:** فرمت استاندارد پاسخ‌های JSON برای REST API.
6. **ژنراتور کدهای Artisan:**
   - `php artisan make:core-crud {Model}`: ساخت همزمان مدل، مایگریشن، ریکوئست، کنترلر و فایل‌های Blade!
   - `php artisan make:core-service {Name}`
   - `php artisan make:core-trait {Name}`

---

## ⚡ شروع سریع (Quick Start)

### ۱. نصب پکیج
```bash
composer require my-laravel/core
```

### ۲. پابلیش فایل‌ها و راه‌اندازی اولیه
```bash
php artisan core:install
```

### ۳. درج استایل و اسکریپت در `layouts/app.blade.php`
```blade
<head>
    <!-- استایل‌های زیرساخت -->
    @coreStyles
</head>
<body dir="rtl">
    @yield('content')

    <!-- اسکریپت‌های زیرساخت -->
    @coreScripts
</body>
```

---

## 💡 نمونه کدهای کاربردی

### کامپوننت‌های فرم و دیزاین
```blade
<x-card title="ایجاد محصول جدید" icon="fa-box">
    <form action="{{ route('products.store') }}" method="POST" data-validate>
        @csrf

        <div class="row">
            <div class="col-md-6">
                <x-text-input name="title" label="عنوان محصول" :required="true" />
            </div>
            <div class="col-md-6">
                <x-number-input name="price" label="قیمت فروش" unit="تومان" :thousandSeparator="true" />
            </div>
            <div class="col-md-6">
                <x-datetime-picker name="published_at" label="تاریخ انتشار" calendar="jalali" />
            </div>
            <div class="col-md-6">
                <x-select-input name="category_id" label="دسته‌بندی" :options="$categories" :searchable="true" />
            </div>
            <div class="col-12">
                <x-textarea name="description" label="توضیحات" :rows="4" :autoResize="true" />
            </div>
            <div class="col-12">
                <x-file-picker name="images[]" label="تصاویر محصول" accept="image/*" :multiple="true" />
            </div>
        </div>

        <div class="mt-3 d-flex gap-2">
            <x-button type="submit" variant="primary" icon="fa-save">ذخیره محصول</x-button>
            <x-button variant="light" href="{{ route('products.index') }}">انصراف</x-button>
        </div>
    </form>
</x-card>
```

### استفاده از توابع کمکی
```php
// تبدیل اعداد
echo persian_digits('12345'); // ۱۲۳۴۵

// اعتبارسنجی کد ملی
if (is_valid_national_code($code)) { ... }

// تاریخ شمسی
echo jdate('l j F Y'); // دوشنبه ۱۵ فروردین ۱۴۰۵

// قیمت به تومان
echo toman(250000); // ۲۵۰,۰۰۰ تومان

// تبدیل عدد به حروف فارسی
echo number_to_words_fa(1500000); // یک میلیون و پانصد هزار
```

---

## 🌐 وب‌سایت تعاملی مستندات (Interactive Docs Website)

این پکیج دارای یک وب‌سایت اختصاصی، مدرن و ریسپانسیو با چیدمان RTL و تم تاریک/روشن است که مستندات را به زیباترین شکل ممکن نمایش می‌دهد:

- **روش ۱ (سریع با Artisan):**
  ```bash
  php artisan core:docs
  ```
  با اجرای این دستور، وب‌سایت مستندات روی مرورگر شما در آدرس `http://localhost:8080` باز می‌شود.

- **روش ۲ (باز کردن مستقیم):**
  فایل [docs/index.html](file:///c:/wamp64/www/my-laravel-core/docs/index.html) را مستقیماً در هر مرورگری (کروم، فایرفاکس، اج) باز کنید.

- **روش ۳ (GitHub Pages):**
  کافیست در تنظیمات ریپازیتوری گیت‌هاب (Settings > Pages)، منبع را روی برنچ `main` و پوشه `/docs` بگذارید تا سایت مستندات به صورت آنلاین و رایگان در دسترس عموم قرار گیرد.

---

## 📖 مستندات تکمیلی (Full Documentation)

- 🌐 [مشاهده وب‌سایت تعاملی مستندات (docs/index.html)](docs/index.html)
- 📘 [مستندات نصب و راه‌اندازی (installation.md)](docs/installation.md)
- 🎨 [راهنمای جامع کامپوننت‌های UI (components.md)](docs/components.md)
- 🛠️ [لیست متدها و توابع کمکی (helpers.md)](docs/helpers.md)
- ⚙️ [راهنمای سرویس‌ها و تریت‌ها (services.md)](docs/services.md)

---

## 📄 لایسنس (License)

این پکیج تحت مجوز [MIT License](LICENSE) منتشر شده است.
