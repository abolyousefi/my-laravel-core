/**
 * My Laravel Core - Documentation Content Store
 * Complete structured guides, examples, and search index
 */

window.DOCS_SECTIONS = [
    {
        id: "intro",
        title: "شروع سریع و نصب",
        icon: "fa-rocket",
        category: "شروع کار",
        content: `
            <h1>🚀 زیرساخت مدرن My Laravel Core</h1>
            <p class="lead text-muted">زیرساخت سازمانی، ماژولار و بومی لاراول به همراه ۳۳ کامپوننت غنی Blade، چیدمان RTL، تقویم شمسی، درگاه‌های پرداخت، ارسال پیامک و جنریتورهای سریع کدهای Artisan.</p>

            <div class="callout success">
                <i class="fa fa-check-circle callout-icon"></i>
                <div>
                    <strong>سازگاری کامل:</strong>
                    این پکیج برای PHP 8.2+ و لاراول نسخه‌های 10.x، 11.x و 12.x آماده شده و تمام تست‌های Unit آن ۱۰۰٪ موفقیت‌آمیز پاس شده‌اند.
                </div>
            </div>

            <h2>۱. نصب از طریق مخزن محلی (Local Path)</h2>
            <p>اگر پکیج در کنار پروژه لاراول شما قرار دارد، در فایل <code>composer.json</code> پروژه مقصد مسیر آن را معرفی کنید:</p>

            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">JSON</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>"repositories": [
    {
        "type": "path",
        "url": "../my-laravel-core"
    }
],
"require": {
    "my-laravel/core": "@dev"
}</code></pre>
            </div>

            <h2>۲. نصب با استفاده از لینک گیت‌هاب (GitHub Repository)</h2>
            <p>اگر پروژه روی گیت‌هاب قرار دارد و می‌خواهید شخص دیگری در نقطه‌ای دور فقط با داشتن لینک گیت‌هاب آن را نصب کند:</p>

            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">JSON</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>"repositories": [
    {
        "type": "vcs",
        "url": "https://github.com/USERNAME/my-laravel-core.git"
    }
]</code></pre>
            </div>

            <p>سپس کافیست دستور نصب را اجرا نماید:</p>
            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">BASH</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>composer require my-laravel/core</code></pre>
            </div>

            <h2>۳. راه‌اندازی و انتشار خودکار فایل‌ها (Install Command)</h2>
            <p>بلافاصله پس از نصب پکیج، دستور زیر فایل‌های کانفیگ، استایل‌ها، و اسکریپت‌ها را در پروژه شما فعال می‌کند:</p>

            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">BASH</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>php artisan core:install</code></pre>
            </div>
        `
    },
    {
        id: "default-layout",
        title: "لایه‌بندی اصلی (Default Layout)",
        icon: "fa-layer-group",
        category: "لایه‌بندی",
        content: `
            <h1>📐 کامپوننت لایه‌بندی اصلی (&lt;x-default-layout&gt;)</h1>
            <p>این کامپوننت اسکلت کامل HTML5، استایل‌های Bootstrap 5 RTL، فونت وزیرمتن (Vazirmatn)، فونت‌آوسام، نوبار بالا، اعلان‌های سشن خودکار، متاتگ CSRF و فوتر را با یک تگ بارگذاری می‌کند.</p>

            <div class="callout info">
                <i class="fa fa-info-circle callout-icon"></i>
                <div>
                    دیگر نیازی به نوشتن فایل‌های تکراری <code>layouts/app.blade.php</code> یا دستور <code>@extends</code> ندارید!
                </div>
            </div>

            <h2>نمونه کد استفاده</h2>
            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">BLADE</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>&lt;x-default-layout title="داشبورد مدیریت"&gt;
    &lt;x-card title="به پنل مدیریت خوش آمدید"&gt;
        محتوای اصلی صفحه در اینجا رندر می‌شود...
    &lt;/x-card&gt;
&lt;/x-default-layout&gt;</code></pre>
            </div>

            <h2>جدول ویژگی‌ها (Props)</h2>
            <table class="docs-table">
                <thead>
                    <tr>
                        <th>نام Prop</th>
                        <th>نوع</th>
                        <th>پیش‌فرض</th>
                        <th>توضیحات</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><code>title</code></td><td>string</td><td>null</td><td>عنوان برگه در مرورگر</td></tr>
                    <tr><td><code>dir</code></td><td>string</td><td>"rtl"</td><td>جهت صفحه (rtl / ltr)</td></tr>
                    <tr><td><code>navbar</code></td><td>bool</td><td>true</td><td>نمایش یا مخفی‌سازی نوار منوی بالا</td></tr>
                    <tr><td><code>sidebar</code></td><td>bool</td><td>false</td><td>فعال‌سازی سایدبار کناری دو ستونه</td></tr>
                    <tr><td><code>container</code></td><td>string</td><td>"container"</td><td>کلاس کانتینر محتوا (container یا container-fluid)</td></tr>
                    <tr><td><code>footer</code></td><td>bool</td><td>true</td><td>نمایش یا حذف فوتر پایین صفحه</td></tr>
                    <tr><td><code>alerts</code></td><td>bool</td><td>true</td><td>نمایش خودکار هشدارهای session('success') و ...</td></tr>
                    <tr><td><code>brand</code></td><td>string</td><td>نام برنامه</td><td>نام برند بالای نوبار</td></tr>
                </tbody>
            </table>

            <h2>اسلات‌های در دسترس (Slots)</h2>
            <ul>
                <li><code>header</code>: هدر یا مسیر ناوبری (Breadcrumb) بالای صفحه</li>
                <li><code>sidebarContent</code>: محتوای درون سایدبار هنگامی که <code>:sidebar="true"</code> باشد</li>
                <li><code>navActions</code>: دکمه‌های سمت چپ نوار بالایی</li>
                <li><code>styles</code>: استایل‌های اختصاصی همان صفحه</li>
                <li><code>scripts</code>: کدهای جاوااسکریپت اختصاصی همان صفحه</li>
            </ul>
        `
    },
    {
        id: "form-components",
        title: "کامپوننت‌های فرم (۱۶ عدد)",
        icon: "fa-pen-to-square",
        category: "کامپوننت‌های UI",
        content: `
            <h1>📝 کامپوننت‌های فرم (Form Components)</h1>
            <p>مجموعه‌ای از ۱۶ کامپوننت پیشرفته فرم با خواندن خودکار ارورهای لاراول (<code>$errors</code>)، مقادیر قبلی (<code>old()</code>)، استایل‌های RTL و کنترلرهای تعاملی.</p>

            <h2>۱. ورودی متن (&lt;x-text-input&gt;)</h2>
            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">BLADE</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>&lt;x-text-input
    name="title"
    label="عنوان مقاله"
    :value="old('title', $post->title ?? '')"
    :required="true"
    icon="fa-heading"
    iconPosition="right"
    hint="حداکثر ۱۲۸ کاراکتر"
/&gt;

&lt;x-text-input
    name="price"
    label="قیمت"
    addon="تومان"
    addonPosition="left"
/&gt;</code></pre>
            </div>

            <h2>۲. ورودی عدد با جداکننده هزارگان (&lt;x-number-input&gt;)</h2>
            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">BLADE</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>&lt;x-number-input
    name="price"
    label="مبلغ تراکنش"
    :thousandSeparator="true"
    :persianDigits="true"
    unit="تومان"
    :min="1000"
    :step="500"
/&gt;</code></pre>
            </div>

            <h2>۳. انتخابگر منو و جستجوگر پویا (&lt;x-select-input&gt;)</h2>
            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">BLADE</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>&lt;x-select-input
    name="status"
    label="وضعیت سفارش"
    :options="[
        ['id' => 1, 'title' => 'پرداخت شده'],
        ['id' => 2, 'title' => 'در انتظار بررسی'],
        ['id' => 3, 'title' => 'لغو شده']
    ]"
    :searchable="true"
/&gt;

{{-- سلکت وابسته (Dependent Cascading Select) --}}
&lt;x-select-input
    name="city_id"
    label="شهر"
    parentField="province_id"
    parentRoute="/api/provinces/cities"
/&gt;</code></pre>
            </div>

            <h2>۴. انتخابگر تاریخ و زمان شمسی (&lt;x-datetime-picker&gt;)</h2>
            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">BLADE</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>&lt;x-datetime-picker
    name="published_at"
    label="تاریخ انتشار مطلب"
    calendar="jalali"
    withTime
    :timeStep="15"
/&gt;</code></pre>
            </div>

            <h2>۵. انتخابگر بازه تاریخ (&lt;x-datetime-range-picker&gt;)</h2>
            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">BLADE</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>&lt;x-datetime-range-picker
    name="report_range"
    label="بازه دریافت گزارش"
    startName="from_date"
    endName="to_date"
    calendar="jalali"
    :presets="true"
/&gt;</code></pre>
            </div>

            <h2>۶. ویرایشگر متن ادیتور (&lt;x-editor&gt;)</h2>
            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">BLADE</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>&lt;x-editor
    name="content"
    label="متن مقاله"
    :height="350"
    toolbar="full"
    uploadRoute="/admin/uploads/editor"
/&gt;</code></pre>
            </div>

            <h2>۷. آپلودر فایل با قابلیت درگ اند دراپ (&lt;x-file-picker&gt;)</h2>
            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">BLADE</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>&lt;x-file-picker
    name="documents[]"
    label="فایل‌های ضمیمه"
    accept=".pdf,.docx,.zip,image/*"
    :multiple="true"
    :maxSize="5120"
    :dropzone="true"
/&gt;</code></pre>
            </div>

            <h2>۸. سایر فرم‌کامپوننت‌ها</h2>
            <ul>
                <li><code>&lt;x-textarea&gt;</code>: ورودی متن چندخطی با شمارنده کاراکتر و auto-resize</li>
                <li><code>&lt;x-checkbox&gt;</code> و <code>&lt;x-checkbox-group&gt;</code>: با دکمه انتخاب همه (Select All)</li>
                <li><code>&lt;x-radio-group&gt;</code>: گزینه‌های رادیویی افقی یا چند ستونه</li>
                <li><code>&lt;x-icon-picker&gt;</code>: انتخابگر آیکون‌های FontAwesome با جستجو و دسته‌بندی</li>
                <li><code>&lt;x-item-collector&gt;</code>: افزودن سطرهای داینامیک تکرارشونده با امکان درگ و سورت</li>
                <li><code>&lt;x-tag-collector&gt;</code>: مدیریت متادیتای کلید/مقدار</li>
                <li><code>&lt;x-tag-input&gt;</code>: ورودی تگ‌ها با کلید Enter</li>
                <li><code>&lt;x-nested-selects&gt;</code>: دسته‌بندی‌های درختی و تودرتو</li>
            </ul>
        `
    },
    {
        id: "design-components",
        title: "کامپوننت‌های نمایشی (۱۷ عدد)",
        icon: "fa-palette",
        category: "کامپوننت‌های UI",
        content: `
            <h1>🎨 کامپوننت‌های نمایشی و دیزاین (Design Components)</h1>
            <p>۱۷ کامپوننت برای ایجاد سریع داشبوردهای آماری، کارت‌ها، جداول، پیام‌ها و المان‌های تعاملی.</p>

            <h2>۱. کارت آماری داشبورد (&lt;x-data-card&gt;)</h2>
            <p>نمایش شاخص‌های کلیدی عملکرد (KPI) با درصد رشد و آیکون رنگی:</p>
            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">BLADE</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>&lt;x-data-card
    title="فروش این ماه"
    value="۲۵,۴۰۰,۰۰۰ تومان"
    icon="fa-wallet"
    color="success"
    :trend="14.8"
    trendDirection="up"
    trendLabel="نسبت به ماه قبل"
    link="/orders"
/&gt;</code></pre>
            </div>

            <h2>۲. کارت محتوا پیشرفته (&lt;x-card&gt;)</h2>
            <p>ساخت کارت‌های مدرن بدون نوشتن تگ‌های دستی div، به همراه بج، فوتر، تصویر سربرگ و افکت هاور:</p>
            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">BLADE</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>&lt;x-card 
    title="اطلاعات کیک و شیرینی" 
    subtitle="ثبت شده در کارگاه قنادی" 
    icon="fa-birthday-cake"
    badge="پیشنهاد سرآشپز"
    badgeVariant="danger"
    :hover="true"
    padding="4"
    :collapsible="true"
&gt;
    &lt;x-slot:actions&gt;
        &lt;x-button size="sm" variant="warning" icon="fa-plus"&gt;افزودن قلم جدید&lt;/x-button&gt;
    &lt;/x-slot:actions&gt;

    محتوای اصلی بدنه کارت...

    &lt;x-slot:footer&gt;
        &lt;span class="text-muted small"&gt;تضمین کیفیت ۱۰۰٪&lt;/span&gt;
    &lt;/x-slot:footer&gt;
&lt;/x-card&gt;</code></pre>
            </div>

            <h2>۳. جدول هوشمند داده‌ها و فیلتر خودکار (&lt;x-table&gt; / &lt;x-data-table&gt;)</h2>
            <p>رندر خودکار جدول داده‌ها با فرم جستجو، فیلترهای دلخواه، صفحه‌بندی و فرمت‌بندی خودکار فیلدهای قیمت (تومان)، تاریخ شمسی، وضعیت و عکس:</p>
            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">BLADE</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>&lt;x-table 
    title="لیست محصولات" 
    icon="fa-boxes"
    :columns="[
        ['key' => 'image', 'label' => 'عکس', 'type' => 'image'],
        ['key' => 'title', 'label' => 'عنوان', 'sub' => 'slug', 'badge' => 'is_featured'],
        ['key' => 'price', 'label' => 'قیمت', 'type' => 'toman'],
        ['key' => 'status', 'label' => 'وضعیت', 'type' => 'status'],
        [
            'key' => 'actions', 
            'label' => 'عملیات', 
            'view' => fn($row) => route('products.show', $row->slug),
            'edit' => fn($row) => route('admin.products.edit', $row->id),
            'delete' => fn($row) => route('admin.products.destroy', $row->id),
        ]
    ]"
    :rows="$products"
    :searchable="true"
/&gt;</code></pre>
            </div>

            <h2>۳. مودال تعاملی (&lt;x-modal&gt;)</h2>
            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">BLADE</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>&lt;x-modal id="user-modal" title="افزودن کاربر جدید" size="lg"&gt;
    &lt;x-text-input name="name" label="نام کامل" :required="true" /&gt;
    &lt;x-text-input name="email" type="email" label="ایمیل" :required="true" /&gt;

    &lt;x-slot:footer&gt;
        &lt;x-button variant="light" data-bs-dismiss="modal"&gt;انصراف&lt;/x-button&gt;
        &lt;x-button variant="primary" type="submit"&gt;ذخیره کاربر&lt;/x-button&gt;
    &lt;/x-slot:footer&gt;
&lt;/x-modal&gt;

{{-- دکمه فراخوانی --}}
&lt;x-button variant="primary" data-bs-toggle="modal" data-bs-target="#user-modal"&gt;
    باز کردن مودال
&lt;/x-button&gt;</code></pre>
            </div>

            <h2>۴. خط زمان رویدادها (&lt;x-timeline&gt;)</h2>
            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">BLADE</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>&lt;x-timeline :items="[
    ['title' => 'ثبت سفارش', 'time' => '1405/01/10 10:00', 'icon' => 'fa-check', 'color' => 'success'],
    ['title' => 'پرداخت اینترنتی', 'time' => '1405/01/10 10:05', 'icon' => 'fa-credit-card', 'color' => 'info'],
    ['title' => 'تحویل به پیک', 'time' => '1405/01/11 08:30', 'icon' => 'fa-truck', 'color' => 'primary']
]" /&gt;</code></pre>
            </div>

            <h2>۵. سایر کامپوننت‌های نمایشی</h2>
            <ul>
                <li><code>&lt;x-button&gt;</code>: دکمه با حالت‌های loading، confirm و آیکون</li>
                <li><code>&lt;x-dropdown-button&gt;</code>: دکمه‌های منودار عملیاتی</li>
                <li><code>&lt;x-alert&gt;</code>: پیام‌های هشدار با قابلیت بستن و آیکون خودکار</li>
                <li><code>&lt;x-badge&gt;</code>: نشان‌های گرد با نقطه (dot) یا خط دور (outline)</li>
                <li><code>&lt;x-banner&gt;</code>: بنرهای ویژه اعلانات بالای صفحه</li>
                <li><code>&lt;x-file&gt;</code>: باکس نمایش و دانلود فایل همراه با محاسبه حجم و آیکون فرمت</li>
                <li><code>&lt;x-image&gt;</code>: نمایش عکس به صورت دایره، لایت‌باکس یا نسبت‌های 16x9</li>
                <li><code>&lt;x-accordion&gt;</code>: باز و بسته شدن بخش‌ها با استایل مدرن</li>
            </ul>
        `
    },
    {
        id: "helpers",
        title: "توابع کمکی گلوبال (Helpers)",
        icon: "fa-screwdriver-wrench",
        category: "توابع و سرویس‌ها",
        content: `
            <h1>🛠️ لیست کامل توابع کمکی گلوبال (Global Helpers)</h1>
            <p class="lead text-muted">بیش از ۳۵ تابع کاربردی بومی برای محاسبات مالی، تاریخ شمسی، اعتبارسنجی‌های ایرانی، فرمت‌بندی و دسترسی سریع به سرویس‌ها.</p>

            <div class="row g-3 mb-4">
                <div class="col-md-3">
                    <div class="card p-3 border rounded-3 bg-light text-center">
                        <div class="fs-4 fw-bold text-primary">۳۵+</div>
                        <small class="text-muted">توابع کمکی آماده</small>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card p-3 border rounded-3 bg-light text-center">
                        <div class="fs-4 fw-bold text-success">۱۰۰٪</div>
                        <small class="text-muted">سازگار با تقویم و زبان فارسی</small>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card p-3 border rounded-3 bg-light text-center">
                        <div class="fs-4 fw-bold text-info">بانکی</div>
                        <small class="text-muted">کارت، شبا و کد ملی</small>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="card p-3 border rounded-3 bg-light text-center">
                        <div class="fs-4 fw-bold text-warning">حروف</div>
                        <small class="text-muted">تبدیل عدد به حروف فاکتور</small>
                    </div>
                </div>
            </div>

            <h2>۱. توابع مالی، بانکی و پولی (Financial & Banking)</h2>
            <table class="docs-table">
                <thead>
                    <tr>
                        <th>تابع</th>
                        <th>ورودی نمونه</th>
                        <th>خروجی نمونه</th>
                        <th>توضیح کاربرد</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><code>toman($val)</code></td><td>1250000</td><td><span class="badge bg-light text-dark border">۱,۲۵۰,۰۰۰ تومان</span></td><td>جداکننده سه‌رقمی با ارقام فارسی و واحد تومان</td></tr>
                    <tr><td><code>rial($val)</code></td><td>1250000</td><td><span class="badge bg-light text-dark border">۱,۲۵۰,۰۰۰ ریال</span></td><td>جداکننده سه‌رقمی با ارقام فارسی و واحد ریال</td></tr>
                    <tr><td><code>toman_words($amount)</code></td><td>1250000</td><td><strong>یک میلیون و دویست و پنجاه هزار تومان</strong></td><td>تبدیل مبلغ به حروف فارسی مناسب فاکتور و رسید</td></tr>
                    <tr><td><code>rial_words($amount)</code></td><td>12500000</td><td><strong>دوازده میلیون و پانصد هزار ریال</strong></td><td>تبدیل مبلغ ریال به حروف فارسی</td></tr>
                    <tr><td><code>number_to_words_fa($num)</code></td><td>450</td><td>چهارصد و پنجاه</td><td>تبدیل هر نوع عدد به کلمات فارسی (تا تریلیون)</td></tr>
                    <tr><td><code>is_valid_card_number($card)</code></td><td>'60379918...'</td><td><code>true / false</code></td><td>اعتبارسنجی ۱۶ رقم کارت بانکی شتاب با الگوریتم Luhn</td></tr>
                    <tr><td><code>card_number_format($card)</code></td><td>'6037991812345678'</td><td><code>6037-9918-1234-5678</code></td><td>فرمت‌بندی چهار رقمی شماره کارت بانکی</td></tr>
                    <tr><td><code>mask_card_number($card)</code></td><td>'6037991812345678'</td><td><code>6037-****-****-5678</code></td><td>ماسک کردن ارقام میانی کارت بانکی جهت امنیت</td></tr>
                    <tr><td><code>card_bank_info($card)</code></td><td>'603799...'</td><td><code>['name' => 'بانک ملی', ...]</code></td><td>تشخیص خودکار نام و کد بانک از روی ۶ رقم اول کارت</td></tr>
                    <tr><td><code>is_valid_sheba($sheba)</code></td><td>'IR12017000...'</td><td><code>true / false</code></td><td>اعتبارسنجی استاندارد شماره شبا با ISO 7064 Mod 97-10</td></tr>
                    <tr><td><code>sheba_format($sheba)</code></td><td>'IR120170...'</td><td><code>IR12-0170-0000-...</code></td><td>فرمت‌بندی شماره شبا به بلوک‌های ۴ رقمی</td></tr>
                </tbody>
            </table>

            <h2>۲. توابع احراز هویت و اطلاعات تماس (Identification & Contact)</h2>
            <table class="docs-table">
                <thead>
                    <tr>
                        <th>تابع</th>
                        <th>ورودی</th>
                        <th>خروجی نمونه</th>
                        <th>کاربرد</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><code>is_valid_national_code($code)</code></td><td>'0010350810'</td><td><code>true</code></td><td>اعتبارسنجی رسمی کد ملی ایران با الگوریتم ثبت احوال</td></tr>
                    <tr><td><code>is_valid_postal_code($postal)</code></td><td>'1451234567'</td><td><code>true</code></td><td>اعتبارسنجی کد پستی ۱۰ رقمی بدون ارقام نامعتبر</td></tr>
                    <tr><td><code>is_valid_mobile($mobile)</code></td><td>'09121234567'</td><td><code>true</code></td><td>بررسی صحت شماره موبایل ایران</td></tr>
                    <tr><td><code>mobile_operator($mobile)</code></td><td>'0912...'</td><td><strong>همراه اول</strong></td><td>تشخیص اپراتور تلفن همراه (همراه اول، ایرانسل، رایتل)</td></tr>
                    <tr><td><code>format_mobile($mobile, 'pretty')</code></td><td>'09121234567'</td><td><code>0912 123 4567</code></td><td>فرمت‌بندی زیبا یا استاندارد شماره تلفن همراه</td></tr>
                    <tr><td><code>mask_mobile($mobile)</code></td><td>'09121234567'</td><td><code>0912***4567</code></td><td>ماسک کردن شماره موبایل جهت حفظ حریم خصوصی</td></tr>
                </tbody>
            </table>

            <h2>۳. توابع زمان و تاریخ شمسی (Jalali Date & Time)</h2>
            <table class="docs-table">
                <thead>
                    <tr>
                        <th>تابع</th>
                        <th>ورودی</th>
                        <th>خروجی نمونه</th>
                        <th>کاربرد</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><code>jdate($format, $time)</code></td><td>'Y/m/d'</td><td>'۱۴۰۵/۰۱/۱۵'</td><td>فرمت تاریخ میلادی یا Timestamp به تاریخ شمسی</td></tr>
                    <tr><td><code>jdate_ago($datetime)</code></td><td>'2026-10-30 14:00'</td><td><strong>۲ ساعت پیش</strong></td><td>نمایش زمان سپری‌شده طبیعی به زبان فارسی</td></tr>
                    <tr><td><code>jalali_month_name(7)</code></td><td>7</td><td>'مهر'</td><td>نام ماه شمسی از روی شماره ماه</td></tr>
                    <tr><td><code>is_leap_jyear(1403)</code></td><td>1403</td><td><code>true</code></td><td>بررسی سال کبیسه در گاه‌شماری هجری خورشیدی</td></tr>
                    <tr><td><code>to_gregorian($jdate)</code></td><td>'1405/01/01'</td><td>'2026-03-21'</td><td>تبدیل تاریخ شمسی به میلادی جهت ذخیره در دیتابیس</td></tr>
                </tbody>
            </table>

            <h2>۴. توابع کار با متن، فایل و امنیت (Text, File & Security)</h2>
            <table class="docs-table">
                <thead>
                    <tr>
                        <th>تابع</th>
                        <th>ورودی</th>
                        <th>خروجی نمونه</th>
                        <th>کاربرد</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><code>human_filesize($bytes)</code></td><td>2097152</td><td><strong>۲ مگابایت</strong></td><td>تبدیل حجم فایل به واحدهای قابل خواندن انسان</td></tr>
                    <tr><td><code>file_icon('doc.pdf')</code></td><td>'report.pdf'</td><td><code>['icon' => 'fa-file-pdf', ...]</code></td><td>آیکون و رنگ FontAwesome متناسب با پسوند فایل</td></tr>
                    <tr><td><code>reading_time($article)</code></td><td>متن ۱۰۰۰ کلمه‌ای</td><td><strong>۵ دقیقه</strong></td><td>تخمین زمان مطالعه مقالات فارسی</td></tr>
                    <tr><td><code>random_otp(5)</code></td><td>5</td><td>'83921'</td><td>تولید کد امن اعتبارسنجی پیامکی (OTP)</td></tr>
                    <tr><td><code>generate_tracking_code('INV')</code></td><td>'INV'</td><td>'INV-8F3B9A1C'</td><td>تولید کد رهگیری تصادفی و یکتا برای سفارشات</td></tr>
                    <tr><td><code>clean_persian_text($text)</code></td><td>متن با ی/ک عربی</td><td>متن استاندارد فارسی</td><td>اصلاح نیم‌فاصله‌ها، علائم نگارشی و یکدست‌سازی حروف</td></tr>
                    <tr><td><code>slugify_fa($title)</code></td><td>'محصول جدید من'</td><td>'محصول-جدید-من'</td><td>تولید اسلاگ سئو سازگار با URLهای فارسی</td></tr>
                    <tr><td><code>api_response()</code></td><td>-</td><td>ApiResponse</td><td>هلپر زنجیره‌ای برای بازگرداندن پاسخ‌های استاندارد JSON</td></tr>
                </tbody>
            </table>
        `
    },
    {
        id: "controllers",
        title: "معماری کنترلرها (Controllers)",
        icon: "fa-diagram-project",
        category: "معماری و کنترلرها",
        content: `
            <h1>🏛️ معماری و کلاس‌های کنترلر (Controllers Architecture)</h1>
            <p class="lead text-muted">کنترلرهای سطح بالا برای حذف کدهای تکراری، مدیریت متمرکز نان‌ریزه‌ها (Breadcrumbs)، پیام‌های نشست (Flash)، فرمت استاندارد پاسخ‌ها و پیاده‌سازی سریع CRUD با یک خط کد.</p>

            <h2>۱. کلاس <code>BaseController</code></h2>
            <p>تمام کنترلرهای پروژه می‌توانند از این کلاس ارث‌بری کنند تا قابلیت‌های زیر را بلافاصله دریافت نمایند:</p>
            <ul>
                <li><strong>مدیریت نان‌ریزه:</strong> با متد <code>$this->addBreadcrumb('عنوان', 'لینک')</code></li>
                <li><strong>پیام‌های وضعیت (Flash Messages):</strong> <code>$this->flashSuccess('عملیات موفق')</code>, <code>flashError()</code>, <code>flashWarning()</code></li>
                <li><strong>دسترسی سریع به سرویس‌ها:</strong> <code>$this->uploader()</code>, <code>$this->payment()</code>, <code>$this->sms()</code></li>
                <li><strong>ارسال متغیر به تمام ویوها:</strong> <code>$this->share('settings', $settings)</code></li>
                <li><strong>پاسخ‌های API استاندارد:</strong> <code>$this->successResponse($data)</code>, <code>$this->errorResponse()</code></li>
            </ul>

            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">PHP</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>namespace App\\Http\\Controllers;

use MyLaravelCore\\Controllers\\BaseController;

class DashboardController extends BaseController
{
    public function index()
    {
        $this->setTitle('داشبورد مدیریت');
        $this->addBreadcrumb('داشبورد', route('admin.dashboard'), 'fa-home');
        
        // ارسال پیام فلش
        $this->flashSuccess('به پنل مدیریت خوش آمدید.');

        return view('admin.dashboard');
    }
}</code></pre>
            </div>

            <h2>۲. کلاس <code>CrudController</code> (عملیات کامل CRUD خودکار)</h2>
            <p>این کنترلر انتزاعی تمام عملیات‌های <code>index</code>, <code>create</code>, <code>store</code>, <code>show</code>, <code>edit</code>, <code>update</code>, <code>destroy</code>, <code>bulkDestroy</code> و <code>toggleStatus</code> را بدون نیاز به کدنویسی دستی پیاده می‌کند!</p>

            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">PHP</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>namespace App\\Http\\Controllers\\Admin;

use MyLaravelCore\\Controllers\\CrudController;
use App\\Models\\Product;
use App\\Tables\\ProductTable;
use Illuminate\\Http\\Request;

class ProductController extends CrudController
{
    protected string $modelClass = Product::class;
    protected ?string $tableClass = ProductTable::class; // اتصال مستقیم به Table Generator
    protected string $viewPath = 'admin.products';
    protected string $routePrefix = 'admin.products';
    protected string $resourceTitle = 'محصول';
    
    // فیلدهای آپلود فایل با حذف خودکار فایل قبلی
    protected array $uploadFields = [
        'image' => ['directory' => 'products']
    ];

    // قوانین اعتبارسنجی
    protected function rules(Request $request, string $action = 'store', ?Model $model = null): array
    {
        return [
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'status' => 'required|in:active,draft,archived',
        ];
    }
}</code></pre>
            </div>

            <h2>۳. کلاس <code>ApiController</code> (مخصوص وب‌سرویس‌های RESTful)</h2>
            <p>برای کنترلرهای API با متدهای کمکی <code>respondWithPagination()</code>, <code>respondCreated()</code>, <code>respondNotFound()</code> و مدیریت استثناها:</p>

            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">PHP</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>namespace App\\Http\\Controllers\\Api;

use MyLaravelCore\\Controllers\\ApiController;
use App\\Models\\Product;

class ProductApiController extends ApiController
{
    public function index()
    {
        $products = Product::latest()->paginate(15);
        return $this->respondWithPagination($products, 'لیست محصولات با موفقیت دریافت شد.');
    }
}</code></pre>
            </div>
        `
    },
    {
        id: "table-generator",
        title: "سازنده جدول و لیست‌ها (Table Generator)",
        icon: "fa-table-columns",
        category: "جداول و دیتا",
        content: `
            <h1>📊 سازنده جداول بیانی (Declarative Table Generator)</h1>
            <p class="lead text-muted">سیستم پیشرفته ایجاد جداول اطلاعاتی مشابه لاراول فلامنت و دوراول با قابلیت تعریف ستون‌ها، فیلترهای پیشرفته، مرتب‌سازی، جستجوی زنده، عملیات گروهی و صفحه‌بندی هوشمند.</p>

            <h2>۱. تولید کلاس جدول با دستور Artisan</h2>
            <p>با اجرای دستور زیر، یک کلاس جدول اختصاصی برای مدل شما ساخته می‌شود:</p>
            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">Bash</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>php artisan core:table ProductTable --model=Product --title="مدیریت محصولات"</code></pre>
            </div>

            <h2>۲. ساختار یک کلاس Table</h2>
            <p>فایل ایجاد شده در <code>app/Tables/ProductTable.php</code> به صورت زیر است:</p>

            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">PHP</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>namespace App\\Tables;

use MyLaravelCore\\Tables\\BaseTable;
use MyLaravelCore\\Tables\\Columns\\TextColumn;
use MyLaravelCore\\Tables\\Columns\\BadgeColumn;
use MyLaravelCore\\Tables\\Columns\\CurrencyColumn;
use MyLaravelCore\\Tables\\Columns\\DateColumn;
use MyLaravelCore\\Tables\\Columns\\ImageColumn;
use MyLaravelCore\\Tables\\Columns\\ToggleColumn;
use MyLaravelCore\\Tables\\Columns\\ActionColumn;
use MyLaravelCore\\Tables\\Filters\\SelectFilter;
use MyLaravelCore\\Tables\\Filters\\DateRangeFilter;
use MyLaravelCore\\Tables\\Actions\\TableAction;
use App\\Models\\Product;

class ProductTable extends BaseTable
{
    protected ?string $model = Product::class;
    protected string $title = 'مدیریت محصولات فروشگاه';
    protected ?string $icon = 'fa-boxes-stacked';
    protected int $perPage = 15;

    public function columns(): array
    {
        return [
            ImageColumn::make('image', 'تصویر')->rounded('circle')->height(45),
            TextColumn::make('name', 'نام محصول')->searchable()->sortable()->copyable(),
            CurrencyColumn::make('price', 'قیمت فروش')->toman()->sortable()->showWords(),
            BadgeColumn::make('status', 'وضعیت')->map([
                'active' => ['label' => 'موجود', 'variant' => 'success'],
                'draft' => ['label' => 'پیش‌نویس', 'variant' => 'secondary'],
                'out_of_stock' => ['label' => 'ناموجود', 'variant' => 'danger'],
            ]),
            ToggleColumn::make('is_featured', 'ویژه')->endpoint('/admin/products/toggle'),
            DateColumn::make('created_at', 'تاریخ ثبت')->jalali()->timeAgo()->sortable(),
            ActionColumn::make('عملیات')->actions([
                TableAction::make('edit', 'ویرایش')->icon('fa-edit')->url(fn($p) => route('admin.products.edit', $p)),
                TableAction::make('delete', 'حذف')->icon('fa-trash')->variant('danger')->confirm('آیا از حذف مطمئن هستید؟'),
            ]),
        ];
    }

    public function filters(): array
    {
        return [
            SelectFilter::make('status', 'وضعیت موجودی')->options([
                'active' => 'موجود در انبار',
                'out_of_stock' => 'ناموجود',
            ]),
            DateRangeFilter::make('created_at', 'بازه زمانی ایجاد'),
        ];
    }

    public function bulkActions(): array
    {
        return [
            TableAction::make('bulk_delete', 'حذف دسته‌جمعی')->icon('fa-trash')->variant('danger')->confirm('آیا مطمئن هستید؟'),
        ];
    }
}</code></pre>
            </div>

            <h2>۳. استفاده در کنترلر و فایل ویو Blade</h2>
            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">PHP (Controller)</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>public function index()
{
    $table = \\App\\Tables\\ProductTable::make();
    return view('admin.products.index', compact('table'));
}</code></pre>
            </div>

            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">Blade (View)</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>&lt;x-default-layout title="محصولات"&gt;
    &lt;x-table-view :table="$table" /&gt;
&lt;/x-default-layout&gt;</code></pre>
            </div>
        `
    },
    {
        id: "javascript-sdk",
        title: "کتابخانه جاوااسکریپت و متدهای آماده (Core JS SDK)",
        icon: "fa-code",
        category: "فرانت‌اند و جاوااسکریپت",
        content: `
            <h1>⚡ متدها و کنترلرهای جاوااسکریپت (Core JavaScript SDK)</h1>
            <p class="lead text-muted">مجموعه متدهای آماده فرانت‌اند روی شیء سراسری <code>Core</code> برای ارسال درخواست‌های AJAX، نمایش اعلان‌های تست (Toast)، دیالوگ‌های مدرن تأیید، فرمت‌بندی اعداد و مبالغ، و کپی در کلیپ‌بورد.</p>

            <h2>۱. تست زنده نوتیفیکیشن‌ها (Toast Notifications)</h2>
            <p>روی دکمه‌های زیر کلیک کنید تا اعلان‌های زنده را مشاهده نمایید:</p>
            <div class="d-flex flex-wrap gap-2 mb-4">
                <button type="button" class="btn btn-success" onclick="Core.notify.success('اطلاعات با موفقیت ذخیره گردید.', 'ثبت رکورد')">
                    <i class="fa fa-check-circle me-1"></i> اعلان موفقیت (Success)
                </button>
                <button type="button" class="btn btn-danger" onclick="Core.notify.error('خطایی در ارتباط با سرور رخ داد!', 'خطای سیستمی')">
                    <i class="fa fa-circle-xmark me-1"></i> اعلان خطا (Error)
                </button>
                <button type="button" class="btn btn-warning" onclick="Core.notify.warning('حجم فایل انتخابی بیش از حد مجاز است.', 'هشدار')">
                    <i class="fa fa-triangle-exclamation me-1"></i> اعلان هشدار (Warning)
                </button>
                <button type="button" class="btn btn-info text-white" onclick="Core.notify.info('نسخه جدید زیرساخت منتشر شد.', 'اطلاعیه')">
                    <i class="fa fa-circle-info me-1"></i> اعلان اطلاع‌رسانی (Info)
                </button>
            </div>

            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">JavaScript</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>Core.notify.success('اطلاعات ذخیره شد.', 'موفقیت');
Core.notify.error('خطایی رخ داد!', 'خطا');
Core.notify.warning('دقت کنید...', 'هشدار');
Core.notify.info('پیام سیستم', 'اطلاع‌رسانی');</code></pre>
            </div>

            <h2>۲. تست زنده دیالوگ تأیید مدرن (Confirm Dialog)</h2>
            <p>دیالوگ‌های مدرن جایگزین <code>confirm()</code> پیش‌فرض مرورگر:</p>
            <button type="button" class="btn btn-outline-danger mb-4" onclick="Core.dialog.confirm({
                title: 'آیا از حذف این کاربر مطمئن هستید؟',
                message: 'با حذف کاربر، تمامی دسترسی‌ها و تراکنش‌های وی نیز معلق خواهد شد.',
                confirmText: 'بله، حذف کن',
                onConfirm: function() { Core.notify.success('کاربر با موفقیت حذف شد.'); }
            })">
                <i class="fa fa-trash me-1"></i> نمایش دیالوگ تأیید حذف
            </button>

            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">JavaScript</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>Core.dialog.confirm({
    title: 'آیا مطمئن هستید؟',
    message: 'این رکورد برای همیشه حذف خواهد شد.',
    variant: 'danger',
    confirmText: 'بله، انجام بده',
    cancelText: 'انصراف',
    onConfirm: function() {
        // اجرای عملیات یا ارسال درخواست AJAX
    }
});</code></pre>
            </div>

            <h2>۳. تست زنده تبدیل عدد به حروف فارسی فاکتور (Number to Words)</h2>
            <p>یک عدد در کادر زیر تایپ کنید تا بلافاصله به کلمات فارسی فاکتور تبدیل شود:</p>
            <div class="card p-3 border rounded-3 mb-4 bg-light">
                <label class="form-label fw-bold">مبلغ فاکتور (تومان):</label>
                <input type="text" class="form-control form-control-lg" id="demo-amount-input" value="1540000" oninput="document.getElementById('demo-words-output').textContent = Core.format.numberToWords(this.value) + ' تومان'">
                <div class="mt-2 text-primary fw-bold fs-5" id="demo-words-output">یک میلیون و پانصد و چهل هزار تومان</div>
            </div>

            <h2>۴. کپی فوری در کلیپ‌بورد (Clipboard Copy)</h2>
            <div class="d-flex align-items-center gap-2 mb-4">
                <input type="text" class="form-control" style="max-width: 300px;" value="IR120170000000123456789012" readonly>
                <button type="button" class="btn btn-primary" data-core-copy="IR120170000000123456789012">
                    <i class="fa fa-copy me-1"></i> کپی شبا
                </button>
            </div>

            <h2>۵. موتور درخواست‌های AJAX با توکن CSRF خودکار</h2>
            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">JavaScript</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>// درخواست GET
const data = await Core.ajax.get('/api/products', { status: 'active' });

// درخواست POST با مدیریت خودکار خطاها و توکن CSRF
Core.ajax.post('/api/products', { name: 'کیک شکلاتی', price: 120000 })
    .then(res => {
        Core.notify.success('محصول با موفقیت ثبت شد!');
    });</code></pre>
            </div>
        `
    },
    {
        id: "services-traits",
        title: "سرویس‌ها و تریت‌ها (Services & Traits)",
        icon: "fa-cubes",
        category: "توابع و سرویس‌ها",
        content: `
            <h1>⚙️ سرویس‌ها و تریت‌های سازمانی</h1>
            
            <h2>۱. سرویس آپلود فایل (UploaderService)</h2>
            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">PHP</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>// آپلود فایل تکی
$file = core()->uploader()->upload(
    file: $request->file('avatar'),
    directory: 'avatars',
    disk: 'public'
);

// آپلود همزمان چند فایل
$files = core()->uploader()->uploadMultiple($request->file('photos'), 'gallery');

// حذف فایل
core()->uploader()->delete('uploads/avatars/file.jpg', 'public');</code></pre>
            </div>

            <h2>۲. سیستم یکپارچه پرداخت اینترنتی (PaymentManager)</h2>
            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">PHP</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>// درخواست تراکنش و دریافت لینک درگاه (زرین‌پال / Mock)
$payment = core()->payment('zarinpal')
    ->amount(50000)
    ->callbackUrl(route('verify'))
    ->payer('09121112233')
    ->request();

return redirect($payment['redirect_url']);

// تأیید تراکنش پس از بازگشت از بانک
$result = core()->payment('zarinpal')->verify($authority, 50000);
if ($result['success']) {
    $refId = $result['ref_id'];
    $cardPan = $result['card_pan'];
}</code></pre>
            </div>

            <h2>۳. تریت‌های کاربردی برای مدل‌های Eloquent</h2>
            <ul>
                <li><strong>HasUuid:</strong> تخصیص خودکار شناسه UUID و متدهای <code>findByUuid()</code> و <code>whereUuid()</code></li>
                <li><strong>HasSlug:</strong> تولید خودکار اسلاگ فارسی منحصر‌به‌فرد از فیلد عنوان</li>
                <li><strong>Auditable:</strong> ثبت خودکار <code>created_by</code>، <code>updated_by</code> و <code>deleted_by</code> از کاربر جاری</li>
                <li><strong>HasStatus:</strong> متدهای <code>$model->activate()</code>، <code>$model->deactivate()</code> و اسکوپ <code>active()</code></li>
                <li><strong>Filterable:</strong> فیلتر، سرچ، بازه تاریخ و مرتب‌سازی داینامیک از روی پارامترهای URL</li>
            </ul>

            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">PHP</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>// در مدل
class Product extends Model {
    use HasUuid, HasSlug, Auditable, HasStatus, Filterable;
    
    protected array $searchable = ['title', 'category.name'];
    protected array $filterable = ['status', 'category_id'];
}

// در کنترلر
public function index() {
    // اعمال خودکار فیلترها از ?search=...&status=1&from_date=...
    $products = Product::filter()->paginate(15);
    return view('products.index', compact('products'));
}</code></pre>
            </div>
        `
    },
    {
        id: "artisan-cli",
        title: "دستورات خط فرمان (Artisan CLI)",
        icon: "fa-terminal",
        category: "کدجنریتورها",
        content: `
            <h1>💻 دستورات اختصاصی خط فرمان (Artisan CLI)</h1>
            <p>دستورات سریع برای نصب، سرو مستندات و تولید کدهای آماده با رعایت کامل استانداردهای سازمانی.</p>

            <h2>۱. اجرای سایت مستندات در لوکال</h2>
            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">BASH</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>php artisan core:docs</code></pre>
            </div>

            <h2>۲. تولید ساختار کامل CRUD</h2>
            <p>این دستور به صورت خودکار مدل، ریکوئست اعتبارسنجی، کنترلر CRUD و هر سه فایل Blade با لایه‌بندی <code>&lt;x-default-layout&gt;</code> را تولید می‌کند:</p>
            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">BASH</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code># ساخت CRUD پنل کاربری کامل (ویوها + کنترلر + ریکوئست + مدل)
php artisan make:core-crud Product

# ساخت کنترلر و ریسورس مخصوص API
php artisan make:core-crud Product --api</code></pre>
            </div>

            <h2>۳. ساخت کلاس سرویس اختصاصی</h2>
            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">BASH</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>php artisan make:core-service PaymentReportService</code></pre>
            </div>

            <h2>۴. ساخت تریت اختصاصی برای مدل‌ها</h2>
            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">BASH</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>php artisan make:core-trait HasDiscount</code></pre>
            </div>
        `
    },
    {
        id: "showcase",
        title: "ویترین زنده کامپوننت‌ها (Showcase)",
        icon: "fa-wand-magic-sparkles",
        category: "پیش‌نمایش تعاملی",
        content: `
            <h1>🎪 ویترین و پیش‌نمایش زنده کامپوننت‌ها</h1>
            <p>در این بخش می‌توانید ظاهر، استایل و رفتار واقعی کامپوننت‌های زیرساخت را به صورت زنده و تعاملی بررسی کنید:</p>

            <div class="component-demo-card">
                <div class="component-demo-header">
                    <span class="fw-bold"><i class="fa fa-chart-line text-primary me-2"></i> کارت‌های شاخص عملکرد (Data Cards)</span>
                    <span class="badge bg-primary">داشبورد</span>
                </div>
                <div class="component-demo-preview">
                    <div class="row g-3">
                        <div class="col-md-4">
                            <div class="card border-0 shadow-sm p-3 rounded-3">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <small class="text-muted d-block">کاربران فعال</small>
                                        <h3 class="fw-bold mb-0 mt-1">۱,۴۲۰</h3>
                                    </div>
                                    <div class="p-3 rounded-3 bg-primary bg-opacity-10 text-primary">
                                        <i class="fa fa-users fs-4"></i>
                                    </div>
                                </div>
                                <div class="mt-3 small text-success">
                                    <i class="fa fa-arrow-up me-1"></i> ۱۲.۵٪ افزایش نسبت به ماه قبل
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card border-0 shadow-sm p-3 rounded-3">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <small class="text-muted d-block">درآمد این ماه</small>
                                        <h3 class="fw-bold mb-0 mt-1">۳۸,۵۰۰,۰۰۰</h3>
                                    </div>
                                    <div class="p-3 rounded-3 bg-success bg-opacity-10 text-success">
                                        <i class="fa fa-wallet fs-4"></i>
                                    </div>
                                </div>
                                <div class="mt-3 small text-success">
                                    <i class="fa fa-arrow-up me-1"></i> ۸.۳٪ رشد فروش
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="card border-0 shadow-sm p-3 rounded-3">
                                <div class="d-flex justify-content-between align-items-center">
                                    <div>
                                        <small class="text-muted d-block">تیکت‌های باز</small>
                                        <h3 class="fw-bold mb-0 mt-1">۵</h3>
                                    </div>
                                    <div class="p-3 rounded-3 bg-warning bg-opacity-10 text-warning">
                                        <i class="fa fa-ticket fs-4"></i>
                                    </div>
                                </div>
                                <div class="mt-3 small text-muted">
                                    نیاز به پاسخ پشتیبانی
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="component-demo-card">
                <div class="component-demo-header">
                    <span class="fw-bold"><i class="fa fa-bell text-primary me-2"></i> انواع آلرت و اعلان‌ها (Alerts)</span>
                    <span class="badge bg-secondary">نمایشی</span>
                </div>
                <div class="component-demo-preview d-flex flex-column gap-2">
                    <div class="alert alert-success d-flex align-items-center mb-0" role="alert">
                        <i class="fa fa-check-circle me-2 fs-5"></i>
                        <div>عملیات با موفقیت انجام شد و اطلاعات ذخیره گردید.</div>
                    </div>
                    <div class="alert alert-danger d-flex align-items-center mb-0" role="alert">
                        <i class="fa fa-times-circle me-2 fs-5"></i>
                        <div>خطا در برقراری ارتباط با درگاه بانکی. لطفاً مجدداً تلاش کنید.</div>
                    </div>
                    <div class="alert alert-warning d-flex align-items-center mb-0" role="alert">
                        <i class="fa fa-exclamation-triangle me-2 fs-5"></i>
                        <div>توجه: دوره اشتراک شما طی ۳ روز آینده به پایان می‌رسد.</div>
                    </div>
                </div>
            </div>

            <div class="component-demo-card">
                <div class="component-demo-header">
                    <span class="fw-bold"><i class="fa fa-hand-pointer text-primary me-2"></i> دکمه‌ها و نشان‌ها (Buttons & Badges)</span>
                    <span class="badge bg-secondary">تعاملی</span>
                </div>
                <div class="component-demo-preview d-flex flex-wrap gap-2 align-items-center">
                    <button class="btn btn-primary"><i class="fa fa-save me-1"></i> دکمه اصلی</button>
                    <button class="btn btn-outline-primary"><i class="fa fa-edit me-1"></i> دکمه حاشیه‌دار</button>
                    <button class="btn btn-success"><i class="fa fa-check me-1"></i> موفقیت</button>
                    <button class="btn btn-danger"><i class="fa fa-trash me-1"></i> حذف رکورد</button>
                    <button class="btn btn-light border"><i class="fa fa-arrow-right me-1"></i> انصراف</button>
                    <span class="badge bg-success rounded-pill px-3 py-2">فعال</span>
                    <span class="badge bg-danger rounded-pill px-3 py-2">مسدود شده</span>
                    <span class="badge bg-primary px-3 py-2">مدیر کل</span>
                </div>
            </div>
        `
    }
];
