/**
 * ابول فریم (AbolFrame) - Documentation Content Store
 * Complete structured guides, examples, and search index
 */

window.DOCS_SECTIONS = [
    {
        id: "intro",
        title: "شروع سریع و نصب",
        icon: "fa-rocket",
        category: "شروع کار",
        content: `
            <h1>🚀 زیرساخت مدرن ابول فریم (AbolFrame)</h1>
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
    },
    {
        id: "abolframe-php-helpers",
        title: "۱. توابع کمکی PHP (۶۵+ تابع)",
        icon: "fa-code",
        category: "مستندات جامع ابول فریم (AbolFrame)",
        content: `
<h1>۱. توابع کمکی PHP (AbolFrame) — توضیح کامل</h1>
<div class="callout info"><i class="fa fa-circle-info callout-icon"></i><div>این فایل تمام helperهای PHP مخصوص توسعه‌دهنده اپلیکیشن را با پارامترها، خروجی، رفتار و مثال توضیح می‌دهد. helperهای داخلی رندر/ژنراتور/زیرساخت پکیج عمداً در مستندات اصلی نیامده‌اند.<br><strong>قانون پروژه:</strong> اگر برای کاری helper وجود دارد، همان استفاده شود؛ نسخه دستی ممنوع است.</div></div>
<div class="toc-quick-jump-card my-4 p-3 rounded-3 border bg-body-tertiary"><div class="d-flex align-items-center justify-content-between mb-2"><strong class="text-primary small"><i class="fa fa-compass ms-1"></i> فهرست سریع آیتم‌ها، متدها و کامپوننت‌های این بخش (60 مورد):</strong></div><div class="d-flex flex-wrap gap-2"><a href="#sec-abolframe-php-helpers-1" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش A — احراز هویت (Authentication)</a><a href="#sec-abolframe-php-helpers-2" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">authenticator()</a><a href="#sec-abolframe-php-helpers-3" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">authUser()</a><a href="#sec-abolframe-php-helpers-4" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">authId()</a><a href="#sec-abolframe-php-helpers-5" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">authCheck()</a><a href="#sec-abolframe-php-helpers-6" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">authLogout(?Request $request)</a><a href="#sec-abolframe-php-helpers-7" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">authFieldDefinitions()</a><a href="#sec-abolframe-php-helpers-8" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">authFieldNames()</a><a href="#sec-abolframe-php-helpers-9" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">authFieldDefinition(string $authField, array $default = [])</a><a href="#sec-abolframe-php-helpers-10" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">registrationAuthFieldDefinitions()</a><a href="#sec-abolframe-php-helpers-11" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">passwordRecoveryAuthFieldDefinitions()</a><a href="#sec-abolframe-php-helpers-12" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">userMetaFieldGroups()</a><a href="#sec-abolframe-php-helpers-13" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">userMetaFields(?PersonType $personType = null)</a><a href="#sec-abolframe-php-helpers-14" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">authPasswordLength()</a><a href="#sec-abolframe-php-helpers-15" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">userActivationModel()</a><a href="#sec-abolframe-php-helpers-16" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">generatePasswordRule($min, $max)</a><a href="#sec-abolframe-php-helpers-17" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">تبدیل login_type با Enum</a><a href="#sec-abolframe-php-helpers-18" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش B — بومی‌سازی و تاریخ</a><a href="#sec-abolframe-php-helpers-19" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">localizor()</a><a href="#sec-abolframe-php-helpers-20" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">getLanguage()</a><a href="#sec-abolframe-php-helpers-21" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">getPortal()</a><a href="#sec-abolframe-php-helpers-22" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">isProjectLocalized()</a><a href="#sec-abolframe-php-helpers-23" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">hijri($datetime = null, $timezone = null)</a><a href="#sec-abolframe-php-helpers-24" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش C — فرمت، نمایش و متن</a><a href="#sec-abolframe-php-helpers-25" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">stringMaskFormatter(string $mask, ?string $input)</a><a href="#sec-abolframe-php-helpers-26" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">numberSeparator($value)</a><a href="#sec-abolframe-php-helpers-27" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">spellNumber($number, string $suffix = &amp;#039;&amp;#039;)</a><a href="#sec-abolframe-php-helpers-28" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">formatBytes($bytes, $precision, $persianTranslate)</a><a href="#sec-abolframe-php-helpers-29" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">formatFileSize(int $bytes)</a><a href="#sec-abolframe-php-helpers-30" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">parseSize(string $size)</a><a href="#sec-abolframe-php-helpers-31" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">convertExtensionsToDotFormat(string $extensions)</a><a href="#sec-abolframe-php-helpers-32" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">groupBodyTooltip($value, $title, $valueClass)</a><a href="#sec-abolframe-php-helpers-33" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">presetColors()</a><a href="#sec-abolframe-php-helpers-34" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">renderColor()</a><a href="#sec-abolframe-php-helpers-35" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">enumBadgeVariant($value, ?array $customColors = null)</a><a href="#sec-abolframe-php-helpers-36" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">getEnumName($enum, $selectedItem, $module, $isEnum)</a><a href="#sec-abolframe-php-helpers-37" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">parsedUserAgentInfo(string $userAgent)</a><a href="#sec-abolframe-php-helpers-38" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">renderComponent(Badge::class, [...props])</a><a href="#sec-abolframe-php-helpers-39" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش D — فرم و کامپوننت‌ها</a><a href="#sec-abolframe-php-helpers-40" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">prepareSelectComponentData(...)</a><a href="#sec-abolframe-php-helpers-41" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">makeDatetimeRangePickerID($id, $dedicatedName, $name)</a><a href="#sec-abolframe-php-helpers-42" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">filterValidation(array $rules)</a><a href="#sec-abolframe-php-helpers-43" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش E — فایل و آپلود</a><a href="#sec-abolframe-php-helpers-44" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">getFile(?int $fileID)</a><a href="#sec-abolframe-php-helpers-45" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">uploadFile(...)</a><a href="#sec-abolframe-php-helpers-46" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">FileManager::url($fileId)</a><a href="#sec-abolframe-php-helpers-47" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش F — مسیر، فیلتر و جستجو</a><a href="#sec-abolframe-php-helpers-48" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">makePanelRouteName(string $name)</a><a href="#sec-abolframe-php-helpers-49" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">appendFilterQueryParamsToLinks(string $name, array $parameters = [], bool $absolute = true)</a><a href="#sec-abolframe-php-helpers-50" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">handleSearchAndResetPage(?string $search, string $sectionName, string $routeName, array $routeParams = [])</a><a href="#sec-abolframe-php-helpers-51" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">getPageTitle(?string $routeName = null)</a><a href="#sec-abolframe-php-helpers-52" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">getNextSortValue(Model::class)</a><a href="#sec-abolframe-php-helpers-53" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">generateUserManagementRouteName(string $suffix)</a><a href="#sec-abolframe-php-helpers-54" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش G — دسترسی و کاربران</a><a href="#sec-abolframe-php-helpers-55" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">policyCheck(string $ability, $entity)</a><a href="#sec-abolframe-php-helpers-56" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">policyAuthorize(string $ability, $entity)</a><a href="#sec-abolframe-php-helpers-57" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">renderConditionalLink(value, showPermission, editPermission, showParameters, editParameters)</a><a href="#sec-abolframe-php-helpers-58" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">resolveUserHref($relatedUser)</a><a href="#sec-abolframe-php-helpers-59" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">getUserStatuses()</a><a href="#sec-abolframe-php-helpers-60" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">linkUserInfo(name, code, parameters, route, classes, linked?)</a></div></div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-php-helpers-1" class="scroll-mt-header">بخش A — احراز هویت (Authentication)</h2>
<p>این helperها وقتی لازم‌اند که بخواهید flowهای auth را <strong>خارج از UI آماده پکیج</strong> پیاده کنید ولی از definitionها و abstractionهای همان سیستم استفاده کنید. نسبت به صدا زدن مستقیم متدهای Authenticator، برای دسترسی به داده و کنترل flow مناسب‌ترند.</p>
<h3 id="sec-abolframe-php-helpers-2" class="scroll-mt-header"><code>authenticator()</code></h3>
<ul><li><strong>کار:</strong> instance جاری سرویس <code>Authenticator</code> را برمی‌گرداند.</li><li><strong>پارامتر:</strong> ندارد.</li><li><strong>خروجی:</strong> <code>MyLaravelCore\\Support\\Auth\\Authenticator</code></li></ul>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$user = authenticator()-&gt;user();
$auth = authenticator();</code></pre>
</div>
<h3 id="sec-abolframe-php-helpers-3" class="scroll-mt-header"><code>authUser()</code></h3>
<ul><li><strong>کار:</strong> کاربر احراز هویت‌شده را از guard فعال برمی‌گرداند.</li><li><strong>خروجی:</strong> <code>mixed</code> (روی نوع دقیق آن منطق سنگین بنا نکنید).</li></ul>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$user = authUser();</code></pre>
</div>
<h3 id="sec-abolframe-php-helpers-4" class="scroll-mt-header"><code>authId()</code></h3>
<ul><li><strong>کار:</strong> شناسه کاربر احراز‌شده.</li><li><strong>خروجی:</strong> <code>int | string | null</code></li></ul>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$userId = authId();</code></pre>
</div>
<h3 id="sec-abolframe-php-helpers-5" class="scroll-mt-header"><code>authCheck()</code></h3>
<ul><li><strong>کار:</strong> بررسی می‌کند کاربر فعلی احراز هویت شده یا نه.</li><li><strong>خروجی:</strong> <code>bool</code></li></ul>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>if (authCheck()) { /* ... */ }</code></pre>
</div>
<h3 id="sec-abolframe-php-helpers-6" class="scroll-mt-header"><code>authLogout(?Request $request)</code></h3>
<ul><li><strong>کار:</strong> کاربر را از flow مبتنی بر session یا token خارج می‌کند.</li><li><strong>پارامتر:</strong> <code>request</code> (<code>Illuminate\\Http\\Request | null</code>) — اگر <code>null</code> باشد از request فعلی استفاده می‌شود.</li><li><strong>خروجی:</strong> <code>bool</code></li></ul>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>authLogout(request());</code></pre>
</div>
<h3 id="sec-abolframe-php-helpers-7" class="scroll-mt-header"><code>authFieldDefinitions()</code></h3>
<ul><li><strong>کار:</strong> تعریف کامل همه auth fieldها را برمی‌گرداند.</li><li><strong>خروجی:</strong> <code>array</code></li></ul>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$fields = authFieldDefinitions();</code></pre>
</div>
<h3 id="sec-abolframe-php-helpers-8" class="scroll-mt-header"><code>authFieldNames()</code></h3>
<ul><li><strong>کار:</strong> نام همه auth fieldهای تعریف‌شده.</li><li><strong>خروجی:</strong> <code>array</code> — نمونه: <code>[&#039;code&#039;, &#039;mobile&#039;]</code></li></ul>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$fieldNames = authFieldNames();</code></pre>
</div>
<h3 id="sec-abolframe-php-helpers-9" class="scroll-mt-header"><code>authFieldDefinition(string $authField, array $default = [])</code></h3>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پارامتر</th><th>نوع</th><th>توضیح</th></tr></thead><tbody><tr><td><code>authField</code></td><td>string</td><td>نام field</td></tr><tr><td><code>default</code></td><td>array</td><td>مقدار پیش‌فرض در صورت نبود definition</td></tr></tbody></table></div>
<ul><li><strong>خروجی:</strong> <code>array</code></li></ul>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$mobileField = authFieldDefinition(&#039;mobile&#039;);
$mobileRules = authFieldDefinition(&#039;mobile&#039;)[&#039;rules&#039;] ?? [];</code></pre>
</div>
<h3 id="sec-abolframe-php-helpers-10" class="scroll-mt-header"><code>registrationAuthFieldDefinitions()</code></h3>
<p>فقط auth fieldهایی را برمی‌گرداند که برای <strong>ثبت‌نام (registration)</strong> فعال‌اند. خروجی <code>array</code>.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$regFields = registrationAuthFieldDefinitions();
foreach ($regFields as $fieldName =&gt; $config) {
    // نمایش پویا یا ساخت قوانین اعتبارسنجی فرم ثبت‌نام
}</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدار:</strong> هرگز نام فیلدهای ثبت‌نام را در کنترلر یا ویو Hardcode نکنید؛ همیشه از خروجی <code>registrationAuthFieldDefinitions()</code> استفاده کنید تا با تغییر کانفیگ احراز هویت، فرم ثبت‌نام خودکار هماهنگ بماند.</div></div>
<h3 id="sec-abolframe-php-helpers-11" class="scroll-mt-header"><code>passwordRecoveryAuthFieldDefinitions()</code></h3>
<p>فقط auth fieldهایی که برای <strong>فراموشی رمز (forgot password)</strong> فعال‌اند. خروجی <code>array</code>.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$recoveryFields = passwordRecoveryAuthFieldDefinitions();</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدار:</strong> فقط فیلدهایی که در کانفیگ احراز هویت دارای فلگ بازیابی رمز هستند برگردانده می‌شوند.</div></div>
<h3 id="sec-abolframe-php-helpers-12" class="scroll-mt-header"><code>userMetaFieldGroups()</code></h3>
<p>همه گروه‌های meta field را برمی‌گرداند. خروجی <code>array</code>.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$groups = userMetaFieldGroups();</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>نکته مهم:</strong> برای دریافت فیلدهای متای فیلترشده بر اساس نوع شخص (حقیقی/حقوقی) از <code>userMetaFields(PersonType::REAL)</code> استفاده کنید.</div></div>
<h3 id="sec-abolframe-php-helpers-13" class="scroll-mt-header"><code>userMetaFields(?PersonType $personType = null)</code></h3>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پارامتر</th><th>نوع</th><th>توضیح</th></tr></thead><tbody><tr><td><code>personType</code></td><td>\`PersonType \\</td><td>null\`</td></tr></tbody></table></div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>use MyLaravelCore\\Enums\\PersonType;
$realFields = userMetaFields(PersonType::REAL);</code></pre>
</div>
<h3 id="sec-abolframe-php-helpers-14" class="scroll-mt-header"><code>authPasswordLength()</code></h3>
<p>حداقل و حداکثر طول مجاز رمز را از تنظیمات برمی‌گرداند. خروجی <code>array{0:int,1:int}</code>، نمونه <code>[8, 32]</code>.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>[$min, $max] = authPasswordLength();</code></pre>
</div>
<h3 id="sec-abolframe-php-helpers-15" class="scroll-mt-header"><code>userActivationModel()</code></h3>
<p>کلاس مدل activation را برمی‌گرداند تا در flowهای سفارشی آن را <strong>hardcode نکنید</strong>. خروجی <code>string</code>.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$activationModel = userActivationModel();
$row = $activationModel::query()-&gt;find($id);</code></pre>
</div>
<h3 id="sec-abolframe-php-helpers-16" class="scroll-mt-header"><code>generatePasswordRule($min, $max)</code></h3>
<p>rules لازم برای فیلد password را بر اساس حداقل/حداکثر طول می‌سازد. خروجی: <code>[&#039;password&#039; =&gt; [&#039;min:8&#039;, &#039;max:32&#039;, &#039;required&#039;]]</code></p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$rules = array_merge([&#039;email&#039; =&gt; [&#039;required&#039;, &#039;email&#039;]], generatePasswordRule(8, 32));</code></pre>
</div>
<h3 id="sec-abolframe-php-helpers-17" class="scroll-mt-header">تبدیل <code>login_type</code> با Enum</h3>
<p>برای کار با <code>login_type</code> از <code>MyLaravelCore\\Enums\\UserLoginType</code> استفاده کنید:</p>
<ul><li><code>UserLoginType::composeLoginTypeMask([...])</code> → آرایه مقادیر را به <strong>bitmask</strong> تبدیل می‌کند.</li><li><code>UserLoginType::parseLoginTypeMask($mask)</code> → bitmask را به enumها برمی‌گرداند.</li></ul>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$mask = UserLoginType::composeLoginTypeMask([UserLoginType::PASSWORD, UserLoginType::OTP_EMAIL]);
$types = UserLoginType::parseLoginTypeMask($user-&gt;login_type);
$labels = collect($types)
    -&gt;map(fn (UserLoginType $type) =&gt; __(&#039;user-management::fields.login_types.&#039; . strtolower($type-&gt;name)))
    -&gt;all();</code></pre>
</div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-php-helpers-18" class="scroll-mt-header">بخش B — بومی‌سازی و تاریخ</h2>
<h3 id="sec-abolframe-php-helpers-19" class="scroll-mt-header"><code>localizor()</code></h3>
<p>سرویس localization فعلی (<code>MyLaravelCore\\Support\\Localization\\Localization</code>) را برمی‌گرداند؛ می‌توانید متدهایی مثل <code>getCurrentLanguage()</code> را روی آن صدا بزنید.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$language = localizor()-&gt;getCurrentLanguage();</code></pre>
</div>
<h3 id="sec-abolframe-php-helpers-20" class="scroll-mt-header"><code>getLanguage()</code></h3>
<p>زبان جاری پروژه (مثلاً <code>&quot;fa&quot;</code>). خروجی <code>mixed</code>.</p>
<h3 id="sec-abolframe-php-helpers-21" class="scroll-mt-header"><code>getPortal()</code></h3>
<p>پرتال یا context فعلی را از localization برمی‌گرداند (مثلاً <code>&quot;admin&quot;</code>). خروجی <code>mixed</code>.</p>
<h3 id="sec-abolframe-php-helpers-22" class="scroll-mt-header"><code>isProjectLocalized()</code></h3>
<p>مشخص می‌کند قابلیت localization در پروژه فعال است یا نه. خروجی <code>bool</code>.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>if (isProjectLocalized()) { /* ... */ }</code></pre>
</div>
<h3 id="sec-abolframe-php-helpers-23" class="scroll-mt-header"><code>hijri($datetime = null, $timezone = null)</code></h3>
<p>برای کار با تاریخ <strong>هجری قمری</strong>. شیء <code>MyLaravelCore\\Support\\Hijri\\Hijri</code> (immutable) برمی‌گرداند.</p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پارامتر</th><th>نوع</th><th>توضیح</th></tr></thead><tbody><tr><td><code>datetime</code></td><td>\`Carbon \\</td><td>DateTime \\</td></tr><tr><td><code>timezone</code></td><td>\`DateTimeZone \\</td><td>string \\</td></tr></tbody></table></div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$now = hijri();
$date = hijri(&#039;1446-09-25&#039;);
$fromCarbon = hijri(now());</code></pre>
</div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-php-helpers-24" class="scroll-mt-header">بخش C — فرمت، نمایش و متن</h2>
<h3 id="sec-abolframe-php-helpers-25" class="scroll-mt-header"><code>stringMaskFormatter(string $mask, ?string $input)</code></h3>
<p>یک رشته عددی را روی mask می‌نشاند. در mask برای جای‌گذاری باید از <code>X</code> استفاده شود.</p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پارامتر</th><th>نوع</th><th>توضیح</th></tr></thead><tbody><tr><td><code>mask</code></td><td>string</td><td>الگوی ماسک</td></tr><tr><td><code>input</code></td><td>string\\</td><td>null</td></tr></tbody></table></div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>stringMaskFormatter(&#039;XXX-XXX&#039;, &#039;123456&#039;); // 123-456</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ برای <strong>کد ملی</strong> در پروژه AbolFrame ماسک خط‌تیره‌دار استفاده نشود؛ کد ملی با ارقام ساده نمایش داده می‌شود.</div></div>
<h3 id="sec-abolframe-php-helpers-26" class="scroll-mt-header"><code>numberSeparator($value)</code></h3>
<p>عدد را با جداکننده هزارگان فرمت می‌کند. <code>numberSeparator(1250000)</code> → <code>&quot;1,250,000&quot;</code>.</p>
<h3 id="sec-abolframe-php-helpers-27" class="scroll-mt-header"><code>spellNumber($number, string $suffix = &#039;&#039;)</code></h3>
<p>عدد را به معادل حروفی <strong>فارسی</strong> تبدیل می‌کند؛ برای مبلغ روی فاکتور، قرارداد، چک.</p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پارامتر</th><th>نوع</th><th>توضیح</th></tr></thead><tbody><tr><td><code>number</code></td><td>int\\</td><td>float\\</td></tr><tr><td><code>suffix</code></td><td>string</td><td>واحد انتهای متن، مثل «تومان»</td></tr></tbody></table></div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>spellNumber(2500000);           // دو میلیون و پانصد هزار
spellNumber(2500000, &#039;تومان&#039;);  // دو میلیون و پانصد هزار تومان
spellNumber(-45);               // منفی چهل و پنج
spellNumber(0);                 // صفر</code></pre>
</div>
<p>نکته‌ها:</p>
<ul><li>واژگان خروجی دقیقاً مطابق helper سمت مرورگر <code>convertAmountToText</code> است، پس متن سرور با متن فرم یکی است.</li><li>بازه پشتیبانی تا سقف <code>int</code> در PHP (کوینتیلیون).</li><li>ورودی غیرعددی یا خارج از بازه → <code>InvalidArgumentException</code> (به‌جای متن اشتباه).</li><li>کلاس معادل: <code>MyLaravelCore\\Helpers\\PersianHelper::spell(2500000, &#039;تومان&#039;)</code>.</li></ul>
<h3 id="sec-abolframe-php-helpers-28" class="scroll-mt-header"><code>formatBytes($bytes, $precision, $persianTranslate)</code></h3>
<p>حجم بایت را به رشته خوانا (KB, MB) تبدیل می‌کند.</p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پارامتر</th><th>نوع</th><th>توضیح</th></tr></thead><tbody><tr><td><code>bytes</code></td><td>float\\</td><td>int</td></tr><tr><td><code>precision</code></td><td>int</td><td>تعداد ارقام اعشار</td></tr><tr><td><code>persianTranslate</code></td><td>bool</td><td>واحدهای فارسی</td></tr></tbody></table></div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>formatBytes(15360);          // 15 KB
formatBytes(15360, 2, true); // 15 کیلوبایت</code></pre>
</div>
<h3 id="sec-abolframe-php-helpers-29" class="scroll-mt-header"><code>formatFileSize(int $bytes)</code></h3>
<p>برای نمایش اندازه فایل با ترجمه‌های AbolFrame در کامپوننت‌های آپلود. <code>formatFileSize(5242880)</code> → <code>&quot;5 MB&quot;</code>.</p>
<h3 id="sec-abolframe-php-helpers-30" class="scroll-mt-header"><code>parseSize(string $size)</code></h3>
<p>رشته‌هایی مثل <code>10M</code> یا <code>2G</code> را به <strong>کیلوبایت</strong> تبدیل می‌کند. <code>parseSize(&#039;10M&#039;)</code> → <code>10240</code>. خروجی <code>float|int</code>.</p>
<h3 id="sec-abolframe-php-helpers-31" class="scroll-mt-header"><code>convertExtensionsToDotFormat(string $extensions)</code></h3>
<p><code>jpg,png,pdf</code> → <code>.jpg,.png,.pdf</code>.</p>
<h3 id="sec-abolframe-php-helpers-32" class="scroll-mt-header"><code>groupBodyTooltip($value, $title, $valueClass)</code></h3>
<p>HTML tooltip ساده برای جدول/کارت می‌سازد (قطعه‌ای شامل <code>data-bs-toggle=&quot;tooltip&quot;</code>).</p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پارامتر</th><th>نوع</th><th>توضیح</th></tr></thead><tbody><tr><td><code>value</code></td><td>string</td><td>متن اصلی</td></tr><tr><td><code>title</code></td><td>string\\</td><td>null</td></tr><tr><td><code>valueClass</code></td><td>string\\</td><td>null</td></tr></tbody></table></div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>echo groupBodyTooltip(&#039;فعال&#039;, &#039;وضعیت&#039;);</code></pre>
</div>
<h3 id="sec-abolframe-php-helpers-33" class="scroll-mt-header"><code>presetColors()</code></h3>
<p>palette آماده رنگ‌ها: <code>[&#039;#FF5733&#039;, &#039;#FF8D1A&#039;, &#039;#FFC300&#039;, ...]</code>. خروجی <code>array</code>. (برای <code>x-color-input</code> مناسب است.)</p>
<h3 id="sec-abolframe-php-helpers-34" class="scroll-mt-header"><code>renderColor()</code></h3>
<p>یک <strong>closure</strong> برمی‌گرداند که رنگ را به‌صورت دایره کوچک نمایش می‌دهد.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$renderer = renderColor();
echo $renderer(&#039;#0d6efd&#039;, $entity);</code></pre>
</div>
<h3 id="sec-abolframe-php-helpers-35" class="scroll-mt-header"><code>enumBadgeVariant($value, ?array $customColors = null)</code></h3>
<p>مقدار enum/status را به variant مناسب badge (<code>success</code>, <code>danger</code>, ...) تبدیل می‌کند.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>enumBadgeVariant(1); // success
enumBadgeVariant(0); // danger</code></pre>
</div>
<h3 id="sec-abolframe-php-helpers-36" class="scroll-mt-header"><code>getEnumName($enum, $selectedItem, $module, $isEnum)</code></h3>
<p>نام ترجمه‌شده یک مقدار enum را برمی‌گرداند. خروجی <code>array|string|null</code>.</p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پارامتر</th><th>توضیح</th></tr></thead><tbody><tr><td><code>enum</code></td><td>کلاس enum</td></tr><tr><td><code>selectedItem</code></td><td>مقدار انتخاب‌شده</td></tr><tr><td><code>module</code></td><td>نام ماژول ترجمه</td></tr><tr><td><code>isEnum</code></td><td>مشخص‌کردن enum بودن ورودی</td></tr></tbody></table></div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>getEnumName(UserStatusEnum::class, 1, &#039;user-management&#039;); // &quot;فعال&quot;</code></pre>
</div>
<h3 id="sec-abolframe-php-helpers-37" class="scroll-mt-header"><code>parsedUserAgentInfo(string $userAgent)</code></h3>
<p>اطلاعات پایه سیستم عامل/مرورگر/پلتفرم: <code>[&#039;os&#039;=&gt;&#039;Windows 10&#039;,&#039;browser&#039;=&gt;&#039;Chrome 126.0&#039;,&#039;platform&#039;=&gt;&#039;Desktop&#039;]</code>.</p>
<h3 id="sec-abolframe-php-helpers-38" class="scroll-mt-header"><code>renderComponent(Badge::class, [...props])</code></h3>
<p>کامپوننت Blade را از PHP رندر می‌کند (برای سلول سفارشی جدول). نمونه:</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>use MyLaravelCore\\Components\\Design\\Badge;
renderComponent(Badge::class, [&#039;value&#039; =&gt; &#039;کد&#039;, &#039;variant&#039; =&gt; &#039;info&#039;, &#039;appearance&#039; =&gt; &#039;light&#039;, &#039;size&#039; =&gt; &#039;sm&#039;]);</code></pre>
</div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-php-helpers-39" class="scroll-mt-header">بخش D — فرم و کامپوننت‌ها</h2>
<h3 id="sec-abolframe-php-helpers-40" class="scroll-mt-header"><code>prepareSelectComponentData(...)</code></h3>
<p>داده سازگار با selectهای AbolFrame را از روی <strong>Model، Collection یا Enum</strong> می‌سازد.</p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پارامتر</th><th>نوع</th><th>توضیح</th></tr></thead><tbody><tr><td><code>source</code></td><td>mixed</td><td>منبع داده</td></tr><tr><td><code>labelColumn</code></td><td>string</td><td>نام ستون label</td></tr><tr><td><code>valueColumn</code></td><td>string</td><td>نام ستون value</td></tr><tr><td><code>shouldEncryptValue</code></td><td>bool</td><td>رمزنگاری مقدارها</td></tr><tr><td><code>moduleName</code></td><td>string\\</td><td>null</td></tr><tr><td><code>prefix</code></td><td>string\\</td><td>null</td></tr><tr><td><code>extraAttributes</code></td><td>array</td><td>فیلدهای اضافه</td></tr></tbody></table></div>
<p>خروجی نمونه: <code>[[&#039;name&#039;=&gt;&#039;تهران&#039;,&#039;id&#039;=&gt;1,&#039;selected&#039;=&gt;false,&#039;is_active&#039;=&gt;true]]</code></p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$options = prepareSelectComponentData(source: UserStatusEnum::class, shouldEncryptValue: false, moduleName: &#039;user-management&#039;);
$options = prepareSelectComponentData(source: \\App\\Models\\City::class, labelColumn: &#039;title&#039;, valueColumn: &#039;id&#039;);</code></pre>
</div>
<div class="callout info"><i class="fa fa-circle-info callout-icon"></i><div><code>shouldEncryptValue</code> را همیشه <strong>صریح</strong> و مطابق <code>EncryptMethod</code> پروژه بدهید.</div></div>
<h3 id="sec-abolframe-php-helpers-41" class="scroll-mt-header"><code>makeDatetimeRangePickerID($id, $dedicatedName, $name)</code></h3>
<p>شناسه مناسب برای datetime range picker. مثال: <code>makeDatetimeRangePickerID(null, &#039;created_at_range&#039;, null)</code> → <code>&quot;x-component-created_at_range&quot;</code>.</p>
<h3 id="sec-abolframe-php-helpers-42" class="scroll-mt-header"><code>filterValidation(array $rules)</code></h3>
<p>یک closure می‌سازد که برای اعتبارسنجی مقدار فیلترهای Table Generator استفاده می‌شود.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$validator = filterValidation([&#039;required&#039;, &#039;numeric&#039;]);
$isValid = $validator(&#039;120&#039;); // true</code></pre>
</div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-php-helpers-43" class="scroll-mt-header">بخش E — فایل و آپلود</h2>
<h3 id="sec-abolframe-php-helpers-44" class="scroll-mt-header"><code>getFile(?int $fileID)</code></h3>
<p>فایل را از FileManager برمی‌گرداند (<code>object|null</code> شامل <code>id, path, name</code>).</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$file = getFile($user-&gt;avatar_id);</code></pre>
</div>
<h3 id="sec-abolframe-php-helpers-45" class="scroll-mt-header"><code>uploadFile(...)</code></h3>
<p>آپلود فایل را با اتصال به entity و file type مدیریت می‌کند.</p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پارامتر</th><th>نوع</th><th>توضیح</th></tr></thead><tbody><tr><td><code>field</code></td><td>string</td><td>نام فیلد فایل در request</td></tr><tr><td><code>dbField</code></td><td>string</td><td>نام فیلد دیتابیس</td></tr><tr><td><code>fileTypeCode</code></td><td>string</td><td>کد نوع فایل</td></tr><tr><td><code>fileType</code></td><td>mixed</td><td>نوع فایل</td></tr><tr><td><code>entity</code></td><td>object</td><td>موجودیت هدف</td></tr><tr><td><code>module</code></td><td>string\\</td><td>null</td></tr><tr><td><code>isPublic</code></td><td>bool</td><td>عمومی یا خصوصی</td></tr></tbody></table></div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>uploadFile(field: &#039;avatar&#039;, dbField: &#039;avatar_id&#039;, fileTypeCode: &#039;USER_AVATAR&#039;,
           fileType: $fileType, entity: $user, module: &#039;user-management&#039;);</code></pre>
</div>
<p>اثر: فایل آپلود و فیلد <code>avatar_id</code> روی entity مقداردهی می‌شود. (قانون: <code>entity</code> فقط در آپلود تک‌فایلی.)</p>
<h3 id="sec-abolframe-php-helpers-46" class="scroll-mt-header"><code>FileManager::url($fileId)</code></h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>use MyLaravelCore\\Facades\\FileManager;
$url = !empty($fileId) ? FileManager::url($fileId) : null;</code></pre>
</div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-php-helpers-47" class="scroll-mt-header">بخش F — مسیر، فیلتر و جستجو</h2>
<h3 id="sec-abolframe-php-helpers-48" class="scroll-mt-header"><code>makePanelRouteName(string $name)</code></h3>
<p>نام route را با guard پیش‌فرض پنل می‌سازد: <code>makePanelRouteName(&#039;dashboard.index&#039;)</code> → <code>&quot;admin.dashboard.index&quot;</code>.</p>
<h3 id="sec-abolframe-php-helpers-49" class="scroll-mt-header"><code>appendFilterQueryParamsToLinks(string $name, array $parameters = [], bool $absolute = true)</code></h3>
<p>لینکی می‌سازد که query string فیلتر جدول/لیست فعلی را هم حمل کند → <code>https://example.com/admin/users?xfg=users-filter</code>.</p>
<h3 id="sec-abolframe-php-helpers-50" class="scroll-mt-header"><code>handleSearchAndResetPage(?string $search, string $sectionName, string $routeName, array $routeParams = [])</code></h3>
<p>وقتی search عوض می‌شود، عبارت را نگه می‌دارد و کاربر را <strong>بدون پارامتر page</strong> به route برمی‌گرداند تا pagination ریست شود. خروجی <code>RedirectResponse|null</code>.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>return handleSearchAndResetPage(search: request(&#039;search&#039;), sectionName: &#039;users&#039;, routeName: &#039;panel.users.index&#039;) ?? null;</code></pre>
</div>
<h3 id="sec-abolframe-php-helpers-51" class="scroll-mt-header"><code>getPageTitle(?string $routeName = null)</code></h3>
<p>عنوان route از Route Property Collector؛ بدون آرگومان = route جاری.</p>
<h3 id="sec-abolframe-php-helpers-52" class="scroll-mt-header"><code>getNextSortValue(Model::class)</code></h3>
<p>مقدار بعدی ستون <code>sort</code> (در مثال CRUD رسمی).</p>
<h3 id="sec-abolframe-php-helpers-53" class="scroll-mt-header"><code>generateUserManagementRouteName(string $suffix)</code></h3>
<p>نام route مدیریت کاربران را بر اساس <code>{guard}.{userTypePlural}</code> همان ماژول می‌سازد.</p>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-php-helpers-54" class="scroll-mt-header">بخش G — دسترسی و کاربران</h2>
<h3 id="sec-abolframe-php-helpers-55" class="scroll-mt-header"><code>policyCheck(string $ability, $entity)</code></h3>
<p>نتیجه policy به‌صورت <code>Gate::inspect()</code> (<code>Illuminate\\Auth\\Access\\Response</code>) — با <code>allowed()</code>/<code>denied()</code>.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$response = policyCheck(&#039;update&#039;, $user);
if ($response-&gt;denied()) { /* ... */ }</code></pre>
</div>
<h3 id="sec-abolframe-php-helpers-56" class="scroll-mt-header"><code>policyAuthorize(string $ability, $entity)</code></h3>
<p>enforce کردن policy با <strong>پرتاب exception</strong> در عدم دسترسی. خروجی <code>void</code>.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>policyAuthorize(&#039;delete&#039;, $user);</code></pre>
</div>
<h3 id="sec-abolframe-php-helpers-57" class="scroll-mt-header"><code>renderConditionalLink(value, showPermission, editPermission, showParameters, editParameters)</code></h3>
<p>اگر کاربر دسترسی لازم داشته باشد مقدار را به لینک نمایش یا ویرایش تبدیل می‌کند؛ وگرنه <strong>همان متن ساده</strong> را برمی‌گرداند.</p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پارامتر</th><th>توضیح</th></tr></thead><tbody><tr><td><code>value</code></td><td>متن/مقدار خروجی</td></tr><tr><td><code>showPermission</code></td><td>route یا permission نمایش</td></tr><tr><td><code>editPermission</code></td><td>route یا permission ویرایش</td></tr><tr><td><code>showParameters</code></td><td>پارامترهای نمایش</td></tr><tr><td><code>editParameters</code></td><td>پارامترهای ویرایش</td></tr></tbody></table></div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>echo renderConditionalLink(value: $user-&gt;name, showPermission: &#039;users.show&#039;,
    editPermission: &#039;users.edit&#039;, showParameters: [&#039;user&#039; =&gt; $user-&gt;id]);</code></pre>
</div>
<h3 id="sec-abolframe-php-helpers-58" class="scroll-mt-header"><code>resolveUserHref($relatedUser)</code></h3>
<p>اگر کاربر جاری به صفحه کاربر مقصد دسترسی داشته باشد URL مناسب show یا edit را تولید می‌کند (<code>string|null</code>).</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$href = resolveUserHref($ticket-&gt;creator);</code></pre>
</div>
<h3 id="sec-abolframe-php-helpers-59" class="scroll-mt-header"><code>getUserStatuses()</code></h3>
<p>لیست statusهای کاربران از مدل تنظیم‌شده (مثلاً فعال، غیرفعال، مسدود).</p>
<h3 id="sec-abolframe-php-helpers-60" class="scroll-mt-header"><code>linkUserInfo(name, code, parameters, route, classes, linked?)</code></h3>
<p>لینک کاربر/شرکت‌کننده با کنترل دسترسی (<code>hasAccess</code>)، ماسک کد و markup استاندارد. در AbolFrame:</p>
<ul><li>شرکت‌کننده/ارسال‌کننده → route <code>admin.participant.show</code> با <code>[&#039;participant&#039; =&gt; encryptStaticValue($participantId)]</code></li><li>ادمین/کاربر عمومی → route <code>admin.admins.management.show</code> با <code>[&#039;user&#039; =&gt; encryptStaticValue($admin-&gt;id)]</code></li><li>بدون Participant ID معتبر: <code>linked: false</code> یا <code>route: &#039;#&#039;</code>.</li></ul>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ خروجی HTML است؛ رفتار escape را در کد مبدأ تأیید کنید.</div></div>
        `
    },
    {
        id: "abolframe-js-helpers",
        title: "۲. توابع کمکی JavaScript و GIS",
        icon: "fa-square-js",
        category: "مستندات جامع ابول فریم (AbolFrame)",
        content: `
<h1>۲. توابع کمکی JavaScript (AbolFrame) — توضیح کامل</h1>
<div class="callout info"><i class="fa fa-circle-info callout-icon"></i><div>فقط helperهایی که برای مصرف‌کننده AbolFrame در صفحه، فرم، تعاملات UI و تجربه کاربری مفیدند. توابع داخلی پکیج عمداً مستند نشده‌اند.</div></div>
<div class="toc-quick-jump-card my-4 p-3 rounded-3 border bg-body-tertiary"><div class="d-flex align-items-center justify-content-between mb-2"><strong class="text-primary small"><i class="fa fa-compass ms-1"></i> فهرست سریع آیتم‌ها، متدها و کامپوننت‌های این بخش (35 مورد):</strong></div><div class="d-flex flex-wrap gap-2"><a href="#sec-abolframe-js-helpers-1" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش A — راه‌اندازی و ابزارهای عمومی</a><a href="#sec-abolframe-js-helpers-2" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">abolframe.ready(callback, zone?)</a><a href="#sec-abolframe-js-helpers-3" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">delay(ms)</a><a href="#sec-abolframe-js-helpers-4" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">debounce(func, wait)</a><a href="#sec-abolframe-js-helpers-5" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">generateUUID()</a><a href="#sec-abolframe-js-helpers-6" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">mergeRecursive(target, source)</a><a href="#sec-abolframe-js-helpers-7" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش B — ترجمه و تبدیل داده</a><a href="#sec-abolframe-js-helpers-8" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">__(key, attributes)</a><a href="#sec-abolframe-js-helpers-9" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">replacePersianDigits(value)</a><a href="#sec-abolframe-js-helpers-10" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">convertAmountToText(amount, suffix)</a><a href="#sec-abolframe-js-helpers-11" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">getFormElementValueText(name, value, form)</a><a href="#sec-abolframe-js-helpers-12" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش C — پیام‌ها و بازخورد کاربر</a><a href="#sec-abolframe-js-helpers-13" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">showAlert(type, message, title, options)</a><a href="#sec-abolframe-js-helpers-14" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">showToast(type, message, title, options)</a><a href="#sec-abolframe-js-helpers-15" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">showConfirmationMessage(config)</a><a href="#sec-abolframe-js-helpers-16" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">showComponentMessage(config) ✅ استاندارد خطای inline</a><a href="#sec-abolframe-js-helpers-17" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">hasComponentMessage(targetElement, type = null, formValidation = null)</a><a href="#sec-abolframe-js-helpers-18" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">clearComponentMessage(targetElement, formValidation)</a><a href="#sec-abolframe-js-helpers-19" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">clearFormMessages(form)</a><a href="#sec-abolframe-js-helpers-20" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش D — لودینگ، وضعیت فرم و اعتبارسنجی</a><a href="#sec-abolframe-js-helpers-21" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">reinitializeFormValidation(formRequest, selector, options?)</a><a href="#sec-abolframe-js-helpers-22" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">toggleButtonLoading(target, isLoading, text)</a><a href="#sec-abolframe-js-helpers-23" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">toggleFormElementLoading(target, isLoading)</a><a href="#sec-abolframe-js-helpers-24" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">toggleLoading(target, isLoading)</a><a href="#sec-abolframe-js-helpers-25" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">validateForm(formSelector) / validateField(fieldSelector)</a><a href="#sec-abolframe-js-helpers-26" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">triggerOnChange(elementId, dependentElementIds, callback?)</a><a href="#sec-abolframe-js-helpers-27" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش E — فرم، لینک، فایل</a><a href="#sec-abolframe-js-helpers-28" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">addHiddenInputs(form, inputs)</a><a href="#sec-abolframe-js-helpers-29" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">appendFilterQueryParamsToLinks(hashKey, containerSelector)</a><a href="#sec-abolframe-js-helpers-30" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">downloadFile(url, filename)</a><a href="#sec-abolframe-js-helpers-31" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش F — افزونه‌های jQuery</a><a href="#sec-abolframe-js-helpers-32" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش G — موقعیت جغرافیایی و نقشه</a><a href="#sec-abolframe-js-helpers-33" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش H — رسانه و مودال</a><a href="#sec-abolframe-js-helpers-34" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">getVideoThumbnail(videoSource, options)</a><a href="#sec-abolframe-js-helpers-35" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">setModalTitle(id, newTitle)</a></div></div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-js-helpers-1" class="scroll-mt-header">بخش A — راه‌اندازی و ابزارهای عمومی</h2>
<h3 id="sec-abolframe-js-helpers-2" class="scroll-mt-header"><code>abolframe.ready(callback, zone?)</code></h3>
<p>کدی را <strong>بعد از آماده‌شدن DOM</strong> اجرا می‌کند. اگر <code>zone</code> (selector) بدهید، callback فقط وقتی اجرا می‌شود که آن selector داخل context وجود داشته باشد.</p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پارامتر</th><th>نوع</th><th>توضیح</th></tr></thead><tbody><tr><td><code>callback</code></td><td>function</td><td>تابعی که بعد از آماده‌شدن DOM اجرا می‌شود (context را می‌گیرد)</td></tr><tr><td><code>zone</code></td><td>string \\</td><td>undefined</td></tr></tbody></table></div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">JS</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>abolframe.ready((context) =&gt; {
  $(&quot;.x-number-input-component .number-input&quot;, context).each((i, input) =&gt; new NumberInputController(input));
}, &quot;.x-panel&quot;);</code></pre>
</div>
<div class="callout info"><i class="fa fa-circle-info callout-icon"></i><div>نکته: بعد از هر رندر مجدد Livewire، <code>abolframe.ready</code> همه callbackها را دوباره اجرا می‌کند (در نمودارها بررسی «قبلاً ساخته شده» لازم است).</div></div>
<h3 id="sec-abolframe-js-helpers-3" class="scroll-mt-header"><code>delay(ms)</code></h3>
<p>Promise برمی‌گرداند تا اجرای بخشی از کد را به تأخیر بیندازید.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">JS</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>await delay(500);
showToast(&quot;success&quot;, &quot;اطلاعات بروزرسانی شد&quot;);</code></pre>
</div>
<h3 id="sec-abolframe-js-helpers-4" class="scroll-mt-header"><code>debounce(func, wait)</code></h3>
<p>از اجرای پشت‌سرهم یک تابع در رویدادهایی مثل <code>input</code>/<code>keyup</code> جلوگیری می‌کند؛ تابع فقط <code>wait</code> میلی‌ثانیه بعد از توقف رویداد اجرا می‌شود.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">JS</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>const searchUsers = debounce(() =&gt; console.log(&quot;search...&quot;), 400);
$(&quot;#search&quot;).on(&quot;input&quot;, searchUsers);</code></pre>
</div>
<h3 id="sec-abolframe-js-helpers-5" class="scroll-mt-header"><code>generateUUID()</code></h3>
<p>شناسه یکتا برای use-caseهای سمت کاربر (ردیف موقت، کلید آیتم‌های داینامیک). مثال: <code>f65c57f6-a6aa-4b5d-9f4a-1c5b6e3f8a12</code>.</p>
<h3 id="sec-abolframe-js-helpers-6" class="scroll-mt-header"><code>mergeRecursive(target, source)</code></h3>
<p>دو آبجکت یا آرایه را <strong>بازگشتی</strong> ادغام می‌کند.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">JS</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>const defaults = { modal: { size: &quot;md&quot; }, tags: [&quot;base&quot;] };
const options  = { modal: { centered: true }, tags: [&quot;custom&quot;] };
mergeRecursive(defaults, options);
// { modal: { size: &quot;md&quot;, centered: true }, tags: [&quot;base&quot;, &quot;custom&quot;] }</code></pre>
</div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-js-helpers-7" class="scroll-mt-header">بخش B — ترجمه و تبدیل داده</h2>
<h3 id="sec-abolframe-js-helpers-8" class="scroll-mt-header"><code>__(key, attributes)</code></h3>
<p>کلید ترجمه را از <code>abolframe.translations</code> می‌خواند و placeholderها را جایگزین می‌کند.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">JS</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>__(&quot;validation.required&quot;);                      // &quot;این فیلد الزامی است&quot;
__(&quot;text_area.character_count&quot;, { count: 12 }); // &quot;12 کاراکتر&quot;</code></pre>
</div>
<h3 id="sec-abolframe-js-helpers-9" class="scroll-mt-header"><code>replacePersianDigits(value)</code></h3>
<p>ارقام فارسی و عربی → انگلیسی. <code>replacePersianDigits(&quot;۱۲۳۴۵&quot;)</code> → <code>&quot;12345&quot;</code>.</p>
<h3 id="sec-abolframe-js-helpers-10" class="scroll-mt-header"><code>convertAmountToText(amount, suffix)</code></h3>
<p>عدد را به متن فارسی تبدیل می‌کند؛ خروجی <code>string | false</code>. مناسب نمایش مبلغ کنار فیلد عددی.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">JS</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>convertAmountToText(1250000); // &quot;یک میلیون و دویست و پنجاه هزار تومان&quot;</code></pre>
</div>
<p>معادل سمت سرور: <code>spellNumber()</code>.</p>
<h3 id="sec-abolframe-js-helpers-11" class="scroll-mt-header"><code>getFormElementValueText(name, value, form)</code></h3>
<p>متن نمایشی یک مقدار را از روی input/select/radio/checkbox پیدا می‌کند (برای نمایش label به‌جای value).</p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پارامتر</th><th>توضیح</th></tr></thead><tbody><tr><td><code>name</code></td><td>نام فیلد</td></tr><tr><td><code>value</code></td><td>مقدار فیلد</td></tr><tr><td><code>form</code></td><td>فرم هدف (string / jQuery / null)</td></tr></tbody></table></div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">JS</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>getFormElementValueText(&quot;country&quot;, &quot;ir&quot;, &quot;#profile-form&quot;); // &quot;ایران&quot;</code></pre>
</div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-js-helpers-12" class="scroll-mt-header">بخش C — پیام‌ها و بازخورد کاربر</h2>
<h3 id="sec-abolframe-js-helpers-13" class="scroll-mt-header"><code>showAlert(type, message, title, options)</code></h3>
<p>alert مبتنی بر <strong>SweetAlert2</strong>؛ خروجی Promise. <code>type</code>: <code>success</code>، <code>error</code>، ...</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">JS</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>showAlert(&quot;success&quot;, &quot;اطلاعات با موفقیت ذخیره شد&quot;, &quot;ثبت موفق&quot;);</code></pre>
</div>
<h3 id="sec-abolframe-js-helpers-14" class="scroll-mt-header"><code>showToast(type, message, title, options)</code></h3>
<p>اعلان کوتاه و غیرمزاحم (<strong>toastr</strong>).</p>
<div class="callout info"><i class="fa fa-circle-info callout-icon"></i><div>⛔ طبق قانون پروژه برای «خطای فیلد الزامی» استفاده <strong>نشود</strong>.</div></div>
<h3 id="sec-abolframe-js-helpers-15" class="scroll-mt-header"><code>showConfirmationMessage(config)</code></h3>
<p>دیالوگ تایید؛ <code>config</code> شامل <code>title</code>, <code>text</code>, <code>type</code>, <code>onConfirm</code>, <code>onCancel</code>. خروجی Promise (می‌توانید <code>isConfirmed</code> را بخوانید).</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">JS</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>showConfirmationMessage({
  title: &quot;حذف رکورد&quot;, text: &quot;این عملیات قابل بازگشت نیست.&quot;, type: &quot;danger&quot;,
  onConfirm: () =&gt; $(&quot;#delete-form&quot;).submit(),
});</code></pre>
</div>
<h3 id="sec-abolframe-js-helpers-16" class="scroll-mt-header"><code>showComponentMessage(config)</code> ✅ استاندارد خطای inline</h3>
<p>پیام را روی یک کامپوننت فرم نمایش می‌دهد. بسته به <code>style</code> می‌تواند inline، tooltip، toast یا alert باشد.</p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>کلید config</th><th>توضیح</th></tr></thead><tbody><tr><td><code>type</code></td><td><code>error</code>, <code>info</code>, <code>success</code>, <code>warning</code></td></tr><tr><td><code>style</code></td><td><code>message</code> (inline)، <code>tooltip</code>، <code>toast</code>، <code>alert</code></td></tr><tr><td><code>targetElement</code></td><td>نام/id/عنصر/jQuery</td></tr><tr><td><code>message</code>, <code>title</code></td><td>متن</td></tr><tr><td><code>formValidation</code></td><td>آیا پیام از جنس validation است</td></tr></tbody></table></div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">JS</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>showComponentMessage({ type: &quot;error&quot;, style: &quot;message&quot;, targetElement: &quot;mobile&quot;,
  message: &quot;شماره موبایل نامعتبر است.&quot;, formValidation: true });</code></pre>
</div>
<h3 id="sec-abolframe-js-helpers-17" class="scroll-mt-header"><code>hasComponentMessage(targetElement, type = null, formValidation = null)</code></h3>
<p>بررسی می‌کند برای فیلد پیام ثبت‌شده‌ای هست یا نه (<code>boolean</code>). وقتی <code>true</code> برمی‌گرداند که متن پیام خالی نباشد و فیلترهای اختیاری (نوع، محدوده validation) مطابق باشند.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">JS</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>if (hasComponentMessage(&quot;mobile&quot;, &quot;error&quot;, true)) { /* ... */ }</code></pre>
</div>
<h3 id="sec-abolframe-js-helpers-18" class="scroll-mt-header"><code>clearComponentMessage(targetElement, formValidation)</code></h3>
<p>پیام قبلی یک فیلد را پاک می‌کند. باید هنگام تغییر/ورود مقدار توسط کاربر صدا زده شود.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">JS</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>clearComponentMessage(&quot;#mobile&quot;);</code></pre>
</div>
<h3 id="sec-abolframe-js-helpers-19" class="scroll-mt-header"><code>clearFormMessages(form)</code></h3>
<p>همه پیام‌های فرم را پاک می‌کند (مثلاً هنگام <code>hidden.bs.modal</code>).</p>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-js-helpers-20" class="scroll-mt-header">بخش D — لودینگ، وضعیت فرم و اعتبارسنجی</h2>
<h3 id="sec-abolframe-js-helpers-21" class="scroll-mt-header"><code>reinitializeFormValidation(formRequest, selector, options?)</code></h3>
<p>قوانین اعتبارسنجی فرم را از سرور <strong>دوباره دریافت و اعمال</strong> می‌کند. اگر قوانین تغییر نکرده باشد اعتبارسنجی فعلی خراب نمی‌شود و پیام‌های خطای موجود حفظ می‌شوند. برای فرم‌های وابسته به شرایط (rules پویا).</p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پارامتر</th><th>نوع</th><th>توضیح</th></tr></thead><tbody><tr><td><code>formRequest</code></td><td>string</td><td>نام کامل کلاس FormRequest سمت سرور</td></tr><tr><td><code>selector</code></td><td>string</td><td>سلکتور فرم</td></tr><tr><td><code>options.background</code></td><td>boolean</td><td>اگر <code>true</code> دکمه submit غیرفعال نمی‌شود</td></tr><tr><td><code>options.preservedErrors</code></td><td>object</td><td>خطاهایی که بعد از re-init حفظ شوند</td></tr></tbody></table></div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">JS</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>reinitializeFormValidation(
  &quot;Modules\\\\Credit\\\\App\\\\Http\\\\Requests\\\\PlanTypeCredit\\\\StorePlanTypeCreditDocumentRequest&quot;,
  &quot;#plan_type_credit_document&quot;,
  { background: true, preservedErrors: { document_file: &quot;فایل الزامی است&quot; } }
);</code></pre>
</div>
<h3 id="sec-abolframe-js-helpers-22" class="scroll-mt-header"><code>toggleButtonLoading(target, isLoading, text)</code></h3>
<p>loading دکمه‌های AbolFrame (غیرفعال + loader + متن پردازش).</p>
<h3 id="sec-abolframe-js-helpers-23" class="scroll-mt-header"><code>toggleFormElementLoading(target, isLoading)</code></h3>
<p>spinner روی یک فیلد و غیرفعال‌شدن موقت (مثلاً <code>#city_id</code> هنگام fetch).</p>
<h3 id="sec-abolframe-js-helpers-24" class="scroll-mt-header"><code>toggleLoading(target, isLoading)</code></h3>
<p>overlay لودینگ روی یک container/section کامل.</p>
<h3 id="sec-abolframe-js-helpers-25" class="scroll-mt-header"><code>validateForm(formSelector)</code> / <code>validateField(fieldSelector)</code></h3>
<p>اعتبارسنجی کل فرم / فقط یک فیلد با jQuery Validate.</p>
<h3 id="sec-abolframe-js-helpers-26" class="scroll-mt-header"><code>triggerOnChange(elementId, dependentElementIds, callback?)</code></h3>
<p>وقتی فیلد اصلی تغییر می‌کند، فیلدهای وابسته را دوباره trigger (و در صورت نیاز validate) می‌کند.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">JS</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>triggerOnChange(&quot;province_id&quot;, [&quot;city_id&quot;, &quot;district_id&quot;]);</code></pre>
</div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-js-helpers-27" class="scroll-mt-header">بخش E — فرم، لینک، فایل</h2>
<h3 id="sec-abolframe-js-helpers-28" class="scroll-mt-header"><code>addHiddenInputs(form, inputs)</code></h3>
<p>چند input hidden به‌صورت داینامیک به فرم اضافه می‌کند.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">JS</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>addHiddenInputs(&quot;#export-form&quot;, { report_type: &quot;summary&quot;, user_id: 15 });</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ با قانون پروژه «No Hidden Inputs» تعارض دارد؛ شناسه را از <code>action</code> فرم، route parameter یا <code>data-*</code> بخوانید.</div></div>
<h3 id="sec-abolframe-js-helpers-29" class="scroll-mt-header"><code>appendFilterQueryParamsToLinks(hashKey, containerSelector)</code></h3>
<p>پارامترهای فیلتر فعلی را به لینک‌های داخلی ناحیه اضافه می‌کند تا فیلتر هنگام جابه‌جایی حفظ شود.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">JS</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>appendFilterQueryParamsToLinks(&quot;xfg&quot;, &quot;#theme_app_content&quot;);</code></pre>
</div>
<h3 id="sec-abolframe-js-helpers-30" class="scroll-mt-header"><code>downloadFile(url, filename)</code></h3>
<p>دانلود فایل از URL؛ در خطا toast نمایش می‌دهد.</p>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-js-helpers-31" class="scroll-mt-header">بخش F — افزونه‌های jQuery</h2>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>متد</th><th>کار</th><th>خروجی</th></tr></thead><tbody><tr><td><code>$(el).updateHint(text)</code></td><td>تغییر متن hint کامپوننت</td><td>jQuery</td></tr><tr><td><code>$(el).updateLabel(text)</code></td><td>تغییر label</td><td>jQuery</td></tr><tr><td><code>$(el).disable()</code></td><td>غیرفعال‌کردن دکمه AbolFrame (و <code>data-force-disabled=&quot;true&quot;</code>)</td><td>jQuery</td></tr><tr><td><code>$(el).enable()</code></td><td>فعال‌کردن دوباره</td><td>jQuery</td></tr><tr><td><code>$(el).getInstance()</code></td><td>instance جاوااسکریپتی کامپوننت (مثل <code>ButtonController</code>)</td><td>any</td></tr><tr><td><code>$(el).toggleConfirmation(state)</code></td><td>روشن/خاموش‌کردن confirmation دکمه</td><td>jQuery\\</td></tr><tr><td><code>$(el).refreshComponent(resetParams = true)</code></td><td>refresh کامپوننت Livewire متصل (با <code>false</code> فقط <code>$refresh()</code>)</td><td>jQuery</td></tr><tr><td><code>$(el).setComponentParams(params)</code></td><td>ادغام و تنظیم پارامترهای Livewire component</td><td>jQuery</td></tr></tbody></table></div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-js-helpers-32" class="scroll-mt-header">بخش G — موقعیت جغرافیایی و نقشه</h2>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>تابع</th><th>ورودی</th><th>خروجی / مثال</th></tr></thead><tbody><tr><td><code>getDistanceBetweenPoints(p1, p2)</code></td><td><code>{lat,lng}</code> ×۲</td><td>فاصله به <strong>متر</strong> — <code>909.68</code></td></tr><tr><td><code>convertUtmToLatLng(point)</code></td><td><code>{x: Easting, y: Northing, z: zoneNumber}</code></td><td><code>{lat, lng}</code></td></tr><tr><td><code>convertLatLngToUtm(point)</code></td><td><code>{lat, lng}</code></td><td><code>{x, y, z}</code></td></tr><tr><td><code>calculateArea(polygon)</code></td><td>آرایه <code>{lat,lng}</code></td><td>مساحت (متر مربع) — <code>8594</code></td></tr><tr><td><code>calculateCentroid(polygon)</code></td><td>همان</td><td><code>{lat, lng}</code></td></tr><tr><td><code>calculateCenterOfMath(polygon)</code></td><td>همان</td><td><code>{lat, lng}</code></td></tr></tbody></table></div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">JS</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>const point1 = { lat: 53.5511, lng: 9.9937 };
const point2 = { lat: 53.5436, lng: 9.9882 };
getDistanceBetweenPoints(point1, point2); // 909.68</code></pre>
</div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-js-helpers-33" class="scroll-mt-header">بخش H — رسانه و مودال</h2>
<h3 id="sec-abolframe-js-helpers-34" class="scroll-mt-header"><code>getVideoThumbnail(videoSource, options)</code></h3>
<p>از فایل یا URL ویدیو thumbnail می‌سازد و <strong>data URL</strong> برمی‌گرداند (<code>Promise&lt;string&gt;</code>). <code>options</code>: <code>time</code>, <code>width</code>, <code>height</code>.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">JS</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>const thumbnail = await getVideoThumbnail(fileInput.files[0], { time: 2, width: 640, height: 360 });</code></pre>
</div>
<h3 id="sec-abolframe-js-helpers-35" class="scroll-mt-header"><code>setModalTitle(id, newTitle)</code></h3>
<p>عنوان مودال را با شناسه المنت والد و مقدار جدید تغییر می‌دهد (المنت دارای <code>data-modal-title</code>). اگر والد یا المنت پیدا نشود بدون عملیات خارج می‌شود.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">JS</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>setModalTitle(&quot;userModal&quot;, &quot;ویرایش اطلاعات کاربر&quot;);</code></pre>
</div>
        `
    },
    {
        id: "abolframe-traits-scopes-enums",
        title: "۳. Traits، Scopes و ۵۵ Enum",
        icon: "fa-cubes-stacked",
        category: "مستندات جامع ابول فریم (AbolFrame)",
        content: `
<h1>۳. Core Traits، Boolean Scopes و Enumها — توضیح کامل</h1>
<div class="toc-quick-jump-card my-4 p-3 rounded-3 border bg-body-tertiary"><div class="d-flex align-items-center justify-content-between mb-2"><strong class="text-primary small"><i class="fa fa-compass ms-1"></i> فهرست سریع آیتم‌ها، متدها و کامپوننت‌های این بخش (28 مورد):</strong></div><div class="d-flex flex-wrap gap-2"><a href="#sec-abolframe-traits-scopes-enums-1" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش A — Core Traits (MyLaravelCore\\Traits)</a><a href="#sec-abolframe-traits-scopes-enums-2" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.1 SoftDeletes</a><a href="#sec-abolframe-traits-scopes-enums-3" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.2 UserActivityTracking</a><a href="#sec-abolframe-traits-scopes-enums-4" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.3 AppendHashedColumns</a><a href="#sec-abolframe-traits-scopes-enums-5" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.4 InitializeSortColumn</a><a href="#sec-abolframe-traits-scopes-enums-6" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.5 CustomFilterable</a><a href="#sec-abolframe-traits-scopes-enums-7" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.6 ActiveRows (منسوخ)</a><a href="#sec-abolframe-traits-scopes-enums-8" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.7 EnumTools</a><a href="#sec-abolframe-traits-scopes-enums-9" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.8 MagicMethods</a><a href="#sec-abolframe-traits-scopes-enums-10" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.9 ExceptionHandler</a><a href="#sec-abolframe-traits-scopes-enums-11" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش B — Boolean Scopes</a><a href="#sec-abolframe-traits-scopes-enums-12" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.1 قابلیت‌ها</a><a href="#sec-abolframe-traits-scopes-enums-13" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.2 فیلدهای پیش‌فرض</a><a href="#sec-abolframe-traits-scopes-enums-14" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.3 استفاده</a><a href="#sec-abolframe-traits-scopes-enums-15" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.4 افزودن فیلد سفارشی</a><a href="#sec-abolframe-traits-scopes-enums-16" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.5 خطاها</a><a href="#sec-abolframe-traits-scopes-enums-17" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش C — فهرست Enumهای Foundation (۵۳ enum)</a><a href="#sec-abolframe-traits-scopes-enums-18" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">CacheStorage</a><a href="#sec-abolframe-traits-scopes-enums-19" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">Core (MyLaravelCore\\Enums\\...)</a><a href="#sec-abolframe-traits-scopes-enums-20" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">DeleteDependency</a><a href="#sec-abolframe-traits-scopes-enums-21" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">Encryption</a><a href="#sec-abolframe-traits-scopes-enums-22" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">Export (...\\Export\\Enums)</a><a href="#sec-abolframe-traits-scopes-enums-23" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">FileManager</a><a href="#sec-abolframe-traits-scopes-enums-24" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">Import</a><a href="#sec-abolframe-traits-scopes-enums-25" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">Logging</a><a href="#sec-abolframe-traits-scopes-enums-26" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">Regionalization</a><a href="#sec-abolframe-traits-scopes-enums-27" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">RoutePropertyCollector</a><a href="#sec-abolframe-traits-scopes-enums-28" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">Settings</a></div></div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-traits-scopes-enums-1" class="scroll-mt-header">بخش A — Core Traits (<code>MyLaravelCore\\Traits</code>)</h2>
<p>Core مجموعه‌ای از ترِیت‌های پایه است که رفتارهای مشترک میان مدل‌ها، Enumها، سرویس‌پروایدرها و Exception Handler را فراهم می‌کند.</p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>تِرِیت</th><th>کاربرد</th><th>محل استفاده</th></tr></thead><tbody><tr><td><code>SoftDeletes</code></td><td>حذف نرم دو‌ستونی با <code>is_deleted</code> و <code>deleted_at</code></td><td>مدل</td></tr><tr><td><code>UserActivityTracking</code></td><td>ساخت خودکار روابط ثبت‌کننده/ویرایش‌کننده/حذف‌کننده</td><td>مدل</td></tr><tr><td><code>AppendHashedColumns</code></td><td>افزودن خودکار <code>hashed_id</code> رمزنگاری‌شده</td><td>مدل</td></tr><tr><td><code>InitializeSortColumn</code></td><td>مقداردهی خودکار ستون <code>sort</code> هنگام ایجاد</td><td>مدل</td></tr><tr><td><code>CustomFilterable</code></td><td>فیلترهای سفارشی مبتنی بر Query String</td><td>مدل</td></tr><tr><td><code>ActiveRows</code></td><td>محدودسازی به رکوردهای فعال — <strong>منسوخ</strong></td><td>مدل</td></tr><tr><td><code>EnumTools</code></td><td>ابزارهای کمکی روی Enumها</td><td>Enum</td></tr><tr><td><code>MagicMethods</code></td><td>دسترسی جادویی و آرایه‌ای به پراپرتی‌ها</td><td>DTO</td></tr><tr><td><code>ExceptionHandler</code></td><td>رندر یکپارچه خطاها در Web و API</td><td>Exception Handler</td></tr><tr><td><code>SoftDeleteBuilder</code></td><td>Builder سفارشی حذف نرم گروهی (داخلی؛ در واقع کلاس است)</td><td>داخلی</td></tr></tbody></table></div>
<h3 id="sec-abolframe-traits-scopes-enums-2" class="scroll-mt-header">A.1 <code>SoftDeletes</code></h3>
<p><code>MyLaravelCore\\Traits\\SoftDeletes</code> جایگزین SoftDeletes لاراول است. تفاوت اصلی: وضعیت حذف علاوه بر <code>deleted_at</code> در یک ستون boolean به نام <code>is_deleted</code> هم نگهداری می‌شود و <strong>کوئری‌های فیلتر روی <code>is_deleted</code> انجام می‌شوند، نه <code>deleted_at</code></strong>.</p>
<p><strong>ستون‌های لازم:</strong></p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>ستون</th><th>نوع</th><th>توضیح</th></tr></thead><tbody><tr><td><code>deleted_at</code></td><td>timestamp nullable</td><td>زمان حذف</td></tr><tr><td><code>is_deleted</code></td><td>boolean</td><td>وضعیت حذف — مبنای فیلتر Global Scope</td></tr></tbody></table></div>
<p><strong>رفتار:</strong></p>
<ul><li>هنگام بوت، <code>SoftDeletingScope</code> به‌صورت Global Scope اضافه می‌شود.</li><li><code>deleted_at</code> → datetime و <code>is_deleted</code> → enum <code>IsDeleted</code> کست می‌شود.</li><li>هنگام حذف، اگر کاربری لاگین باشد، ستون‌های حذف‌کننده پر می‌شوند:</li><li>اگر جدول در کانفیگ <code>user_activity_polymorphic</code> باشد → <code>deletable_id</code> و <code>deletable_type</code></li><li>در غیر این صورت، هر کدام از <code>deletable_id</code>، <code>deletable_type</code>، <code>deleted_by</code> که در <code>fillable</code> باشند.</li><li><code>restore()</code> علاوه بر خالی‌کردن <code>deleted_at</code>، <code>is_deleted</code> را به <code>IsDeleted::NO</code> برمی‌گرداند و ستون‌های حذف‌کننده را پاک می‌کند.</li></ul>
<p><strong>متدها:</strong></p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>Model::withTrashed();     // شامل حذف‌شده‌ها
Model::onlyTrashed();     // فقط حذف‌شده‌ها
Model::withoutTrashed();  // فقط زنده‌ها (پیش‌فرض)
$model-&gt;delete();         // حذف نرم
$model-&gt;restore();        // بازگردانی</code></pre>
</div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>use MyLaravelCore\\Traits\\SoftDeletes;

class Bank extends Model
{
    use SoftDeletes;
    protected $fillable = [&#039;name&#039;, &#039;code&#039;, &#039;is_deleted&#039;, &#039;deleted_at&#039;];
}</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div><strong>هشدار:</strong> متد <code>trashed()</code> لاراول <strong>وجود ندارد</strong>:</div></div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>if ($model-&gt;is_deleted === IsDeleted::YES) { $model-&gt;restore(); }</code></pre>
</div>
<div class="callout info"><i class="fa fa-circle-info callout-icon"></i><div><strong>نکته:</strong> <code>firstOrCreate</code>/<code>updateOrCreate</code> روی جدول با unique index: رکورد حذف‌شده به‌دلیل Global Scope دیده نمی‌شود و درج دوباره duplicate key می‌دهد → ابتدا با <code>withTrashed()</code> جست‌وجو کنید.</div></div>
<p><strong>SoftDeleteBuilder:</strong> <code>delete()</code> گروهی (<code>Post::where(&#039;is_draft&#039;, 1)-&gt;delete()</code>) را به‌جای یک UPDATE دسته‌جمعی روی <strong>تک‌تک مدل‌ها</strong> اجرا می‌کند تا ایونت‌های <code>deleting/deleted/trashed</code> و پرکردن ستون‌های حذف‌کننده برای هر رکورد انجام شود. ⚠️ به‌ازای هر رکورد یک کوئری؛ برای حجم زیاد هزینه را در نظر بگیرید.</p>
<h3 id="sec-abolframe-traits-scopes-enums-3" class="scroll-mt-header">A.2 <code>UserActivityTracking</code></h3>
<p>روابط «چه کسی این رکورد را ثبت/ویرایش/حذف کرد» را به‌صورت داینامیک و بر اساس <code>fillable</code> مدل می‌سازد؛ <strong>نیازی به تعریف دستی هیچ رابطه‌ای نیست.</strong></p>
<p><strong>دو حالت ستون‌گذاری:</strong></p>
<ol><li><strong>ساده (belongsTo):</strong> <code>created_by</code>, <code>updated_by</code>, <code>deleted_by</code>, <code>expired_by</code>, <code>archived_by</code> (اشاره به مدل guard پیش‌فرض).</li><li><strong>چندریختی (morphTo):</strong> جفت‌ستون‌ها وقتی ثبت‌کننده می‌تواند از چند مدل باشد:</li></ol>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>رابطه</th><th>ستون‌ها</th></tr></thead><tbody><tr><td><code>createdBy</code></td><td><code>creatable_id</code> / <code>creatable_type</code></td></tr><tr><td><code>updatedBy</code></td><td><code>updatable_id</code> / <code>updatable_type</code></td></tr><tr><td><code>deletedBy</code></td><td><code>deletable_id</code> / <code>deletable_type</code></td></tr><tr><td><code>expiredBy</code></td><td><code>expirable_id</code> / <code>expirable_type</code></td></tr><tr><td><code>archivedBy</code></td><td><code>archivable_id</code> / <code>archivable_type</code></td></tr></tbody></table></div>
<p>انتخاب میان دو حالت از <code>config/AbolFrame-app.php</code>:</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&#039;user_activity_polymorphic&#039; =&gt; [
    &#039;tables&#039; =&gt; [
        &#039;roles&#039; =&gt; [&#039;created_by&#039;, &#039;updated_by&#039;, &#039;deleted_by&#039;],
        &#039;role_permission&#039; =&gt; [&#039;created_by&#039;],
    ],
],</code></pre>
</div>
<p>وقتی جدول در این لیست باشد، تِرِیت هنگام initialize مدل، ستون ساده را از <code>fillable</code> حذف و جفت‌ستون چندریختی را جایگزین می‌کند.</p>
<p><strong>روابط:</strong> برای هر فیلد دو رابطه: <code>createdBy()</code> (شامل کاربران حذف‌شده — <code>withTrashed</code>) و <code>existingCreatedBy()</code> (فقط کاربران زنده).</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$role-&gt;createdBy;          // حتی اگر حذف شده باشد
$role-&gt;existingCreatedBy;  // فقط اگر کاربر هنوز فعال است</code></pre>
</div>
<ul><li>مدل guard پیش‌فرض هنگام <strong>استفاده از رابطه</strong> resolve می‌شود نه هنگام بوت (چون بوت در هر ریکوئست — از جمله <code>package:discover</code> — اتفاق می‌افتد).</li><li>مدل guard پیش‌فرض باید خودش <code>SoftDeletes</code> ابول فریم را داشته باشد، وگرنه <code>SoftDeletesNotFoundOnModelException</code>.</li><li>برای روابط morph (<code>creatable</code>) <code>instanceof</code> و <code>find()</code> دستی ممنوع است؛ مستقیم <code>$this-&gt;creatable</code> را بخوانید.</li></ul>
<h3 id="sec-abolframe-traits-scopes-enums-4" class="scroll-mt-header">A.3 <code>AppendHashedColumns</code></h3>
<p>accessor <code>hashed_id</code> را به مدل اضافه می‌کند (نسخه رمزنگاری‌شده شناسه، برای خروجی/لینک به‌جای <code>id</code> خام): <code>$user-&gt;hashed_id; // &quot;eyJpdiI6...&quot;</code>.</p>
<ul><li>فقط وقتی append می‌شود که روش رمزنگاری پروژه <code>EncryptMethod::NONE</code> <strong>نباشد</strong>.</li><li>⚠️ متد <code>booted()</code> تعریف می‌کند؛ اگر مدل هم <code>booted()</code> دارد باید دستی ادغام کنید.</li></ul>
<h3 id="sec-abolframe-traits-scopes-enums-5" class="scroll-mt-header">A.4 <code>InitializeSortColumn</code></h3>
<p>اگر جدول ستون <code>sort</code> دارد، هنگام ایجاد رکورد مقدار آن را «بیشترین sort موجود + ۱» می‌گذارد. رکوردهای حذف‌شده (<code>deleted_at</code> غیر null) در محاسبه max لحاظ نمی‌شوند.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>class Category extends Model { use InitializeSortColumn; }</code></pre>
</div>
<h3 id="sec-abolframe-traits-scopes-enums-6" class="scroll-mt-header">A.5 <code>CustomFilterable</code></h3>
<p>اسکوپ <code>customFilter()</code> را اضافه می‌کند تا فیلترهای دلخواه از Query String اعمال شوند.</p>
<p><strong>قرارداد:</strong> برای فیلتر <code>status</code> متد <code>filterStatus($query, $value)</code> روی مدل تعریف کنید.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>class Order extends Model {
    use CustomFilterable;
    public function filterStatus($query, $value) { return $query-&gt;whereIn(&#039;status&#039;, explode(&#039;,&#039;, $value)); }
}
Order::customFilter(&#039;status&#039;, &#039;city&#039;)-&gt;get();   // ?status=paid,pending</code></pre>
</div>
<p>فقط فیلترهایی اعمال می‌شوند که: در آرگومان‌های <code>customFilter</code> باشند، متد متناظر روی مدل وجود داشته باشد، و مقدارشان <code>null</code> نباشد؛ از Pipeline پشت‌سرهم اجرا می‌شوند. برای فیلتر استاندارد DorAPI از <code>DorapiProperty::filter()</code> استفاده کنید؛ <code>CustomFilterable</code> برای پنل و کوئری‌های خارج از DorAPI است.</p>
<h3 id="sec-abolframe-traits-scopes-enums-7" class="scroll-mt-header">A.6 <code>ActiveRows</code> (منسوخ)</h3>
<p>با <code>CheckForActivationScope</code> منسوخ شده. Global Scope می‌گذارد که همه کوئری‌ها را به <code>is_active = 1</code> محدود می‌کند؛ قابل غیرفعال‌کردن نیست و رکوردهای غیرفعال را در پنل مدیریت هم پنهان می‌کند. <strong>جایگزین:</strong> Boolean Scopes (<code>Model::onlyIsActive()</code> / <code>exceptIsActive()</code>).</p>
<h3 id="sec-abolframe-traits-scopes-enums-8" class="scroll-mt-header">A.7 <code>EnumTools</code></h3>
<p>متدهای کمکی برای Enumهای backed.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>enum OrderStatus: int { use EnumTools; case PENDING = 1; case PAID = 2; }</code></pre>
</div>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>متد</th><th>خروجی</th></tr></thead><tbody><tr><td><code>names()</code></td><td><code>[&#039;PENDING&#039;,&#039;PAID&#039;]</code></td></tr><tr><td><code>values()</code></td><td><code>[1, 2]</code></td></tr><tr><td><code>array(bool $reverse=false)</code></td><td><code>[1=&gt;&#039;PENDING&#039;,...]</code> و با <code>true</code> برعکس</td></tr><tr><td><code>componentOptions(?string $moduleName)</code></td><td>آرایه label/value برای <code>x-checkbox-group</code> و <code>x-radio-group</code></td></tr><tr><td><code>selectComponentItems(...)</code></td><td>آیتم‌های آماده Select</td></tr><tr><td><code>multiselectComponentItems(...)</code></td><td>آیتم‌های Multiselect</td></tr><tr><td><code>asBool()</code></td><td>تبدیل مقدار case جاری به boolean</td></tr></tbody></table></div>
<p><strong>ترجمه برچسب‌ها:</strong> کلید از نام Enum (snake_case) و نام case (lowercase): <code>enum.order_status.pending</code>؛ با نام ماژول: <code>OrderStatus::componentOptions(&#039;order&#039;)</code> → <code>order::enum.order_status.pending</code>.</p>
<h3 id="sec-abolframe-traits-scopes-enums-9" class="scroll-mt-header">A.8 <code>MagicMethods</code></h3>
<p>دسترسی جادویی و آرایه‌ای روی <code>$attributes</code> (بیشتر برای DTO و Builder).</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>class ClosureProperty implements ArrayAccess, JsonSerializable { use MagicMethods; }
$dto-&gt;title = &#039;hello&#039;;  echo $dto-&gt;title;  isset($dto-&gt;title);  unset($dto-&gt;title);
$dto[&#039;title&#039;];  $dto-&gt;toArray();  json_encode($dto);</code></pre>
</div>
<p>خواندن کلید ناموجود <code>null</code> برمی‌گرداند. کلاس باید خودش <code>ArrayAccess</code> و <code>JsonSerializable</code> را implement کند؛ تِرِیت فقط متدها را فراهم می‌کند.</p>
<h3 id="sec-abolframe-traits-scopes-enums-10" class="scroll-mt-header">A.9 <code>ExceptionHandler</code></h3>
<p>خطاها را برای Web و API یکپارچه می‌کند؛ توسط <code>FoundationServiceProvider</code> روی Exception Handler پروژه اعمال می‌شود (معمولاً مستقیم استفاده نمی‌شود).</p>
<p><strong>مسیر تصمیم:</strong></p>
<ol><li>درخواست‌های AJAX مربوط به Form Validation (دارای <code>AbolFrame_form-validation</code>) دست‌نخورده به هندلر پیش‌فرض لاراول می‌روند.</li><li>غیر API → <code>renderWebRequest()</code>؛ API → <code>renderAPIRequest()</code>.</li></ol>
<p><strong>Web:</strong> اگر PanelKit نصب باشد صفحات <code>panel-kit-error::403|404|500|base</code>. <code>NotFoundHttpException</code> و <code>ModelNotFoundException</code> همیشه ۴۰۴. با <code>APP_DEBUG=true</code> بقیه خطاها به هندلر لاراول (Stack Trace).</p>
<p><strong>API:</strong> نگاشت به <code>Response::error()</code>:</p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>Exception</th><th>کد</th><th>HTTP</th></tr></thead><tbody><tr><td>NotFoundHttpException</td><td>PAGE_NOT_FOUND</td><td>404</td></tr><tr><td>ModelNotFoundException</td><td>DATA_NOT_FOUND</td><td>404</td></tr><tr><td>MethodNotAllowedHttpException</td><td>DATA_NOT_FOUND</td><td>404</td></tr><tr><td>ValidationException</td><td>BAD_DATA</td><td>422</td></tr><tr><td>AuthorizationException</td><td>FAIL</td><td>403</td></tr><tr><td>AuthenticationException</td><td>FAIL</td><td>401</td></tr><tr><td>UnauthorizedException</td><td>FAIL</td><td>401</td></tr><tr><td>ThrottleRequestsException</td><td>FAIL</td><td>429</td></tr><tr><td>PostTooLargeException</td><td>FAIL</td><td>413</td></tr><tr><td>TokenMismatchException</td><td>FAIL</td><td>400</td></tr><tr><td>InvalidSignatureException</td><td>FAIL</td><td>400</td></tr><tr><td>FileNotFoundException</td><td>FAIL</td><td>404</td></tr><tr><td>سایر</td><td>INTERNAL_ERROR</td><td>500</td></tr></tbody></table></div>
<p>خطاهای نگاشت‌نشده لاگ می‌شوند؛ پیام واقعی فقط با <code>APP_DEBUG=true</code> برمی‌گردد (وگرنه Server Error). <strong>نتیجه عملی:</strong> برای این موارد <code>try/catch</code> ننویسید.</p>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-traits-scopes-enums-11" class="scroll-mt-header">بخش B — Boolean Scopes</h2>
<p>سیستمی برای تولید خودکار ماکروهای Query Builder بر اساس فیلدهای boolean، به‌جای <code>where()</code> تکراری:</p>
<ul><li>فیلتر رکوردهای فعال/غیرفعال، وضعیت تأیید، انقضا، آرشیو و غیره</li><li>افزودن فیلد سفارشی از کانفیگ</li><li>تولید خودکار ماکرو هنگام بوت</li></ul>
<h3 id="sec-abolframe-traits-scopes-enums-12" class="scroll-mt-header">B.1 قابلیت‌ها</h3>
<ul><li><strong>تولید خودکار:</strong> به‌ازای هر فیلد دو ماکرو روی Eloquent Builder: <code>onlyFieldName()</code> (فیلد = 1) و <code>exceptFieldName()</code> (فیلد = 0).</li><li><strong>قابل گسترش:</strong> از <code>config/AbolFrame-app.php</code>.</li><li><strong>حذف تکراری خودکار</strong> میان لیست پیش‌فرض و کانفیگ.</li><li><strong>اعتبارسنجی کانفیگ:</strong> نامعتبر → <code>InvalidBooleanScopeFieldsTypeException</code> قبل از اجرا.</li></ul>
<h3 id="sec-abolframe-traits-scopes-enums-13" class="scroll-mt-header">B.2 فیلدهای پیش‌فرض</h3>
<p><code>is_archive</code>, <code>is_started</code>, <code>is_success</code>, <code>is_verified</code>, <code>is_expired</code>, <code>is_active</code>, <code>is_archived</code>, <code>is_count</code>, <code>is_default</code>, <code>is_end</code>, <code>is_lock</code>, <code>is_required</code> — هرکدام <code>onlyIsXxx()</code> و <code>exceptIsXxx()</code> (مثلاً <code>onlyIsActive()</code>, <code>exceptIsLock()</code>).</p>
<h3 id="sec-abolframe-traits-scopes-enums-14" class="scroll-mt-header">B.3 استفاده</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>User::onlyIsActive()-&gt;get();             // فقط فعال‌ها
User::exceptIsActive()-&gt;get();           // غیرفعال‌ها
User::onlyIsActive()-&gt;exceptIsExpired()-&gt;onlyIsVerified()-&gt;get();
Post::with([&#039;comments&#039; =&gt; function ($q) { $q-&gt;onlyIsActive(); }])-&gt;get();</code></pre>
</div>
<h3 id="sec-abolframe-traits-scopes-enums-15" class="scroll-mt-header">B.4 افزودن فیلد سفارشی</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>// config/AbolFrame-app.php
return [&#039;additional_boolean_scope_fields&#039; =&gt; [&#039;is_published&#039;, &#039;is_featured&#039;, &#039;is_deleted&#039;]];</code></pre>
</div>
<p>نام فیلدها خودکار lowercase می‌شود (نیازی به <code>strtolower</code> نیست) و باید snake_case باشد. نام ماکرو با <code>Str::studly()</code> ساخته می‌شود: <code>is_published</code> → <code>onlyIsPublished()</code>/<code>exceptIsPublished()</code>؛ <code>my_custom_flag</code> → <code>onlyMyCustomFlag()</code>.</p>
<h3 id="sec-abolframe-traits-scopes-enums-16" class="scroll-mt-header">B.5 خطاها</h3>
<ul><li>مقدار کانفیگ آرایه نیست (<code>&#039;additional_boolean_scope_fields&#039; =&gt; &#039;is_published&#039;</code>) → «must be an array».</li><li>عناصر رشته نیستند (<code>[true, 123]</code>) → «must be array of strings».</li></ul>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <code>is_start</code> (قانون «وضعیت اولیه») <strong>در لیست پیش‌فرض نیست</strong> (<code>is_started</code> هست)؛ یا به کانفیگ اضافه شود، یا <code>where(&#039;is_start&#039;, IsStart::YES)</code>.</div></div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-traits-scopes-enums-17" class="scroll-mt-header">بخش C — فهرست Enumهای Foundation (۵۳ enum)</h2>
<p>با افزودن enum جدید این فهرست باید به‌روز شود. تعداد به تفکیک: Core 36، FileManager 4، Export 3، DeleteDependency 2، Import 2، CacheStorage 1، Encryption 1، Logging 1، Regionalization 1، RoutePropertyCollector 1، Settings 1.</p>
<h3 id="sec-abolframe-traits-scopes-enums-18" class="scroll-mt-header">CacheStorage</h3>
<ul><li><code>CacheType</code> (خالص): <code>ROLE, PERMISSION, PERMISSION_CATEGORY, PERMISSION_TITLE, ALL</code></li></ul>
<h3 id="sec-abolframe-traits-scopes-enums-19" class="scroll-mt-header">Core (<code>MyLaravelCore\\Enums\\...</code>)</h3>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>Enum</th><th>backing</th><th>cases</th></tr></thead><tbody><tr><td><code>ApplicationType</code></td><td>string</td><td><code>PANEL=panel</code>, <code>API=api</code></td></tr><tr><td><code>BooleanState</code></td><td>int</td><td><code>TRUE=1</code>, <code>FALSE=0</code></td></tr><tr><td><code>CanUpdateProfile</code></td><td>int</td><td><code>YES=1</code>, <code>NO=0</code></td></tr><tr><td><code>CommentStatus</code></td><td>int</td><td><code>SEND_COMMENT_WITH_CONFIRM=1</code>, <code>SEND_COMMENT_WITHOUT_CONFIRM=2</code>, <code>DISABLE=0</code></td></tr><tr><td><code>ConfirmationStatus</code></td><td>int</td><td><code>PENDING=0</code>, <code>CONFIRMED=1</code>, <code>NOT_CONFIRMED=2</code></td></tr><tr><td><code>DiscountType</code></td><td>int</td><td><code>PERCENT=1</code>, <code>AMOUNT=2</code></td></tr><tr><td><code>AbolFrameComponent</code></td><td>string</td><td><code>NONE=none</code>, <code>ACCESS_HUB=AbolFrame-access-hub</code>, <code>PANEL_KIT=AbolFrame-panel-kit</code>, <code>APP=AbolFrame-app</code>, <code>NOTIFICATION=AbolFrame-notification</code></td></tr><tr><td><code>Gender</code></td><td>int</td><td><code>FEMALE=0</code>, <code>MALE=1</code></td></tr><tr><td><code>IsActive</code>, <code>IsArchived</code>, <code>IsCount</code>, <code>IsDefault</code>, <code>IsDeleted</code>, <code>IsEnd</code>, <code>IsExpired</code>, <code>IsFree</code>, <code>IsLock</code>, <code>IsPrimary</code>, <code>IsPrivate</code>, <code>IsPublic</code>, <code>IsRequired</code>, <code>IsSpecial</code>, <code>IsStart</code>, <code>IsSystemic</code>, <code>IsUrban</code>, <code>IsUsed</code></td><td>int</td><td><code>YES=1</code>, <code>NO=0</code></td></tr><tr><td><code>IsRead</code></td><td>int</td><td><code>READ=1</code>, <code>NOT_READ=0</code></td></tr><tr><td><code>LinkType</code></td><td>int</td><td><code>INTERNAL=1</code>, <code>EXTERNAL=2</code></td></tr><tr><td><code>LogType</code></td><td>int</td><td><code>CREATE=1</code>, <code>UPDATE=2</code>, <code>DELETE=3</code></td></tr><tr><td><code>Month</code></td><td>int</td><td><code>JANUARY=1</code> … <code>DECEMBER=12</code></td></tr><tr><td><code>ReactionType</code></td><td>int</td><td><code>LIKE=1</code>, <code>DISLIKE=2</code></td></tr><tr><td><code>SeoRobot</code></td><td>int</td><td><code>INDEX_FOLLOW=1</code>, <code>INDEX_NOFOLLOW=2</code>, <code>NOINDEX_FOLLOW=3</code>, <code>NOINDEX_NOFOLLOW=4</code></td></tr><tr><td><code>SystemMessage</code></td><td>int</td><td><code>FAIL=0</code>, <code>SUCCESS=1</code>, <code>INTERNAL_ERROR=10</code>, <code>DATA_NOT_FOUND=11</code>, <code>PAGE_NOT_FOUND=12</code>, <code>BAD_DATA=13</code>, <code>SELECT_INVALID_DATA=14</code>, <code>SELECT_INVALID_FILTER_CONFIGURATION=15</code></td></tr><tr><td><code>UrlTarget</code></td><td>string</td><td><code>_blank</code>, <code>_self</code>, <code>_parent</code>, <code>_top</code>, <code>framename</code></td></tr><tr><td><code>UserType</code></td><td>int</td><td><code>ALL=0</code>, <code>USERS=1</code></td></tr><tr><td><code>WorkFlowType</code></td><td>int</td><td><code>VIEW=1</code>, <code>CHANGE=2</code>, <code>SET=3</code></td></tr></tbody></table></div>
<h3 id="sec-abolframe-traits-scopes-enums-20" class="scroll-mt-header">DeleteDependency</h3>
<ul><li><code>DeleteDependencyMode</code> (int): <code>FIRST=1</code>, <code>ALL=2</code>, <code>GENERAL=3</code></li><li><code>DestroyType</code> (int): <code>ATOMIC=1</code>, <code>PARTIAL=2</code></li></ul>
<h3 id="sec-abolframe-traits-scopes-enums-21" class="scroll-mt-header">Encryption</h3>
<ul><li><code>EncryptMethod</code> (string): <code>NONE=none</code>, <code>APP_KEY=app_key</code>, <code>SESSION_SALT=session_salt</code></li></ul>
<h3 id="sec-abolframe-traits-scopes-enums-22" class="scroll-mt-header">Export (<code>...\\Export\\Enums</code>)</h3>
<ul><li><code>DataDriver</code> (string): <code>MODEL=model</code>, <code>RAW=raw</code>, <code>COLLECTION=collection</code>, <code>ARRAY=array</code></li><li><code>FileFormat</code> (string): <code>EXCEL=excel</code>, <code>HTML=html</code>, <code>CSV=csv</code>, <code>XML=xml</code>, <code>PDF=pdf</code></li><li><code>FilterOperator</code> (string): <code>Equals=eq</code>, <code>Contains=contains</code>, <code>StartsWith=starts_with</code>, <code>EndsWith=ends_with</code>, <code>GreaterThan=gt</code>, <code>LessThan=lt</code>, <code>Between=between</code>, <code>In=in</code></li></ul>
<h3 id="sec-abolframe-traits-scopes-enums-23" class="scroll-mt-header">FileManager</h3>
<ul><li><code>FileDiskAuthType</code> (int): <code>NO_AUTH=0</code>, <code>BASIC=1</code>, <code>SSH_KEY_BASED=2</code></li><li><code>FileDiskDriver</code> (int): <code>LOCAL=1</code>, <code>SFTP=2</code>, <code>S3=3</code></li><li><code>FileExtensionType</code> (string): <code>image, video, audio, document, spreadsheet, presentation, archive, code, font, ebook, database, executable, disk_image, vector, email, certificate, config, 3d (THREE_D), text, other</code></li><li><code>FileType</code> (int): <code>GENERAL=0</code>, <code>USER=1</code>, <code>USER_DOCUMENT=2</code>, <code>SETTING=3</code></li></ul>
<h3 id="sec-abolframe-traits-scopes-enums-24" class="scroll-mt-header">Import</h3>
<ul><li><code>FileFormat</code> (string): <code>EXCEL=excel</code>, <code>CSV=csv</code></li><li><code>ImportFieldType</code> (string): <code>TEXT=text</code>, <code>LINK=link</code></li></ul>
<h3 id="sec-abolframe-traits-scopes-enums-25" class="scroll-mt-header">Logging</h3>
<ul><li><code>MyLaravelCore\\Enums\\LogType</code> (int): <code>CREATE=1</code>, <code>UPDATE=2</code>, <code>DELETE=3</code> (در Audit فعلی نام enum عملیات <code>AuditType</code> است)</li></ul>
<h3 id="sec-abolframe-traits-scopes-enums-26" class="scroll-mt-header">Regionalization</h3>
<ul><li><code>LocationType</code> (string): <code>country, province, city, district, rural_district, village, neighborhood</code></li></ul>
<h3 id="sec-abolframe-traits-scopes-enums-27" class="scroll-mt-header">RoutePropertyCollector</h3>
<ul><li><code>Source</code> (string): <code>LOCAL=local</code>, <code>DATABASE=database</code></li></ul>
<h3 id="sec-abolframe-traits-scopes-enums-28" class="scroll-mt-header">Settings</h3>
<ul><li><code>SettingType</code> (int): <code>TEXT=1, NUMBER=2, RADIO_GROUP=3, IMAGE=4, FILE=5, SELECT=6, MULTI_SELECT=7, TEXTAREA=8, EDITOR=9, JSON</code> (مقدار JSON در مستند ناقص است)</li></ul>
<div class="callout info"><i class="fa fa-circle-info callout-icon"></i><div><strong>قاعده پروژه:</strong> وضعیت static «در حال بررسی / تایید شده / تایید نشده» = <code>ConfirmationStatus</code>؛ enum جدید برای آن ساخته نشود.</div></div>
        `
    },
    {
        id: "abolframe-dataprovider-deletedependency-jalali",
        title: "۴. DataProvider، وابستگی حذف و Jalali",
        icon: "fa-database",
        category: "مستندات جامع ابول فریم (AbolFrame)",
        content: `
<h1>۴. DataProvider، DeleteDependency و Jalali — توضیح کامل</h1>
<div class="toc-quick-jump-card my-4 p-3 rounded-3 border bg-body-tertiary"><div class="d-flex align-items-center justify-content-between mb-2"><strong class="text-primary small"><i class="fa fa-compass ms-1"></i> فهرست سریع آیتم‌ها، متدها و کامپوننت‌های این بخش (25 مورد):</strong></div><div class="d-flex flex-wrap gap-2"><a href="#sec-abolframe-dataprovider-deletedependency-jalali-1" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش A — DataProvider</a><a href="#sec-abolframe-dataprovider-deletedependency-jalali-2" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.1 متدها</a><a href="#sec-abolframe-dataprovider-deletedependency-jalali-3" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.2 مثال‌ها</a><a href="#sec-abolframe-dataprovider-deletedependency-jalali-4" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.3 رهنمود پروژه</a><a href="#sec-abolframe-dataprovider-deletedependency-jalali-5" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش B — DeleteDependency (وابستگی حذف)</a><a href="#sec-abolframe-dataprovider-deletedependency-jalali-6" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.1 فعال‌سازی در مدل</a><a href="#sec-abolframe-dataprovider-deletedependency-jalali-7" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.2 انواع وابستگی</a><a href="#sec-abolframe-dataprovider-deletedependency-jalali-8" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.3 تنظیمات پیش‌فرض (config/AbolFrame-app.php)</a><a href="#sec-abolframe-dataprovider-deletedependency-jalali-9" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.4 دریافت پیام حذف</a><a href="#sec-abolframe-dataprovider-deletedependency-jalali-10" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.5 متدهای کاربردی</a><a href="#sec-abolframe-dataprovider-deletedependency-jalali-11" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.6 Facade DeleteProtection</a><a href="#sec-abolframe-dataprovider-deletedependency-jalali-12" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.7 حذف محافظت‌شده</a><a href="#sec-abolframe-dataprovider-deletedependency-jalali-13" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.8 نکات</a><a href="#sec-abolframe-dataprovider-deletedependency-jalali-14" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.9 کاربرد در قوانین پروژه</a><a href="#sec-abolframe-dataprovider-deletedependency-jalali-15" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش C — Jalali (تقویم شمسی)</a><a href="#sec-abolframe-dataprovider-deletedependency-jalali-16" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">C.1 ساخت</a><a href="#sec-abolframe-dataprovider-deletedependency-jalali-17" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">C.2 ⛔ مهم‌ترین تله: رشته میلادی</a><a href="#sec-abolframe-dataprovider-deletedependency-jalali-18" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">C.3 فرمت‌بندی</a><a href="#sec-abolframe-dataprovider-deletedependency-jalali-19" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">C.4 تبدیل</a><a href="#sec-abolframe-dataprovider-deletedependency-jalali-20" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">C.5 تغییر (Mutation) — شیء mutable</a><a href="#sec-abolframe-dataprovider-deletedependency-jalali-21" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">C.6 تایم‌زون (ذخیره‌سازی و نمایش)</a><a href="#sec-abolframe-dataprovider-deletedependency-jalali-22" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">C.7 Eloquent Cast</a><a href="#sec-abolframe-dataprovider-deletedependency-jalali-23" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">C.8 مقایسه، اختلاف، اعتبار</a><a href="#sec-abolframe-dataprovider-deletedependency-jalali-24" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">C.9 getterها و استثنا</a><a href="#sec-abolframe-dataprovider-deletedependency-jalali-25" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">C.10 Validation Rules</a></div></div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-dataprovider-deletedependency-jalali-1" class="scroll-mt-header">بخش A — DataProvider</h2>
<p>Facade‌ای برای ارائه <strong>داده‌های در دسترس و مرتب‌شده</strong>. با مدل‌ها، کلاس‌های Enum و Eloquent Query Builder کار می‌کند. کاربرد اصلی: تأمین گزینه‌های select/checkbox/radio.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>use MyLaravelCore\\Facades\\DataProvider;</code></pre>
</div>
<h3 id="sec-abolframe-dataprovider-deletedependency-jalali-2" class="scroll-mt-header">A.1 متدها</h3>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>متد</th><th>شرح</th></tr></thead><tbody><tr><td><code>source(...)</code></td><td>تعیین منبع: مدل، enum یا Eloquent Query Builder</td></tr><tr><td><code>onlyActives()</code></td><td>فقط رکوردهای active. اگر ستون <code>is_active</code> وجود داشته باشد <strong>به‌طور پیش‌فرض اعمال می‌شود</strong></td></tr><tr><td><code>ignoreActiveFilter()</code></td><td>توقف اعمال خودکار فیلتر active؛ همه رکوردها (فعال و غیرفعال)</td></tr><tr><td><code>withoutActives()</code></td><td>فقط داده‌های غیر active</td></tr><tr><td><code>onlyStatus($status)</code></td><td>فقط داده‌های با یک وضعیت خاص</td></tr><tr><td><code>withoutStatus($status)</code></td><td>داده‌های مخالف یک وضعیت</td></tr><tr><td><code>sort()</code></td><td>مرتب‌سازی صعودی بر اساس <code>sort</code>؛ اگر نبود <code>name</code>؛ اگر نبود <code>title</code></td></tr><tr><td><code>latest()</code></td><td>مرتب‌سازی نزولی بر اساس <code>created_at</code></td></tr><tr><td><code>available()</code></td><td>اعمال خودکار <code>sort()</code> و <code>onlyActives()</code></td></tr><tr><td><code>add($objectOrIdOrIds)</code></td><td>افزودن داده دیگر به نتیجه (object، id، یا آرایه‌ای از id) — مثلاً مقدار انتخاب‌شده‌ی غیرفعال در فرم ویرایش</td></tr><tr><td><code>get()</code></td><td>دریافت داده نهایی</td></tr><tr><td><code>formatSelectOptions()</code></td><td>خروجی مناسب select input</td></tr><tr><td><code>formatComponentOptions()</code></td><td>خروجی مناسب checkbox و radio</td></tr><tr><td><code>moduleName()</code></td><td>نام ماژول برای ترجمه label</td></tr><tr><td><code>label(&#039;col&#039;)</code></td><td>ستون label؛ پیش‌فرض <code>name</code></td></tr><tr><td><code>value(&#039;col&#039;)</code></td><td>ستون value؛ پیش‌فرض <code>id</code></td></tr><tr><td><code>shouldEncryptValue()</code></td><td>idهای خروجی رمزنگاری شوند</td></tr></tbody></table></div>
<div class="callout info"><i class="fa fa-circle-info callout-icon"></i><div><strong>نکته:</strong> قبل از <code>formatSelectOptions()</code>/<code>formatComponentOptions()</code> باید تنظیمات <code>moduleName</code>, <code>label</code>, <code>value</code>, <code>shouldEncryptValue</code> انجام شود.</div></div>
<h3 id="sec-abolframe-dataprovider-deletedependency-jalali-3" class="scroll-mt-header">A.2 مثال‌ها</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>use Modules\\Bank\\Models\\Bank;
use MyLaravelCore\\Enums\\IsLock;

DataProvider::source(Bank::query())-&gt;withoutActives()-&gt;get();                       // 1
DataProvider::source(Bank::class)-&gt;latest()-&gt;get();                                  // 2
DataProvider::source(Bank::class)-&gt;add([6, 10])-&gt;get();                              // 3
DataProvider::source(Bank::class)-&gt;latest()-&gt;label(&#039;title&#039;)-&gt;shouldEncryptValue()-&gt;formatSelectOptions(); // 4
DataProvider::source(IsLock::class)-&gt;formatComponentOptions();                       // 5
DataProvider::source(Bank::query())-&gt;onlyStatus(BankStatusEnum::ACTIVE)-&gt;get();     // 6</code></pre>
</div>
<h3 id="sec-abolframe-dataprovider-deletedependency-jalali-4" class="scroll-mt-header">A.3 رهنمود پروژه</h3>
<ul><li>جدول مدیریت: <code>latest()</code>؛ select: <code>available()</code> یا <code>sort()</code>.</li><li><code>shouldEncryptValue()</code> فقط وقتی <code>EncryptMethod ≠ NONE</code>.</li></ul>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-dataprovider-deletedependency-jalali-5" class="scroll-mt-header">بخش B — DeleteDependency (وابستگی حذف)</h2>
<p>ماژولی برای جلوگیری از حذف رکوردی که <strong>در بخش‌های دیگر وابستگی دارد</strong> یا <strong>بر اساس یک شرط نباید حذف شود</strong>. قبل از حذف، relationها، شرط‌های سفارشی و ruleهای flag بررسی و پیام مناسب نمایش داده می‌شود.</p>
<h3 id="sec-abolframe-dataprovider-deletedependency-jalali-6" class="scroll-mt-header">B.1 فعال‌سازی در مدل</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>use MyLaravelCore\\Support\\DeleteDependency\\DeleteDependency;
use MyLaravelCore\\Traits\\HasDeleteDependency;

class Category extends Model
{
    use HasDeleteDependency;

    public function deleteDependencies(): array
    {
        return [
            DeleteDependency::relation(&#039;products&#039;)-&gt;label(&#039;shop::messages.products&#039;),
            DeleteDependency::condition(fn() =&gt; !$this-&gt;is_locked)-&gt;label(&#039;shop::messages.locked_record&#039;),
        ];
    }

    public function products() { return $this-&gt;hasMany(Product::class); }
}</code></pre>
</div>
<h3 id="sec-abolframe-dataprovider-deletedependency-jalali-7" class="scroll-mt-header">B.2 انواع وابستگی</h3>
<ul><li><strong>relation:</strong> <code>DeleteDependency::relation(&#039;products&#039;)-&gt;label(...)</code> — اگر relation داده داشته باشد، حذف مسدود می‌شود.</li><li><strong>condition (rule مبتنی بر flag):</strong> <code>DeleteDependency::condition(fn() =&gt; ...)</code> یا <code>-&gt;condition($this-&gt;can_delete)</code>؛ ورودی <code>bool</code> یا <code>Closure</code>. (از <code>DeleteFlagRule</code> استفاده می‌کند.)</li><li>⚠️ <strong>جهت <code>condition</code></strong> در مستندات مبهم است (مثال <code>!$this-&gt;is_locked</code>)؛ پیش از استفاده برای قانون «تایید شده حذف نشود» با تست روشن کنید.</li></ul>
<h3 id="sec-abolframe-dataprovider-deletedependency-jalali-8" class="scroll-mt-header">B.3 تنظیمات پیش‌فرض (<code>config/AbolFrame-app.php</code>)</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&#039;delete_dependency&#039; =&gt; [
    &#039;default_mode&#039; =&gt; &#039;general&#039;, // first | all | general
    &#039;general_message&#039; =&gt; &#039;foundation::messages.delete_not_allow_cause_dependencies&#039;,
],</code></pre>
</div>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>مقدار</th><th>توضیح</th></tr></thead><tbody><tr><td><code>first</code></td><td>فقط اولین وابستگی مسدودکننده در پیام</td></tr><tr><td><code>all</code></td><td>همه وابستگی‌های مسدودکننده</td></tr><tr><td><code>general</code></td><td>یک پیام عمومی از <code>general_message</code> (بدون نام وابستگی‌ها)</td></tr></tbody></table></div>
<p>اگر توسعه‌دهنده هنگام فراخوانی حالت را مشخص کند همان استفاده می‌شود، وگرنه مقدار تنظیمات.</p>
<h3 id="sec-abolframe-dataprovider-deletedependency-jalali-9" class="scroll-mt-header">B.4 دریافت پیام حذف</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>if ($message = $category-&gt;getDeleteErrorMessage()) {                       // حالت پیش‌فرض تنظیمات
    return back()-&gt;withFlash($message, &#039;error&#039;);
}
if ($message = $category-&gt;getDeleteErrorMessage(DeleteDependencyMode::FIRST)) { /* override */ }</code></pre>
</div>
<p>حالت‌ها: <code>FIRST</code> (اولین مسدودکننده)، <code>ALL</code> (همه)، <code>GENERAL</code> (پیام عمومی)، <code>null</code> (از config).</p>
<p>اگر وابستگی فعالی نباشد خروجی <code>null</code> است.</p>
<h3 id="sec-abolframe-dataprovider-deletedependency-jalali-10" class="scroll-mt-header">B.5 متدهای کاربردی</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$category-&gt;hasDependencies();
$category-&gt;getBlockingRelation();      $category-&gt;getAllBlockingRelations();
$category-&gt;hasDeleteFlagBlocks();
$category-&gt;getBlockingFlagRule();      $category-&gt;getAllBlockingFlagRules();
$category-&gt;getAllBlockingLabels();
$category-&gt;canBeDeleteOrFail();        // DeletionGuardException در صورت وابستگی
$category-&gt;deletionBlockMessage();</code></pre>
</div>
<p><strong>attribute <code>deletable</code></strong> (به‌صورت پیش‌فرض append می‌شود): <code>$category-&gt;deletable-&gt;canDelete();</code> و <code>-&gt;getMessage();</code>.</p>
<h3 id="sec-abolframe-dataprovider-deletedependency-jalali-11" class="scroll-mt-header">B.6 Facade <code>DeleteProtection</code></h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>use MyLaravelCore\\Facades\\DeleteProtection;
DeleteProtection::check($category);                               // bool
DeleteProtection::message($category);                             // string|null
DeleteProtection::message($category, DeleteDependencyMode::FIRST);</code></pre>
</div>
<h3 id="sec-abolframe-dataprovider-deletedependency-jalali-12" class="scroll-mt-header">B.7 حذف محافظت‌شده</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$service = DeleteProtection::destroy()-&gt;model(Category::class)-&gt;target([1, 2, 3])-&gt;atomic()-&gt;execute();
$service-&gt;hasError();  $service-&gt;getErrors();  $service-&gt;getMessage();

$service = DeleteProtection::destroy(Category::class)-&gt;target([1,2,3])-&gt;type(DestroyType::PARTIAL)-&gt;execute();</code></pre>
</div>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>حالت</th><th>توضیح</th></tr></thead><tbody><tr><td><code>DestroyType::ATOMIC</code></td><td>خطا در یکی ⇒ rollback کل عملیات</td></tr><tr><td><code>DestroyType::PARTIAL</code></td><td>قابل‌حذف‌ها حذف و خطاهای ناموفق‌ها جمع‌آوری می‌شود</td></tr></tbody></table></div>
<p>متدهای builder: <code>model</code>, <code>target</code> (رکورد/id/آرایه id)، <code>atomic</code>, <code>partial</code>, <code>type</code>, <code>execute</code> (برمی‌گرداند <code>DestroyService</code>).</p>
<h3 id="sec-abolframe-dataprovider-deletedependency-jalali-13" class="scroll-mt-header">B.8 نکات</h3>
<ul><li>ابتدا relationها بررسی می‌شوند سپس ruleهای flag؛ در حالت <code>FIRST</code> ترتیب تعریف مهم است.</li><li>سازوکار به <strong>ایونت حذف مدل</strong> وابسته است؛ <code>Category::where(...)-&gt;delete()</code> ممکن است ایونت را اجرا نکند.</li></ul>
<h3 id="sec-abolframe-dataprovider-deletedependency-jalali-14" class="scroll-mt-header">B.9 کاربرد در قوانین پروژه</h3>
<ul><li>«مطلب دارای نظر حذف نمی‌شود» → <code>DeleteDependency::relation(&#039;comments&#039;)</code>.</li><li>«رکورد تایید‌شده حذف نمی‌شود» → <code>condition()</code>.</li><li>اولویت هنگام تحقق هر دو → ترتیب تعریف + <code>FIRST</code>.</li></ul>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-dataprovider-deletedependency-jalali-15" class="scroll-mt-header">بخش C — Jalali (تقویم شمسی)</h2>
<p>شیء تاریخ شمسی با پیاده‌سازی مستقل روی Carbon؛ تبدیل به/از Carbon و Hijri؛ مدیریت پویای تایم‌زون ذخیره‌سازی و نمایش. بخشی از <code>AbolFrame/AbolFrame</code> (نیاز به نصب جدا نیست).</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>use MyLaravelCore\\Facades\\Jalali;   // یا
use MyLaravelCore\\Support\\Jalali\\Jalali;</code></pre>
</div>
<p>helper سراسری <code>jalali()</code> توسط این پکیج تأمین می‌شود (جایگزین helper هم‌نام قبلی؛ <code>verta</code> و <code>verta()</code> بدون تغییر ولی در کد جدید استفاده نشوند).</p>
<h3 id="sec-abolframe-dataprovider-deletedependency-jalali-16" class="scroll-mt-header">C.1 ساخت</h3>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>متد</th><th>مثال</th></tr></thead><tbody><tr><td><code>now()</code></td><td><code>Jalali::now()</code>, <code>Jalali::now(&#039;Asia/Tehran&#039;)</code>, <code>Jalali::now(new DateTimeZone(...))</code>, <code>jalali()</code></td></tr><tr><td><code>today/tomorrow/yesterday</code></td><td><code>Jalali::today()</code></td></tr><tr><td><code>parse()</code></td><td>رشته <strong>شمسی</strong>، فرمت <code>Y-m-d</code> یا <code>Y/m/d</code> با/بدون زمان: <code>Jalali::parse(&#039;1403/05/14 13:30:00&#039;)</code>, <code>jalali(&#039;1403/05/14&#039;)</code></td></tr><tr><td><code>create()</code></td><td><code>Jalali::create(1403, 5, 14, 13, 30, 0, &#039;Asia/Tehran&#039;)</code></td></tr><tr><td><code>createGregorian()</code></td><td><code>Jalali::createGregorian(2024, 8, 4, 13, 30, 0, &#039;Asia/Tehran&#039;)</code></td></tr><tr><td><code>fromCarbon()</code></td><td><code>Jalali::fromCarbon(Carbon::now())</code> یا <code>jalali(Carbon::now())</code></td></tr><tr><td><code>fromHijri()</code></td><td><code>Jalali::fromHijri(hijri(&#039;1447-09-15&#039;))</code> (زنجیره: قمری ← میلادی ← شمسی)</td></tr><tr><td><code>fromDateTime()</code></td><td><code>jalali(new DateTime(&#039;2024-08-04&#039;))</code></td></tr><tr><td><code>fromTimestamp()</code></td><td><code>Jalali::fromTimestamp(1722765645, &#039;Asia/Tehran&#039;)</code> یا <code>jalali(1722765645)</code></td></tr></tbody></table></div>
<h3 id="sec-abolframe-dataprovider-deletedependency-jalali-17" class="scroll-mt-header">C.2 ⛔ مهم‌ترین تله: رشته میلادی</h3>
<p><code>parse()</code> (و <code>jalali(&#039;...&#039;)</code>) رشته را <strong>همیشه شمسی</strong> فرض می‌کند و تشخیصی انجام نمی‌دهد. اغلب <strong>خطا نمی‌دهد</strong> و تاریخ غلط برمی‌گرداند.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>jalali(&#039;2026-07-15&#039;)-&gt;format(&#039;Y/m/d&#039;);   // ❌ 2026/07/15  (صحیح: 1405/04/24)
jalali(&#039;2026-07-31&#039;);                    // ❌ InvalidJalaliDateException (فقط چون روز 31 ماه 7 شمسی وجود ندارد)
jalali($user-&gt;created_at);               // ✅
jalali(new DateTime(&#039;2026-07-31&#039;));      // ✅
Jalali::createGregorian(2026, 7, 31);    // ✅</code></pre>
</div>
<p>رایج‌ترین موقعیت: تبدیل تاریخ با <code>format()</code> به رشته و بازگرداندن به <code>jalali()</code>:</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$key = $date-&gt;format(&#039;Y-m-d&#039;);
$label = jalali($key)-&gt;format(&#039;m/d&#039;);    // ❌
$label = jalali($date)-&gt;format(&#039;m/d&#039;);   // ✅</code></pre>
</div>
<p>helper برای Carbon، DateTimeInterface، Hijri و timestamp مسیر درست را خودکار انتخاب می‌کند؛ فقط <strong>رشته</strong> شمسی فرض می‌شود.</p>
<h3 id="sec-abolframe-dataprovider-deletedependency-jalali-18" class="scroll-mt-header">C.3 فرمت‌بندی</h3>
<p><strong>آماده:</strong> <code>formatDate()</code> → <code>1403/05/14</code>، <code>formatDatetime()</code> → <code>1403/05/14 13:30:45</code>، <code>formatTime()</code>، <code>formatWord()</code> → <code>یکشنبه 14 مرداد 1403</code>، <code>(string) $date</code>.</p>
<p><code>format()</code> مشابه <code>date()</code>، escape با <code>\\</code>:</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$date-&gt;format(&#039;Y-m-d&#039;);       // 1403-05-14
$date-&gt;format(&#039;l j F Y&#039;);     // یکشنبه 14 مرداد 1403
$date-&gt;format(&#039;\\\\Y=Y&#039;);       // Y=1403</code></pre>
</div>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>توکن</th><th>معنی</th><th>مثال</th></tr></thead><tbody><tr><td><code>Y</code> / <code>y</code></td><td>سال ۴/۲ رقمی</td><td>1403 / 03</td></tr><tr><td><code>m</code> / <code>n</code></td><td>ماه با/بدون صفر</td><td>05 / 5</td></tr><tr><td><code>d</code> / <code>j</code></td><td>روز با/بدون صفر</td><td>14</td></tr><tr><td><code>H</code> / <code>G</code></td><td>ساعت ۲۴ با/بدون صفر</td><td>13</td></tr><tr><td><code>h</code> / <code>g</code></td><td>ساعت ۱۲ با/بدون صفر</td><td>01 / 1</td></tr><tr><td><code>i</code>, <code>s</code></td><td>دقیقه، ثانیه</td><td>30, 45</td></tr><tr><td><code>A</code> / <code>a</code></td><td>قبل/بعد از ظهر</td><td>بعد از ظهر / ب.ظ</td></tr><tr><td><code>F</code></td><td>نام ماه</td><td>مرداد</td></tr><tr><td><code>l</code> / <code>D</code></td><td>نام روز / کوتاه</td><td>یکشنبه / ی</td></tr><tr><td><code>w</code>/<code>N</code></td><td>شماره روز هفته (شنبه=۱)</td><td>2</td></tr><tr><td><code>t</code></td><td>روزهای ماه</td><td>31</td></tr><tr><td><code>L</code></td><td>کبیسه</td><td>1</td></tr><tr><td><code>U</code></td><td>Unix timestamp</td><td>1722765645</td></tr></tbody></table></div>
<p><code>monthName()</code>, <code>dayName()</code>, <code>dayOfWeek()</code> (شنبه=1 … جمعه=7).</p>
<h3 id="sec-abolframe-dataprovider-deletedependency-jalali-19" class="scroll-mt-header">C.4 تبدیل</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$date-&gt;toCarbon();       // 2024-08-04
$date-&gt;toHijri();        // 1446/01/28
$date-&gt;toDateTime();
$date-&gt;toArrayJalali();  // [1403, 5, 14]
$date-&gt;timestamp();</code></pre>
</div>
<h3 id="sec-abolframe-dataprovider-deletedependency-jalali-20" class="scroll-mt-header">C.5 تغییر (Mutation) — شیء mutable</h3>
<p>برخلاف <code>Hijri</code> (immutable)، <code>Jalali</code> <strong>mutable</strong> است؛ <code>add*/sub*</code> خود شیء را تغییر می‌دهند. برای حفظ اصل <code>copy()</code>:</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$end = $start-&gt;addDays(20);             // ❌ $start هم تغییر می‌کند
$end = $start-&gt;copy()-&gt;addDays(20);     // ✔</code></pre>
</div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$base = jalali(&#039;1403/05/14 12:00:00&#039;);
$base-&gt;copy()-&gt;addDay();       // 1403/05/15
$base-&gt;copy()-&gt;addDays(20);    // 1403/06/03
$base-&gt;copy()-&gt;subDays(14);    // 1403/04/31
$base-&gt;copy()-&gt;addWeek();      // 1403/05/21
$base-&gt;copy()-&gt;addMonth();     // 1403/06/14
$base-&gt;copy()-&gt;addMonths(10);  // 1404/03/14 (سرریز سال)
$base-&gt;copy()-&gt;subMonths(6);   // 1402/11/14
$base-&gt;copy()-&gt;addYear();      // 1404/05/14
Jalali::create(1403, 12, 30)-&gt;addYear();   // 1404/12/29 (1404 کبیسه نیست)
$base-&gt;copy()-&gt;addHours(14); -&gt;addMinutes(90); -&gt;subSeconds(30);
$base-&gt;copy()-&gt;startOfDay(); -&gt;endOfDay();</code></pre>
</div>
<p>ماه/سال شمسی‌آگاه‌اند (روز به آخرین روز معتبر ماه مقصد محدود می‌شود)؛ سایر واحدها به Carbon. تنظیم‌کننده‌ها: <code>setTime(14,30,0)</code>, <code>setDateJalali(1404,1,1)</code>.</p>
<h3 id="sec-abolframe-dataprovider-deletedependency-jalali-21" class="scroll-mt-header">C.6 تایم‌زون (ذخیره‌سازی و نمایش)</h3>
<p><code>config/jalali.php</code>:</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&#039;timezone&#039; =&gt; &#039;Asia/Tehran&#039;,   // پیش‌فرض ساخت
&#039;storage&#039;  =&gt; &#039;UTC&#039;,           // آنچه در DB نوشته می‌شود
&#039;display&#039;  =&gt; &#039;Asia/Tehran&#039;,   // نمایش به کاربر</code></pre>
</div>
<p>تنظیم پویا (حتی خارج از لاراول): <code>Jalali::setDefaultTimezone()</code>, <code>setStorageTimezone()</code>, <code>setDisplayTimezone()</code> و خواندن <code>defaultTimezone()/storageTimezone()/displayTimezone()</code>.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$d = Jalali::createGregorian(2024, 3, 20, 10, 0, 0, &#039;Asia/Tehran&#039;); // 10:00 تهران
$d-&gt;toStorage();   // Carbon 2024-03-20 06:30:00 (UTC) ← برای DB
$d-&gt;toDisplay();   // همان لحظه در تایم‌زون نمایش
$d-&gt;setTimezone(&#039;UTC&#039;);  // alias: -&gt;timezone(&#039;UTC&#039;)
$d-&gt;getTimezone();</code></pre>
</div>
<h3 id="sec-abolframe-dataprovider-deletedependency-jalali-22" class="scroll-mt-header">C.7 Eloquent Cast</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>use MyLaravelCore\\Casts\\JalaliDate;

protected function casts(): array
{
    return [
        &#039;published_at&#039; =&gt; JalaliDate::class,           // فرمت پیش‌فرض Y-m-d H:i:s
        &#039;birth_date&#039;   =&gt; JalaliDate::class . &#039;:Y-m-d&#039;,
    ];
}</code></pre>
</div>
<ul><li>خواندن: مقدار در storage تفسیر، به display منتقل و شیء Jalali برگردانده می‌شود.</li><li>نوشتن: تبدیل به storage؛ پس هر مقداری (<code>now()</code>, <code>jalali()</code>, Carbon, رشته شمسی) درست ذخیره می‌شود.</li></ul>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$model-&gt;published_at = jalali();  $model-&gt;save();
$model-&gt;published_at-&gt;formatDatetime();</code></pre>
</div>
<h3 id="sec-abolframe-dataprovider-deletedependency-jalali-23" class="scroll-mt-header">C.8 مقایسه، اختلاف، اعتبار</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$a-&gt;eq($b); ne; gt; gte; lt; lte;
jalali(&#039;1403/01/05&#039;)-&gt;between($a, $b);
jalali(&#039;1400/01/01&#039;)-&gt;isPast(); isFuture(); isToday();
$a-&gt;isSaturday(); -&gt;isFriday();
$a-&gt;diffDays($b); diffHours; diffMinutes; diffSeconds;
jalali()-&gt;subDays(3)-&gt;diffForHumans();   // 3 روز پیش
Jalali::isValidDate(1403, 5, 14);   // true
Jalali::isValidDate(1402, 12, 30);  // false (1402 کبیسه نیست)
jalali(&#039;1403/05/14&#039;)-&gt;isLeapYear(); -&gt;daysInMonth();</code></pre>
</div>
<p>مقایسه‌ها Jalali، Carbon یا رشته شمسی را می‌پذیرند.</p>
<h3 id="sec-abolframe-dataprovider-deletedependency-jalali-24" class="scroll-mt-header">C.9 getterها و استثنا</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$date-&gt;year(); month(); day(); hour(); minute(); second();
$date-&gt;year;   // magic property</code></pre>
</div>
<p><code>InvalidJalaliDateException</code>: تاریخ نامعتبر، ماه خارج از ۱–۱۲، فرمت ناشناخته.</p>
<h3 id="sec-abolframe-dataprovider-deletedependency-jalali-25" class="scroll-mt-header">C.10 Validation Rules</h3>
<p><code>jalali_date</code>, <code>jalali_datetime</code> و مقایسه‌ای‌ها — جزئیات در فایل Validation.</p>
        `
    },
    {
        id: "abolframe-validation",
        title: "۵. اعتبارسنجی، جلالی و مکانی (Geo)",
        icon: "fa-shield-halved",
        category: "مستندات جامع ابول فریم (AbolFrame)",
        content: `
<h1>۵. Validation: Ruleها، تاریخ جلالی، مکانی و FormValidation — توضیح کامل</h1>
<div class="toc-quick-jump-card my-4 p-3 rounded-3 border bg-body-tertiary"><div class="d-flex align-items-center justify-content-between mb-2"><strong class="text-primary small"><i class="fa fa-compass ms-1"></i> فهرست سریع آیتم‌ها، متدها و کامپوننت‌های این بخش (18 مورد):</strong></div><div class="d-flex flex-wrap gap-2"><a href="#sec-abolframe-validation-1" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش A — Ruleهای متمرکز Core (MyLaravelCore\\Rules)</a><a href="#sec-abolframe-validation-2" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.1 قوانین رشته‌ای / قالب</a><a href="#sec-abolframe-validation-3" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.2 قوانین اندازه / نرمال‌سازی</a><a href="#sec-abolframe-validation-4" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش B — قوانین تاریخ جلالی</a><a href="#sec-abolframe-validation-5" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش C — قوانین مکانی (Geospatial)</a><a href="#sec-abolframe-validation-6" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">C.1 اعتبارسنجی هندسه بیرون از فرم</a><a href="#sec-abolframe-validation-7" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">C.2 KML / KMZ</a><a href="#sec-abolframe-validation-8" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">C.3 Ruleهای دامنه‌ای (داخلی)</a><a href="#sec-abolframe-validation-9" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش D — FormValidation (سمت مرورگر با همان rules)</a><a href="#sec-abolframe-validation-10" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">D.1 force_remote</a><a href="#sec-abolframe-validation-11" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">D.2 no_form_validation</a><a href="#sec-abolframe-validation-12" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">D.3 disable_validation_cache</a><a href="#sec-abolframe-validation-13" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">D.4 چیزهایی که معمولاً دستی استفاده نمی‌شوند</a><a href="#sec-abolframe-validation-14" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">D.5 تصمیم‌گیری برای هر فیلد</a><a href="#sec-abolframe-validation-15" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">D.6 نمونه کامل</a><a href="#sec-abolframe-validation-16" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">D.7 اتصال در Blade</a><a href="#sec-abolframe-validation-17" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">D.8 کانفیگ سراسری config/AbolFrame-form-validation.php</a><a href="#sec-abolframe-validation-18" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش E — قوانین FormRequest در پروژه</a></div></div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-validation-1" class="scroll-mt-header">بخش A — Ruleهای متمرکز Core (<code>MyLaravelCore\\Rules</code>)</h2>
<p>برای جلوگیری از پراکندگی، همه قوانین اعتبارسنجی مشترک در یک زیرساخت متمرکز تعریف شده‌اند. این‌ها کلاس‌های استاندارد لاراول (<code>ValidationRule</code>) هستند و مستقیم در FormRequest به‌کار می‌روند:</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>use MyLaravelCore\\Rules\\CodeRule;

public function rules(): array
{
    return [&#039;code&#039; =&gt; [&#039;required&#039;, &#039;string&#039;, new CodeRule()]];
}</code></pre>
</div>
<p><strong>پیام‌ها:</strong> پیام‌های پیش‌فرض فارسی همراه rule ثبت می‌شود؛ <code>:attribute</code> خودکار با نام فیلد جایگزین می‌شود و می‌توانید نام نمایشی را در <code>attributes()</code> FormRequest بدهید.</p>
<h3 id="sec-abolframe-validation-2" class="scroll-mt-header">A.1 قوانین رشته‌ای / قالب</h3>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>Rule</th><th>مجاز</th><th>الگو</th><th>پیام</th></tr></thead><tbody><tr><td><code>CodeRule</code></td><td>اعداد، حروف لاتین، <code>-</code>، <code>_</code> (مطابق قواعد پنل برای کد)</td><td><code>^[-a-zA-Z0-9_]+$</code></td><td>«:attribute وارد شده باید تنها شامل اعداد، حروف لاتین، خط تیره (-) و زیرخط (_) باشد.»</td></tr><tr><td><code>SlugRule</code></td><td>مانند <code>CodeRule</code> برای اسلاگ</td><td><code>^[-a-zA-Z0-9_]+$</code></td><td>همان پیام بالا</td></tr><tr><td><code>StyleRule</code></td><td>مانند بالا ولی <strong>فاصله هم مجاز</strong></td><td><code>^[-a-zA-Z0-9_ ]+$</code></td><td>همان پیام</td></tr><tr><td><code>PersianSlugRule</code></td><td>اعداد، لاتین، <strong>فارسی</strong>، <code>-</code>، <code>_</code> (مقالات/محتوا که اسلاگ فارسی لازم دارد)</td><td>—</td><td>«...شامل اعداد، حروف لاتین، حروف فارسی، خط تیره (-) و زیرخط (_)...»</td></tr><tr><td><code>PersianNameRule</code></td><td><strong>فقط حروف فارسی و فاصله</strong> (عنوان، نام؛ مگر در تسک مشخص شده باشد کاراکتر خاص/لاتین مجاز است)</td><td>—</td><td>«:attribute وارد شده باید تنها شامل حروف فارسی و فاصله باشد.»</td></tr><tr><td><code>AddressStringRule</code></td><td>آدرس نباید فقط عدد باشد (مثلاً «7» نامعتبر)</td><td>—</td><td>«:attribute نمی‌تواند فقط شامل عدد باشد.»</td></tr><tr><td><code>UrlRule</code></td><td>URL معتبر (با یا بدون <code>http(s)://</code>)</td><td>—</td><td>—</td></tr></tbody></table></div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&#039;code&#039;    =&gt; [&#039;required&#039;, &#039;string&#039;, new CodeRule()],
&#039;slug&#039;    =&gt; [&#039;required&#039;, &#039;string&#039;, new SlugRule()],
&#039;style&#039;   =&gt; [&#039;nullable&#039;, &#039;string&#039;, new StyleRule()],
&#039;slug&#039;    =&gt; [&#039;required&#039;, &#039;string&#039;, new PersianSlugRule()],
&#039;title&#039;   =&gt; [&#039;required&#039;, &#039;string&#039;, new PersianNameRule()],
&#039;address&#039; =&gt; [&#039;required&#039;, &#039;string&#039;, new AddressStringRule()],
&#039;website&#039; =&gt; [&#039;nullable&#039;, &#039;string&#039;, new UrlRule()],</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>تناقض با قانون مصوب پروژه:</strong> نام/عنوان اطلاعات پایه = فارسی + فاصله + <code>()</code> + <code>-</code> + <code>_</code> + اعداد، اما <code>PersianNameRule</code> فقط فارسی+فاصله. نیازمند Rule اختصاصی.</div></div>
<h3 id="sec-abolframe-validation-3" class="scroll-mt-header">A.2 قوانین اندازه / نرمال‌سازی</h3>
<p><strong><code>NumberSeparatorRule(int|float $max, bool $isString = false)</code></strong> — سقف مقدار را می‌سنجد و در پیام خطا سقف را با جداکننده هزارگان نشان می‌دهد؛ برای اعداد بزرگ (مثل اندازه فایل) که در فرانت با جداکننده وارد می‌شوند.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&#039;max_size&#039; =&gt; [&#039;required&#039;, &#039;numeric&#039;, new NumberSeparatorRule(max: 999999999)],
&#039;code&#039;     =&gt; [&#039;required&#039;, &#039;string&#039;, new NumberSeparatorRule(max: 32, isString: true)],</code></pre>
</div>
<p><code>isString=false</code> ⇒ مقدار عددی با max؛ <code>isString=true</code> ⇒ طول رشته با max.</p>
<p><strong><code>NormalizedStringRule(int|float $max, bool $isEditor = false)</code></strong> — به‌دلیل تفاوت فرمت داده textarea و editor (تگ HTML، <code>&amp;nbsp;</code>، کاراکتر نامرئی، پایان‌خط)، پیش از بررسی حداکثر طول، مقدار نرمال‌سازی و پاک‌سازی می‌شود تا شمارش کاراکتر بین کامپوننت و FormRequest یکسان باشد. پیام: «فیلد :attribute نباید بزرگ‌تر از :max باشد.»</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&#039;body&#039;    =&gt; [&#039;required&#039;, &#039;string&#039;, new NormalizedStringRule(max: 65000)],
&#039;content&#039; =&gt; [&#039;required&#039;, &#039;string&#039;, new NormalizedStringRule(max: 65000, isEditor: true)], // حذف شکست خطوط داخلی هنگام شمارش</code></pre>
</div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-validation-4" class="scroll-mt-header">بخش B — قوانین تاریخ جلالی</h2>
<p>پکیج Jalali مجموعه‌ای از قوانین تاریخ/زمان شمسی را روی Validator لاراول ثبت می‌کند (بدون وابستگی به verta).</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$request-&gt;validate([
    &#039;start_date&#039; =&gt; &#039;jalali_date:Y/m/d&#039;,
    &#039;expire_at&#039;  =&gt; &#039;jalali_datetime_after:1403/01/01 00:00:00,Y/m/d H:i:s&#039;,
]);</code></pre>
</div>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>قانون</th><th>آرگومان‌ها</th><th>توضیح</th></tr></thead><tbody><tr><td><code>jalali_date</code></td><td><code>format?</code></td><td>تاریخ شمسی معتبر</td></tr><tr><td><code>jalali_datetime</code></td><td><code>format?</code></td><td>تاریخ‌وزمان شمسی معتبر</td></tr><tr><td><code>jalali_date_equal</code> / <code>_not_equal</code></td><td><code>date,format?</code></td><td>برابر / نامساوی</td></tr><tr><td><code>jalali_date_after</code> / <code>_after_equal</code></td><td><code>date,format?</code></td><td>بعد از / بعد یا برابر</td></tr><tr><td><code>jalali_date_before</code> / <code>_before_equal</code></td><td><code>date,format?</code></td><td>قبل از / قبل یا برابر</td></tr><tr><td><code>jalali_datetime_equal</code>, <code>_not_equal</code>, <code>_after</code>, <code>_after_equal</code>, <code>_before</code>, <code>_before_equal</code></td><td><code>datetime,format?</code></td><td>مانند بالا در سطح تاریخ‌وزمان</td></tr></tbody></table></div>
<p>نکته‌ها:</p>
<ul><li><code>format</code> اختیاری؛ پیش‌فرض <code>Y-m-d</code>.</li><li>جداکننده‌های فرمت باید دقیقاً مطابق ورودی باشند: <code>jalali_date:Y.m.d</code> روی <code>1403-01-01</code> رد می‌شود.</li><li>بخش زمان اختیاری؛ ورودی فقط‌تاریخ در برابر فرمت تاریخ‌وزمان هم معتبر است.</li><li>در قوانین مقایسه، آرگومان‌ها <code>مقدارِ مقایسه,format</code> هستند.</li><li>در پیام‌ها <code>:date</code> با ارقام فارسی نمایش داده می‌شود.</li></ul>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>validator([&#039;start_date&#039; =&gt; &#039;1403/05/14&#039;], [&#039;start_date&#039; =&gt; &#039;jalali_date_after:1403/01/01,Y/m/d&#039;])-&gt;passes(); // true</code></pre>
</div>
<p>بازنویسی پیام در <code>lang/fa/validation.php</code>:</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&#039;jalali_date&#039;       =&gt; &#039;:attribute معتبر نمی باشد.&#039;,
&#039;jalali_date_equal&#039; =&gt; &#039;:attribute برابر :date نمی باشد.&#039;,
&#039;jalali_date_after&#039; =&gt; &#039;:attribute باید بعد از :date باشد.&#039;,</code></pre>
</div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-validation-5" class="scroll-mt-header">بخش C — قوانین مکانی (Geospatial)</h2>
<p>عمومی‌اند؛ هم در پنل و هم API.</p>
<p><strong>فرمت مختصات:</strong> در <code>ValidPoint</code>, <code>ValidPolygon</code>, <code>ValidMultiPolygon</code>, <code>PointWithinBoundary</code> به‌صورت latitude/longitude (یا رشته <code>&quot;lat,lng&quot;</code>)؛ اما <code>ValidGeoJson</code> طبق استاندارد GeoJSON <strong><code>[lng, lat]</code></strong>.</p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>Rule</th><th>ورودی / قواعد</th></tr></thead><tbody><tr><td><code>ValidPoint</code></td><td>آرایه <code>[&#039;latitude&#039;=&gt;..,&#039;longitude&#039;=&gt;..]</code> یا <code>&quot;35.6892,51.3890&quot;</code>؛ latitude در -90..90، longitude در -180..180. پیام‌ها انگلیسی.</td></tr><tr><td><code>ValidPolygon(int $minPoints = 3)</code></td><td>آرایه نقاط؛ حداقل <code>minPoints</code> نقطه، هر نقطه معتبر، حداقل <code>minPoints</code> نقطه <strong>متمایز</strong> (منحط رد می‌شود؛ نقطه بستن حلقه شمرده نمی‌شود). ⚠️ بسته بودن و عدم تقاطع را نمی‌سنجد.</td></tr><tr><td><code>ValidMultiPolygon(int $minPoints = 3)</code></td><td>حداقل یک polygon و هر polygon معتبر.</td></tr><tr><td><code>ValidGeoJson(?string $expectedType = null)</code></td><td>آرایه یا JSON با <code>type</code> و <code>coordinates</code>؛ typeها: <code>Point</code>, <code>Polygon</code>, <code>MultiPolygon</code>؛ Point یک position <code>[lng,lat]</code>؛ Polygon آرایه ring (هر ring حداقل ۴ position). <code>expectedType</code> محدود به یک نوع.</td></tr><tr><td><code>ValidUtmPoint</code></td><td><code>[&#039;x&#039;,&#039;y&#039;,&#039;z&#039;]</code> (<code>z</code> یا <code>zone</code> اختیاری) یا <code>&quot;x,y&quot;</code> / <code>&quot;x,y,z&quot;</code>؛ x/y الزامی و عددی؛ zone عدد صحیح 1..60.</td></tr><tr><td><code>PointWithinBoundary(?array $boundary = null)</code></td><td>نقطه درون چندضلعی؛ boundary آرایه نقاط (حلقه باز/بسته)؛ اگر ندهید از <code>AbolFrame-panel-kit.components.map.boundary</code>؛ اگر boundary معتبر (≥۳ نقطه) نباشد هیچ محدودیتی اعمال نمی‌شود؛ الگوریتم ray-casting.</td></tr><tr><td><code>ValidGeometry(int $minPoints = 3, ?float $minArea = null, ?float $maxArea = null)</code></td><td>اعتبارسنجی کامل محدوده رسم‌شده: علاوه بر نقاط، <strong>بسته بودن حلقه و عدم تقاطع اضلاع</strong>؛ مساحت m².</td></tr></tbody></table></div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&#039;location&#039; =&gt; [&#039;required&#039;, new ValidPoint()],
&#039;area&#039;     =&gt; [&#039;required&#039;, &#039;array&#039;, new ValidPolygon()],
&#039;coverage&#039; =&gt; [&#039;required&#039;, &#039;array&#039;, new ValidMultiPolygon()],
&#039;geometry&#039; =&gt; [&#039;required&#039;, new ValidGeoJson(expectedType: &#039;Polygon&#039;)],
&#039;utm&#039;      =&gt; [&#039;required&#039;, new ValidUtmPoint()],
&#039;location&#039; =&gt; [&#039;required&#039;, new ValidPoint(), new PointWithinBoundary()],
&#039;area&#039;     =&gt; [&#039;required&#039;, &#039;array&#039;, new ValidGeometry(minArea: 100, maxArea: 5_000_000)],</code></pre>
</div>
<p><code>ValidGeometry</code> فقط یک پوسته است؛ منطق در <code>GeometryValidator</code> است تا فرم، API و ایمپورت یک شکل را به یک دلیل رد کنند.</p>
<h3 id="sec-abolframe-validation-6" class="scroll-mt-header">C.1 اعتبارسنجی هندسه بیرون از فرم</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>use MyLaravelCore\\Support\\Geo\\GeometryValidator;
$result = GeometryValidator::default()-&gt;validate($points);
if (! $result-&gt;isValid()) { return $result-&gt;toArray(); }</code></pre>
</div>
<p>هر نقطه می‌تواند آرایه lat/lng، رشته <code>&quot;lat,lng&quot;</code>، <code>LatLongPoint</code> یا <code>Regionalization\\Geometry\\Point</code> باشد (قبل از checkها نرمال می‌شوند). خروجی استاندارد:</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">JSON</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>{ &quot;valid&quot;: false, &quot;errors&quot;: [ { &quot;code&quot;: &quot;polygon.self_intersects&quot;,
  &quot;message&quot;: &quot;اضلاع محدوده یکدیگر را قطع می‌کنند (ضلع 1 و ضلع 3).&quot;, &quot;context&quot;: { &quot;edges&quot;: [0, 2] } } ] }</code></pre>
</div>
<p><code>code</code> برای شاخه‌زدن برنامه، <code>message</code> برای کاربر، <code>context</code> آنچه check اندازه گرفته.</p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>Check</th><th>می‌سنجد</th><th>کد خطا</th></tr></thead><tbody><tr><td><code>CoordinatesCheck</code></td><td>عددی/متناهی و در بازه</td><td><code>point.malformed</code>, <code>point.latitude_out_of_range</code>, <code>point.longitude_out_of_range</code></td></tr><tr><td><code>MinimumPointsCheck</code></td><td>حداقل نقاط متمایز</td><td><code>polygon.not_enough_points</code></td></tr><tr><td><code>ContiguousEdgesCheck</code></td><td>نقطه تکراری پشت‌سرهم</td><td><code>polygon.repeated_point</code></td></tr><tr><td><code>SimpleRingCheck</code></td><td>عدم تقاطع اضلاع</td><td><code>polygon.self_intersects</code></td></tr><tr><td><code>ClosedRingCheck</code></td><td>یکی بودن نقطه اول و آخر</td><td><code>polygon.not_closed</code></td></tr><tr><td><code>AreaRangeCheck</code></td><td>حداقل/حداکثر مساحت (m²)</td><td><code>polygon.area_too_small</code>, <code>polygon.area_too_large</code></td></tr></tbody></table></div>
<p><code>default()</code> پنج مورد اول را اجرا می‌کند؛ مساحت جدا اضافه می‌شود:</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>GeometryValidator::default()-&gt;with(new AreaRangeCheck(minimumSquareMeters: 100))-&gt;validate($points);</code></pre>
</div>
<p><strong>همه خطاها گزارش می‌شوند</strong> (یک رفت‌وبرگشت). اگر ساختار یک نقطه خوانا نباشد همان‌جا متوقف می‌شود.</p>
<p><strong>افزودن check جدید:</strong></p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>final class ContainedWithinCheck implements GeometryCheck
{
    public function check(array $points): GeometryValidationResult { /* ... */ }
}
GeometryValidator::default()-&gt;with(new ContainedWithinCheck())-&gt;validate($points);</code></pre>
</div>
<h3 id="sec-abolframe-validation-7" class="scroll-mt-header">C.2 KML / KMZ</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$result = KmlValidator::default()-&gt;validateFile($path);</code></pre>
</div>
<p>همان checkها روی هر حلقه فایل؛ KMZ زیپ حاوی KML است. خطاهای ویژه فایل: <code>file.unreadable</code> (باز نمی‌شود/XML نامعتبر)، <code>file.no_geometry</code>. شماره حلقه در <code>context.ring</code>. مختصات KML به‌صورت <code>longitude,latitude[,altitude]</code> است و <code>KmlReader</code> تبدیل می‌کند.</p>
<h3 id="sec-abolframe-validation-8" class="scroll-mt-header">C.3 Ruleهای دامنه‌ای (داخلی)</h3>
<p><code>DisallowDeletedOnly</code> (جلوگیری از ماندن فقط رکوردهای حذف‌شده در مدیریت فایل)، <code>RoleDateOverlapRule</code> (همپوشانی تاریخ نقش‌ها)، <code>SuperRoleConflictRule</code>، <code>InvalidCodeRule</code>، <code>MultiAuthFieldRule</code> (ورود/احراز هویت).</p>
<div class="callout info"><i class="fa fa-circle-info callout-icon"></i><div>اگر rule رشته‌ای جدید در چند جا تکرار می‌شود در <code>MyLaravelCore\\Rules</code> (مکان متمرکز) تعریف شود.</div></div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-validation-9" class="scroll-mt-header">بخش D — FormValidation (سمت مرورگر با همان rules)</h2>
<p><strong>قاعده اصلی:</strong> rules را در FormRequest نگه دارید؛ همان‌ها مبنای validation سمت فرم‌اند و در submit نهایی لاراول دوباره اجرا می‌کند.</p>
<h3 id="sec-abolframe-validation-10" class="scroll-mt-header">D.1 <code>force_remote</code></h3>
<p>AbolFrame هر ruleای که در JS قابل بررسی باشد همان‌جا بررسی می‌کند. بعضی ruleها باید از سرور بررسی شوند (custom، <code>exists</code>، <code>unique</code>) — این‌ها <strong>خودشان remote</strong> می‌شوند.</p>
<p><code>force_remote</code> برای وقتی است که یک rule <strong>ساده</strong> (<code>required</code>, <code>date</code>, <code>after</code>, <code>min</code>, <code>max</code>) حتماً از backend بررسی شود:</p>
<ul><li>نتیجه به اطلاعاتی وابسته است که فقط سرور می‌داند</li><li>نتیجه به مقدار فیلدهای دیگر وابسته است</li><li>می‌خواهید Laravel معیار نهایی باشد نه JS</li></ul>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&#039;started_at&#039; =&gt; [&#039;required&#039;, &#039;date&#039;, &#039;force_remote&#039;, &#039;after_or_equal:today&#039;],
&#039;expired_at&#039; =&gt; [&#039;nullable&#039;, &#039;date&#039;, &#039;force_remote&#039;, &#039;after:started_at&#039;],</code></pre>
</div>
<p><code>force_remote</code> خودش rule بیزینسی نیست؛ فقط می‌گوید validation این فیلد از backend پرسیده شود.</p>
<h3 id="sec-abolframe-validation-11" class="scroll-mt-header">D.2 <code>no_form_validation</code></h3>
<p>فیلد را در validation <strong>سمت فرم</strong> نادیده می‌گیرد (validation سمت سرور برقرار می‌ماند). برای کامپوننت‌های خیلی خاص/داینامیک یا وقتی بررسی فقط باید در submit نهایی باشد.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&#039;description&#039; =&gt; [&#039;nullable&#039;, &#039;string&#039;, &#039;max:5000&#039;, &#039;no_form_validation&#039;],</code></pre>
</div>
<p>(<code>no_validate</code> API اصلی نیست.)</p>
<h3 id="sec-abolframe-validation-12" class="scroll-mt-header">D.3 <code>disable_validation_cache</code></h3>
<p>رفتار پیش‌فرض: اگر فیلدی با مقدار مشخص یک‌بار validate شد، دفعه بعد با همان مقدار دوباره درخواست/validation اجرا نمی‌شود. این rule cache نتیجه را برای همان فیلد غیرفعال می‌کند — برای فیلدهای وابسته/داینامیک.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&#039;expired_at&#039; =&gt; [&#039;nullable&#039;, &#039;force_remote&#039;, &#039;disable_validation_cache&#039;, &#039;after:started_at&#039;],</code></pre>
</div>
<p>برای inputهای ساده و مستقل لازم نیست.</p>
<h3 id="sec-abolframe-validation-13" class="scroll-mt-header">D.4 چیزهایی که معمولاً دستی استفاده نمی‌شوند</h3>
<p><code>ignore-validation</code>، payloadهای داخلی FormValidation، fieldهای متادیتای داخلی request.</p>
<h3 id="sec-abolframe-validation-14" class="scroll-mt-header">D.5 تصمیم‌گیری برای هر فیلد</h3>
<ol><li>rule عادی ⇒ فقط ruleهای Laravel.</li><li>custom/exists/unique ⇒ نیاز به افزودن چیزی نیست.</li><li>rule ساده باید از backend ⇒ <code>force_remote</code>.</li><li>بدون validation سمت فرم ⇒ <code>no_form_validation</code>.</li><li>نتیجه نباید cache شود ⇒ <code>disable_validation_cache</code>.</li></ol>
<h3 id="sec-abolframe-validation-15" class="scroll-mt-header">D.6 نمونه کامل</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>public function rules(): array
{
    return [
        &#039;role_id&#039;     =&gt; [&#039;required&#039;, Rule::exists(Role::class, &#039;id&#039;)],
        &#039;started_at&#039;  =&gt; [&#039;required&#039;, &#039;date&#039;, &#039;force_remote&#039;, &#039;after_or_equal:today&#039;],
        &#039;expired_at&#039;  =&gt; [&#039;nullable&#039;, &#039;date&#039;, &#039;force_remote&#039;, &#039;disable_validation_cache&#039;, &#039;after:started_at&#039;],
        &#039;role_period&#039; =&gt; [&#039;required&#039;, new RoleDateOverlapRule($this-&gt;user)],
        &#039;note&#039;        =&gt; [&#039;nullable&#039;, &#039;string&#039;, &#039;max:1000&#039;, &#039;no_form_validation&#039;],
    ];
}</code></pre>
</div>
<h3 id="sec-abolframe-validation-16" class="scroll-mt-header">D.7 اتصال در Blade</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>@push(&#039;scripts&#039;)
    @canAccess(&#039;admin.basic.banks.store&#039;)
        {!! FormValidator::formRequest(Modules\\Bank\\Http\\Requests\\StoreBankRequest::class, &#039;#create-bank&#039;) !!}
    @endcanAccess
@endpush</code></pre>
</div>
<p><code>#create-bank</code> باید دقیقاً <code>id</code> فرم و کلاس دقیقاً نام FormRequest باشد. (در edit باید permission <code>...update</code> باشد نه <code>...store</code>.) برای rules پویا: <code>reinitializeFormValidation()</code> (فایل JS).</p>
<h3 id="sec-abolframe-validation-17" class="scroll-mt-header">D.8 کانفیگ سراسری <code>config/AbolFrame-form-validation.php</code></h3>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>کلید</th><th>پیش‌فرض</th><th>توضیح</th></tr></thead><tbody><tr><td><code>form_selector</code></td><td><code>&#039;form&#039;</code></td><td>selector فرم‌هایی که validation روی آن‌ها اعمال شود</td></tr><tr><td><code>focus_on_error</code></td><td><code>true</code></td><td>بعد از خطا focus و scroll به اولین فیلد نامعتبر</td></tr><tr><td><code>disable_remote_validation</code></td><td><code>false</code></td><td>اگر <code>true</code> ruleهای <code>unique/exists/DB</code> سمت سرور بررسی نشوند (برای مشکل شبکه/کندی موقت)</td></tr><tr><td><code>ignore</code></td><td><code>[&#039;:hidden&#039;, &quot;[contenteditable=&#039;true&#039;]&quot;]</code></td><td>selector عناصر نادیده‌گرفته‌شده؛ مستقیم به گزینه <code>ignore</code> در jQuery Validate</td></tr></tbody></table></div>
<p>نکات: برای فرم‌های dynamic <code>ignore</code> و <code>form_selector</code> را با هم بررسی کنید؛ اگر روی بعضی componentهای hidden/custom validation اجرا نمی‌شود ابتدا <code>ignore</code> را ببینید.</p>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-validation-18" class="scroll-mt-header">بخش E — قوانین FormRequest در پروژه</h2>
<ul><li>هر action مهم یک FormRequest مستقل (<code>UserStoreRequest</code>, <code>UserUpdateRequest</code>, <code>UserChangeStatusRequest</code>)، نه یک Request عمومی.</li><li>authorization داخل FormRequest؛ داده sanitize/normalize قبل از ذخیره؛ <code>$request-&gt;all()</code> برای ذخیره ممنوع؛ فقط <code>validated()</code>/DTO.</li><li><code>nullable</code> فقط با دلیل: واقعاً اختیاری، تکمیل در flow بعدی، سازگاری با داده legacy؛ ❌ برای دور زدن validation.</li><li>فایل: نوع (MIME)، حداکثر اندازه، حداکثر تعداد، محل ذخیره، دسترسی مشاهده/دانلود.</li><li>Item Collector: <code>itemCollectorRules()</code> (فایل کامپوننت‌ها).</li></ul>
        `
    },
    {
        id: "abolframe-modularity-routing-menu",
        title: "۶. ماژولار، Routing و منو",
        icon: "fa-sitemap",
        category: "مستندات جامع ابول فریم (AbolFrame)",
        content: `
<h1>۶. معماری ماژولار، لایه‌بندی، Routing و منو — توضیح کامل</h1>
<div class="toc-quick-jump-card my-4 p-3 rounded-3 border bg-body-tertiary"><div class="d-flex align-items-center justify-content-between mb-2"><strong class="text-primary small"><i class="fa fa-compass ms-1"></i> فهرست سریع آیتم‌ها، متدها و کامپوننت‌های این بخش (27 مورد):</strong></div><div class="d-flex flex-wrap gap-2"><a href="#sec-abolframe-modularity-routing-menu-1" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش A — Modularity (معماری ماژولار)</a><a href="#sec-abolframe-modularity-routing-menu-2" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.1 چرا ماژولار؟</a><a href="#sec-abolframe-modularity-routing-menu-3" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.2 ساختار داخلی ماژول (نسخه ۱۲)</a><a href="#sec-abolframe-modularity-routing-menu-4" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.3 Service Provider ماژول</a><a href="#sec-abolframe-modularity-routing-menu-5" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.4 فایل module.json</a><a href="#sec-abolframe-modularity-routing-menu-6" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.5 وضعیت ماژول‌ها</a><a href="#sec-abolframe-modularity-routing-menu-7" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.6 دستورات Artisan ماژول</a><a href="#sec-abolframe-modularity-routing-menu-8" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.7 Best Practices</a><a href="#sec-abolframe-modularity-routing-menu-9" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.8 اولویت بارگذاری و ساختار لایه‌ای (Layered Module Loading)</a><a href="#sec-abolframe-modularity-routing-menu-10" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش B — Route Property Collector</a><a href="#sec-abolframe-modularity-routing-menu-11" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.1 ذهنیت دو‌لایه (مهم‌ترین نکته)</a><a href="#sec-abolframe-modularity-routing-menu-12" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.2 قابلیت‌ها</a><a href="#sec-abolframe-modularity-routing-menu-13" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.3 ماکروهای Route</a><a href="#sec-abolframe-modularity-routing-menu-14" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.4 استفاده از Collector</a><a href="#sec-abolframe-modularity-routing-menu-15" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.5 کش</a><a href="#sec-abolframe-modularity-routing-menu-16" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.6 مثال کامل</a><a href="#sec-abolframe-modularity-routing-menu-17" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش C — آیتم‌های پویای سایدبار (appendDynamicRoutes)</a><a href="#sec-abolframe-modularity-routing-menu-18" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش D — منو: MenuGroup و MenuSubgroup</a><a href="#sec-abolframe-modularity-routing-menu-19" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">D.1 منو دقیقاً برای چیست؟</a><a href="#sec-abolframe-modularity-routing-menu-20" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">D.2 ⭐ قانون طلایی نام‌گذاری</a><a href="#sec-abolframe-modularity-routing-menu-21" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">D.3 کلاس‌های Builder</a><a href="#sec-abolframe-modularity-routing-menu-22" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">D.4 دو روش تعریف در Service Provider (مثلاً AppServiceProvider)</a><a href="#sec-abolframe-modularity-routing-menu-23" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">D.5 کاهش کد تکراری با parent</a><a href="#sec-abolframe-modularity-routing-menu-24" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">D.6 ویژگی‌ها</a><a href="#sec-abolframe-modularity-routing-menu-25" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">D.7 متدها</a><a href="#sec-abolframe-modularity-routing-menu-26" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش E — تنظیم route ماژول (RouteServiceProvider)</a><a href="#sec-abolframe-modularity-routing-menu-27" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش F — Route و Permission (راهنما)</a></div></div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-modularity-routing-menu-1" class="scroll-mt-header">بخش A — Modularity (معماری ماژولار)</h2>
<h3 id="sec-abolframe-modularity-routing-menu-2" class="scroll-mt-header">A.1 چرا ماژولار؟</h3>
<p>در پروژه‌های بزرگ این‌ها مهم‌اند: <strong>نگهداری آسان (Maintainability)</strong>، <strong>سازماندهی شفاف کد</strong>، <strong>قابلیت استفاده مجدد (Reusability)</strong>. زیرساخت AbolFrame بر پایه پکیج <code>nwidart/laravel-modules</code> <strong>نسخه ۱۲</strong> ساخته شده و به‌جای ساختار یکپارچه (Monolith)، پروژه را به مجموعه‌ای از ماژول‌های مستقل تقسیم می‌کند؛ هر ماژول مسئول یک قابلیت و قابل توسعه، تست و نگهداری جداگانه است.</p>
<p>مزایا: افزودن سریع‌تر قابلیت‌ها؛ تغییرات با کمترین اثر روی بخش‌های دیگر؛ کاهش پیچیدگی و دیباگ ساده‌تر؛ مقیاس‌پذیری و پایداری بلندمدت.</p>
<p>AbolFrame بر اساس <strong>Domain-Driven Design</strong> طراحی شده: به‌جای تقسیم کد بر اساس نوع فایل (Controllers/Models در پوشه‌های مرکزی)، بر اساس <strong>قابلیت/دامنه</strong> سازمان‌دهی می‌شود.</p>
<h3 id="sec-abolframe-modularity-routing-menu-3" class="scroll-mt-header">A.2 ساختار داخلی ماژول (نسخه ۱۲)</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">CODE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>Modules/
└── Bank/
    ├── app/                      # کدهای PHP
    │   ├── Http/Controllers/BankController.php
    │   └── Providers/{BankServiceProvider, EventServiceProvider, RouteServiceProvider}.php
    ├── composer.json             # autoload و وابستگی‌ها
    ├── config/config.php         # تنظیمات اختصاصی ماژول
    ├── database/{factories, migrations, seeders/BankDatabaseSeeder.php}
    ├── lang/fa/                  # ترجمه‌ها
    ├── module.json               # مانیفست ماژول
    ├── package.json              # وابستگی‌های فرانت
    ├── resources/{assets/{js/app.js, sass/app.scss}, views/{components/layouts/master.blade.php, index.blade.php}}
    ├── routes/{api.php, web.php}
    ├── tests/{Feature, Unit}
    └── vite.config.js</code></pre>
</div>
<p>در توسعه واقعی: Modelها در <code>app/Models</code>، Controllerها در <code>app/Http/Controllers</code>، Requestها در <code>app/Http/Requests</code>، Serviceها در <code>app/Services</code>، Generatorها در <code>app/Generators</code>، routeهای API نسخه‌دار در <code>routes/api/{VERSION}.php</code>.</p>
<h3 id="sec-abolframe-modularity-routing-menu-4" class="scroll-mt-header">A.3 Service Provider ماژول</h3>
<p>هر ماژول یک Service Provider دارد (مثلاً <code>BankServiceProvider</code>) که: مسیرها را ثبت می‌کند (<code>RouteServiceProvider</code>)، Migration/View/ترجمه را بارگذاری می‌کند، Config ماژول را با Config اصلی ادغام می‌کند، سرویس‌ها و Bindingها را در Container ثبت می‌کند.</p>
<p><strong>اخطار:</strong> متدهای غیرضروری را حذف یا کامنت کنید تا بارگذاری اضافی نشود.</p>
<h3 id="sec-abolframe-modularity-routing-menu-5" class="scroll-mt-header">A.4 فایل <code>module.json</code></h3>
<p>قلب ماژول؛ نام، alias، Service Providerها، وابستگی‌ها:</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">JSON</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>{
  &quot;name&quot;: &quot;Bank&quot;, &quot;alias&quot;: &quot;bank&quot;,
  &quot;description&quot;: &quot;Module for managing bank services.&quot;,
  &quot;keywords&quot;: [], &quot;priority&quot;: 1,
  &quot;providers&quot;: [&quot;Modules\\\\Bank\\\\Providers\\\\BankServiceProvider&quot;, &quot;Modules\\\\Bank\\\\Providers\\\\RouteServiceProvider&quot;],
  &quot;aliases&quot;: {}, &quot;files&quot;: [], &quot;requires&quot;: []
}</code></pre>
</div>
<h3 id="sec-abolframe-modularity-routing-menu-6" class="scroll-mt-header">A.5 وضعیت ماژول‌ها</h3>
<p>فایل <code>module_statuses.json</code> در ریشه: <code>{&quot;Bank&quot;: true, &quot;User&quot;: true, &quot;Payment&quot;: false}</code>.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BASH</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>php artisan module:enable Bank
php artisan module:disable Bank
php artisan module:list</code></pre>
</div>
<h3 id="sec-abolframe-modularity-routing-menu-7" class="scroll-mt-header">A.6 دستورات Artisan ماژول</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BASH</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>php artisan module:make Blog
php artisan module:make-controller PostController Blog
php artisan module:make-model Post Blog</code></pre>
</div>
<div class="callout info"><i class="fa fa-circle-info callout-icon"></i><div>❌ <code>php artisan make:controller PostController</code> — فایل در محل درست ایجاد نمی‌شود. همیشه دستورهای مخصوص ماژول.</div></div>
<h3 id="sec-abolframe-modularity-routing-menu-8" class="scroll-mt-header">A.7 Best Practices</h3>
<ol><li><strong>هر قابلیت یک ماژول مستقل:</strong> <code>User</code>، <code>Bank</code>، <code>Payment</code>.</li><li><strong>Service Provider:</strong> ثبت سرویس‌ها، رویدادها، مسیرها و Config داخل Service Provider ماژول.</li><li><strong>Routeها در ماژول:</strong> وب در <code>routes/web.php</code>، API در <code>routes/api/{VERSION}.php</code>؛ با <code>RouteServiceProvider</code> بارگذاری شوند. ⚠️ <strong>هیچ مسیری در فایل‌های مرکزی لاراول (<code>routes/web.php</code> اصلی پروژه) ثبت نشود.</strong></li><li><strong>Translation (i18n):</strong> متن ثابت از <code>lang/fa/...</code>؛ هیچ متن ثابت (مثل پیام خطا) مستقیم در کد نباشد.</li><li><strong>قراردادهای لاراول:</strong> Model در <code>app/Models</code> ماژول، Controller در <code>app/Http/Controllers</code> ماژول.</li><li><strong>وابستگی‌ها در سطح ماژول:</strong> مثلاً <code>guzzlehttp/guzzle</code> در <code>composer.json</code> همان ماژول.</li><li><strong>ماژول کوچک:</strong> ماژول بیش از حد پیچیده را به چند ماژول کوچک‌تر بشکنید.</li><li><strong>Artisan مخصوص ماژول</strong> برای ایجاد فایل‌ها.</li></ol>
<h3 id="sec-abolframe-modularity-routing-menu-9" class="scroll-mt-header">A.8 اولویت بارگذاری و ساختار لایه‌ای (Layered Module Loading)</h3>
<p>ماژول‌ها نباید تصادفی بارگذاری شوند؛ برای جلوگیری از تداخل و وابستگی پیچیده و تکرار، ساختار لایه‌ای:</p>
<p><strong>Base Modules (پایه):</strong> کد مشترک و ابزار عمومی؛ به بقیه وابسته نیستند ولی همه تقریباً به آن‌ها نیاز دارند. مثال: <code>Core</code> (helper، middleware عمومی، exception handling)، <code>User</code> (مدل کاربر، احراز هویت پایه)، <code>Notification</code>، <code>FileManager</code>. اگر چند ماژول به قابلیتی مشترک نیاز دارند (آپلود، مدیریت کاربر) باید در یک Base Module جدا باشد — جلوی duplication و <strong>circular dependency</strong> را می‌گیرد.</p>
<p><strong>Feature Modules:</strong> یک Business Feature خاص؛ معمولاً وابسته به یک یا چند Base. مثال: <code>Bank</code>، <code>Payment</code>، <code>Order</code>.</p>
<p><strong>Integration Modules:</strong> ارتباط با سرویس‌های خارجی یا بین Feature Moduleها؛ در لایه آخر بارگذاری می‌شوند. مثال: <code>BankGateway</code>، <code>PaymentBridge</code>.</p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>Priority</th><th>Layer</th><th>توضیح</th></tr></thead><tbody><tr><td>0</td><td>Base</td><td>همیشه اول (Core, User, Shared)</td></tr><tr><td>1</td><td>Feature</td><td>قابلیت‌های اصلی (Bank, Order, Payment)</td></tr><tr><td>2</td><td>Integration</td><td>ارتباطات خارجی و وابسته به Featureها</td></tr></tbody></table></div>
<p>نمونه <code>module.json</code> ماژول پایه: <code>{&quot;name&quot;:&quot;Core&quot;,&quot;alias&quot;:&quot;core&quot;,&quot;priority&quot;:0,&quot;providers&quot;:[&quot;Modules\\\\Core\\\\Providers\\\\CoreServiceProvider&quot;]}</code>.</p>
<p><strong>مثال Base Module برای فایل:</strong> به‌جای تکرار منطق آپلود در <code>User</code> (عکس پروفایل)، <code>Bank</code> (مدارک) و <code>Product</code> (تصویر)، ماژول <code>FileManager</code> با <code>app/Services/FileUploader.php</code>، migration جدول فایل‌ها، <code>routes/api.php</code> و view آپلودر ساخته می‌شود؛ بقیه فقط از <code>FileUploader</code> استفاده می‌کنند.</p>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ مثال <code>BankController</code> مستند از <code>response()-&gt;json()</code> استفاده می‌کند؛ راهنمای رسمی raw <code>json()</code> را ممنوع می‌کند — الگو قرار ندهید.</div></div>
<p><strong>ماژول قابل‌انتقال:</strong></p>
<ul><li>استقلال کامل از پروژه اصلی (وابسته به <code>app/</code> یا مسیرهای اصلی نباشد؛ route/config/controller داخل ماژول).</li><li>منابع ایزوله: View/Translation در پوشه خود؛ با namespace ماژول (<code>view(&#039;bank::index&#039;)</code>، <code>__(&#039;bank::validation.name&#039;)</code>).</li><li>وابستگی‌ها در <code>composer.json</code> ماژول.</li></ul>
<p><strong>نکات حرفه‌ای:</strong> تکرار ممنوع (به Base منتقل شود)؛ Feature Moduleها به یکدیگر وابسته نباشند، فقط به Base؛ ماژول <code>Shared</code>/<code>Core</code> برای Helper/Trait/DTO مشترک.</p>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-modularity-routing-menu-10" class="scroll-mt-header">بخش B — Route Property Collector</h2>
<p>سیستمی برای جمع‌آوری و مدیریت <strong>متادیتای Route</strong>: عنوان صفحه، نمایش در سایدبار، آیکون، Badge، سطح دسترسی، روابط والد–فرزند — مستقیم در تعریف Route، و سپس استفاده ساختاریافته در پنل.</p>
<h3 id="sec-abolframe-modularity-routing-menu-11" class="scroll-mt-header">B.1 ذهنیت دو‌لایه (مهم‌ترین نکته)</h3>
<ol><li><strong>متادیتای هر Route:</strong> ماکروهایی مثل <code>-&gt;title()</code>, <code>-&gt;icon()</code>, <code>-&gt;showInSidebar()</code> روی تک‌تک Routeها.</li><li><strong>درخت خودکار:</strong> از روی <strong>نام (name)</strong> Routeها درخت «دسته ← زیردسته ← آیتم» ساخته می‌شود. نقطه <code>.</code> در نام = یک سطح؛ <code>admin.users.index</code> ⇒ دسته <code>admin.users</code> + آیتم <code>index</code>.</li></ol>
<h3 id="sec-abolframe-modularity-routing-menu-12" class="scroll-mt-header">B.2 قابلیت‌ها</h3>
<p>جمع‌آوری خودکار متادیتا؛ <strong>کش</strong> (اطلاعات Route و Breadcrumb)؛ <strong>منابع چندگانه:</strong> <code>local</code> یا <code>database</code>؛ <strong>Breadcrumb خودکار</strong> از نام Route و روابط والد–فرزند؛ <strong>آیتم‌های پویای سایدبار</strong> (بدون ثبت Route پویا).</p>
<h3 id="sec-abolframe-modularity-routing-menu-13" class="scroll-mt-header">B.3 ماکروهای Route</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>Route::get(&#039;/users&#039;, [UserController::class, &#039;index&#039;])
    -&gt;name(&#039;admin.users.index&#039;)
    -&gt;title(&#039;مدیریت کاربران&#039;)   // breadcrumb/sidebar
    -&gt;showInSidebar()
    -&gt;icon(&#039;fa-users&#039;)
    -&gt;badge(10, &#039;danger&#039;)        // یا -&gt;badge(fn () =&gt; User::count(), &#039;primary&#039;) ؛ null = نمایش داده نمی‌شود
    -&gt;permission(&#039;user.view&#039;)    // بررسی دسترسی هنگام استفاده
    -&gt;visibility(false)          // یا fn ($user) =&gt; $user-&gt;isAdmin()
    -&gt;sort(10)                   // کمتر = زودتر
    -&gt;parentRoute(&#039;admin.users.index&#039;)
    -&gt;appendRoutes([&#039;admin.users.create&#039;, &#039;admin.users.edit&#039;])
    -&gt;skipIndexing()             // اگر Source=database در نظر گرفته نمی‌شود
    -&gt;withoutPermission();       // همه کاربران دسترسی دارند (در کنترل دسترسی در نظر گرفته نمی‌شود)</code></pre>
</div>
<ul><li><code>-&gt;title()</code>: بهتر است <strong>کلید ترجمه</strong> باشد؛ لازم نیست <code>__()</code> بزنید، مستقیم کلید.</li><li><code>appendRoutes</code>: چند Route ثابت نام‌گذاری‌شده را به زیرمجموعه یک Route اصلی وصل می‌کند.</li><li><code>appendDynamicRoutes</code>: بخش C.</li></ul>
<p><strong>مرتب‌سازی روی MenuGroup/Subgroup:</strong></p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>MenuGroup::make()-&gt;name(&#039;admin.customer&#039;)-&gt;title(&#039;مشتریان&#039;)-&gt;sort(20)
    -&gt;subMenu([MenuSubgroup::make()-&gt;name(&#039;admin.customer.wallet&#039;)-&gt;title(&#039;کیف پول&#039;)-&gt;sort(5)]);</code></pre>
</div>
<h3 id="sec-abolframe-modularity-routing-menu-14" class="scroll-mt-header">B.4 استفاده از Collector</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$collector = routePropertyCollector();
$collector-&gt;getPageTitle();                       // route فعلی
$collector-&gt;getPageTitle(&#039;admin.users.index&#039;);    // خاص
getPageTitle(&#039;admin.users.index&#039;);                // helper
$routes = $collector-&gt;getRoutes();                // [&#039;users&#039;=&gt;[&#039;name&#039;,&#039;slug&#039;,&#039;permissions&#039;,&#039;subcategories&#039;]]
$breadcrumb = $collector-&gt;breadcrumb(&#039;admin.users.permissions.edit&#039;);
// [ {level:1,name,slug,visibility}, {level:2,...}, {level:3, show_in_sidebar:false,...} ]
$collector-&gt;onlySidebar()-&gt;getRoutes();
$collector-&gt;isChildOf(&#039;admin.users.permissions.edit&#039;, &#039;admin.users&#039;);
$collector-&gt;isParentOf(&#039;admin.users&#039;, &#039;admin.users.permissions.edit&#039;);</code></pre>
</div>
<p>Blade: <code>&lt;title&gt;@title&lt;/title&gt;</code>.</p>
<h3 id="sec-abolframe-modularity-routing-menu-15" class="scroll-mt-header">B.5 کش</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>routePropertyCollector()-&gt;forgetCachedTitles();
routePropertyCollector()-&gt;forgetCachedBreadcrumb();
$hasCache = routePropertyCollector()-&gt;hasCachedTitle(&#039;admin.users.index&#039;);</code></pre>
</div>
<ul><li>کش فقط با گزینه <code>should_cache_route</code> فعال.</li><li><code>customFilter</code> و <code>onlySidebar</code> با کش <strong>سازگار نیستند</strong>.</li><li>بعد از تغییر Routeهای ثابت کش پاک شود.</li></ul>
<h3 id="sec-abolframe-modularity-routing-menu-16" class="scroll-mt-header">B.6 مثال کامل</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>Route::prefix(&#039;admin&#039;)-&gt;name(&#039;admin.&#039;)-&gt;group(function () {
    Route::get(&#039;/&#039;, [HomeController::class, &#039;index&#039;])-&gt;name(&#039;index&#039;)-&gt;title(&#039;صفحه اصلی&#039;)-&gt;showInSidebar()-&gt;withoutPermission();

    Route::prefix(&#039;users&#039;)-&gt;name(&#039;users.&#039;)-&gt;group(function () {
        Route::get(&#039;/&#039;, [UserController::class, &#039;index&#039;])-&gt;name(&#039;index&#039;)-&gt;title(&#039;لیست کاربران&#039;)
            -&gt;showInSidebar()-&gt;icon(&#039;fa-users&#039;)-&gt;badge(fn () =&gt; User::count(), &#039;primary&#039;);
        Route::get(&#039;/create&#039;, [UserController::class, &#039;create&#039;])-&gt;name(&#039;create&#039;)
            -&gt;title(&#039;ایجاد کاربر جدید&#039;)-&gt;parentRoute(&#039;admin.users.index&#039;);
    });
});</code></pre>
</div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-modularity-routing-menu-17" class="scroll-mt-header">بخش C — آیتم‌های پویای سایدبار (<code>appendDynamicRoutes</code>)</h2>
<p>برای تب/آیتم‌هایی که از <strong>دیتابیس</strong> می‌آیند (مثل وضعیت‌های فعال کاربر) ولی مسیر HTTP ثابت است: Route را <strong>پارامتری</strong> تعریف کنید و فقط آیتم سایدبار را پویا بسازید.</p>
<p><strong>اشتباه رایج:</strong> ثبت <code>Route::get(&#039;status/&#039;.$code, ...)</code> داخل حلقه روی DB؛ در <strong>Octane / FrankenPHP</strong> <code>RouteCollection</code> در حافظه worker قفل می‌شود و بعد از فعال/غیرفعال‌شدن وضعیت، بدون reload worker سایدبار و تطبیق Route به‌روز نمی‌ماند.</p>
<p><strong>راه‌حل:</strong></p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>Route::get(&#039;/&#039;, [UserController::class, &#039;index&#039;])
    -&gt;name(&#039;admin.admins.management.index.index&#039;)
    -&gt;title(&#039;لیست کاربران&#039;)-&gt;visibility(false)-&gt;showInSidebar()
    -&gt;appendDynamicRoutes(fn () =&gt; getUserStatusSidebarItems());

Route::get(&#039;status/{status}&#039;, [UserController::class, &#039;indexByStatus&#039;])
    -&gt;name(&#039;admin.admins.management.index.status&#039;)
    -&gt;where(&#039;status&#039;, &#039;[A-Za-z0-9_-]+&#039;)
    -&gt;skipIndexing()
    -&gt;permission(&#039;admin.admins.management.index.index&#039;);</code></pre>
</div>
<p>Callback هنگام ساخت سایدبار اجرا می‌شود و آرایه‌ای از آیتم‌ها برمی‌گرداند؛ هر آیتم حداقل <code>slug</code>, <code>name</code>, <code>url</code> (و در صورت نیاز <code>badge</code>, <code>permission</code>).</p>
<p><strong>مثال سفارشی (وضعیت سفارش):</strong> حلقه روی <code>OrderStatus::available()</code> و ساخت <code>[&#039;slug&#039;=&gt;&#039;admin.orders.index.&#039;.$code,&#039;name&#039;=&gt;$status-&gt;name,&#039;url&#039;=&gt;route(&#039;admin.orders.byStatus&#039;,[&#039;status&#039;=&gt;$code]),&#039;permission&#039;=&gt;&#039;admin.orders.index&#039;]</code> + یک Route پارامتری.</p>
<p><strong>به‌روز شدن بعد از تغییر داده</strong> (create/update/delete وضعیت):</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>authorizer()-&gt;forgetSystemCache();</code></pre>
</div>
<p>کش سایدبار/عنوان/breadcrumb پاک می‌شود؛ درخواست بعد callback را دوباره اجرا می‌کند — بدون تغییر RouteCollection و بدون <code>octane:reload</code>.</p>
<p><strong>قرارداد نام‌گذاری (چند نوع کاربر):</strong> <code>{guard}.{userTypePlural}.management.index.status</code>؛ مثلاً <code>admin.teachers.management.index.status</code>، <code>admin.students...</code>، <code>admin.advisers...</code>. helper فقط پسوند <code>.management.index.status</code> را به <code>.management.index.{code}</code> نگاشت می‌کند. هنگام ساخت نام از <code>generateUserManagementRouteName(...)</code> استفاده کنید. نام خارج از الگو ⇒ breadcrumb/عنوان/active بودن تب درست کار نمی‌کند مگر helper و slugها را هم‌راستا کنید.</p>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-modularity-routing-menu-18" class="scroll-mt-header">بخش D — منو: MenuGroup و MenuSubgroup</h2>
<h3 id="sec-abolframe-modularity-routing-menu-19" class="scroll-mt-header">D.1 منو دقیقاً برای چیست؟</h3>
<p>هر Route با <code>-&gt;title()</code> عنوان می‌گیرد. اما دسته و زیردسته Route مستقل ندارند؛ فقط <strong>پیشوند مشترک</strong> چند Route‌اند (<code>admin.users</code> پیشوند <code>admin.users.index</code> و <code>admin.users.create</code>). عنوان/آیکن/ترتیب همین پیشوندها را <code>MenuGroup/MenuSubgroup</code> می‌دهد:</p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>چه چیزی</th><th>عنوان از کجا</th></tr></thead><tbody><tr><td>آیتم برگ (خود Route)</td><td><code>-&gt;title()</code> روی همان Route</td></tr><tr><td>دسته/زیردسته (پیشوند)</td><td><code>MenuGroup</code> / <code>MenuSubgroup</code></td></tr></tbody></table></div>
<h3 id="sec-abolframe-modularity-routing-menu-20" class="scroll-mt-header">D.2 ⭐ قانون طلایی نام‌گذاری</h3>
<p><code>-&gt;name()</code> در MenuGroup/MenuSubgroup باید <strong>دقیقاً نام کامل پیشوند Routeها</strong> باشد، <strong>با پیشوند ابتدایی مثل <code>admin.</code></strong>. نام ناقص (<code>filter-templates</code> به‌جای <code>admin.export.filter-templates</code>) به هیچ دسته‌ای وصل نمی‌شود و عنوان اعمال نمی‌گردد.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>// Routeها: admin.export.generate / admin.export.download / admin.export.filter-templates.index|store|destroy
MenuGroup::make()-&gt;name(&#039;admin.export&#039;)-&gt;title(&#039;گزارش‌گیری&#039;)
    -&gt;subMenu([MenuSubgroup::make()-&gt;name(&#039;admin.export.filter-templates&#039;)-&gt;title(&#039;قالب‌های فیلتر&#039;)]);</code></pre>
</div>
<p>آیتم‌های برگ (<code>admin.export.generate</code>) عنوانشان از <code>-&gt;title()</code> خود Route می‌آید.</p>
<h3 id="sec-abolframe-modularity-routing-menu-21" class="scroll-mt-header">D.3 کلاس‌های Builder</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>use MyLaravelCore\\Support\\Menu\\MenuGroup;
use MyLaravelCore\\Support\\Menu\\MenuSubgroup;

MenuGroup::make()-&gt;name(&#039;admin.dashboard&#039;)-&gt;title(&#039;داشبورد&#039;)-&gt;icon(&#039;fa-solid fa-home&#039;)-&gt;route(&#039;admin.dashboard.index&#039;)-&gt;badge(5);
MenuSubgroup::make()-&gt;name(&#039;admin.users.managers&#039;)-&gt;title(&#039;مدیران&#039;)-&gt;route(&#039;admin.users.managers.index&#039;)-&gt;parent(&#039;admin.users&#039;);</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div><strong>هشدار:</strong> اگر برای MenuSubgroup از <code>parent(...)</code> استفاده می‌کنید، مقدار parent باید <strong>قبلاً</strong> به‌عنوان MenuGroup از طریق <code>AbolFrame::menu(...)</code> در یک Service Provider ثبت شده باشد؛ وگرنه هنگام collect منوها exception.</div></div>
<h3 id="sec-abolframe-modularity-routing-menu-22" class="scroll-mt-header">D.4 دو روش تعریف در Service Provider (مثلاً <code>AppServiceProvider</code>)</h3>
<p><strong>نوع اول — متمرکز:</strong></p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>use MyLaravelCore\\Facades\\AbolFrame;

public function sidebarMenu(): void
{
    AbolFrame::menu(function () {
        return [
            MenuGroup::make()-&gt;name(&#039;admin.customer&#039;)-&gt;title(&#039;مشتریان&#039;)-&gt;icon(&#039;fa-solid fa-code&#039;)
                -&gt;badge(fn () =&gt; 6)
                -&gt;subMenu([
                    MenuSubgroup::make()-&gt;name(&#039;admin.customer.wallet&#039;)-&gt;title(&#039;کیف پول&#039;)-&gt;badge(fn () =&gt; 2),
                    MenuSubgroup::make()-&gt;name(&#039;admin.customer.factor&#039;)-&gt;title(&#039;فاکتور ها&#039;)-&gt;badge(fn () =&gt; 2),
                ]),
        ];
    });
}</code></pre>
</div>
<p><strong>نوع دوم — مستقل:</strong> گروه و زیرگروه‌ها در <code>AbolFrame::menu</code>های جدا (حتی در Service Providerهای مختلف).</p>
<p><strong>در ماژول:</strong> متدی مثل <code>registerMenuGroup()</code> تعریف و در <code>boot()</code> ServiceProvider ماژول صدا بزنید.</p>
<h3 id="sec-abolframe-modularity-routing-menu-23" class="scroll-mt-header">D.5 کاهش کد تکراری با <code>parent</code></h3>
<p>یک MenuGroup مرکزی (مثلاً <code>base</code> = «اطلاعات پایه») را فقط یک‌بار ثبت کنید؛ در هر ماژول فقط <code>MenuSubgroup</code> با <code>parent(&#039;base&#039;)</code>:</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>AbolFrame::menu(fn () =&gt; [MenuGroup::make()-&gt;name(&#039;base&#039;)-&gt;title(&#039;اطلاعات پایه&#039;)]);
AbolFrame::menu(fn () =&gt; [MenuSubgroup::make()-&gt;name(&#039;settings.region&#039;)-&gt;title(&#039;تنظیمات مناطق&#039;)-&gt;parent(&#039;base&#039;)]);</code></pre>
</div>
<div class="callout info"><i class="fa fa-circle-info callout-icon"></i><div>قبل از <code>parent(&#039;base&#039;)</code> حتماً <code>base</code> ثبت شده باشد.</div></div>
<h3 id="sec-abolframe-modularity-routing-menu-24" class="scroll-mt-header">D.6 ویژگی‌ها</h3>
<ul><li><strong>نام‌گذاری سلسله‌مراتبی:</strong> <code>MenuSubgroup::make()-&gt;name(&#039;admin.samples.components&#039;)</code> خودکار زیر گروه <code>admin.samples</code> قرار می‌گیرد.</li><li><strong>Badge:</strong> ثابت (<code>-&gt;badge(12, &#039;primary&#039;)</code>) یا پویا (<code>-&gt;badge(fn () =&gt; User::count(), &#039;danger&#039;, [$arg1, $arg2])</code>)، قابل سریال‌سازی.</li></ul>
<h3 id="sec-abolframe-modularity-routing-menu-25" class="scroll-mt-header">D.7 متدها</h3>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>متد</th><th>توضیح</th></tr></thead><tbody><tr><td><code>name(string)</code></td><td>شناسه یکتا (<code>admin.users</code>)</td></tr><tr><td><code>title(string)</code></td><td>عنوان نمایشی</td></tr><tr><td><code>sort(int)</code></td><td>ترتیب</td></tr><tr><td><code>icon(string)</code></td><td>آیکن (<strong>فقط MenuGroup</strong>)</td></tr><tr><td><code>route(string)</code></td><td>نام route</td></tr><tr><td><code>badge(mixed $value, string $style)</code></td><td>نشان</td></tr><tr><td><code>subMenu(array)</code></td><td>زیرمنوها (MenuGroup و MenuSubgroup)</td></tr><tr><td><code>parent(string)</code></td><td>والد (MenuSubgroup)</td></tr></tbody></table></div>
<p>نکات: هر گروه می‌تواند چند زیرگروه داشته باشد؛ زیرگروه‌ها مستقل هم تعریف می‌شوند و خودکار با والد تطبیق می‌یابند؛ برای عملکرد صحیح باید <code>AbolFrame::menu</code> در Service Provider استفاده شود.</p>
<p><strong>نمونه کامل:</strong> روش اول: <code>MenuGroup &#039;admin.products&#039;</code> با <code>subMenu([MenuSubgroup &#039;admin.products.list&#039; -&gt;route(&#039;admin.products.index&#039;)])</code>؛ روش دوم: <code>MenuSubgroup &#039;admin.products.categories&#039; -&gt;parent(&#039;admin.products&#039;) -&gt;badge(Category::count(), &#039;info&#039;)</code>.</p>
<div class="callout info"><i class="fa fa-circle-info callout-icon"></i><div><strong>قانون مصوب:</strong> کلیه منوها و زیرمنوها بر اساس صفحه منوها در Confluence تنظیم شوند.</div></div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-modularity-routing-menu-26" class="scroll-mt-header">بخش E — تنظیم route ماژول (RouteServiceProvider)</h2>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>// وب
Route::middleware([&#039;web&#039;, &#039;authorized&#039;])-&gt;prefix(&#039;admin/basic&#039;)-&gt;as(&#039;admin.basic.&#039;)
    -&gt;group(module_path(&#039;Bank&#039;, &#039;/routes/web.php&#039;));
// API
Route::middleware([&#039;web&#039;, &#039;authorized&#039;])-&gt;prefix(&#039;admin/api/basic&#039;)-&gt;as(&#039;admin.api.basic.&#039;)
    -&gt;group(module_path(&#039;Bank&#039;, &#039;/routes/api.php&#039;));</code></pre>
</div>
<p>حتماً middleware <code>authorized</code> اضافه شود تا فقط کاربران احراز‌هویت‌شده دسترسی داشته باشند. این middleware در پکیج AbolFrame هست؛ دوباره تعریف نکنید.</p>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-modularity-routing-menu-27" class="scroll-mt-header">بخش F — Route و Permission (راهنما)</h2>
<ul><li>هر route حساس permission مشخص داشته باشد؛ permissionها از routeها قابل <strong>تولید/ردیابی</strong> باشند؛ ترجمه permission هم‌زمان اضافه شود؛ حذف permission اثرش روی roleها بررسی شود.</li><li>پس از اضافه/تغییر route باید <strong>command تولید permission</strong> اجرا و خروجی review شود.</li><li>❌ route بدون نام، route حساس بدون permission، نام permission نامرتبط با action، تغییر نام route بدون بررسی مصرف‌کننده‌ها.</li><li>Route Naming: dot notation و resource-oriented (<code>admin.users.index|store|update</code>).</li></ul>
        `
    },
    {
        id: "abolframe-bladelayout-generators",
        title: "۷. BladeLayout و Generatorها",
        icon: "fa-wand-magic-sparkles",
        category: "مستندات جامع ابول فریم (AbolFrame)",
        content: `
<h1>۷. Blade Layout و Generatorهای Panel Kit — توضیح کامل</h1>
<div class="toc-quick-jump-card my-4 p-3 rounded-3 border bg-body-tertiary"><div class="d-flex align-items-center justify-content-between mb-2"><strong class="text-primary small"><i class="fa fa-compass ms-1"></i> فهرست سریع آیتم‌ها، متدها و کامپوننت‌های این بخش (42 مورد):</strong></div><div class="d-flex flex-wrap gap-2"><a href="#sec-abolframe-bladelayout-generators-1" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش A — Blade Layout</a><a href="#sec-abolframe-bladelayout-generators-2" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.1 دو بخش اصلی</a><a href="#sec-abolframe-bladelayout-generators-3" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.2 تعریف Generatorها (در Controller)</a><a href="#sec-abolframe-bladelayout-generators-4" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.3 بررسی وجود</a><a href="#sec-abolframe-bladelayout-generators-5" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.4 رندر دستی در Blade</a><a href="#sec-abolframe-bladelayout-generators-6" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.5 سفارشی‌سازی Generatorهای پکیج (extensionDefinitions)</a><a href="#sec-abolframe-bladelayout-generators-7" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.6 مدیریت داده‌ها</a><a href="#sec-abolframe-bladelayout-generators-8" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.7 مدیریت فیلترهای جدول بدون تعامل کاربر</a><a href="#sec-abolframe-bladelayout-generators-9" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.8 Bladeهای اضافی</a><a href="#sec-abolframe-bladelayout-generators-10" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.9 Navbar</a><a href="#sec-abolframe-bladelayout-generators-11" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.10 خلاصه الزامات و بهترین روش‌ها</a><a href="#sec-abolframe-bladelayout-generators-12" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش B — Tab Generator</a><a href="#sec-abolframe-bladelayout-generators-13" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.1 تنظیمات اولیه (در constructor)</a><a href="#sec-abolframe-bladelayout-generators-14" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.2 تعریف تب‌ها</a><a href="#sec-abolframe-bladelayout-generators-15" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.3 رندر سفارشی و چند Tab</a><a href="#sec-abolframe-bladelayout-generators-16" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش C — Section Generator</a><a href="#sec-abolframe-bladelayout-generators-17" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">C.1 تعریف</a><a href="#sec-abolframe-bladelayout-generators-18" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">C.2 ثبت در کنترلر</a><a href="#sec-abolframe-bladelayout-generators-19" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">C.3 تنظیمات کلاس (اختیاری)</a><a href="#sec-abolframe-bladelayout-generators-20" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">C.4 تنظیمات Section</a><a href="#sec-abolframe-bladelayout-generators-21" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">C.5 کنترل دسترسی</a><a href="#sec-abolframe-bladelayout-generators-22" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">C.6 توسعه Sectionهای موجود</a><a href="#sec-abolframe-bladelayout-generators-23" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">C.7 خطایابی</a><a href="#sec-abolframe-bladelayout-generators-24" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش D — Filter Generator</a><a href="#sec-abolframe-bladelayout-generators-25" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">D.1 متدها</a><a href="#sec-abolframe-bladelayout-generators-26" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">D.2 ویژگی‌های فیلتر</a><a href="#sec-abolframe-bladelayout-generators-27" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">D.3 کنترل نمایش</a><a href="#sec-abolframe-bladelayout-generators-28" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">D.4 فیلتر وابسته</a><a href="#sec-abolframe-bladelayout-generators-29" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">D.5 دریافت/تنظیم مقدار</a><a href="#sec-abolframe-bladelayout-generators-30" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">D.6 استفاده در Layout</a><a href="#sec-abolframe-bladelayout-generators-31" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش E — Audit Generator (لاگ تغییرات)</a><a href="#sec-abolframe-bladelayout-generators-32" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">E.1 ساختار پایه</a><a href="#sec-abolframe-bladelayout-generators-33" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">E.2 Resource</a><a href="#sec-abolframe-bladelayout-generators-34" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">E.3 فیلدها</a><a href="#sec-abolframe-bladelayout-generators-35" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">E.4 تنظیمات</a><a href="#sec-abolframe-bladelayout-generators-36" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">E.5 Blade Layout</a><a href="#sec-abolframe-bladelayout-generators-37" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">E.6 محدود به یک Entity</a><a href="#sec-abolframe-bladelayout-generators-38" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">E.7 API</a><a href="#sec-abolframe-bladelayout-generators-39" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">E.8 Badge Counter در Section</a><a href="#sec-abolframe-bladelayout-generators-40" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">E.9 فیلترهای UI</a><a href="#sec-abolframe-bladelayout-generators-41" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">E.10 نکات</a><a href="#sec-abolframe-bladelayout-generators-42" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش F — Banner Generator</a></div></div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-bladelayout-generators-1" class="scroll-mt-header">بخش A — Blade Layout</h2>
<p>ساختار اصلی صفحات پنل را <strong>متمرکز و یکپارچه</strong> مدیریت می‌کند: Header، Sidebar، Footer و بخش‌های ثابت یک‌بار تعریف و در همه صفحات خودکار بارگذاری می‌شوند. نتیجه: صفحات ساختار یکسان و قابل‌پیش‌بینی، نگهداری Viewها ساده‌تر، و Generatorها شفاف بین Backend و Frontend مدیریت می‌شوند.</p>
<h3 id="sec-abolframe-bladelayout-generators-2" class="scroll-mt-header">A.1 دو بخش اصلی</h3>
<ol><li><strong>کامپوننت <code>&lt;x-default-layout&gt;</code></strong>: اسکلت صفحه (Header، Sidebar، Footer، ناحیه محتوا). <strong>استفاده در تمام صفحات پنل الزامی است</strong>؛ وگرنه اجزای اصلی بارگذاری نمی‌شوند.</li><li><strong>Facade <code>BladeLayout</code></strong>: مدیریت Generatorها، داده‌ها، تنظیمات ظاهری و اجزای پویای سطح صفحه.</li></ol>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-default-layout&gt;
    {{-- Page Content --}}
&lt;/x-default-layout&gt;</code></pre>
</div>
<h3 id="sec-abolframe-bladelayout-generators-3" class="scroll-mt-header">A.2 تعریف Generatorها (در Controller)</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>use MyLaravelCore\\Facades\\BladeLayout;

BladeLayout::table(\\App\\Generators\\Tables\\BankTable::class);
BladeLayout::tab(\\App\\Generators\\Tabs\\BankTab::class);
BladeLayout::section(\\App\\Generators\\Sections\\BankSection::class);
BladeLayout::banner(\\App\\Generators\\Banners\\BankBanner::class);
BladeLayout::filter(\\App\\Generators\\Filters\\BankFilter::class);</code></pre>
</div>
<p>قوانین: هر Generator در هر صفحه <strong>یک‌بار</strong>؛ تعریف <strong>فقط در Controller</strong>.</p>
<h3 id="sec-abolframe-bladelayout-generators-4" class="scroll-mt-header">A.3 بررسی وجود</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>BladeLayout::exists(&#039;table&#039;);
$hasTable = BladeLayout::table() !== false;
$hasTab   = BladeLayout::tab() !== false;</code></pre>
</div>
<h3 id="sec-abolframe-bladelayout-generators-5" class="scroll-mt-header">A.4 رندر دستی در Blade</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-default-layout&gt;
    {!! bladeLayout()-&gt;table()-&gt;render() !!}
&lt;/x-default-layout&gt;</code></pre>
</div>
<p>Section/Filter/Banner خودکار رندر می‌شوند (نیازی به <code>render()</code> نیست)؛ Table و Tab/Audit را در صورت نیاز دستی رندر کنید.</p>
<h3 id="sec-abolframe-bladelayout-generators-6" class="scroll-mt-header">A.5 سفارشی‌سازی Generatorهای پکیج (<code>extensionDefinitions</code>)</h3>
<p>بعضی Generatorهای پکیج (مثل <code>UserSection</code>, <code>UserBanner</code>, <code>UserTable</code>) را بدون کپی کل کلاس می‌توان extend کرد.</p>
<p><strong>۱. کلاس extend‌شده</strong> (<code>extensionDefinitions()</code> را override کنید):</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>class ExtendedUserSection extends UserSection
{
    protected function extensionDefinitions(): array
    {
        return [&#039;sections&#039; =&gt; [
            GeneratorDefinition::make(
                Section::make(&#039;section_activity_log&#039;)-&gt;label(&#039;Activity Log&#039;)
                    -&gt;icon(&#039;fa-regular fa-clock-rotate-left&#039;)-&gt;routeName(&#039;admin.management.activity-log&#039;)
            )-&gt;key(&#039;section_activity_log&#039;)-&gt;after(&#039;section_notes&#039;),
        ]];
    }
}</code></pre>
</div>
<p>Banner: <code>&#039;items&#039; =&gt; [GeneratorDefinition::make(Banner::make()-&gt;key(&#039;last_login_at&#039;)-&gt;label(&#039;Last Login&#039;)-&gt;value(&#039;&lt;span dir=&quot;ltr&quot;&gt;&#039;.now()-&gt;format(&#039;Y/m/d , H:i:s&#039;).&#039;&lt;/span&gt;&#039;)-&gt;icon(&#039;fa-regular fa-right-to-bracket&#039;))-&gt;key(&#039;last_login_at&#039;)-&gt;after(&#039;updated_at&#039;)]</code>.</p>
<p>Table: <code>&#039;columns&#039; =&gt; [GeneratorDefinition::make(function (self $table): void { $table-&gt;addColumn(name:&#039;email&#039;, label:&#039;Email&#039;, generatorKey:&#039;email&#039;); })-&gt;key(&#039;email&#039;)-&gt;before(&#039;status&#039;)]</code> و <code>&#039;columnActions&#039; =&gt; [... addColumnAction(type:&#039;link&#039;, ..., generatorKey:&#039;show&#039;)-&gt;key(&#039;show&#039;)-&gt;before(&#039;edit&#039;)]</code>.</p>
<p><strong>۲. معرفی در کانفیگ</strong> <code>config/AbolFrame-user-management.php</code>:</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&#039;user_section_class&#039; =&gt; \\App\\Generators\\UserManagement\\ExtendedUserSection::class,
&#039;user_banner_class&#039;  =&gt; \\App\\Generators\\UserManagement\\ExtendedUserBanner::class,
&#039;user_table_class&#039;   =&gt; \\App\\Generators\\UserManagement\\ExtendedUserTable::class,</code></pre>
</div>
<p>پیش‌فرض: <code>UserSection::class</code>, <code>UserBanner::class</code>, <code>UserTable::class</code>. با این کار نیازی به override کنترلر نیست.</p>
<p><strong>گروه‌های قابل Extend:</strong></p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>Generator</th><th>گروه‌ها</th></tr></thead><tbody><tr><td>Section</td><td><code>sections</code></td></tr><tr><td>Banner</td><td><code>items</code>, <code>actionButtons</code>, <code>titleSuffixes</code>, <code>titlePrefixes</code></td></tr><tr><td>Table</td><td><code>columns</code>, <code>columnActions</code>, <code>filters</code>, <code>toolbar</code>, <code>bulkOperations</code></td></tr></tbody></table></div>
<p><strong>کنترل ترتیب با <code>GeneratorDefinition</code>:</strong> <code>make($item)</code> افزودن/جایگزینی؛ <code>-&gt;key(&#039;stable_id&#039;)</code> شناسه پایدار برای merge/remove/placement؛ <code>-&gt;after(&#039;k&#039;)</code>/<code>-&gt;before(&#039;k&#039;)</code>؛ <code>GeneratorDefinition::remove(&#039;id&#039;)</code>. در Table برای <code>before/after</code>، <code>key()</code> باید با <code>generatorKey</code> همان ستون/action یکی باشد.</p>
<h3 id="sec-abolframe-bladelayout-generators-7" class="scroll-mt-header">A.6 مدیریت داده‌ها</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>BladeLayout::data([&#039;provinces&#039; =&gt; Province::all(), &#039;cities&#039; =&gt; City::all(), &#039;user&#039; =&gt; Auth::user()]);
BladeLayout::data(&#039;settings&#039;, $settings);
BladeLayout::data(&#039;page_title&#039;, &#039;مدیریت بانک‌ها&#039;);
$data = BladeLayout::data();   $provinces = BladeLayout::data(&#039;provinces&#039;);</code></pre>
</div>
<p>داخل Generator: <code>$this-&gt;provinces</code>, <code>$this-&gt;user-&gt;name</code>:</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>class BankBanner extends BaseBanner {
    public function configure(): void { $provinces = $this-&gt;provinces-&gt;pluck(&#039;name&#039;,&#039;id&#039;); }
}</code></pre>
</div>
<p>(در Banner نمونه CRUD: <code>BladeLayout::data(compact(&#039;bank&#039;))</code> و <code>$this-&gt;bank-&gt;name</code>.)</p>
<h3 id="sec-abolframe-bladelayout-generators-8" class="scroll-mt-header">A.7 مدیریت فیلترهای جدول بدون تعامل کاربر</h3>
<p>مشابه UI در session کلید <code>table_generator</code> ذخیره می‌شود.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>BladeLayout::setTableFilters(
    table: \\App\\Generators\\Tables\\BankTable::class,
    routeName: &#039;admin.banks.index&#039;,
    filters: [
        &#039;filter_name&#039; =&gt; &#039;بانک ملی&#039;, &#039;filter_status_select&#039; =&gt; 1, &#039;filter_types_multi&#039; =&gt; [1,2,3],
        &#039;filter_is_active&#039; =&gt; true, &#039;filter_amount&#039; =&gt; 5_000_000, &#039;filter_created_at&#039; =&gt; &#039;1404/09/02 14:30&#039;,
        &#039;filter_date_range_from&#039; =&gt; &#039;1404/09/01&#039;, &#039;filter_date_range_to&#039; =&gt; &#039;1404/09/05&#039;,
    ]
);
BladeLayout::clearTableFilters(table: \\App\\Generators\\Tables\\BankTable::class, routeName: &#039;admin.banks.index&#039;);</code></pre>
</div>
<p>نکات: ساختار <code>filters</code> دقیقاً مشابه فرم UI؛ مقادیر select/multiselect <strong>خودکار رمزنگاری</strong> می‌شوند؛ بازه‌ها با <code>from_</code>/<code>to_</code>؛ <code>routeName</code> برای جلوگیری از تداخل توصیه می‌شود.</p>
<h3 id="sec-abolframe-bladelayout-generators-9" class="scroll-mt-header">A.8 Bladeهای اضافی</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>BladeLayout::addAdditionalBlades(&#039;components.custom-sidebar&#039;);
BladeLayout::addAdditionalBlades([&#039;components.custom-header&#039;, &#039;components.notifications&#039;, &#039;modals.quick-actions&#039;]);
BladeLayout::clearAdditionalBlades();</code></pre>
</div>
<p>در <strong>همه صفحات پنل</strong> بارگذاری می‌شوند؛ مسیر نسبی از پوشه views.</p>
<h3 id="sec-abolframe-bladelayout-generators-10" class="scroll-mt-header">A.9 Navbar</h3>
<p><strong>Badgeها:</strong></p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>BladeLayout::navbarBadges()-&gt;addMany([
    Badge::make()-&gt;value(&#039;new&#039;)-&gt;icon(&#039;fa-regular fa-award&#039;)-&gt;variant(&#039;danger&#039;),
    Badge::make()-&gt;appearance(&#039;light&#039;)-&gt;size(&#039;lg&#039;)-&gt;icon(&#039;fa-regular fa-award&#039;)-&gt;value(&#039;امتیاز من: 7691.2365&#039;)-&gt;variant(&#039;warning&#039;),
]);
BladeLayout::navbarBadges()-&gt;add(id: &#039;messages&#039;, label: fn () =&gt; Auth::user()-&gt;unreadMessages()-&gt;count(), tooltip: &#039;پیام‌های جدید&#039;);</code></pre>
</div>
<p><strong>زیرعنوان منوی کاربر:</strong></p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>BladeLayout::navbarUserMenuSubtitleManager()-&gt;set(&#039;کاربر: مدیر سیستم&#039;);
BladeLayout::navbarUserMenuSubtitleManager()-&gt;set(fn () =&gt; &#039;آخرین ورود: &#039;.jalali(Auth::user()-&gt;last_login)-&gt;format(&#039;Y/m/d H:i&#039;));</code></pre>
</div>
<h3 id="sec-abolframe-bladelayout-generators-11" class="scroll-mt-header">A.10 خلاصه الزامات و بهترین روش‌ها</h3>
<p>الزام: <code>&lt;x-default-layout&gt;</code>، هر Generator یک‌بار، تعریف در Controller. بهترین: داده مشترک با <code>data</code>، Route Name در فیلترها، Closure برای داده پویا. فنی: فیلترها در session <code>table_generator</code>، Generatorها در Container نگه‌داری می‌شوند.</p>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-bladelayout-generators-12" class="scroll-mt-header">بخش B — Tab Generator</h2>
<p>ابزاری برای تعریف مجموعه تب‌های قابل‌سفارشی (تب‌های پویا، حالت نمایش، کنترل رندر، دسترسی).</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BASH</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>php artisan AbolFrame:make-tab SampleTab
php artisan AbolFrame:make-tab SampleTab --module=MODULE_NAME</code></pre>
</div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>namespace App\\Generators\\Tabs;
use MyLaravelCore\\Support\\Generators\\Tabs\\BaseTab;

class SampleTab extends BaseTab
{
    public function tabs(): array { return [ /* تعریف تب‌ها */ ]; }
}</code></pre>
</div>
<h3 id="sec-abolframe-bladelayout-generators-13" class="scroll-mt-header">B.1 تنظیمات اولیه (در constructor)</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>public function __construct()
{
    $this-&gt;disableRendering();     // غیرفعال‌سازی رندر خودکار
    $this-&gt;layoutBySection();      // چیدمان بر اساس Sectionها
    $this-&gt;layoutMode(&#039;minimal&#039;);  // حالت نمایش
}</code></pre>
</div>
<ul><li><strong><code>disableRendering(bool $state = true)</code>:</strong> تب‌ها ساخته می‌شوند ولی در UI نمایش داده نمی‌شوند؛ برای وقتی که می‌خواهید جای سفارشی رندر کنید (<code>false</code> = فعال).</li><li><strong><code>layoutBySection()</code>:</strong> چینش تب‌ها بر اساس Sectionهای تعریف‌شده در Layout (نه بالای صفحه)؛ برای صفحات پیچیده/چندبخشی.</li><li><strong><code>layoutMode</code>:</strong> <code>default</code> (کامل: عنوان، زیرعنوان، آیکن، ابزار)، <code>minimal</code> (ساده و فشرده)، <code>classic</code> (فقط تم <strong>lite</strong>، سبک متفاوت). پیش‌فرض <code>default</code>. این مقدار برای همه تب‌ها اعمال می‌شود مگر تبی تنظیم متفاوت داشته باشد. ⚠️ <code>classic</code> در تم default قابل استفاده نیست.</li></ul>
<h3 id="sec-abolframe-bladelayout-generators-14" class="scroll-mt-header">B.2 تعریف تب‌ها</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>class AdminTab extends BaseTab
{
    public function __construct() { $this-&gt;layoutMode(&#039;minimal&#039;); }

    public function tabs(): array
    {
        return [
            Tab::make(&#039;tab1&#039;)-&gt;routeName(&#039;admin.admins.admins.edit&#039;)
                -&gt;title(__(&#039;table.admins.edit_page&#039;))-&gt;subTitle(&#039;متن نمونه&#039;)
                -&gt;permission(&#039;admin.admins.admins.edit&#039;),

            Tab::make(&#039;tab2&#039;)-&gt;routeName(&#039;admin.admins.admins.change_password&#039;)
                -&gt;routeParameters([&#039;admin_id&#039; =&gt; encryptValue($this-&gt;admin-&gt;id)])
                -&gt;title(&#039;تغییر رمز عبور&#039;)-&gt;subTitle(&#039;متن نمونه&#039;)-&gt;tooltip(&#039;tooltip1&#039;)
                -&gt;disabled(fn() =&gt; rand(1, 2) === 1)-&gt;disabledTooltip(&#039;tooltip2&#039;)
                -&gt;permission(&#039;admin.admins.admins.edit&#039;),
        ];
    }

    public function routeParameters(): array { return [&#039;admin_id&#039; =&gt; encryptValue($this-&gt;admin-&gt;id)]; }
}</code></pre>
</div>
<p><strong><code>routeParameters()</code>:</strong> پارامترهای مشترک همه تب‌ها در یک نقطه مرکزی؛ تب با پارامتر صریح خودش اولویت دارد. (⚠️ <code>encryptValue</code> در مثال‌ها؛ طبق قانون پروژه route id رمز نمی‌شود — الگوی موجود پروژه را ببینید.)</p>
<h3 id="sec-abolframe-bladelayout-generators-15" class="scroll-mt-header">B.3 رندر سفارشی و چند Tab</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-default-layout&gt;
    {!! bladeLayout()-&gt;tab()-&gt;render() !!}
&lt;/x-default-layout&gt;</code></pre>
</div>
<p>چند Tab در یک صفحه — نام یکتا:</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>BladeLayout::tab(UserTab::class, &#039;user&#039;);
BladeLayout::tab(UserRelatedTab::class, &#039;related&#039;);</code></pre>
</div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>{!! bladeLayout()-&gt;tab(&#039;user&#039;)-&gt;render() !!}
{!! bladeLayout()-&gt;tab(&#039;related&#039;)-&gt;render() !!}</code></pre>
</div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-bladelayout-generators-16" class="scroll-mt-header">بخش C — Section Generator</h2>
<p>لینک‌های بخش‌های مرتبط با یک صفحه/رکورد را در <strong>نوار کناری داخلی</strong> پنل نمایش می‌دهد (مثلاً در مدیریت مشتری: «جزئیات»، «ویرایش»، «آدرس‌ها»). هر بخش به یک route نام‌گذاری‌شده اشاره می‌کند و می‌تواند active، badge، دسترسی نمایشی یا حالت غیرفعال داشته باشد.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BASH</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>php artisan AbolFrame:make-section CustomerSection [--module=Customer]</code></pre>
</div>
<p>مسیر: <code>app/Generators/Sections</code> یا <code>Modules/{Module}/app/Generators/Sections</code>.</p>
<h3 id="sec-abolframe-bladelayout-generators-17" class="scroll-mt-header">C.1 تعریف</h3>
<p><code>sections()</code> اجباری و آرایه‌ای از <code>Section</code>؛ هر <code>routeName</code> باید نام route ثبت‌شده باشد.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>class CustomerSection extends BaseSection
{
    public function title(): string { return __(&#039;customer::general.customer_management&#039;); }
    public function routeParameters(): array { return [&#039;customer&#039; =&gt; encryptValue($this-&gt;customer-&gt;id)]; }

    public function sections(): array
    {
        return [
            Section::make(&#039;details&#039;)-&gt;label(__(&#039;customer::operation.details&#039;))
                -&gt;icon(&#039;fa-regular fa-address-card&#039;)-&gt;routeName(&#039;admin.customers.management.show&#039;),

            Section::make(&#039;edit&#039;)-&gt;label(__(&#039;customer::operation.edit&#039;))
                -&gt;icon(&#039;fa-regular fa-pen-to-square&#039;)-&gt;routeName(&#039;admin.customers.management.edit&#039;)
                -&gt;childRoutes([&#039;admin.customers.management.update&#039;])
                -&gt;disabled(fn (): bool =&gt; ! auth()-&gt;user()-&gt;can(&#039;update&#039;, $this-&gt;customer))
                -&gt;disabledTooltip(__(&#039;customer::message.customer_cannot_be_edited&#039;)),
        ];
    }
}</code></pre>
</div>
<p>پارامتر مشترک <code>customer</code> برای همه لینک‌ها؛ اگر Section پارامتر هم‌نام خودش را داشته باشد، <strong>مقدار Section اولویت دارد</strong>.</p>
<h3 id="sec-abolframe-bladelayout-generators-18" class="scroll-mt-header">C.2 ثبت در کنترلر</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>BladeLayout::data([&#039;customer&#039; =&gt; $customer]);
BladeLayout::section(CustomerSection::class);
return view(&#039;customer::edit&#039;, compact(&#039;customer&#039;));</code></pre>
</div>
<p>صفحه باید <code>&lt;x-default-layout&gt;</code> باشد؛ نیازی به <code>render()</code> نیست. اگر همه بخش‌ها به‌دلیل دسترسی/visibility حذف شوند چیزی نمایش داده نمی‌شود.</p>
<h3 id="sec-abolframe-bladelayout-generators-19" class="scroll-mt-header">C.3 تنظیمات کلاس (اختیاری)</h3>
<p><code>title(): string</code> (عنوان کارت؛ پیش‌فرض «جزئیات»)، <code>routeParameters(): array</code> (مشترک)، <code>defaultTab(): ?string</code> (تب پیش‌فرض برای بخش‌های بدون <code>tab()</code>).</p>
<h3 id="sec-abolframe-bladelayout-generators-20" class="scroll-mt-header">C.4 تنظیمات Section</h3>
<p><code>Section::make(string $id)</code> — شناسه یکتا (برای merge تعریف‌های توسعه‌یافته هم استفاده می‌شود).</p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>متد</th><th>کاربرد</th></tr></thead><tbody><tr><td><code>label</code></td><td>متن لینک</td></tr><tr><td><code>routeName</code></td><td>route مقصد (اجباری)</td></tr><tr><td><code>routeParameters</code></td><td>پارامترهای مخصوص همین لینک</td></tr><tr><td><code>childRoutes</code></td><td>routeهای فرزند که هنگام بازبودن همین بخش را فعال نشان می‌دهند</td></tr><tr><td><code>icon</code></td><td>کلاس آیکن</td></tr><tr><td>\`badge(int\\</td><td>string\\</td></tr><tr><td>\`visibility(bool\\</td><td>callable)\`</td></tr><tr><td><code>permission(?string)</code></td><td>⚠️ فقط مقدار را نگه می‌دارد؛ <strong>در پردازش فعلی برای فیلتر/مجازکردن استفاده نمی‌شود</strong></td></tr><tr><td><code>activate()</code></td><td>⚠️ در پردازش عادی با نتیجه بررسی route جایگزین می‌شود؛ به آن اتکا نکنید</td></tr><tr><td>\`disabled(bool\\</td><td>callable\\</td></tr><tr><td><code>disabledTooltip</code></td><td>توضیح برای لینک غیرفعال</td></tr><tr><td><code>tooltip</code></td><td>tooltip لینک</td></tr><tr><td><code>tab(string $id)</code></td><td>تب مرتبط؛ بر <code>defaultTab()</code> اولویت دارد</td></tr></tbody></table></div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ badge برابر <code>0</code> در theme <strong>lite</strong> نمایش داده نمی‌شود (در default نمایش داده می‌شود).</div></div>
<p>وضعیت active از route جاری و <code>childRoutes</code> تعیین می‌شود؛ اگر تطبیق مستقیمی نبود، رابطه والد–فرزند routeها از RoutePropertyCollector بررسی می‌شود.</p>
<h3 id="sec-abolframe-bladelayout-generators-21" class="scroll-mt-header">C.5 کنترل دسترسی</h3>
<p>Sectionهایی که کاربر به route آن‌ها دسترسی ندارد با بررسی دسترسی route حذف می‌شوند؛ پس <strong>دسترسی را روی route تعریف کنید</strong>. <code>visibility()</code> شرط نمایش است نه authorization؛ <code>disabled()</code> فقط UI را غیرفعال می‌کند و محافظت route نیست.</p>
<h3 id="sec-abolframe-bladelayout-generators-22" class="scroll-mt-header">C.6 توسعه Sectionهای موجود</h3>
<p>مانند بخش A.5؛ <code>GeneratorDefinition::make(Section::make(&#039;activity&#039;)...)-&gt;key(&#039;activity&#039;)-&gt;after(&#039;section_notes&#039;)</code> و <code>GeneratorDefinition::remove(&#039;section_documents&#039;)</code>. کلید باید با شناسه Section والد یا تعریف جدید مطابقت داشته باشد.</p>
<h3 id="sec-abolframe-bladelayout-generators-23" class="scroll-mt-header">C.7 خطایابی</h3>
<p>route اشتباه/ثبت‌نشده ⇒ لینک تولید نمی‌شود؛ عناصر <code>sections()</code> باید نمونه <code>Section</code> باشند؛ callbackهای <code>visibility</code>/<code>disabled</code> باید boolean و <code>badge</code> عدد/رشته؛ اگر لینک دیده نمی‌شود دسترسی route و <code>visibility</code> را بررسی کنید.</p>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-bladelayout-generators-24" class="scroll-mt-header">بخش D — Filter Generator</h2>
<p>فیلترهای پویا و قابل‌سفارشی در پنل؛ فیلتر چندسطحی، مقادیر پیش‌فرض، کنترل نمایش بر اساس تب فعال، ذخیره وضعیت در Session.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BASH</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>php artisan AbolFrame:make-filter SampleFilter [--module=MODULE_NAME]</code></pre>
</div>
<h3 id="sec-abolframe-bladelayout-generators-25" class="scroll-mt-header">D.1 متدها</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>class SampleFilter extends BaseFilter
{
    public function filters(): array
    {
        return [
            Filter::make(&#039;username&#039;)-&gt;title(&#039;نام کاربری&#039;)-&gt;placeholder(&#039;یک نام کاربری انتخاب کنید&#039;),
            Filter::make(&#039;status&#039;)-&gt;title(&#039;وضعیت&#039;)-&gt;items([
                [&#039;id&#039;=&gt;1,&#039;title&#039;=&gt;&#039;فعال&#039;], [&#039;id&#039;=&gt;2,&#039;title&#039;=&gt;&#039;غیرفعال&#039;], [&#039;id&#039;=&gt;3,&#039;title&#039;=&gt;&#039;معلق&#039;],
            ]),
        ];
    }
    public function defaults(): array { return [&#039;status&#039; =&gt; 1]; }
}</code></pre>
</div>
<h3 id="sec-abolframe-bladelayout-generators-26" class="scroll-mt-header">D.2 ویژگی‌های فیلتر</h3>
<p><code>id</code>، <code>title</code>، <code>placeholder</code>، <code>visibility</code> (bool یا callback)، <code>selected</code>، <code>only</code> (فقط در تب‌های مشخص)، <code>except</code> (عدم نمایش در تب‌های مشخص)، <code>items</code>، <code>dependOnParentID</code>، <code>dependOnRoute</code> (لود داینامیک).</p>
<h3 id="sec-abolframe-bladelayout-generators-27" class="scroll-mt-header">D.3 کنترل نمایش</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>Filter::make(&#039;admin_only&#039;)-&gt;title(&#039;فیلتر مدیریتی&#039;)-&gt;visibility(function () { return auth()-&gt;user()-&gt;isAdmin(); });
Filter::make(&#039;tab_specific&#039;)-&gt;title(&#039;فیلتر مخصوص تب&#039;)-&gt;only([&#039;details&#039;,&#039;settings&#039;])-&gt;except([&#039;summary&#039;]);</code></pre>
</div>
<h3 id="sec-abolframe-bladelayout-generators-28" class="scroll-mt-header">D.4 فیلتر وابسته</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>Filter::make(&#039;province_id&#039;)-&gt;title(&#039;استان&#039;)-&gt;placeholder(&#039;استان را انتخاب کنید&#039;)-&gt;items($this-&gt;getProvinces()),
Filter::make(&#039;city_id&#039;)-&gt;title(&#039;شهر&#039;)-&gt;dependOnParentID(&#039;province_id&#039;)-&gt;dependOnRoute(&#039;admin.locations.cities.by-province&#039;),</code></pre>
</div>
<p>فیلتر شهر فقط پس از انتخاب استان لود می‌شود.</p>
<h3 id="sec-abolframe-bladelayout-generators-29" class="scroll-mt-header">D.5 دریافت/تنظیم مقدار</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$values = GeoFilter::values();                 // یا BladeLayout::filter()-&gt;getCurrentValues()
$provinceId = GeoFilter::value(&#039;province_id&#039;); // یا BladeLayout::filter()-&gt;value(&#039;province_id&#039;)
BladeLayout::filter()-&gt;exists();
GeoFilter::setValues([&#039;province_id&#039;=&gt;5,&#039;city_id&#039;=&gt;23,&#039;status&#039;=&gt;&#039;active&#039;]);
GeoFilter::setValue(&#039;city_id&#039;, 5);</code></pre>
</div>
<h3 id="sec-abolframe-bladelayout-generators-30" class="scroll-mt-header">D.6 استفاده در Layout</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>BladeLayout::filter(GeoFilter::class);
return view(&#039;your-view&#039;, compact(&#039;provinceId&#039;));</code></pre>
</div>
<p>در view نیازی به render نیست؛ فیلتر خودکار اضافه می‌شود. (در Table Generator فیلتر جدول با <code>addFilter</code> تعریف می‌شود — فایل بعد.)</p>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-bladelayout-generators-31" class="scroll-mt-header">بخش E — Audit Generator (لاگ تغییرات)</h2>
<p>ابزار نمایش و فیلتر لاگ تغییرات مدل‌ها در پنل (منابع، فیلدها، فیلترها، ظاهر).</p>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div><strong>هشدار نسخه بررسی‌شده:</strong> <code>AuditQuery::get()</code> به کلاس ناموجود <code>FilterMetaCollector</code> ارجاع می‌دهد؛ لیست پنل و API ممکن است قبل از پاسخ خطا بدهند. پیش از استفاده تست کنید.</div></div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BASH</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>php artisan AbolFrame:make-audit UserAudit [--module=MODULE_NAME]</code></pre>
</div>
<p>کلاس فقط تنظیمات واکشی/نمایش است؛ ثبت خودکار رویدادها را فعال نمی‌کند (<code>AbolFrame-app.audit.enable</code> و پیش‌نیازها لازم است).</p>
<h3 id="sec-abolframe-bladelayout-generators-32" class="scroll-mt-header">E.1 ساختار پایه</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>class UserAudit extends BaseAudit
{
    public function __construct()
    {
        $this-&gt;setTitle(&#039;لاگ کاربران و نقش‌ها&#039;)
            -&gt;setUserIdentifierField(&#039;username&#039;, &#039;نام کاربری&#039;)
            -&gt;setResource([User::class =&gt; &#039;کاربران&#039;, Role::class =&gt; &#039;نقش‌ها&#039;])
            -&gt;setPerPage(20)
            -&gt;setUserRoute(fn ($user) =&gt; route(generateUserManagementRouteName(&#039;management.show&#039;), [&#039;user&#039; =&gt; encryptValue($user-&gt;id)]));
    }

    public function fields(): array
    {
        return [AuditField::make(&#039;first_name&#039;)-&gt;label(&#039;نام&#039;), AuditField::make(&#039;last_name&#039;)-&gt;label(&#039;نام خانوادگی&#039;), AuditField::make(&#039;email&#039;)-&gt;label(&#039;ایمیل&#039;)];
    }
}</code></pre>
</div>
<h3 id="sec-abolframe-bladelayout-generators-33" class="scroll-mt-header">E.2 Resource</h3>
<p><code>setResource([User::class, Role::class])</code> (برچسب از نام کلاس) یا انجمنی با برچسب سفارشی. اگر تنظیم شود فقط لاگ همان مدل‌ها (<code>entity_type</code>) واکشی می‌شود (چند مدل = <code>whereIn</code>). <strong>بدون Resource محدودیت نوع اعمال نمی‌شود</strong> — در صفحه‌های عمومی/HTTP حتماً صریح تعیین کنید.</p>
<p><strong>فیلتر «بخش مربوطه»:</strong> وقتی بیش از یک مدل باشد در فرم نمایش داده می‌شود؛ انتخاب‌نشده = همه؛ مقدار هر آیتم <strong>اندیس عددی منبع</strong> (<code>section[]</code>) است نه نام کلاس.</p>
<h3 id="sec-abolframe-bladelayout-generators-34" class="scroll-mt-header">E.3 فیلدها</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>AuditField::make(&#039;status&#039;)-&gt;label(&#039;وضعیت&#039;)-&gt;transform(fn ($value, $log) =&gt; $value ? &#039;فعال&#039; : &#039;غیرفعال&#039;);</code></pre>
</div>
<p>بدون <code>transform</code>: scalar → رشته، boolean → «بله/خیر»، null → <code>-</code>، آرایه/شیء → JSON. در API مقدار نهایی در <code>value.value</code>. <strong><code>fields()</code> allow-list نمایش است نه ذخیره‌سازی</strong>؛ وقتی خالی باشد formatter پنل همه مقادیر payload را قالب‌بندی می‌کند ولی API عمداً <code>old_values/new_values</code> را خالی برمی‌گرداند — برای جلوگیری از نشت اطلاعات حساس فیلدهای مجاز را صریح تعریف کنید.</p>
<h3 id="sec-abolframe-bladelayout-generators-35" class="scroll-mt-header">E.4 تنظیمات</h3>
<p><code>setTitle</code>, <code>setPerPage</code>, <code>setUserIdentifierField(field, label, mask?)</code> — بدون mask: <code>code</code> → <code>nationalCode</code>، <code>mobile</code> → <code>mobile</code>، بقیه بدون mask (mask مربوط به ورودی مرورگر است نه رمزنگاری/permission). گزینه‌های تعداد نمایش از <code>AbolFrame-panel-kit.table_generator.pagination_page_sizes</code>. <code>setUserRoute(fn ($user, $log) =&gt; url)</code> — اگر خالی/null باشد نام کاربر متن ساده است.</p>
<h3 id="sec-abolframe-bladelayout-generators-36" class="scroll-mt-header">E.5 Blade Layout</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>BladeLayout::audit(UserAudit::class);   // برمی‌گرداند BaseAudit؛ می‌توان زنجیر کرد: -&gt;setEntity($e)</code></pre>
</div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-default-layout&gt;{!! bladeLayout()-&gt;audit()-&gt;render() !!}&lt;/x-default-layout&gt;</code></pre>
</div>
<p>خروجی <code>render()</code> فقط فرم فیلتر و لیست است؛ داخل <code>x-default-layout</code> بگذارید.</p>
<h3 id="sec-abolframe-bladelayout-generators-37" class="scroll-mt-header">E.6 محدود به یک Entity</h3>
<p><code>setResource</code> فقط نوع مدل را محدود می‌کند. برای یک رکورد: <code>setEntity($teacher)</code> (فیلتر روی <code>entity_type</code> و <code>entity_id</code>؛ با ریست فیلترهای UI از بین نمی‌رود).</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>BladeLayout::audit(TeacherAudit::class)-&gt;setEntity($teacher);
$audit = new TeacherAudit(); $audit-&gt;setEntity($teacher); $logs = $audit-&gt;getLogs(); $count = $audit-&gt;getLogsCount();
$audit = (new TeacherAudit())-&gt;setEntityIdentity(Teacher::class, $teacherId)   // برای موجودیت حذف‌شده
    -&gt;setQueryScope(fn (Builder $query) =&gt; $query-&gt;where(&#039;user_role_id&#039;, $roleId));
$logs = Audit::config($audit)-&gt;page(1)-&gt;get();   // MyLaravelCore\\Facades\\Audit</code></pre>
</div>
<p><code>setQueryScope</code> در لیست، شمارش و جزئیات driver اعمال می‌شود. کامپوننت Livewire پنل در هر رندر کلاس را دوباره می‌سازد؛ شرط مشترک را در خود کلاس Audit تعریف کنید.</p>
<h3 id="sec-abolframe-bladelayout-generators-38" class="scroll-mt-header">E.7 API</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BASH</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>php artisan AbolFrame:make-audit-controller TeacherAuditController --audit=&#039;App\\Generators\\Audits\\TeacherAudit&#039; [--only=index|show] [--module=School] [--force]</code></pre>
</div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>class TeacherAuditController extends Controller { use HasAuditSupport; protected string $logConfigClass = TeacherAudit::class; }</code></pre>
</div>
<p><code>HasAuditIndex</code> (index)، <code>HasAuditShow</code> (show)، <code>HasAuditSupport</code> (هر دو). Audit باید یک Resource مجاز داشته باشد؛ برای چند Resource، نوع موجودیت با <code>setEntityIdentity()</code> در سرور مشخص شود (انتخاب کلاس از ورودی کلاینت <strong>مجاز نیست</strong>).</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>Route::middleware(&#039;auth:admin&#039;)-&gt;group(function () {
    Route::get(&#039;teachers/{entity}/logs&#039;, [TeacherAuditController::class, &#039;index&#039;])-&gt;name(&#039;teachers.logs.index&#039;);
    Route::get(&#039;teachers/{entity}/logs/{log}&#039;, [TeacherAuditController::class, &#039;show&#039;])-&gt;name(&#039;teachers.logs.show&#039;);
});</code></pre>
</div>
<p>حتماً policy/middleware دسترسی به همان entity اضافه شود (ورود کاربر ≠ مجوز مشاهده همه لاگ‌ها)؛ route خودکار ثبت نمی‌شود. شناسه‌ها عدد صحیح مثبت یا نسخه رمزشده (UUID پشتیبانی نمی‌شود)؛ شناسه نامعتبر یا لاگ موجودیت دیگر ⇒ 404؛ اکشن‌ها خود موجودیت را <code>findOrFail</code> نمی‌کنند.</p>
<p><strong>فیلترهای API:</strong> <code>page</code> (1..1000000)، <code>per_page</code> (سقف <code>AbolFrame-api-kit.pagination.max_limit</code>)، <code>action[]</code> (1 ایجاد، 2 ویرایش، 3 حذف — آرایه یکتا)، <code>username</code>، <code>ip</code> (جزئی)، <code>created_from/created_to</code> (شمسی <code>Y/m/d H:i</code>؛ پایان قبل از شروع ⇒ 422). پذیرفته نمی‌شود: <code>section, entity_type, entity_id, user_role_id</code>.</p>
<p><strong>خروجی لیست:</strong> <code>{code:1, message:null, data:[{id,title,ip,entity_type,entity_type_name,created_at,log_type,log_type_name,user:{id,first_name,last_name,national_code}}], meta:{pagination:{page,pageSize,pageCount,total}}}</code> — <code>data</code> آرایه است نه <code>data.items</code>.</p>
<p><strong>خروجی جزئیات:</strong> <code>data.event{ip,entity_type,...,description}</code>, <code>old_values[]</code>, <code>new_values[]</code> با <code>{name, display_name, value:{value}}</code>؛ فقط فیلدهای <code>fields()</code>. <code>national_code</code> از فیلد واقعی <code>national_code</code> یا <code>code</code>. شناسه‌ها توسط <code>Response::success</code> رمز می‌شوند (در formatter دوباره رمز نکنید). هدر هر دو: <code>Cache-Control: private, no-store</code>. <code>$with</code> پیش‌فرض شامل <code>entity</code> و <code>userable</code>؛ اگر لازم نیست <code>public array $with = [&#039;userable&#039;];</code>.</p>
<p><strong>Compact:</strong> لیست <code>Audit::config($c)-&gt;compactFields()</code>؛ جزئیات <code>compactFields(false)</code>.</p>
<p><strong>تست:</strong> <code>curl --get &#039;.../api/v1/teachers/ENTITY_ID/logs&#039; -H &#039;Authorization: Bearer ...&#039; --data-urlencode &#039;page=1&#039; --data-urlencode &#039;action[]=2&#039;</code>.</p>
<h3 id="sec-abolframe-bladelayout-generators-39" class="scroll-mt-header">E.8 Badge Counter در Section</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>Section::make(&#039;section_logs&#039;)-&gt;label(&#039;لاگ تغییرات&#039;)-&gt;icon(&#039;fa-regular fa-clipboard-list&#039;)-&gt;routeName(&#039;teachers.logs&#039;)
    -&gt;badge(fn () =&gt; numberSeparator(Audit::config(TeacherAudit::class)-&gt;forEntity($this-&gt;teacher)-&gt;count()));
// یا: (new TeacherAudit())-&gt;setEntity($this-&gt;teacher)-&gt;getLogsCount()</code></pre>
</div>
<h3 id="sec-abolframe-bladelayout-generators-40" class="scroll-mt-header">E.9 فیلترهای UI</h3>
<p>شناسه کاربر (<code>setUserIdentifierField</code>، پیش‌فرض کدملی)، نوع عملیات <code>action[]</code>، بخش مربوطه <code>section[]</code> (فقط بیش از یک Resource)، آی‌پی، بازه تاریخ شمسی.</p>
<h3 id="sec-abolframe-bladelayout-generators-41" class="scroll-mt-header">E.10 نکات</h3>
<p>ثبت خودکار: <code>AuditServiceProvider</code> + رویداد <code>ModelChanged</code> + listener <code>StoreModelChangeAudit</code>. مدل <code>MyLaravelCore\\Support\\Generators\\Audit\\AuditManager</code> و جدول <code>logs</code>؛ enum عملیات <code>AuditType</code>. <code>setEntity()</code> در فرم فیلتر UI نمایش داده نمی‌شود.</p>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-bladelayout-generators-42" class="scroll-mt-header">بخش F — Banner Generator</h2>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>namespace Modules\\Bank\\Generators\\Banners;
class BankBanner extends BaseBanner
{
    public function items(): array
    {
        return [Banner::make()-&gt;label(__(&#039;bank::general.bank&#039;))-&gt;value($this-&gt;bank-&gt;name)-&gt;icon(&#039;fa-solid fa-building-columns&#039;)];
    }
}</code></pre>
</div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>BladeLayout::data(compact(&#039;bank&#039;));
BladeLayout::banner(BankBanner::class);
return view(&#039;bank::show&#039;, compact(&#039;bank&#039;));   // در show و edit</code></pre>
</div>
<p>گروه‌های extend: <code>items</code>, <code>actionButtons</code>, <code>titleSuffixes</code>, <code>titlePrefixes</code>.</p>
        `
    },
    {
        id: "abolframe-table-generator",
        title: "۸. Table Generator — مرجع کامل",
        icon: "fa-table",
        category: "مستندات جامع ابول فریم (AbolFrame)",
        content: `
<h1>۸. Table Generator — توضیح کامل</h1>
<div class="toc-quick-jump-card my-4 p-3 rounded-3 border bg-body-tertiary"><div class="d-flex align-items-center justify-content-between mb-2"><strong class="text-primary small"><i class="fa fa-compass ms-1"></i> فهرست سریع آیتم‌ها، متدها و کامپوننت‌های این بخش (23 مورد):</strong></div><div class="d-flex flex-wrap gap-2"><a href="#sec-abolframe-table-generator-1" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش A — شروع به کار</a><a href="#sec-abolframe-table-generator-2" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.1 ایجاد کلاس</a><a href="#sec-abolframe-table-generator-3" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.2 درایورها</a><a href="#sec-abolframe-table-generator-4" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.3 استفاده در Controller</a><a href="#sec-abolframe-table-generator-5" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش B — ستون‌ها (addColumn)</a><a href="#sec-abolframe-table-generator-6" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.1 پارامترها</a><a href="#sec-abolframe-table-generator-7" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.2 گزینه‌های options</a><a href="#sec-abolframe-table-generator-8" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.4 سلول سفارشی (Custom Cell)</a><a href="#sec-abolframe-table-generator-9" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.5 رابطه morph در ستون</a><a href="#sec-abolframe-table-generator-10" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش C — فیلترها (addFilter)</a><a href="#sec-abolframe-table-generator-11" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">C.1 پارامترها</a><a href="#sec-abolframe-table-generator-12" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">C.2 گزینه‌های options</a><a href="#sec-abolframe-table-generator-13" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">C.3 select وابسته با Infinite Scroll</a><a href="#sec-abolframe-table-generator-14" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">C.4 فیلتر روی رابطه چندریختی (Morph Filter)</a><a href="#sec-abolframe-table-generator-15" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">C.5 قوانین مصوب فیلتر</a><a href="#sec-abolframe-table-generator-16" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش D — دکمه‌های عملیاتی هر سطر (addColumnAction)</a><a href="#sec-abolframe-table-generator-17" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">D.1 پارامترها</a><a href="#sec-abolframe-table-generator-18" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش E — نوار ابزار (Toolbar)</a><a href="#sec-abolframe-table-generator-19" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">E.1 addToolbarButton</a><a href="#sec-abolframe-table-generator-20" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">E.2 سوییچ نوار ابزار (addToggle)</a><a href="#sec-abolframe-table-generator-21" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش F — عملیات دسته‌ای (addBulkOperationButton)</a><a href="#sec-abolframe-table-generator-22" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش G — ردیف‌های ثابت (Pinned Rows)</a><a href="#sec-abolframe-table-generator-23" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش H — تنظیمات جدول (در constructor؛ قابل زنجیر)</a></div></div>
<p>Table Generator ابزاری متنوع و قدرتمند برای تولید جداول با قابلیت‌های سفارشی است: ستون‌ها، دکمه‌های عملیاتی هر سطر، فیلترها، عملیات دسته‌ای، دکمه‌ها و سوییچ‌های نوار ابزار، ردیف‌های ثابت، import/export.</p>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-table-generator-1" class="scroll-mt-header">بخش A — شروع به کار</h2>
<h3 id="sec-abolframe-table-generator-2" class="scroll-mt-header">A.1 ایجاد کلاس</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BASH</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>php artisan AbolFrame:make-table SampleTable
php artisan AbolFrame:make-table SampleTable --module=MODULE_NAME</code></pre>
</div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>namespace App\\Generators\\Tables;
use MyLaravelCore\\Tables\\BaseTable;

class SampleTable extends BaseTable
{
    public function __construct()
    {
        $this-&gt;setTitle(&#039;عنوان جدول&#039;);
        $this-&gt;setDriver(Driver::MODEL);
        $this-&gt;setResource(SampleModel::class);
    }
    public function columns(): void {}        // ستون‌ها
    public function columnActions(): void {}  // دکمه‌های عملیاتی هر سطر
    public function filters(): void {}        // فیلترها
    public function toolbar(): void {}        // دکمه‌ها/سوییچ‌های نوار ابزار
    public function bulkOperations(): void {} // عملیات دسته‌ای
}</code></pre>
</div>
<h3 id="sec-abolframe-table-generator-3" class="scroll-mt-header">A.2 درایورها</h3>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>درایور</th><th>توضیح</th></tr></thead><tbody><tr><td><code>Driver::MODEL</code></td><td>Eloquent؛ <strong>پیش‌فرض</strong>؛ <code>setResource(Bank::class)</code>؛ Query Builder با <code>getQueryBuilder()</code> (پس از <code>setResource</code>)</td></tr><tr><td><code>Driver::RAW</code></td><td>داده خام به‌صورت Collection با <code>setData($collection)</code> (مثلاً از API یا منبع دیگر)</td></tr><tr><td><code>Driver::API</code></td><td><code>setResource(new APIResourceDTO(connection: &#039;AbolFrame_provider&#039;, method: &#039;GET&#039;, path: &#039;/customers&#039;))</code>؛ اتصال در <code>config/AbolFrame-panel-kit.php → table_generator.api_connections</code></td></tr></tbody></table></div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>// Raw
$this-&gt;setDriver(Driver::RAW);
$this-&gt;setData(collect([[&#039;id&#039;=&gt;1,&#039;tracking_code&#039;=&gt;&#039;123456789&#039;,&#039;created_at&#039;=&gt;&#039;2023-01-10 12:00:00&#039;]]));</code></pre>
</div>
<p>در درایور RAW ردیف‌ها به <code>stdClass</code> تبدیل می‌شوند.</p>
<h3 id="sec-abolframe-table-generator-4" class="scroll-mt-header">A.3 استفاده در Controller</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>BladeLayout::table(BankTable::class);
return view(&#039;bank::index&#039;);</code></pre>
</div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-default-layout&gt;{!! bladeLayout()-&gt;table()-&gt;render() !!}&lt;/x-default-layout&gt;</code></pre>
</div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-table-generator-5" class="scroll-mt-header">بخش B — ستون‌ها (<code>addColumn</code>)</h2>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$this-&gt;addColumn(name: &#039;title&#039;, label: __(&#039;table.sample.title&#039;), type: &#039;text&#039;, sortable: true);
$this-&gt;addColumn(name: &#039;status&#039;, label: &#039;وضعیت&#039;, type: function ($value, $entity) { return $value === &#039;active&#039; ? &#039;فعال&#039; : &#039;غیرفعال&#039;; }, sortable: true);
$this-&gt;addColumn(name: &#039;image&#039;, label: &#039;تصویر&#039;, type: &#039;image&#039;, sortable: false);</code></pre>
</div>
<h3 id="sec-abolframe-table-generator-6" class="scroll-mt-header">B.1 پارامترها</h3>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پارامتر</th><th>توضیح</th></tr></thead><tbody><tr><td><code>name</code></td><td>نام ستون؛ در Model Driver باید با فیلد مدل مطابق باشد. <code>column:relation</code> (مثل <code>name:status</code>) رابطه را eager-load می‌کند</td></tr><tr><td><code>label</code></td><td>عنوان هدر</td></tr><tr><td><code>type</code></td><td><code>text</code> (ساده)، <code>badge</code>، <code>datetime</code>، <code>image</code>، <code>video</code>، یا <strong>Closure</strong> <code>($value, $entity)</code></td></tr><tr><td><code>sortable</code></td><td>فعال‌سازی مرتب‌سازی</td></tr><tr><td><code>sortCast</code></td><td>نوع داده برای sort (Model Driver): <code>string, integer, float, boolean, date, datetime, timestamp</code>؛ مستقیم روی Query اثر دارد؛ <code>null</code> = تعیین نمی‌شود</td></tr><tr><td><code>labelClass</code></td><td>کلاس CSS هدر</td></tr><tr><td><code>bodyAlign</code></td><td><code>left</code> / <code>center</code> / <code>right</code></td></tr><tr><td><code>direction</code></td><td><code>ltr</code> / <code>rtl</code></td></tr><tr><td><code>width</code></td><td>پیکسلی یا درصدی؛ برای ستون‌های merge شده به <strong>ستون اول</strong> بدهید</td></tr><tr><td><code>mergeGroup</code></td><td>سلول‌هایی با مقدار یکسان ادغام می‌شوند (گروه‌بندی ستون‌ها در یک سلول)</td></tr><tr><td><code>groupBreakLineSection</code></td><td><code>header</code> یا <code>body</code> برای اعمال <code>groupBreakLine</code></td></tr><tr><td><code>tooltip</code></td><td>متن راهنما؛ رشته یا Closure با <code>$entity</code></td></tr><tr><td><code>permission</code></td><td>کلید دسترسی (string)؛ بدون دسترسی ستون نمایش داده نمی‌شود</td></tr><tr><td><code>visibility</code></td><td>bool یا Closure ارزیابی‌شده هنگام رندر؛ برای سوییچ: <code>visibility: fn() =&gt; !$this-&gt;toggleIsOn(&#039;own_records&#039;)</code></td></tr><tr><td><code>valueVisibility</code></td><td>نمایش/عدم نمایش <strong>مقدار هر سطر</strong> (ستون حذف نمی‌شود)؛ Closure با <code>$entity</code></td></tr><tr><td><code>centered</code></td><td>عنوان ستون در مرکز</td></tr><tr><td><code>options</code></td><td>تنظیمات اضافی (پایین)</td></tr></tbody></table></div>
<p><strong>مثال <code>valueVisibility</code>:</strong> نمایش تصویر یا ویدیو بر اساس پسوند فایل (دو ستون با <code>name: &#039;file_id&#039;</code> و <code>mergeGroup: &#039;file&#039;</code>؛ یکی <code>type:&#039;image&#039;</code> با شرط پسوند تصویری و دیگری <code>type:&#039;video&#039;</code> با شرط معکوس).</p>
<h3 id="sec-abolframe-table-generator-7" class="scroll-mt-header">B.2 گزینه‌های <code>options</code></h3>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>کلید</th><th>توضیح</th></tr></thead><tbody><tr><td><code>groupHeadTooltip</code></td><td>tooltip سرستون‌های ادغام‌شده؛ روی <strong>اولین ستون</strong> گروه</td></tr><tr><td><code>groupBodyTooltip</code></td><td>tooltip سلول‌های ادغام‌شده؛ روی اولین ستون</td></tr><tr><td><code>groupBreakLine</code></td><td><code>true</code>: ستون‌های بعدی در خط جدید (ستونی که این را دارد باعث می‌شود بعدی‌ها خط بعد بروند)</td></tr><tr><td><code>groupBreakLineSection</code></td><td><code>body</code> / <code>header</code>؛ پیش‌فرض هر دو</td></tr><tr><td><code>theadSeparator</code></td><td>جداکننده سرستون‌های ادغام‌شده؛ پیش‌فرض <code>/</code></td></tr><tr><td><code>tbodySeparator</code></td><td>جداکننده سلول‌ها؛ پیش‌فرض ندارد</td></tr><tr><td><code>groupOrientation</code></td><td><code>horizontal</code> (پیش‌فرض) / <code>vertical</code></td></tr><tr><td><code>groupHref</code></td><td>لینک گروه؛ روی اولین ستون؛ کلیک روی ستون‌های ادغام‌شده کاربر را به آن می‌برد</td></tr><tr><td><code>enumLabel</code></td><td>برچسب سفارشی برای ستون <code>badge</code> با Enum؛ رشته یا Closure <code>($enumValue)</code>؛ تعیین‌نشده = ترجمه پیش‌فرض</td></tr><tr><td><code>sortByLabel</code></td><td><code>true</code>: مرتب‌سازی بر اساس <strong>برچسب</strong> نمایشی به‌جای value؛ فقط ستون‌هایی که روی مدل به Backed Enum cast شده‌اند (مستقیم یا رابطه‌ای <code>status:user</code>)؛ در Model و Raw Driver. ترتیب تشخیص برچسب: <code>enumLabel</code> → متد <code>label()</code> روی case → ترجمه <code>general.{enum}.{case}</code></td></tr><tr><td><code>sortQuery</code></td><td>تابع سفارشی sort <code>(query, direction)</code>؛ برای ستون‌های رابطه‌های تودرتو؛ منطق پیش‌فرض اعمال نمی‌شود</td></tr></tbody></table></div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$this-&gt;addColumn(name: &#039;title:event&#039;, label: __(&#039;base::section.eventType&#039;), options: [
    &#039;sortQuery&#039; =&gt; function ($query, $direction) {
        $query-&gt;leftJoin(&#039;events as events_sort_alias&#039;, &#039;events_sort_alias.id&#039;, &#039;=&#039;, &#039;objections.event_id&#039;)
              -&gt;leftJoin(&#039;event_types as event_types_sort_alias&#039;, &#039;event_types_sort_alias.id&#039;, &#039;=&#039;, &#039;events_sort_alias.event_type_id&#039;)
              -&gt;orderBy(&#039;event_types_sort_alias.name&#039;, $direction);
    },
]);</code></pre>
</div>
<h3 id="sec-abolframe-table-generator-8" class="scroll-mt-header">B.4 سلول سفارشی (Custom Cell)</h3>
<p><code>type</code> را با Closure پر کنید: <code>($value, $entity)</code>؛ باید مقدار قابل‌نمایش برگرداند. می‌توانید چند مقدار ترکیب، خروجی شرطی، HTML یا کامپوننت Blade رندر کنید.</p>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ خروجی Closure به‌صورت <strong>HTML خام</strong> رندر می‌شود؛ escape داده‌های پویا با شماست (<code>e()</code>).</div></div>
<p>مثال‌ها:</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>// فرمت مقدار
type: fn ($value) =&gt; $value === null ? &#039;-&#039; : numberSeparator($value),

// HTML خام با escape
type: function ($value, $entity) {
    $full = $entity-&gt;first_name.&#039; &#039;.$entity-&gt;last_name;
    return &#039;&lt;div class=&quot;d-flex align-items-center gap-2&quot;&gt;&lt;span class=&quot;fw-bold text-gray-800&quot;&gt;&#039;.e($full).&#039;&lt;/span&gt;&lt;span class=&quot;badge badge-light-primary&quot;&gt;کاربر فعال&lt;/span&gt;&lt;/div&gt;&#039;;
},

// کامپوننت Badge (مثل UserTable)
use MyLaravelCore\\Components\\Design\\Badge;
type: fn ($value, $entity) =&gt; $value === HasSpecialPermission::YES
    ? renderComponent(Badge::class, [&#039;icon&#039;=&gt;&#039;fa-solid fa-star&#039;,&#039;variant&#039;=&gt;&#039;warning&#039;,&#039;appearance&#039;=&gt;&#039;none&#039;,&#039;class&#039;=&gt;&#039;p-0 m-0&#039;])
    : &#039;&lt;span class=&quot;hidden-parent&quot;&gt;&lt;/span&gt;&#039;,</code></pre>
</div>
<p><strong>رابطه‌ها و متدها:</strong> <code>$entity</code> کل سطر است (در Model Driver = مدل Eloquent)؛ <code>$entity-&gt;roles-&gt;pluck(&#039;name&#039;)-&gt;all()</code>. بهتر است رابطه را صریح load کنید.</p>
<p><strong>نمایش شرطی مقدار:</strong> <code>valueVisibility: fn($entity) =&gt; $entity-&gt;has_discount === true</code>.</p>
<p><strong>tooltip پویا:</strong> <code>tooltip: fn($entity) =&gt; $entity-&gt;description</code> (Closure فقط <code>$entity</code> می‌گیرد).</p>
<p><strong>ستون‌های ادغامی:</strong> Closure در ستون‌های <code>mergeGroup</code> هم کار می‌کند (در <code>UserTable</code> ستون‌های avatar/first_name/last_name در <code>mergeGroup: &#039;full_name&#039;</code>).</p>
<p><strong>دسترسی به متغیر بیرونی:</strong> <code>function ($value, $entity) use ($currency)</code>.</p>
<p><strong><code>{{ }}</code> در رشته کار نمی‌کند</strong> (Blade این رشته را compile نمی‌کند). معادل‌ها:</p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>React</th><th>این سیستم</th></tr></thead><tbody><tr><td><code>&lt;div&gt;{data}&lt;/div&gt;</code></td><td><code>&quot;&lt;div&gt;{$data}&lt;/div&gt;&quot;</code> — interpolation PHP</td></tr><tr><td>JSX شرطی</td><td>Closure با <code>if</code> / <code>?:</code></td></tr><tr><td><code>&lt;Badge value={x}/&gt;</code></td><td><code>renderComponent(Badge::class, [...])</code></td></tr><tr><td>JSX با escape خودکار</td><td>ویو Blade با <code>{{ }}</code> (escape) و <code>{!! !!}</code> (خام)</td></tr></tbody></table></div>
<p>یا Heredoc برای HTML چندخطی، یا <code>view(&#039;panel::tables.cells.user-name&#039;, [...])-&gt;render()</code>.</p>
<p><strong>سورت در سلول سفارشی:</strong> <code>sortable: false</code>؛ یا <code>name</code> را ستون واقعی بدهید (sort روی مقدار خام ستون)؛ یا <code>options.sortQuery</code>.</p>
<p><strong>مقایسه typeها:</strong></p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>type</th><th>کاربرد</th><th>محدودیت</th></tr></thead><tbody><tr><td><code>text</code></td><td>متن ساده</td><td>بدون قالب</td></tr><tr><td><code>image</code></td><td>تصویر با popup</td><td>فقط تصویر</td></tr><tr><td><code>badge</code></td><td>بج با <code>badgeVariant</code>/<code>enumLabel</code>/<code>badgeCustomColor</code></td><td>فقط بج</td></tr><tr><td><code>datetime</code></td><td>تاریخ شمسی با <code>dateFormat</code></td><td>فقط تاریخ</td></tr><tr><td><code>video</code></td><td>ویدیو با popup</td><td>فقط ویدیو</td></tr><tr><td>Closure</td><td>هر چیز</td><td>مسئولیت escape با شما؛ sort دستی</td></tr></tbody></table></div>
<h3 id="sec-abolframe-table-generator-9" class="scroll-mt-header">B.5 رابطه morph در ستون</h3>
<p>رابطه <code>morphTo</code> قابل join نیست؛ ستون پیش‌فرض قابل sort نیست. با <code>morphLabelSql(name:, types:, labels:)</code> نام را به‌عنوان ستون معمولی وارد کوئری کنید و ستون را روی آن تعریف کنید؛ برای <strong>هر نوع enum یک label</strong> بدهید (وگرنه آن ردیف‌ها NULL). زیرکوئری از index استفاده نمی‌کند؛ برای جدول میلیونی ستون denormalized.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$this-&gt;getQueryBuilder()-&gt;addSelect(&#039;tickets.*&#039;)-&gt;selectRaw(
    $this-&gt;morphLabelSql(name:&#039;creatable&#039;, types: TicketCreatableType::class, labels: [
        TicketCreatableType::Admin-&gt;value  =&gt; fn ($key) =&gt; &quot;SELECT TRIM(CONCAT(COALESCE(admins.first_name,&#039;&#039;),&#039; &#039;,COALESCE(admins.last_name,&#039;&#039;))) FROM admins WHERE admins.id = {$key}&quot;,
        TicketCreatableType::Member-&gt;value =&gt; fn ($key) =&gt; &quot;SELECT TRIM(CONCAT(COALESCE(mp.fname,&#039;&#039;),&#039; &#039;,COALESCE(mp.lname,&#039;&#039;))) FROM member_persons mp WHERE mp.member_id = {$key} ORDER BY mp.id LIMIT 1&quot;,
    ]).&#039; as creatable_sort_name&#039;);
$this-&gt;addColumn(name: &#039;creatable_sort_name&#039;, label: __(&#039;ticket::general.full_name&#039;), type: static fn ($value) =&gt; $value ?? &#039;-&#039;, sortable: true);</code></pre>
</div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-table-generator-10" class="scroll-mt-header">بخش C — فیلترها (<code>addFilter</code>)</h2>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$this-&gt;addFilter(name: &#039;title&#039;, elementName: &#039;filter_title&#039;, elementType: &#039;text&#039;, label: &#039;عنوان&#039;, operator: &#039;%&#039;);
$this-&gt;addFilter(name: &#039;status&#039;, elementName: &#039;filter_status&#039;, elementType: &#039;select&#039;, label: &#039;وضعیت&#039;,
    data: [[&#039;id&#039;=&gt;1,&#039;name&#039;=&gt;&#039;فعال&#039;,&#039;is_active&#039;=&gt;true,&#039;selected&#039;=&gt;false], [&#039;id&#039;=&gt;2,&#039;name&#039;=&gt;&#039;غیر فعال&#039;,&#039;is_active&#039;=&gt;true,&#039;selected&#039;=&gt;false]]);</code></pre>
</div>
<h3 id="sec-abolframe-table-generator-11" class="scroll-mt-header">C.1 پارامترها</h3>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پارامتر</th><th>توضیح</th></tr></thead><tbody><tr><td><code>name</code></td><td>نام فیلد مرتبط (باید با مدل/منبع داده مطابق باشد)</td></tr><tr><td><code>elementName</code></td><td>نام المان UI؛ <strong>یکتا</strong> (معمولاً <code>filter_*</code>)</td></tr><tr><td><code>elementType</code></td><td><code>text</code>, <code>numeric</code>, <code>select</code>, <code>multiselect</code>, <code>datetime</code>, <code>radio_group</code>, <code>checkbox</code></td></tr><tr><td><code>label</code></td><td>عنوان؛ <code>null</code> = از ترجمه‌ها</td></tr><tr><td><code>range</code></td><td><code>true</code>: دو ورودی from/to (مثلاً تاریخ)</td></tr><tr><td><code>operator</code></td><td><code>=</code>، <code>%</code> (شامل)، <code>in</code>؛ <code>null</code> = پیش‌فرض</td></tr><tr><td><code>class</code></td><td>کلاس CSS (به <code>containerClass</code> کامپوننت اضافه می‌شود)</td></tr><tr><td><code>data</code></td><td>داده‌های select/multiselect (<code>id,name,is_active,selected</code>)</td></tr><tr><td><code>cast</code></td><td><code>string, integer, float, boolean, date, datetime, timestamp</code> — Model Driver روی Query و Raw Driver روی Collection</td></tr><tr><td><code>validator</code></td><td><code>filterValidation([...])</code></td></tr><tr><td><code>permission</code></td><td>کلید دسترسی = نام Route؛ بدون دسترسی فیلتر نمایش داده نمی‌شود</td></tr><tr><td><code>visibility</code></td><td>bool یا callable (برای سوییچ: <code>fn() =&gt; !$this-&gt;toggleIsOn(&#039;own_records&#039;)</code>)</td></tr><tr><td><code>withBreakLine</code></td><td>فیلتر در خط جدید</td></tr><tr><td><code>options</code></td><td>attributeهای کامپوننت مربوط به نوع + کلیدهای زیر</td></tr></tbody></table></div>
<h3 id="sec-abolframe-table-generator-12" class="scroll-mt-header">C.2 گزینه‌های <code>options</code></h3>
<ul><li><strong>Attributeهای کامپوننت:</strong> <code>type: &#039;number&#039;</code> + <code>options: [&#039;prefix&#039;=&gt;&#039;ریال&#039;,&#039;hint&#039;=&gt;&#039;...&#039;]</code>.</li><li><code>escapeSqlWildcards</code>: کاراکترهای <code>%</code> و <code>_</code> در LIKE خطای منطقی می‌دهند؛ این گزینه (پیش‌فرض <code>true</code>) فقط وقتی operator <code>%</code> است عمل می‌کند.</li><li><code>customQuery(fn ($queryBuilder, $selected))</code>: منطق کامل فیلتر را خودتان پیاده می‌کنید و منطق خودکار اعمال <strong>نمی‌شود</strong>.</li><li><code>all_label</code>: برچسب گزینه «همه» در <code>radio_group</code>.</li><li><code>active_badge_label</code>: متن badge فیلتر فعال (برای checkbox)؛ <code>null</code> = label فیلتر.</li><li>بازه‌ای عددی: <code>fromSuffix/toSuffix/fromPrefix/toPrefix</code> (یا <code>suffix/prefix</code> مشترک)، <code>fromLabel/toLabel</code> (اگر داده شوند <code>label</code> اعمال نمی‌شود؛ <code>label</code> فقط برای فیلد اول)، <code>labelSpaceReserved</code>.</li></ul>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$this-&gt;addFilter(name:&#039;code&#039;, elementName:&#039;filter_code&#039;, elementType:&#039;numeric&#039;, range:true, class:&#039;col-md-6 filter-dir&#039;,
    validator: filterValidation([new BankBranchCodeRule(), &#039;numeric&#039;, &#039;max:9999&#039;]),
    options: [&#039;toPrefix&#039;=&gt;&#039;تا&#039;,&#039;fromPrefix&#039;=&gt;&#039;از&#039;,&#039;suffix&#039;=&gt;&#039;دقیقه&#039;,&#039;fromLabel&#039;=&gt;&#039;زمان مطالعه&#039;,&#039;labelSpaceReserved&#039;=&gt;true]);</code></pre>
</div>
<h3 id="sec-abolframe-table-generator-13" class="scroll-mt-header">C.3 select وابسته با Infinite Scroll</h3>
<p><code>options</code> کلیدهای: <code>selectParentId</code> (elementName والد)، <code>selectRouteName</code> (API گزینه‌ها)، <code>selectInfiniteScroll</code> (صفحه‌ای)، <code>selectSearchBarVisibility</code>.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$this-&gt;addFilter(name:&#039;sample_parent_role&#039;, elementName:&#039;filter_sample_parent_role&#039;, elementType:&#039;select&#039;, label:&#039;Sample Parent (Role)&#039;, class:&#039;col-lg-4&#039;,
    data: prepareSelectComponentData(source: AbolFrame::getModel(&#039;role&#039;, AbolFrameComponent::ACCESS_HUB)::query()-&gt;orderBy(&#039;sort&#039;)-&gt;get()),
    options: [&#039;searchBarVisibility&#039; =&gt; true]);
$this-&gt;addFilter(name:&#039;sample_bank_dependent&#039;, elementName:&#039;filter_sample_bank_dependent&#039;, elementType:&#039;select&#039;, label:&#039;Sample Child (Bank - Infinite)&#039;, class:&#039;col-lg-4&#039;,
    options: [&#039;selectParentId&#039;=&gt;&#039;filter_sample_parent_role&#039;,&#039;selectRouteName&#039;=&gt;&#039;api.admin.api.banks.index&#039;,&#039;selectInfiniteScroll&#039;=&gt;true,&#039;selectSearchBarVisibility&#039;=&gt;true]);</code></pre>
</div>
<h3 id="sec-abolframe-table-generator-14" class="scroll-mt-header">C.4 فیلتر روی رابطه چندریختی (Morph Filter)</h3>
<p>ستون‌های <code>{name}_type</code> و <code>{name}_id</code> ⇒ <strong>دو Select</strong>: نوع و رکورد همان نوع.</p>
<ol><li><strong>enum نوع‌ها</strong> با مقدار = نام کلاس مدل (همان چیزی که در <code>{name}_type</code> ذخیره می‌شود): <code>enum TicketCreatableType: string { case Admin = Admin::class; case Member = Member::class; }</code></li><li><strong>دو فیلتر:</strong> (الف) Select نوع با <code>prepareSelectComponentData(source: TicketCreatableType::class, moduleName:&#039;ticket&#039;)</code>؛ (ب) Select شناسه وابسته/Ajax با options: <code>parentId</code> = <code>elementName</code> Select نوع، <code>infiniteScroll: true</code> (بدون آن <code>routeName</code> و <code>parentId</code> بی‌اثرند)، <code>routeName</code>، <code>parameters.element</code> = <code>elementName</code> همین فیلتر، <code>perPage</code>, <code>searchBarVisibility</code>.</li><li><strong>کنترلر گزینه‌ها</strong>: <code>extends SelectController</code>؛ <code>__invoke</code> باید <code>table_generator_class</code> و <code>parameters.element</code> را بخواند و <code>$this-&gt;tableGenerators = [$tableGenerator =&gt; $element]</code> را پر کند (وگرنه خطای «tableGeneratorClass not found in the tableGenerators array»)؛ <code>query()</code> با <code>match</code> روی <code>$this-&gt;parentSelected</code> (default <code>null</code> ⇒ فقط نوع‌های enum پذیرفته می‌شوند)؛ برچسب هر گزینه به‌صورت SQL (<code>adminQuery()</code> روی جدول مستقیم، <code>memberQuery()</code> با زیرکوئری scalar)؛ <code>MorphOptions::caseInsensitiveLikeOperator()</code> برای جستجو؛ همان عبارت برای جستجو و sort.</li><li><strong>Route</strong> در <code>routes/api.php</code> ماژول: <code>Route::post(&#039;creatable-options&#039;, TicketCreatableOptionsController::class)-&gt;name(&#039;ticket.creatable-options&#039;);</code></li></ol>
<h3 id="sec-abolframe-table-generator-15" class="scroll-mt-header">C.5 قوانین مصوب فیلتر</h3>
<p>«تاریخ شروع» و «تاریخ پایان» در یک سطر؛ ماسک تاریخ برای همه فیلدهای تاریخ.</p>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-table-generator-16" class="scroll-mt-header">بخش D — دکمه‌های عملیاتی هر سطر (<code>addColumnAction</code>)</h2>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$this-&gt;addColumnAction(type:&#039;link&#039;, title:&#039;نمایش&#039;, target: fn ($entity) =&gt; route(&#039;sample.show&#039;, [&#039;entity&#039;=&gt;$entity-&gt;id]), iconClass:&#039;fa-regular fa-eye&#039;);
$this-&gt;addColumnAction(type:&#039;modal&#039;, title:&#039;ویرایش&#039;, target:&#039;#editModal&#039;, attributes: fn ($entity) =&gt; [&#039;data-id&#039;=&gt;$entity-&gt;id]);
$this-&gt;addColumnAction(type:&#039;link&#039;, title:&#039;حذف&#039;, target: fn ($entity) =&gt; route(&#039;admin.basic.banks.destroy&#039;, encryptValue($entity-&gt;id)),
    targetMethod:&#039;DELETE&#039;, variant:&#039;danger&#039;, permission:&#039;admin.basic.banks.destroy&#039;,
    confirmation:true, confirmationMessage:&#039;آیا از حذف این مورد اطمینان دارید ؟&#039;, confirmationType:&#039;danger&#039;);</code></pre>
</div>
<h3 id="sec-abolframe-table-generator-17" class="scroll-mt-header">D.1 پارامترها</h3>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پارامتر</th><th>توضیح</th></tr></thead><tbody><tr><td><code>type</code></td><td><code>link</code> (URL)، <code>form</code> (Submit به URL؛ فقط <code>style: button</code>)، <code>modal</code> (باز کردن مودال؛ <code>#id</code>)، <code>button</code> (Confirmation Callback)</td></tr><tr><td><code>title</code></td><td>عنوان</td></tr><tr><td><code>target</code></td><td>link: URL؛ form: آدرس ارسال؛ modal: <code>#modalId</code>؛ Closure با <code>$entity</code></td></tr><tr><td><code>targetMethod</code></td><td><code>GET/POST/PUT/DELETE/PATCH</code></td></tr><tr><td><code>visibility</code></td><td>callable <code>($entity): bool</code></td></tr><tr><td><code>disabled</code></td><td>callable <code>($entity): bool</code>؛ <code>false</code> = همیشه فعال</td></tr><tr><td><code>style</code></td><td><code>dropdown</code> (منوی کشویی) / <code>button</code></td></tr><tr><td><code>variant</code></td><td>رنگ (<code>primary, secondary, success, danger...</code>)؛ یا enum <code>MyLaravelCore\\Enums\\Variant</code></td></tr><tr><td><code>appearance</code></td><td><code>outline, solid, light, transparent, none</code>؛ یا enum <code>Appearance</code></td></tr><tr><td><code>class</code>, <code>iconClass</code></td><td>کلاس و آیکن FontAwesome</td></tr><tr><td><code>tooltip</code>, <code>disabledTooltip</code></td><td>رشته یا Closure <code>($entity): string</code></td></tr><tr><td><code>permission</code></td><td>string (نام Route) / array / Closure <code>($entity)</code></td></tr><tr><td><code>permissionOnlyOne</code></td><td>فقط با permission آرایه‌ای؛ پیش‌فرض <code>true</code> = حداقل یکی کافی (مثل canAccess)؛ <code>false</code> = همه لازم</td></tr><tr><td><code>attributes</code></td><td>آرایه associative یا Closure</td></tr><tr><td><code>confirmation</code>, <code>confirmationMessage</code> (callable مجاز), <code>confirmationType</code> (<code>primary/danger/warning/success/info</code>), <code>confirmationIcon</code>, <code>confirmButtonText</code>, <code>cancelButtonText</code></td><td>تاییدیه</td></tr><tr><td><code>confirmationConfirmCallback</code></td><td>رشته <strong>کد JS اجراشونده در مرورگر</strong> (نام تابع یا عبارت کوتاه)؛ هرگز از ورودی کاربر ساخته نشود</td></tr></tbody></table></div>
<p>قانون مصوب: تمام منوهای قابل‌مشاهده سکشن‌ها باید در دکمه عملیاتی (Actions) نیز باشند؛ پیام حذف یکسان مصوب.</p>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-table-generator-18" class="scroll-mt-header">بخش E — نوار ابزار (Toolbar)</h2>
<h3 id="sec-abolframe-table-generator-19" class="scroll-mt-header">E.1 <code>addToolbarButton</code></h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$this-&gt;addToolbarButton(title:&#039;افزودن آیتم جدید&#039;, route: route(&#039;sample.create&#039;), icon:&#039;fa-solid fa-plus&#039;, disabled:false, tooltip:&#039;افزودن&#039;, variant:&#039;success&#039;);</code></pre>
</div>
<p>پارامترها: <code>title</code>, <code>route</code> (لینک؛ <code>null</code> = بدون لینک), <code>class</code>, <code>icon</code>, <code>variant</code> (رشته/enum), <code>disabled</code> (bool یا function), <code>tooltip</code> (رشته یا function), <code>disabledTooltip</code> (وقتی <code>disabled</code> فعال)، <code>appearance</code>, <code>attributes</code> (آرایه associative؛ مثلاً <code>data-bs-toggle</code>/<code>data-bs-target</code>), <code>permission</code> (نام Route؛ <code>null</code> = همیشه نمایش).</p>
<div class="callout info"><i class="fa fa-circle-info callout-icon"></i><div>قانون مصوب: علامت <code>+</code> به دکمه «درج».</div></div>
<h3 id="sec-abolframe-table-generator-20" class="scroll-mt-header">E.2 سوییچ نوار ابزار (<code>addToggle</code>)</h3>
<p>فقط یک وضعیت روشن/خاموش نگه می‌دارد؛ معنای آن با جدول است (با <code>toggleIsOn</code> بخوانید و نمایش ستون/فیلتر یا محدوده کوئری را به آن گره بزنید).</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>public function toolbar(): void { $this-&gt;addToggle(name:&#039;own_records&#039;, label:&#039;رکوردهای من&#039;, default:true); }
public function columns(): void { $this-&gt;addColumn(name:&#039;title:agency&#039;, label:&#039;نمایندگی&#039;, visibility: fn() =&gt; !$this-&gt;toggleIsOn(&#039;own_records&#039;)); }</code></pre>
</div>
<p>پارامترها: <code>name</code> (کلید وضعیت)، <code>label</code> (<code>null</code> = فقط سوییچ)، <code>default</code>، <code>visibility</code> (bool/Closure، مثلاً <code>fn() =&gt; !AgencyScope::isRestricted()</code>).</p>
<p>وضعیت در <strong>session</strong> (مثل فیلترها) ذخیره می‌شود؛ با صفحه‌بندی/فیلتر از بین نمی‌رود؛ هر جدول وضعیت خودش را دارد.</p>
<p><strong>محدود کردن ردیف‌ها:</strong> سوییچ فقط نمایش را کنترل می‌کند؛ در constructor <strong>بعد از <code>setResource</code></strong>: <code>if ($this-&gt;toggleIsOn(&#039;own_records&#039;)) { $this-&gt;getQueryBuilder()-&gt;whereIn(&#039;agency_id&#039;, $ids); }</code>.</p>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-table-generator-21" class="scroll-mt-header">بخش F — عملیات دسته‌ای (<code>addBulkOperationButton</code>)</h2>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$this-&gt;addBulkOperationButton(id:&#039;bulk-delete&#039;, title:&#039;حذف دسته‌ای&#039;, route: route(&#039;sample.bulk_delete&#039;), icon:&#039;fa-solid fa-trash&#039;, confirmation:true, confirmationMessage:&#039;آیا مطمئن هستید؟&#039;);</code></pre>
</div>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پارامتر</th><th>توضیح</th></tr></thead><tbody><tr><td><code>id</code></td><td>یکتا؛ id المنت HTML</td></tr><tr><td><code>title</code>, <code>route</code>, <code>elementClass</code>, <code>icon</code></td><td></td></tr><tr><td><code>disabled</code>, <code>tooltip</code>, <code>disabledTooltip</code> (فقط با <code>disabled=true</code>)</td><td></td></tr><tr><td><code>confirmation</code> (null = پیش‌فرض), <code>confirmationMessage</code>, <code>confirmationIcon</code>, <code>confirmationType</code>, <code>confirmButtonText</code>, <code>cancelButtonText</code></td><td>فقط با <code>confirmation=true</code></td></tr><tr><td><code>permission</code></td><td>نام Route؛ <code>null</code> = همیشه</td></tr><tr><td><code>attributes</code></td><td>آرایه associative</td></tr></tbody></table></div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-table-generator-22" class="scroll-mt-header">بخش G — ردیف‌های ثابت (Pinned Rows)</h2>
<p>ردیفی مثل «جمع کل» که همیشه در ابتدا/انتهای جدول دیده شود و sort جای آن را عوض نکند.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>BladeLayout::table()-&gt;setData($rows)-&gt;addPinnedRow([&#039;plan_type_name&#039;=&gt;&#039;جمع&#039;,&#039;total_capacity&#039;=&gt;$rows-&gt;sum(&#039;total_capacity&#039;),&#039;used_capacity&#039;=&gt;$rows-&gt;sum(&#039;used_capacity&#039;)]);</code></pre>
</div>
<p>ردیف را با همان کلیدهای ستون‌ها بسازید؛ <code>columnRenderer</code> ستون‌ها اعمال می‌شود؛ ستون‌های خالی، خالی نمایش داده می‌شوند. چند ردیف = چند بار <code>addPinnedRow</code>.</p>
<p><strong>موقعیت:</strong> پیش‌فرض انتها؛ بالا: <code>PinnedRowPosition::TOP</code> (<code>MyLaravelCore\\Tables\\Enums\\PinnedRowPosition</code>).</p>
<p><strong>رفتار:</strong> ردیف‌ها اصلاً وارد داده جدول نمی‌شوند و جدا به ویو داده می‌شوند؛ sort/فیلتر/صفحه‌بندی اثر ندارد؛ در شمارش رکوردها حساب نمی‌شوند؛ در انتخاب گروهی انتخاب نمی‌شوند؛ در تمام صفحات نمایش داده می‌شوند.</p>
<p><code>setPinnedRows(iterable $rows, ?PinnedRowPosition)</code> <strong>ردیف‌های قبلی همان موقعیت را پاک می‌کند</strong>؛ برای افزودن <code>addPinnedRow</code>. متدها: <code>setPinnedRows</code>, <code>addPinnedRow</code>, <code>getPinnedRows</code> (Collection), <code>hasPinnedRows</code> (بدون آرگومان هر دو موقعیت). پیش‌فرض موقعیت <code>BOTTOM</code>. استایل: کلاس <code>x-table-pinned-row</code>.</p>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-table-generator-23" class="scroll-mt-header">بخش H — تنظیمات جدول (در constructor؛ قابل زنجیر)</h2>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>متد</th><th>توضیح</th></tr></thead><tbody><tr><td><code>setTitle(&#039;...&#039;)</code></td><td>عنوان؛ تعیین‌نشده = عنوان صفحه</td></tr><tr><td><code>getQueryBuilder()-&gt;where(...)</code></td><td>Query Builder سفارشی (Model Driver)</td></tr><tr><td><code>setCustomReorderQuery(function ($query) {...})</code></td><td>مرتب‌سازی سفارشی</td></tr><tr><td><code>disableReorderButton(bool)</code></td><td>دکمه مرتب‌سازی مجدد؛ اگر ستون <code>sort</code> باشد پیش‌فرض نمایش داده می‌شود</td></tr><tr><td><code>setFilterContainerClass(&#039;gy-5&#039;)</code></td><td>کلاس فیلترها</td></tr><tr><td>\`setRowAttributes([...] \\</td><td>fn ($entity) =&gt; [...])\`</td></tr><tr><td><code>displayDataOnFilter()</code></td><td>داده فقط وقتی فیلتر اعمال شده نمایش داده شود</td></tr><tr><td><code>setImport(Class)</code> + <code>setImportRoute(&#039;name&#039;)</code></td><td>دکمه درج گروهی؛ کنترلر از <code>ImportUI\\Controllers\\ImportController</code> ارث ببرد</td></tr><tr><td><code>setExport(Class)</code> + <code>setExportRoute(&#039;name&#039;)</code></td><td>دکمه خروجی لیست؛ کنترلر از <code>ExportUI\\Controllers\\ExportController</code></td></tr><tr><td><code>setShowingRecords(false)</code></td><td>عدم نمایش «نمایش رکورد از / تا»</td></tr><tr><td><code>setShowingPaginationSizes(false)</code></td><td>عدم نمایش گزینه‌های «نمایش در صفحه»</td></tr><tr><td><code>withoutCard()</code></td><td>بدون کارت دربرگیرنده (وقتی خودتان در <code>x-card</code> می‌گذارید)</td></tr><tr><td><code>hideRecordCountBadge()</code></td><td>عدم نمایش badge تعداد رکورد</td></tr></tbody></table></div>
<p><strong>قوانین مصوب جدول:</strong> مرتب‌سازی پیش‌فرض آخرین رکورد (<code>created_at DESC</code>/<code>latest()</code>); Transferable Statuses حداکثر ۲ مورد + <code>...</code> با tooltip هاور؛ مدیریت پایه با Table Generator.</p>
        `
    },
    {
        id: "abolframe-crud-guide",
        title: "۹. راهنمای گام‌به‌گام ساخت CRUD",
        icon: "fa-list-check",
        category: "مستندات جامع ابول فریم (AbolFrame)",
        content: `
<h1>۹. راهنمای ساخت مدیریت پایه (CRUD کامل) — توضیح کامل</h1>
<div class="toc-quick-jump-card my-4 p-3 rounded-3 border bg-body-tertiary"><div class="d-flex align-items-center justify-content-between mb-2"><strong class="text-primary small"><i class="fa fa-compass ms-1"></i> فهرست سریع آیتم‌ها، متدها و کامپوننت‌های این بخش (15 مورد):</strong></div><div class="d-flex flex-wrap gap-2"><a href="#sec-abolframe-crud-guide-1" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">مرحله ۱ — ساخت ماژول</a><a href="#sec-abolframe-crud-guide-2" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">مرحله ۲ — تنظیم مسیرها</a><a href="#sec-abolframe-crud-guide-3" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">مرحله ۳ — کنترلر (Resource)</a><a href="#sec-abolframe-crud-guide-4" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">مرحله ۴ — مسیرهای CRUD (web.php)</a><a href="#sec-abolframe-crud-guide-5" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">مرحله ۵ — تعریف منو</a><a href="#sec-abolframe-crud-guide-6" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">مرحله ۶ — مدل</a><a href="#sec-abolframe-crud-guide-7" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">مرحله ۷ — فایل‌های Blade</a><a href="#sec-abolframe-crud-guide-8" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">مرحله ۸ — صفحه لیست (Index)</a><a href="#sec-abolframe-crud-guide-9" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">مرحله ۹ — صفحه درج (Create)</a><a href="#sec-abolframe-crud-guide-10" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">مرحله ۱۰ — صفحه جزئیات (Show)</a><a href="#sec-abolframe-crud-guide-11" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">مرحله ۱۱ — صفحه ویرایش (Edit)</a><a href="#sec-abolframe-crud-guide-12" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">مرحله ۱۲ — حذف</a><a href="#sec-abolframe-crud-guide-13" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">اصلاحات پروژه AbolFrame نسبت به مثال رسمی</a><a href="#sec-abolframe-crud-guide-14" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">Dynamic Status</a><a href="#sec-abolframe-crud-guide-15" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">تأیید CRUD (اجباری)</a></div></div>
<p>مثال: ماژول <strong>Bank</strong>. با AbolFrame و ساختار ماژولار یک مدیریت کامل (لیست، درج، نمایش، ویرایش، حذف) می‌سازیم.</p>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-crud-guide-1" class="scroll-mt-header">مرحله ۱ — ساخت ماژول</h2>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BASH</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>php artisan module:make Bank</code></pre>
</div>
<h2 id="sec-abolframe-crud-guide-2" class="scroll-mt-header">مرحله ۲ — تنظیم مسیرها</h2>
<ol><li><strong>پاک‌کردن مسیرهای پیش‌فرض</strong> <code>MODULE_NAME/routes/web.php</code> و <code>api.php</code> (به‌جای <code>MODULE_NAME</code> نام ماژول).</li><li><strong><code>RouteServiceProvider</code></strong>: prefix، as و middleware.</li></ol>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>// وب
Route::middleware([&#039;web&#039;, &#039;authorized&#039;])-&gt;prefix(&#039;admin/basic&#039;)-&gt;as(&#039;admin.basic.&#039;)-&gt;group(module_path(&#039;Bank&#039;, &#039;/routes/web.php&#039;));
// API (در صورت نیاز)
Route::middleware([&#039;web&#039;, &#039;authorized&#039;])-&gt;prefix(&#039;admin/api/basic&#039;)-&gt;as(&#039;admin.api.basic.&#039;)-&gt;group(module_path(&#039;Bank&#039;, &#039;/routes/api.php&#039;));</code></pre>
</div>
<p><strong>حتماً middleware <code>authorized</code></strong>: فقط کاربران وارد‌شده؛ از پکیج AbolFrame است و نیاز به تعریف مجدد نیست.</p>
<h2 id="sec-abolframe-crud-guide-3" class="scroll-mt-header">مرحله ۳ — کنترلر (Resource)</h2>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>class BankController extends Controller
{
    public function index() {}
    public function create() {}
    public function store(Request $request) {}
    public function show(Bank $bank) {}
    public function edit(Bank $bank) {}
    public function update(Request $request, Bank $bank) {}
    public function destroy(Bank $bank) {}
}</code></pre>
</div>
<h2 id="sec-abolframe-crud-guide-4" class="scroll-mt-header">مرحله ۴ — مسیرهای CRUD (<code>web.php</code>)</h2>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>Route::prefix(&#039;banks&#039;)-&gt;as(&#039;banks.&#039;)-&gt;controller(BankController::class)-&gt;group(function () {
    Route::get(&#039;/&#039;, &#039;index&#039;)-&gt;name(&#039;index&#039;)-&gt;title(&#039;لیست بانک ها&#039;)-&gt;showInSidebar();
    Route::get(&#039;create&#039;, &#039;create&#039;)-&gt;name(&#039;create&#039;)-&gt;title(&#039;درج بانک&#039;)-&gt;parentRoute(&#039;admin.basic.banks.index&#039;);
    Route::post(&#039;store&#039;, &#039;store&#039;)-&gt;name(&#039;store&#039;);

    Route::prefix(&#039;{bank}&#039;)-&gt;group(function () {
        Route::get(&#039;show&#039;, &#039;show&#039;)-&gt;name(&#039;show&#039;)-&gt;title(&#039;جزئیات بانک&#039;)-&gt;parentRoute(&#039;admin.basic.banks.index&#039;);
        Route::get(&#039;edit&#039;, &#039;edit&#039;)-&gt;name(&#039;edit&#039;)-&gt;title(&#039;ویرایش بانک&#039;)-&gt;parentRoute(&#039;admin.basic.banks.index&#039;);
        Route::put(&#039;update&#039;, &#039;update&#039;)-&gt;name(&#039;update&#039;);
        Route::delete(&#039;destroy&#039;, &#039;destroy&#039;)-&gt;name(&#039;destroy&#039;);
    });
});</code></pre>
</div>
<ul><li><code>title</code> بهتر است کلید ترجمه باشد (نیاز به <code>__()</code> نیست).</li><li>چون API نداریم <code>api.php</code> خالی می‌ماند.</li></ul>
<h2 id="sec-abolframe-crud-guide-5" class="scroll-mt-header">مرحله ۵ — تعریف منو</h2>
<p>منوی سایدبار خودکار از Routeها ساخته می‌شود؛ سطح‌های بالاتر را دستی تعریف کنید — متدی در <code>BankServiceProvider</code> که در <code>boot</code> صدا زده می‌شود:</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>public function registerMenuGroup(): void
{
    AbolFrame::menu(function () {
        return [MenuGroup::make()-&gt;name(&#039;admin.basic&#039;)-&gt;title(&#039;اطلاعات پایه&#039;)-&gt;icon(&#039;fa-regular fa-memo-circle-info&#039;)
            -&gt;subMenu([MenuSubgroup::make()-&gt;name(&#039;admin.basic.banks&#039;)-&gt;title(&#039;لیست بانک ها&#039;)])];
    });
}</code></pre>
</div>
<p>(<code>name</code> دقیقاً پیشوند کامل Route؛ فایل ۶.)</p>
<h2 id="sec-abolframe-crud-guide-6" class="scroll-mt-header">مرحله ۶ — مدل</h2>
<p>معمولاً در ابتدای پروژه همه مدل‌ها یک‌بار و کامل ساخته می‌شوند.</p>
<ul><li><strong>حالت اول (رایج):</strong> مدل در <code>app/Models/Bank.php</code> هست ⇒ به <code>Modules/Bank/app/Models/Bank.php</code> منتقل و namespace را به <code>Modules\\Bank\\Models</code> اصلاح کنید.</li><li><strong>حالت دوم (استثنا):</strong> مدل نیست ⇒ فقط همان مدل را بسازید: <code>php artisan code:models --table=banks</code> (پکیج Reliese؛ ساختار واقعی جدول را از دیتابیس می‌خواند)، سپس مثل حالت اول منتقل کنید.</li><li>نگه‌داشتن مدل در ریشه پروژه اشتباه معماری است؛ ساخت مجدد مدل‌ها برای هر ماژول درست نیست («یک‌بار بساز، بعد فقط منتقل کن»).</li><li>مدل‌ها باید <code>MyLaravelCore\\Traits\\SoftDeletes</code> داشته باشند.</li></ul>
<h2 id="sec-abolframe-crud-guide-7" class="scroll-mt-header">مرحله ۷ — فایل‌های Blade</h2>
<p>چهار فایل: <code>resources/views/{index,show,create,edit}.blade.php</code>.</p>
<h2 id="sec-abolframe-crud-guide-8" class="scroll-mt-header">مرحله ۸ — صفحه لیست (Index)</h2>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BASH</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>php artisan AbolFrame:make-table BankTable --module=Bank</code></pre>
</div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>public function index()
{
    BladeLayout::table(BankTable::class);
    return view(&#039;bank::index&#039;);
}</code></pre>
</div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-default-layout&gt;{!! bladeLayout()-&gt;table()-&gt;render() !!}&lt;/x-default-layout&gt;</code></pre>
</div>
<h2 id="sec-abolframe-crud-guide-9" class="scroll-mt-header">مرحله ۹ — صفحه درج (Create)</h2>
<p><strong>کنترلر:</strong> <code>return view(&#039;bank::create&#039;);</code></p>
<p><strong>FormRequest:</strong></p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>class StoreBankRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            &#039;name&#039; =&gt; [&#039;required&#039;, &#039;string&#039;, &#039;max:255&#039;],
            &#039;code&#039; =&gt; [&#039;required&#039;, &#039;string&#039;, &#039;max:50&#039;, &#039;unique:banks,code&#039;],
        ];
    }
}</code></pre>
</div>
<p><strong>اسکریپت اعتبارسنجی</strong> در انتهای Blade — <code>#create-bank</code> باید <code>id</code> فرم و <code>StoreBankRequest</code> نام کلاس باشد:</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>@push(&#039;scripts&#039;)
    @canAccess(&#039;admin.basic.banks.store&#039;)
        {!! FormValidator::formRequest(Modules\\Bank\\Http\\Requests\\StoreBankRequest::class, &#039;#create-bank&#039;) !!}
    @endcanAccess
@endpush</code></pre>
</div>
<p><strong>View (<code>create.blade.php</code>):</strong></p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-default-layout&gt;
    &lt;x-card :title=&quot;getPageTitle()&quot;&gt;
        &lt;form id=&quot;create-bank&quot; action=&quot;{{ route(&#039;admin.basic.banks.store&#039;) }}&quot; method=&quot;post&quot;&gt;
            @csrf
            &lt;div class=&quot;row g-3&quot;&gt;
                &lt;x-text-input containerClass=&quot;col-md-6&quot; name=&quot;name&quot; :label=&quot;__(&#039;base::general.name&#039;)&quot; :value=&quot;old(&#039;name&#039;)&quot; /&gt;
                &lt;x-text-input containerClass=&quot;col-md-6&quot; name=&quot;code&quot; :label=&quot;__(&#039;base::general.code&#039;)&quot; :value=&quot;old(&#039;code&#039;)&quot; direction=&quot;ltr&quot; /&gt;
            &lt;/div&gt;
            @canAccess(&#039;admin.basic.banks.store&#039;)
                &lt;div class=&quot;card-footer pb-0 px-0 d-flex gap-4 pt-5 justify-content-end mt-4&quot;&gt;
                    &lt;x-reset-button :title=&quot;__(&#039;base::general.reset&#039;)&quot; variant=&quot;light&quot; appearance=&quot;outline&quot; /&gt;
                    &lt;x-button buttonType=&quot;submit&quot; :title=&quot;__(&#039;base::general.submit&#039;)&quot; /&gt;
                &lt;/div&gt;
            @endcanAccess
        &lt;/form&gt;
    &lt;/x-card&gt;
    @push(&#039;scripts&#039;) ...FormValidator... @endpush
&lt;/x-default-layout&gt;</code></pre>
</div>
<p><strong>ذخیره:</strong></p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>public function store(StoreBankRequest $request)
{
    $inputs = $request-&gt;validated();
    $inputs[&#039;sort&#039;] = getNextSortValue(Bank::class);
    try {
        Bank::create($inputs);
        return redirect()-&gt;route(&#039;admin.basic.banks.index&#039;)-&gt;withFlash(message: __(&#039;base::message.create_successfully&#039;), type: &#039;success&#039;);
    } catch (Exception $exception) {
        Log::error($exception);
        return back()-&gt;withFlash(message: __(&#039;base::message.error_occurred&#039;), type: &#039;error&#039;);
    }
}</code></pre>
</div>
<h2 id="sec-abolframe-crud-guide-10" class="scroll-mt-header">مرحله ۱۰ — صفحه جزئیات (Show)</h2>
<p><strong>Banner Generator:</strong> <code>BankBanner extends BaseBanner</code> با <code>items()</code> شامل <code>Banner::make()-&gt;label(__(&#039;bank::general.bank&#039;))-&gt;value($this-&gt;bank-&gt;name)-&gt;icon(&#039;fa-solid fa-building-columns&#039;)</code>.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>public function show(Bank $bank)
{
    BladeLayout::data(compact(&#039;bank&#039;));
    BladeLayout::banner(BankBanner::class);
    return view(&#039;bank::show&#039;, compact(&#039;bank&#039;));
}</code></pre>
</div>
<p><strong>View:</strong> <code>x-data-display cols=&quot;3&quot; :alignValues=&quot;true&quot;</code> با <code>x-data-item</code> برای <code>name</code>, <code>code</code> (<code>dir=&quot;ltr&quot;</code>), <code>sort</code>, <code>status</code> (با enum <code>IsActive</code>), <code>created_at</code> (<code>jalali($bank-&gt;created_at)-&gt;format(&#039;Y/m/d H:i:s&#039;)</code> با <code>dir=&quot;ltr&quot; valueClass=&quot;text-right&quot;</code>), <code>createdBy?-&gt;full_name</code>, <code>updated_at</code>, <code>updatedBy?-&gt;full_name</code>.</p>
<h2 id="sec-abolframe-crud-guide-11" class="scroll-mt-header">مرحله ۱۱ — صفحه ویرایش (Edit)</h2>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>public function edit(Bank $bank)
{
    BladeLayout::data(compact(&#039;bank&#039;));
    BladeLayout::banner(BankBanner::class);
    return view(&#039;bank::edit&#039;, compact(&#039;bank&#039;));
}</code></pre>
</div>
<p><strong>UpdateBankRequest:</strong> <code>Rule::unique(&#039;banks&#039;, &#039;code&#039;)-&gt;ignore($this-&gt;bank-&gt;id)</code>. اسکریپت: <code>FormValidator::formRequest(UpdateBankRequest::class, &#039;#update-bank&#039;)</code> (در مثال رسمی به اشتباه <code>@canAccess(&#039;...store&#039;)</code> آمده؛ باید <code>...update</code> باشد).</p>
<p><strong>View:</strong> فرم <code>id=&quot;update-bank&quot;</code>، <code>action=route(&#039;admin.basic.banks.update&#039;, encryptValue($bank-&gt;id))</code>، <code>@csrf</code> و <code>@method(&#039;PUT&#039;)</code>؛ فیلدها <code>x-text-input name/code</code>، <code>x-number-input name=&quot;sort&quot; min=&quot;1&quot;</code>، <code>x-radio-group id=&quot;is_active&quot; name=&quot;is_active&quot; :options=&quot;IsActive::componentOptions(&#039;base&#039;)&quot; :checked=&quot;old(&#039;is_active&#039;, $bank-&gt;is_active-&gt;value)&quot;</code>؛ دکمه <code>base::general.update</code>.</p>
<p><strong>ذخیره:</strong> <code>$bank-&gt;update($request-&gt;validated());</code> با redirect + <code>withFlash(__(&#039;base::message.update_successfully&#039;))</code> و همان try/catch.</p>
<h2 id="sec-abolframe-crud-guide-12" class="scroll-mt-header">مرحله ۱۲ — حذف</h2>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>public function destroy(Bank $bank)
{
    try {
        $bank-&gt;delete();
        return back()-&gt;withFlash(message: __(&#039;base::message.delete_successfully&#039;), type: &#039;success&#039;);
    } catch (Exception $exception) {
        Log::error($exception);
        return back()-&gt;withFlash(message: __(&#039;base::message.error_occurred&#039;), type: &#039;error&#039;);
    }
}</code></pre>
</div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-crud-guide-13" class="scroll-mt-header">اصلاحات پروژه AbolFrame نسبت به مثال رسمی</h2>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>مثال رسمی</th><th>الگوی پروژه</th></tr></thead><tbody><tr><td><code>try/catch (Exception)</code> عمومی</td><td>فقط با recovery/ترجمه/context log؛ <code>ModelNotFound</code> و <code>ValidationException</code> را handler می‌گیرد</td></tr><tr><td>عنوان فارسی hardcode در <code>title()</code></td><td>کلید ترجمه</td></tr><tr><td><code>encryptValue($bank-&gt;id)</code> در route</td><td>route id خام (Route Model Binding)؛ طبق الگوی موجود پروژه</td></tr><tr><td>وضعیت با <code>==</code> و <code>__()</code> دستی</td><td><code>getEnumName()</code> / <code>enumBadgeVariant()</code></td></tr><tr><td>حذف بدون بررسی وابستگی</td><td><code>getDeleteErrorMessage()</code> / <code>DeleteDependency</code></td></tr><tr><td>Create و Edit یک الگو</td><td>فرم‌ها جدا؛ idهای پیشوندی (<code>createName</code>/<code>editName</code>)؛ JS جدا</td></tr><tr><td><code>Log::error($exception)</code> خام</td><td>با context (request_id، user_id، entity id)</td></tr><tr><td>منطق بزرگ در Controller</td><td>Service</td></tr></tbody></table></div>
<h2 id="sec-abolframe-crud-guide-14" class="scroll-mt-header">Dynamic Status</h2>
<p>برای موجودیت دارای وضعیت داینامیک (مثل <code>member_status_id</code>): رکورد <code>is_start</code> وضعیت اولیه؛ هنگام ایجاد خودکار تخصیص و Status Log ساخته شود؛ ابتدا الگوی موجود پروژه را ببینید (چندنوشتنی ⇒ داخل Transaction).</p>
<h2 id="sec-abolframe-crud-guide-15" class="scroll-mt-header">تأیید CRUD (اجباری)</h2>
<p>۱) ایجاد ۳ رکورد ۲) تست همه sortها ۳) تست همه فیلترها (هر کدام فقط رکورد مورد انتظار) ۴) ویرایش یک رکورد ۵) تأیید ویرایش ۶) حذف ۷) تأیید حذف. مراحل ناتمام صریحاً گزارش شود.</p>
        `
    },
    {
        id: "abolframe-form-components",
        title: "۱۰. کامپوننت‌های فرم (۲۸ کامپوننت)",
        icon: "fa-rectangle-list",
        category: "مستندات جامع ابول فریم (AbolFrame)",
        content: `
<h1>۱۰. کامپوننت‌های فرم (Blade) — توضیح کامل</h1>
<div class="callout info"><i class="fa fa-circle-info callout-icon"></i><div>برای کاهش تکرار، ابتدا <strong>پراپ‌های مشترک</strong> آمده و سپس برای هر کامپوننت <strong>ویژگی‌ها، پراپ‌های اختصاصی، متدها/رویدادهای JS، مثال و هشدارها</strong>.<br>قانون: همه متن‌ها (<code>label/hint/placeholder/defaultMessage</code>) با کلید ترجمه؛ اعتبارسنجی اصلی در FormRequest.</div></div>
<div class="toc-quick-jump-card my-4 p-3 rounded-3 border bg-body-tertiary"><div class="d-flex align-items-center justify-content-between mb-2"><strong class="text-primary small"><i class="fa fa-compass ms-1"></i> فهرست سریع آیتم‌ها، متدها و کامپوننت‌های این بخش (30 مورد):</strong></div><div class="d-flex flex-wrap gap-2"><a href="#sec-abolframe-form-components-1" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش 0 — پراپ‌های مشترک</a><a href="#sec-abolframe-form-components-2" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱. x-text-input</a><a href="#sec-abolframe-form-components-3" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۲. x-number-input</a><a href="#sec-abolframe-form-components-4" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۳. x-text-area</a><a href="#sec-abolframe-form-components-5" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۴. x-editor (CKEditor 5 / TinyMCE)</a><a href="#sec-abolframe-form-components-6" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">مدیریت تصویر (فقط CKEditor)</a><a href="#sec-abolframe-form-components-7" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۵. x-select و x-multi-select</a><a href="#sec-abolframe-form-components-8" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۶. x-nested-selects (انتخاب درختی)</a><a href="#sec-abolframe-form-components-9" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۷. x-checkbox</a><a href="#sec-abolframe-form-components-10" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۸. x-checkbox-group</a><a href="#sec-abolframe-form-components-11" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۹. x-radio-group</a><a href="#sec-abolframe-form-components-12" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱۰. x-switch-input</a><a href="#sec-abolframe-form-components-13" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱۱. x-datetime-picker</a><a href="#sec-abolframe-form-components-14" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱۲. x-datetime-range-picker</a><a href="#sec-abolframe-form-components-15" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱۳. x-file-picker</a><a href="#sec-abolframe-form-components-16" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱۴. x-image-picker</a><a href="#sec-abolframe-form-components-17" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱۵. x-select-image</a><a href="#sec-abolframe-form-components-18" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱۶. x-item-collector (جمع‌آوری آیتم)</a><a href="#sec-abolframe-form-components-19" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱۷. x-repeater-inputs + x-repeater-input.column</a><a href="#sec-abolframe-form-components-20" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱۸. x-tag-collector + x-tag-collector.input</a><a href="#sec-abolframe-form-components-21" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱۹. x-tag-input</a><a href="#sec-abolframe-form-components-22" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۲۰. x-email-input و x-url-input</a><a href="#sec-abolframe-form-components-23" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۲۱. x-password-input</a><a href="#sec-abolframe-form-components-24" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۲۲. x-plate-input</a><a href="#sec-abolframe-form-components-25" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۲۳. x-color-input</a><a href="#sec-abolframe-form-components-26" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۲۴. x-icon-picker</a><a href="#sec-abolframe-form-components-27" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۲۵. x-slug-input</a><a href="#sec-abolframe-form-components-28" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۲۶. x-search-input</a><a href="#sec-abolframe-form-components-29" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۲۷. x-map (نقشه Maplibre)</a><a href="#sec-abolframe-form-components-30" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بک‌اند: configClass extends BaseMap</a></div></div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-form-components-1" class="scroll-mt-header">بخش 0 — پراپ‌های مشترک</h2>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پراپ</th><th>نوع</th><th>پیش‌فرض</th><th>توضیح</th></tr></thead><tbody><tr><td><code>permission</code></td><td>string\\</td><td>null</td><td>null</td></tr><tr><td><code>name</code></td><td>string</td><td>—</td><td>نام فیلد (اجباری)</td></tr><tr><td><code>id</code></td><td>string</td><td>null</td><td>شناسه یکتا</td></tr><tr><td><code>label</code></td><td>string</td><td>null</td><td>لیبل اصلی</td></tr><tr><td><code>labelSpaceReserved</code></td><td>bool</td><td>false</td><td>رزرو فضای لیبل حتی بدون مقدار</td></tr><tr><td><code>required</code></td><td>bool</td><td>false</td><td>اجباری</td></tr><tr><td><code>disabled</code> / <code>readonly</code></td><td>bool</td><td>false</td><td>غیرفعال / فقط‌خواندنی</td></tr><tr><td><code>disabledTooltip</code></td><td>string</td><td>null</td><td>راهنما هنگام غیرفعال بودن</td></tr><tr><td><code>hint</code></td><td>string</td><td>null</td><td>پیام راهنما</td></tr><tr><td><code>class</code> / <code>containerClass</code></td><td>string</td><td>null</td><td>کلاس ورودی / کانتینر</td></tr><tr><td><code>messageStyle</code></td><td>string/enum</td><td><code>&quot;message&quot;</code></td><td>استایل پیام (<code>message</code>, <code>tooltip</code>, <code>toast</code>, ...)</td></tr><tr><td><code>defaultMessageType</code></td><td>string/enum</td><td><code>&quot;info&quot;</code></td><td>نوع پیام (<code>info</code>, <code>error</code>, <code>success</code>, <code>warning</code>)</td></tr><tr><td><code>defaultMessage</code></td><td>string</td><td>null</td><td>پیام پیش‌فرض</td></tr><tr><td><code>suppressLogicMessages</code></td><td>bool</td><td>false</td><td>عدم نمایش پیام‌های منطقی خودکار</td></tr><tr><td>slot <code>label-suffix-slot</code></td><td>—</td><td>—</td><td>محتوای کنار لیبل (مثلاً لینک «استعلام»)</td></tr></tbody></table></div>
<p><strong>JS مشترک:</strong> <code>componentManagement(&#039;id&#039;)</code> (فایل ۱۲) — <code>setValue/getValue/setError/clearError/setDisabled/...</code>. برخی کامپوننت‌ها <code>$(&#039;#id&#039;).setValue()</code> هم دارند.</p>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-form-components-2" class="scroll-mt-header">۱. <code>x-text-input</code></h2>
<p>ورودی تک‌خطی پیشرفته: کنترل طول، پیشنهاد، پیشوند/پسوند، <strong>ماسک</strong>، راست‌چین/چپ‌چین، trim، اتوکامپلیت.</p>
<p><strong>ویژگی‌ها:</strong> لیبل و فضای رزرو؛ مقدار اولیه؛ placeholder؛ <code>autoComplete</code>؛ prefix/suffix؛ <code>minLength/maxLength</code>؛ <code>charLength</code> (شمارنده)؛ <code>direction</code>؛ <code>textAlign</code>؛ اعتبارسنجی با <code>rules</code> یا regex؛ <code>suggestions</code>؛ <code>maskExpression</code>؛ trim خودکار؛ autoFocus؛ slot لیبل.</p>
<p><strong>پراپ‌های اختصاصی:</strong></p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پراپ</th><th>نوع</th><th>پیش‌فرض</th><th>توضیح</th></tr></thead><tbody><tr><td><code>value</code></td><td>string</td><td>null</td><td>مقدار اولیه</td></tr><tr><td><code>placeholder</code></td><td>string</td><td>null</td><td></td></tr><tr><td><code>autoComplete</code></td><td>string</td><td><code>&quot;off&quot;</code></td><td><code>off</code>, <code>on</code>, <code>email</code>, ...</td></tr><tr><td><code>prefix</code> / <code>suffix</code></td><td>string</td><td>null</td><td></td></tr><tr><td><code>minLength</code> / <code>maxLength</code></td><td>string/int</td><td>null</td><td></td></tr><tr><td><code>charLength</code></td><td>string/int</td><td>null</td><td>محدودیت کاراکتر (نمایش شمارنده)</td></tr><tr><td><code>direction</code></td><td>string</td><td><code>&#039;rtl&#039;</code></td><td><code>rtl</code> / <code>ltr</code></td></tr><tr><td><code>textAlign</code></td><td>string</td><td>null</td><td><code>right</code> / <code>left</code></td></tr><tr><td><code>rules</code></td><td>string</td><td>null</td><td>قوانین validation لاراول</td></tr><tr><td><code>regexExpression</code></td><td>string</td><td>null</td><td>regex</td></tr><tr><td><code>suggestions</code></td><td>array</td><td>[]</td><td>پیشنهادها</td></tr><tr><td><code>maskExpression</code></td><td>string</td><td>null</td><td>ماسک</td></tr><tr><td><code>trim</code></td><td>bool</td><td>false</td><td>حذف فاصله ابتدا/انتها</td></tr><tr><td><code>autoFocus</code></td><td>bool</td><td>false</td><td></td></tr><tr><td><code>clearable</code></td><td>bool</td><td>false</td><td>دکمه پاک‌کردن</td></tr></tbody></table></div>
<p><strong>ماسک‌های آماده (<code>maskExpression</code>):</strong></p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>نام</th><th>مقدار ماسک</th><th>خروجی</th><th>توضیح</th></tr></thead><tbody><tr><td><code>nationalCode</code></td><td><code>9999999999</code></td><td><code>5354286727</code></td><td>کد ملی ۱۰ رقم</td></tr><tr><td><code>postalCode</code></td><td><code>9999999999</code></td><td><code>1234567890</code></td><td>کد پستی</td></tr><tr><td><code>phone</code></td><td><code>999-99999999</code></td><td><code>021-12345678</code></td><td>تلفن ثابت</td></tr><tr><td><code>mobile</code></td><td><code>99999999999</code></td><td><code>09123456789</code></td><td>موبایل ۱۱ رقم</td></tr><tr><td><code>bankCard</code></td><td><code>9999-9999-9999-9999</code></td><td><code>1234-5678-9012-3456</code></td><td>کارت ۱۶ رقم</td></tr><tr><td><code>ibanNumber</code></td><td><code>IR999999999999999999999999</code></td><td><code>IR1234...</code></td><td>شبا</td></tr><tr><td><code>ip</code></td><td><code>999.999.999.999</code></td><td><code>192.168.101.100</code></td><td>IPv4</td></tr></tbody></table></div>
<p>الگوی دلخواه مستقیم هم ممکن است: <code>maskExpression=&quot;9999-9999&quot;</code>.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-text-input label=&quot;آی پی&quot; name=&quot;ip&quot; prefix=&quot;ip&quot; defaultMessage=&quot;IPV4&quot; direction=&quot;rtl&quot; textAlign=&quot;right&quot; maskExpression=&quot;ip&quot; /&gt;
&lt;x-text-input label=&quot;نام&quot; name=&quot;fname&quot; placeholder=&quot;...&quot; :suggestions=&quot;[&#039;Naghi&#039;,&#039;Taghi&#039;,&#039;Karim&#039;]&quot; minLength=&quot;3&quot; maxLength=&quot;6&quot; charLength=&quot;6&quot; messageStyle=&quot;toast&quot;&gt;
    &lt;x-slot:label-suffix-slot&gt;&lt;a href=&quot;/&quot;&gt;استعلام مجدد&lt;/a&gt;&lt;/x-slot:label-suffix-slot&gt;
&lt;/x-text-input&gt;</code></pre>
</div>
<div class="callout info"><i class="fa fa-circle-info callout-icon"></i><div>برای کد/ایمیل/URL از <code>direction=&quot;ltr&quot;</code> استفاده کنید. کد ملی با ارقام ساده.</div></div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-form-components-3" class="scroll-mt-header">۲. <code>x-number-input</code></h2>
<p>ورودی عددی: min/max، zero fill، اعشار، پیشنهاد، پیشوند/پسوند، مبلغ به حروف، جداکننده هزارگان، فلش‌ها.</p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پراپ</th><th>نوع</th><th>پیش‌فرض</th><th>توضیح</th></tr></thead><tbody><tr><td><code>value</code>, <code>placeholder</code>, <code>prefix</code>, <code>suffix</code></td><td></td><td>null</td><td></td></tr><tr><td><code>suggestions</code></td><td>array</td><td>[]</td><td>پیشنهاد عددی</td></tr><tr><td><code>min</code> / <code>max</code></td><td>int</td><td>null</td><td>بازه مجاز</td></tr><tr><td><code>unsigned</code></td><td>bool</td><td>true</td><td>فقط مثبت</td></tr><tr><td><code>zeroFill</code> / <code>zeroFillSize</code></td><td>bool/int</td><td>false / 0</td><td>پر کردن با صفر</td></tr><tr><td><code>allowDecimal</code> / <code>decimalPlaces</code></td><td>bool/int</td><td>false / 0</td><td>اعشار</td></tr><tr><td><code>direction</code></td><td>string</td><td><code>&#039;ltr&#039;</code></td><td></td></tr><tr><td><code>step</code></td><td>float</td><td>1</td><td>گام فلش</td></tr><tr><td><code>showSeparator</code> / <code>separatorChar</code></td><td>bool/string</td><td>false / <code>&#039;,&#039;</code></td><td>جداکننده هزارگان</td></tr><tr><td><code>showArrows</code> / <code>hotKeysAlign</code></td><td>bool / string</td><td>true / <code>&#039;left&#039;</code></td><td>فلش‌ها و محل آن (<code>left</code>/<code>right</code>)</td></tr><tr><td><code>textAlign</code></td><td>string</td><td><code>&#039;left&#039;</code></td><td></td></tr><tr><td><code>showAmountInWords</code></td><td>bool</td><td>false</td><td>مبلغ به حروف</td></tr><tr><td><code>amountInWordsSuffix</code></td><td>string</td><td><code>&quot;تومان&quot;</code></td><td></td></tr><tr><td><code>amountInWordsClass</code></td><td>string</td><td>null</td><td></td></tr><tr><td><code>amountInWordsFactor</code></td><td>float</td><td>1</td><td>ضریب تبدیل (مثلاً <code>0.1</code> ریال→تومان)</td></tr><tr><td><code>autoFocus</code></td><td>bool</td><td>false</td><td></td></tr><tr><td><code>rangeEnd</code></td><td>int/string</td><td>null</td><td>selector انتهای بازه</td></tr></tbody></table></div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-number-input containerClass=&quot;col-md-6&quot; label=&quot;...&quot; name=&quot;code&quot; suffix=&quot;ریال&quot; show-separator=&quot;true&quot; show-amount-in-words amount-in-words-suffix=&quot;تومان&quot; amount-in-words-factor=&quot;0.1&quot; /&gt;</code></pre>
</div>
<p>قانون مصوب «درصد»: ماسک <code>%</code> و <code>max:100</code> (rule سرور).</p>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-form-components-4" class="scroll-mt-header">۳. <code>x-text-area</code></h2>
<div class="callout info"><i class="fa fa-circle-info callout-icon"></i><div>نام در مستند یک‌جا <code>x-textarea-input</code> و در permission/مثال <code>x-text-area</code>؛ با کد موجود پروژه تطبیق دهید.</div></div>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پراپ</th><th>نوع</th><th>پیش‌فرض</th><th>توضیح</th></tr></thead><tbody><tr><td><code>rows</code></td><td>int</td><td>3</td><td>سطر اولیه</td></tr><tr><td><code>minLength</code>/<code>maxLength</code></td><td>int</td><td>null</td><td></td></tr><tr><td><code>showMaxLength</code></td><td>bool</td><td>false</td><td>شمارنده کاراکتر</td></tr><tr><td><code>autoSizing</code></td><td>bool</td><td>false</td><td>افزایش خودکار ارتفاع</td></tr><tr><td><code>resizable</code></td><td>bool</td><td>false</td><td>تغییر اندازه توسط کاربر</td></tr><tr><td><code>trim</code></td><td>bool</td><td>false</td><td></td></tr><tr><td><code>autofocus</code></td><td>bool</td><td>false</td><td></td></tr><tr><td><code>placeholder</code></td><td>string</td><td>null</td><td></td></tr></tbody></table></div>
<p>محتوای اولیه داخل تگ (slot). طول را سمت سرور با <code>NormalizedStringRule</code> بسنجید.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-text-area
    name=&quot;description&quot;
    id=&quot;description_field&quot;
    label=&quot;توضیحات تکمیلی&quot;
    :rows=&quot;4&quot;
    :max-length=&quot;500&quot;
    :show-max-length=&quot;true&quot;
    :auto-sizing=&quot;true&quot;
    :trim=&quot;true&quot;
    placeholder=&quot;توضیحات را وارد کنید...&quot;
&gt;
    {{ old(&#039;description&#039;, $model-&gt;description ?? &#039;&#039;) }}
&lt;/x-text-area&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدار مهم:</strong> مقدار اولیه <code>x-text-area</code> از طریق <strong>Slot داخلی تگ</strong> (و نه پراپ <code>value</code>) مقداردهی می‌شود. همچنین برای شمارش دقیق کاراکترهای چندخطی در سمت سرور حتماً از <code>NormalizedStringRule</code> استفاده کنید تا اختلاف <code>\\r\\n</code> و <code>\\n</code> باعث خطای طول رشته نشود.</div></div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-form-components-5" class="scroll-mt-header">۴. <code>x-editor</code> (CKEditor 5 / TinyMCE)</h2>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پراپ</th><th>نوع</th><th>پیش‌فرض</th><th>توضیح</th></tr></thead><tbody><tr><td><code>type</code></td><td>string</td><td><code>&quot;ckeditor&quot;</code></td><td><code>ckeditor</code> یا <code>tinymce</code> (غیر از این Exception)</td></tr><tr><td><code>mode</code></td><td>string</td><td><code>&quot;full&quot;</code></td><td><code>full</code> / <code>simple</code> (غیر از این Exception)</td></tr><tr><td><code>toolbar</code></td><td>array</td><td>null</td><td>ابزارهای سفارشی</td></tr><tr><td><code>config</code></td><td>array</td><td>null</td><td>تنظیمات پیشرفته (مطابق مستندات CKEditor/TinyMCE)</td></tr><tr><td><code>showCharacterCount</code></td><td>bool</td><td>true</td><td>شمارنده</td></tr><tr><td><code>maxLength</code></td><td>int</td><td>null</td><td></td></tr><tr><td><code>autoResize</code></td><td>bool</td><td>false</td><td></td></tr><tr><td><code>placeholder</code></td><td>string</td><td>null</td><td>⚠️ پذیرفته می‌شود ولی خودکار اعمال نمی‌شود</td></tr><tr><td><code>id</code></td><td>string</td><td>null</td><td>برای ثبت سرویس آپلود/حذف <strong>ضروری</strong></td></tr></tbody></table></div>
<h3 id="sec-abolframe-form-components-6" class="scroll-mt-header">مدیریت تصویر (فقط CKEditor)</h3>
<p>چرخه کامل: آپلود از سرویس شما ← ذخیره id روی <code>&lt;img&gt;</code> به‌صورت <code>data-upload-id</code> ← حذف خودکار فایل هنگام حذف تصویر از محتوا.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">JS</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>abolframeEditorService(editorId, uploadService, deleteService);</code></pre>
</div>
<ul><li><code>uploadService(file: File, { signal }) =&gt; Promise&lt;{ url, id }&gt;</code>: فایل را به سرور بفرستید (signal را به fetch بدهید)؛ <code>url</code> به‌عنوان <code>src</code>؛ <code>id</code> برای حذف خودکار (بدون آن حذف خودکار کار نمی‌کند)؛ در خطا <code>throw new Error(...)</code>.</li><li><code>deleteService(ids: Array) =&gt; Promise</code>: خروجی مهم نیست؛ ترجیحاً خطا را داخل تابع مدیریت کنید.</li></ul>
<p><strong>نکات:</strong> <code>@push(&quot;scripts&quot;)</code> الزامی؛ فقط CKEditor؛ <strong>سرویس باید قبل از ساخته‌شدن ادیتور ثبت شود.</strong> آپلود از مسیر FileManager پروژه.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-editor
    id=&quot;article_content&quot;
    name=&quot;content&quot;
    label=&quot;متن کامل مقاله&quot;
    type=&quot;ckeditor&quot;
    mode=&quot;full&quot;
    :max-length=&quot;10000&quot;
    :show-character-count=&quot;true&quot;
    :auto-resize=&quot;true&quot;
&gt;
    {!! old(&#039;content&#039;, $article-&gt;content ?? &#039;&#039;) !!}
&lt;/x-editor&gt;

@push(&#039;scripts&#039;)
&lt;script&gt;
    abolframeEditorService.register(&#039;article_content&#039;, {
        uploadService: async (file, { signal }) =&gt; {
            const formData = new FormData();
            formData.append(&#039;file&#039;, file);
            const res = await fetch(&#039;/admin/files/upload&#039;, { method: &#039;POST&#039;, body: formData, signal });
            if (!res.ok) throw new Error(&#039;خطا در آپلود تصویر&#039;);
            return await res.json(); // { url: &#039;...&#039;, id: 123 }
        },
        deleteService: async (ids) =&gt; {
            await fetch(&#039;/admin/files/delete-batch&#039;, {
                method: &#039;POST&#039;,
                headers: { &#039;Content-Type&#039;: &#039;application/json&#039; },
                body: JSON.stringify({ ids })
            });
        }
    });
&lt;/script&gt;
@endpush</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدارهای مهم <code>x-editor</code>:</strong><br>- پراپ <code>type</code> فقط مقادیر <code>ckeditor</code> یا <code>tinymce</code> و پراپ <code>mode</code> فقط مقادیر <code>full</code> یا <code>simple</code> را می‌پذیرد؛ ارسال مقدار دیگر باعث پرتاب <code>InvalidArgumentException</code> می‌شود.<br>- سرویس آپلود/حذف تصویر (<code>abolframeEditorService</code>) فقط برای <code>ckeditor</code> فعال است و <strong>باید قبل از مقداردهی اولیه ادیتور</strong> در <code>@push(&#039;scripts&#039;)</code> ثبت شود.<br>- اگر <code>uploadService</code> کلید <code>id</code> را برنگرداند، حذف خودکار تصویر هنگام پاک‌کردن آن از داخل متن ادیتور کار نخواهد کرد.</div></div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-form-components-7" class="scroll-mt-header">۵. <code>x-select</code> و <code>x-multi-select</code></h2>
<p>انتخاب پیشرفته: جستجو، انتخاب پویا از route، چندتایی، انتخاب همه، شمارش انتخاب‌ها، readonly، tooltip هر آیتم، templateهای سفارشی.</p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پراپ</th><th>نوع</th><th>پیش‌فرض</th><th>توضیح</th></tr></thead><tbody><tr><td><code>placeholder</code></td><td>string</td><td><code>&quot;انتخاب کنید&quot;</code></td><td></td></tr><tr><td><code>items</code></td><td>array</td><td>[]</td><td>هر آیتم <code>id</code>,<code>name</code> (اجباری)</td></tr><tr><td><code>selected</code></td><td>string/int/array/null</td><td>null</td><td>چندتایی: آرایه</td></tr><tr><td><code>clearable</code></td><td>bool</td><td>true</td><td></td></tr><tr><td><code>searchBarVisibility</code></td><td>bool\\</td><td>null</td><td>null</td></tr><tr><td><code>parentId</code></td><td>string\\</td><td>null</td><td>null</td></tr><tr><td><code>infiniteScroll</code></td><td>bool\\</td><td>null</td><td>null</td></tr><tr><td><code>perPage</code></td><td>int</td><td>10</td><td>با infiniteScroll؛ به‌صورت <code>pagination.pageSize</code> به کنترلر می‌رود</td></tr><tr><td><code>routeName</code></td><td>string\\</td><td>null</td><td>null</td></tr><tr><td><code>routeParameters</code></td><td>string/array/null</td><td>null</td><td>پارامترهای route</td></tr><tr><td><code>parameters</code></td><td>string/array/null</td><td>null</td><td>در کنترلر در دسترس</td></tr><tr><td><code>allowSelectAll</code></td><td>bool\\</td><td>null</td><td>false</td></tr><tr><td><code>displaySelectedAsCount</code></td><td>bool\\</td><td>null</td><td>false</td></tr><tr><td><code>fromFilter</code></td><td>bool</td><td>false</td><td>استفاده در فیلتر</td></tr><tr><td><code>autoClose</code></td><td>bool</td><td>true (تکی) / false (چندتایی)</td><td></td></tr><tr><td><code>readonlyTooltip</code></td><td>string</td><td>null</td><td></td></tr><tr><td><code>templateSelection</code> / <code>templateResult</code></td><td>string</td><td>null</td><td>نام تابع JS برای template گزینه انتخاب‌شده / لیست</td></tr></tbody></table></div>
<p><strong>فرمت آیتم:</strong> <code>id</code> (string، اجباری)، <code>name</code> (اجباری)، <code>selected</code> (bool)، <code>is_active</code> (bool؛ false ⇒ disabled)، <code>tooltip</code> (برای آیتم فعال)، <code>disabledTooltip</code> (برای غیرفعال). tooltip به کل ردیف <code>li</code> متصل است.</p>
<p><strong>Select وابسته:</strong> روی فرزند: <code>parentId</code> (= <code>id</code> والد)، <code>routeName</code>، <code>parameters</code> (اختیاری). والد چندانتخابی: <strong>یک درخواست</strong> برای همه مقادیر و لیست یکپارچه؛ در کنترلر <code>parentSelected</code> (آرایه).</p>
<p><strong>رویداد <code>depend-on-fetched</code></strong> بعد از لود داده‌های فرزند:</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">JS</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$(&quot;#city-select-depend-on&quot;).on(&quot;depend-on-fetched&quot;, (event, data) =&gt; { $(&quot;#city-select-depend-on&quot;).setValue(&quot;xyz&quot;); });</code></pre>
</div>
<p>(همه پارامترهای لازم در فرزند و والد باید باشد.)</p>
<p><strong>JS:</strong> <code>$(sel).items(data)</code> پر کردن؛ <code>$(sel).setValue(&#039;v&#039;)</code> / <code>setValue([&#039;a&#039;,&#039;b&#039;])</code> (رویداد change اجرا و به‌عنوان مقدار پیش‌فرض ریست ذخیره می‌شود).</p>
<p><strong>Template سفارشی:</strong> تابع <code>window.customSelectTemplate = function (state) { if (!state.id) return state.text; ... }</code> با داده‌های <code>data-image/code/description</code>، برای disable بودن <code>data-disabled</code>؛ مقادیر پویا با <code>.text()</code> (نه HTML) تا تزریق HTML نشود؛ سپس <code>templateResult=&quot;customSelectTemplate&quot; templateSelection=&quot;customSelectTemplate&quot;</code>.</p>
<p><strong>Infinite scroll:</strong> <code>:infinite-scroll=&quot;true&quot; :per-page=&quot;5&quot; route-name=&quot;api.admin.api.banks.index&quot;</code>؛ کنترلرهای <code>abolframePaginate()</code> مقدار را خودکار اعمال می‌کنند؛ در <code>paginate</code> پیش‌فرض ثابت <code>PER_PAGE</code> کنترلر.</p>
<div class="callout info"><i class="fa fa-circle-info callout-icon"></i><div><strong>نکته:</strong> در فیلتر جدول برای چندانتخابی حتماً <code>x-multi-select</code>. <code>allow-select-all=&quot;1&quot;</code> برای select all.</div></div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>{{-- ۱. سلکت استاتیک با آیتم‌های آماده --}}
&lt;x-select
    name=&quot;bank_id&quot;
    id=&quot;bank_select&quot;
    label=&quot;انتخاب بانک&quot;
    :items=&quot;$banks&quot;
    :selected=&quot;old(&#039;bank_id&#039;, $account-&gt;bank_id ?? null)&quot;
    :clearable=&quot;true&quot;
    :required=&quot;true&quot;
/&gt;

{{-- ۲. سلکت پویا (AJAX) وابسته به سلکت والد با اسکرول بی‌نهایت --}}
&lt;x-select
    name=&quot;province_id&quot;
    id=&quot;province_select&quot;
    label=&quot;استان&quot;
    route-name=&quot;admin.select.provinces&quot;
/&gt;

&lt;x-select
    name=&quot;city_id&quot;
    id=&quot;city_select&quot;
    label=&quot;شهر&quot;
    parent-id=&quot;province_select&quot;
    route-name=&quot;admin.select.cities&quot;
    :infinite-scroll=&quot;true&quot;
    :per-page=&quot;15&quot;
/&gt;

{{-- ۳. سلکت چندانتخابی با قابلیت انتخاب همه --}}
&lt;x-multi-select
    name=&quot;role_ids&quot;
    id=&quot;role_ids_select&quot;
    label=&quot;نقش‌های کاربر&quot;
    :items=&quot;$roles&quot;
    :selected=&quot;$userRoleIds&quot;
    :allow-select-all=&quot;true&quot;
    :display-selected-as-count=&quot;true&quot;
/&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدارهای مهم <code>x-select</code> و <code>x-multi-select</code>:</strong><br>- هر آیتم در آرایه <code>items</code> حتماً باید کلیدهای <code>id</code> و <code>name</code> را داشته باشد (استفاده از <code>prepareSelectComponentData()</code> یا <code>DataProvider::...-&gt;formatSelect()</code> الزامی است).<br>- در فیلتر جداول، برای انتخاب چندتایی حتماً از تگ <code>&lt;x-multi-select&gt;</code> استفاده کنید.<br>- هنگام تعریف <code>customSelectTemplate</code> در جاوااسکریپت، مقادیر پویا را حتماً با <code>.text()</code> (و نه <code>.html()</code>) درج کنید تا از آسیب‌پذیری XSS جلوگیری شود.</div></div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-form-components-8" class="scroll-mt-header">۶. <code>x-nested-selects</code> (انتخاب درختی)</h2>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پراپ</th><th>نوع</th><th>پیش‌فرض</th><th>توضیح</th></tr></thead><tbody><tr><td><code>routeName</code></td><td>string</td><td>—</td><td>route دریافت داده (اجباری)</td></tr><tr><td><code>source</code></td><td>string</td><td>null</td><td>کلاس مدل (مثلاً <code>App\\Models\\Permission</code>)</td></tr><tr><td><code>labelColumn</code></td><td>string</td><td><code>&quot;name&quot;</code></td><td></td></tr><tr><td><code>parentColumn</code></td><td>string</td><td><code>&quot;parent_id&quot;</code></td><td></td></tr><tr><td><code>defaultValue</code></td><td>string/int/null</td><td>null</td><td>مقدار پیش‌فرض (ویرایش)</td></tr><tr><td><code>renderedRouteName</code></td><td>string</td><td><code>&quot;&quot;</code></td><td></td></tr><tr><td><code>placeholder</code></td><td>string</td><td><code>&quot;انتخاب کنید&quot;</code></td><td></td></tr></tbody></table></div>
<p><strong>رفتار:</strong> پیمایش سطح‌به‌سطح؛ مسیر انتخاب‌شده روی فیلد (<code>لیست کاربران / نقش‌ها / ...</code>)؛ فقط ۳ سطح آخر با <code>...</code> در ابتدا؛ دکمه بازگشت؛ جستجو در سطح جاری؛ اسکرول بی‌نهایت؛ حالت خالی با «نتیجه‌ای یافت نشد» و ریست.</p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>عمل</th><th>نتیجه</th></tr></thead><tbody><tr><td>کلیک روی نام</td><td>انتخاب و بستن</td></tr><tr><td>کلیک روی فلش</td><td>ورود به سطح بعدی</td></tr><tr><td>بازگشت</td><td>سطح قبلی</td></tr><tr><td>جستجو</td><td>فیلتر سطح جاری</td></tr><tr><td>اسکرول</td><td>بارگذاری بیشتر</td></tr><tr><td>ریست</td><td>پاک‌کردن و بازگشت</td></tr></tbody></table></div>
<p><strong>ویرایش:</strong> <code>:defaultValue=&quot;old(&#039;category_id&#039;, $product-&gt;category_id)&quot;</code>. اگر مقدار بعد از رندر مشخص می‌شود (مودال ویرایش) <code>defaultValue</code> استفاده نشود؛ <code>componentManagement(&#039;edit-category-id-select&#039;).setValue(data.category_id)</code>.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-nested-selects
    name=&quot;category_id&quot;
    id=&quot;category_nested_select&quot;
    label=&quot;دسته‌بندی درختی&quot;
    route-name=&quot;admin.categories.nested-select&quot;
    source=&quot;App\\Models\\Category&quot;
    label-column=&quot;name&quot;
    parent-column=&quot;parent_id&quot;
    :default-value=&quot;old(&#039;category_id&#039;, $product-&gt;category_id ?? null)&quot;
    placeholder=&quot;انتخاب دسته‌بندی...&quot;
/&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدار مهم:</strong> اگر مقدار فیلد بعد از رندر صفحه مشخص می‌شود (مثلاً داخل مودال ویرایش که با AJAX پر می‌شود)، از پراپ <code>defaultValue</code> استفاده نکنید؛ بلکه در جاوااسکریپت با <code>componentManagement(&#039;category_nested_select&#039;).setValue(data.category_id)</code> مقدار را ست کنید.</div></div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-form-components-9" class="scroll-mt-header">۷. <code>x-checkbox</code></h2>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پراپ</th><th>پیش‌فرض</th><th>توضیح</th></tr></thead><tbody><tr><td><code>optionLabel</code></td><td>null</td><td>لیبل کنار چک‌باکس</td></tr><tr><td><code>checked</code></td><td>false</td><td></td></tr><tr><td><code>value</code></td><td>null</td><td>مقدار ارسالی</td></tr><tr><td><code>tooltip</code></td><td>null</td><td></td></tr><tr><td><code>orientation</code></td><td><code>&quot;vertical&quot;</code></td><td><code>vertical</code>/<code>horizontal</code></td></tr></tbody></table></div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-checkbox
    name=&quot;is_featured&quot;
    id=&quot;is_featured_chk&quot;
    label=&quot;ویژگی نمایش&quot;
    option-label=&quot;نمایش در صفحه اصلی&quot;
    value=&quot;1&quot;
    :checked=&quot;old(&#039;is_featured&#039;, $post-&gt;is_featured ?? false)&quot;
    tooltip=&quot;در صورت فعال‌سازی، در اسلایدر ویژه نمایش داده می‌شود.&quot;
/&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>نکته:</strong> برای ارسال مقدار <code>0</code> در صورت تیک نخوردن، یا از <code>&lt;x-switch-input&gt;</code> استفاده کنید یا در FormRequest مقدار پیش‌فرض بولین را در نظر بگیرید.</div></div>
<h2 id="sec-abolframe-form-components-10" class="scroll-mt-header">۸. <code>x-checkbox-group</code></h2>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پراپ</th><th>پیش‌فرض</th><th>توضیح</th></tr></thead><tbody><tr><td><code>options</code></td><td>—</td><td>هر گزینه <code>value</code>, <code>label</code> (اجباری)، <code>tooltip</code>, <code>disabled</code>, <code>readonly</code></td></tr><tr><td><code>checked</code></td><td>[]</td><td>آرایه مقادیر انتخاب‌شده</td></tr><tr><td><code>tooltip</code>, <code>orientation</code> (<code>vertical</code>)</td><td></td><td></td></tr><tr><td><code>gap</code>, <code>optionClass</code>, <code>labelClass</code></td><td>null</td><td></td></tr></tbody></table></div>
<p>گزینه‌ها از <code>Enum::componentOptions(&#039;module&#039;)</code> یا <code>DataProvider::...-&gt;formatComponentOptions()</code>.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-checkbox-group
    name=&quot;permissions&quot;
    id=&quot;permissions_group&quot;
    label=&quot;مجوزهای دسترسی&quot;
    :options=&quot;\\MyLaravelCore\\Enums\\AccessType::componentOptions()&quot;
    :checked=&quot;old(&#039;permissions&#039;, $rolePermissions ?? [])&quot;
    orientation=&quot;horizontal&quot;
    gap=&quot;1rem&quot;
/&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدار:</strong> هر آیتم در <code>options</code> باید دارای کلیدهای <code>value</code> و <code>label</code> باشد. همیشه از <code>Enum::componentOptions()</code> یا <code>DataProvider::...-&gt;formatComponentOptions()</code> برای ساخت استاندارد گزینه‌ها استفاده کنید.</div></div>
<h2 id="sec-abolframe-form-components-11" class="scroll-mt-header">۹. <code>x-radio-group</code></h2>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پراپ</th><th>پیش‌فرض</th><th>توضیح</th></tr></thead><tbody><tr><td><code>options</code></td><td>—</td><td><code>value</code>,<code>label</code> (اجباری)،<code>tooltip</code>,<code>disabled</code>,<code>readonly</code></td></tr><tr><td><code>checked</code></td><td>null</td><td><strong>رشته</strong> مقدار انتخاب‌شده</td></tr><tr><td><code>defaultMessageType</code></td><td><code>&quot;success&quot;</code></td><td></td></tr><tr><td><code>mode</code></td><td><code>&quot;horizontal&quot;</code></td><td></td></tr><tr><td><code>orientation</code></td><td><code>&quot;vertical&quot;</code></td><td></td></tr><tr><td><code>wrapperClass</code>, <code>gap</code>, <code>optionClass</code>, <code>labelClass</code>, <code>tooltip</code></td><td></td><td></td></tr></tbody></table></div>
<p><strong>تغییر پویای آپشن‌ها:</strong> <code>componentManagement(&#039;gender2&#039;).setOptions([{value,label,tooltip,disabled}], checked?)</code> — کلیدها: <code>value</code> (اجباری), <code>label</code>, <code>checked</code>, <code>tooltip</code>, <code>disabled</code>, <code>readonly</code>, <code>required</code>, <code>disabledGlobal</code>, <code>class</code> (روی <code>&lt;input&gt;</code>), <code>optionClass</code> (روی <code>&lt;label&gt;</code>), <code>attributes</code> (آبجکت attributeهای دلخواه). داخل <code>abolframe.ready</code> و <code>@push(&quot;scripts&quot;)</code>.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-radio-group
    name=&quot;person_type&quot;
    id=&quot;person_type_radio&quot;
    label=&quot;نوع شخصیت&quot;
    :options=&quot;\\MyLaravelCore\\Enums\\PersonType::componentOptions()&quot;
    :checked=&quot;(string) old(&#039;person_type&#039;, $user-&gt;person_type ?? 1)&quot;
    mode=&quot;horizontal&quot;
/&gt;

@push(&#039;scripts&#039;)
&lt;script&gt;
    abolframe.ready(function () {
        componentManagement(&#039;person_type_radio&#039;).setOptions([
            { value: &#039;1&#039;, label: &#039;حقیقی&#039;, tooltip: &#039;اشخاص حقیقی&#039; },
            { value: &#039;2&#039;, label: &#039;حقوقی&#039;, tooltip: &#039;شرکت‌ها و مؤسسات&#039; }
        ], &#039;1&#039;);
    });
&lt;/script&gt;
@endpush</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدار:</strong> پراپ <code>checked</code> در <code>x-radio-group</code> باید از نوع <strong>رشته (<code>string</code>)</strong> باشد تا مقایسه دقیق با مقادیر گزینه‌ها انجام شود. همچنین تغییر پویای گزینه‌ها با <code>setOptions()</code> حتماً باید داخل <code>abolframe.ready()</code> و <code>@push(&#039;scripts&#039;)</code> قرار گیرد.</div></div>
<h2 id="sec-abolframe-form-components-12" class="scroll-mt-header">۱۰. <code>x-switch-input</code></h2>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پراپ</th><th>پیش‌فرض</th><th>توضیح</th></tr></thead><tbody><tr><td><code>checked</code></td><td>false</td><td></td></tr><tr><td><code>onValue</code> / <code>offValue</code></td><td><code>&#039;1&#039;</code> / <code>&#039;0&#039;</code></td><td>مقدار ارسالی</td></tr><tr><td><code>onLabel</code> / <code>offLabel</code></td><td><code>&#039;بله&#039;</code> / <code>&#039;خیر&#039;</code></td><td></td></tr><tr><td><code>labelVisibility</code></td><td>false</td><td>نمایش لیبل وضعیت</td></tr><tr><td><code>size</code></td><td><code>&#039;md&#039;</code></td><td><code>xs, sm, md, lg</code></td></tr><tr><td><code>orientation</code></td><td><code>&#039;vertical&#039;</code></td><td></td></tr><tr><td><code>tooltip</code>, <code>autoFocus</code></td><td></td><td></td></tr></tbody></table></div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-switch-input
    name=&quot;is_active&quot;
    id=&quot;is_active_switch&quot;
    label=&quot;وضعیت حساب&quot;
    :checked=&quot;(bool) old(&#039;is_active&#039;, $user-&gt;is_active ?? true)&quot;
    on-value=&quot;1&quot;
    off-value=&quot;0&quot;
    on-label=&quot;فعال&quot;
    off-label=&quot;غیرفعال&quot;
    :label-visibility=&quot;true&quot;
    size=&quot;md&quot;
/&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>نکته:</strong> برخلاف چک‌باکس معمولی، <code>x-switch-input</code> در حالت خاموش نیز مقدار <code>offValue</code> (پیش‌فرض <code>&#039;0&#039;</code>) را ارسال می‌کند.</div></div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-form-components-13" class="scroll-mt-header">۱۱. <code>x-datetime-picker</code></h2>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پراپ</th><th>نوع</th><th>پیش‌فرض</th><th>توضیح</th></tr></thead><tbody><tr><td><code>value</code>, <code>minDate</code>, <code>maxDate</code></td><td>Carbon</td><td>null</td><td><strong>باید Carbon باشند</strong></td></tr><tr><td><code>type</code></td><td>string</td><td><code>&quot;date&quot;</code></td><td><code>date</code>/<code>time</code>/<code>datetime</code></td></tr><tr><td><code>dateFormat</code></td><td>string</td><td>null</td><td>مثلاً <code>Y/m/d H:i</code></td></tr><tr><td><code>disabledDays</code></td><td>array</td><td>null</td><td>روزهای هفته 0..6</td></tr><tr><td><code>disabledDates</code></td><td>array(Carbon)</td><td>null</td><td></td></tr><tr><td><code>forceEnabledDates</code></td><td>array(Carbon)</td><td>null</td><td>همیشه فعال حتی خارج بازه یا در disabledDates</td></tr><tr><td><code>autoClose</code></td><td>bool</td><td>true</td><td></td></tr><tr><td><code>clearable</code></td><td>bool</td><td>true</td><td></td></tr><tr><td><code>placeholder</code></td><td>string</td><td><code>&quot; &quot;</code></td><td></td></tr><tr><td><code>allowGregorian</code></td><td>bool</td><td>false</td><td>تقویم میلادی</td></tr><tr><td><code>timePickerOptions</code></td><td>array</td><td>—</td><td><code>[&#039;hours&#039;=&gt;true,&#039;minutes&#039;=&gt;true,&#039;seconds&#039;=&gt;true]</code></td></tr><tr><td><code>dir</code> / <code>textAlign</code></td><td>string</td><td><code>&quot;ltr&quot;</code> / <code>&quot;left&quot;</code></td><td></td></tr><tr><td><code>showIcon</code></td><td>bool</td><td>true</td><td></td></tr><tr><td><code>allowTyping</code></td><td>bool</td><td>false</td><td>تایپ دستی</td></tr><tr><td><code>prefix</code>, <code>suffix</code></td><td></td><td></td><td></td></tr></tbody></table></div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div><strong>هشدار:</strong> هر تغییر <code>dateFormat</code> تایپ دستی را غیرفعال می‌کند (کنترل ماسک ممکن نیست). با تغییر <code>timePickerOptions</code> فرمت، ماسک و placeholder خودکار تنظیم می‌شوند.</div></div>
<p><strong>JS:</strong> <code>$(&quot;#id&quot;).setValue(&quot;1403/01/01&quot;)</code> یا unix (رشته به timestamp تبدیل؛ مقدار ریست هم به‌روز می‌شود)؛ <code>$(&quot;#id&quot;).setRange({minDate:&quot;1403/01/01&quot;, maxDate:&quot;1404/06/01&quot;})</code> (یا unix).</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-datetime-picker container-class=&quot;col-md-6&quot; :value=&quot;jalali(&#039;1403-10-10&#039;)-&gt;toCarbon()&quot; :min-date=&quot;jalali(&#039;1402-10-10&#039;)-&gt;toCarbon()&quot; :max-date=&quot;jalali(&#039;1404-10-10&#039;)-&gt;toCarbon()&quot; type=&quot;date&quot; id=&quot;date-selector-create&quot; name=&quot;created_at&quot; label=&quot;تاریخ ایجاد&quot; :allow-typing=&quot;true&quot; /&gt;</code></pre>
</div>
<p>قانون: ماسک تاریخ برای همه فیلدهای تاریخ؛ سمت سرور <code>jalali_date:Y/m/d</code>.</p>
<h2 id="sec-abolframe-form-components-14" class="scroll-mt-header">۱۲. <code>x-datetime-range-picker</code></h2>
<p>دو ورودی from/to مستقل.</p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>گروه</th><th>پراپ‌ها</th></tr></thead><tbody><tr><td>نام</td><td><code>name</code> (پایه)، <code>fromName</code>, <code>toName</code></td></tr><tr><td>لیبل/placeholder</td><td><code>fromLabel</code>, <code>toLabel</code>, <code>fromPlaceholder</code>, <code>toPlaceholder</code> (<code>&quot; &quot;</code>)</td></tr><tr><td>مقدار/بازه (Carbon)</td><td><code>fromValue</code>, <code>toValue</code>, <code>fromMinDate</code>, <code>toMinDate</code>, <code>fromMaxDate</code>, <code>toMaxDate</code></td></tr><tr><td>غیرفعال</td><td><code>fromDisabledDates</code>, <code>toDisabledDates</code>, <code>disabledDays</code>, <code>fromDisabled</code>, <code>toDisabled</code>, <code>fromDisabledTooltip</code>, <code>toDisabledTooltip</code></td></tr><tr><td>پیام</td><td><code>fromMessageStyle</code>/<code>toMessageStyle</code> (<code>message</code>), <code>fromMessageType</code>/<code>toMessageType</code> (<code>info</code>), <code>fromDefaultMessage</code>/<code>toDefaultMessage</code></td></tr><tr><td>ظاهر</td><td><code>fromClearable</code>/<code>toClearable</code> (true)، <code>fromPrefix/Suffix</code>, <code>toPrefix/Suffix</code>, <code>rowClass</code>, <code>containerClass</code>, <code>showIcon</code>, <code>dir</code>, <code>textAlign</code></td></tr><tr><td>رفتار</td><td><code>type</code>, <code>dateFormat</code>, <code>autoClose</code>, <code>allowGregorian</code>, <code>allowTyping</code>, <code>timePickerOptions</code>, <code>allowSameDaySelection</code> (true), <code>selectableRange</code> (فاصله مجاز؛ مثلاً هر 30 روز)</td></tr></tbody></table></div>
<p><strong>JS:</strong> <code>$(&quot;#id&quot;).setValue({from:..., to:...})</code> (مقدار خارج بازه تغییر نمی‌کند؛ <code>null</code> = پاک)؛ <code>setRange({fromMinDate, fromMaxDate, toMinDate, toMaxDate})</code>.</p>
<p>فاصله دو input بر اساس اولین <code>.row</code> والد تعیین می‌شود. (قانون مصوب: تاریخ شروع و پایان کنار هم.)</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-datetime-range-picker
    id=&quot;contract_date_range&quot;
    name=&quot;contract_date&quot;
    from-name=&quot;start_date&quot;
    to-name=&quot;end_date&quot;
    from-label=&quot;تاریخ شروع قرارداد&quot;
    to-label=&quot;تاریخ پایان قرارداد&quot;
    :from-value=&quot;isset($contract-&gt;start_date) ? jalali($contract-&gt;start_date)-&gt;toCarbon() : null&quot;
    :to-value=&quot;isset($contract-&gt;end_date) ? jalali($contract-&gt;end_date)-&gt;toCarbon() : null&quot;
    type=&quot;date&quot;
    :allow-typing=&quot;true&quot;
    :allow-same-day-selection=&quot;true&quot;
/&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدار مهم:</strong> مقادیر <code>fromValue</code>, <code>toValue</code>, <code>fromMinDate</code>, <code>toMinDate</code>, <code>fromMaxDate</code>, <code>toMaxDate</code> همگی <strong>باید نمونه <code>Carbon</code></strong> باشند (در صورت داشتن تاریخ شمسی از <code>jalali($str)-&gt;toCarbon()</code> استفاده کنید). طبق قانون مصوب پروژه، فیلترهای «تاریخ شروع» و «تاریخ پایان» همیشه باید در یک سطر قرار گیرند.</div></div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-form-components-15" class="scroll-mt-header">۱۳. <code>x-file-picker</code></h2>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پراپ</th><th>نوع</th><th>پیش‌فرض</th><th>توضیح</th></tr></thead><tbody><tr><td><code>multiple</code></td><td>bool</td><td>false</td><td></td></tr><tr><td><code>allowedExtensions</code> / <code>disallowedExtensions</code></td><td>string</td><td>null</td><td><code>&quot;jpg,png,mp4&quot;</code></td></tr><tr><td><code>minSize</code> / <code>maxSize</code></td><td>int</td><td>null</td><td><strong>کیلوبایت</strong></td></tr><tr><td><code>minSelection</code> / <code>maxSelection</code></td><td>int</td><td>null</td><td></td></tr><tr><td><code>value</code></td><td>array/object/int/string/null</td><td>null</td><td>id یا آرایه id فایل‌ها</td></tr><tr><td><code>cols</code></td><td>int</td><td>null</td><td>ستون پیش‌نمایش</td></tr><tr><td><code>previewContainerClass</code></td><td>string</td><td>null</td><td></td></tr><tr><td><code>clearable</code></td><td>bool</td><td>true</td><td></td></tr><tr><td><code>allowRename</code></td><td>bool</td><td>false</td><td></td></tr><tr><td><code>fileNameMaxLength</code></td><td>int</td><td>255</td><td></td></tr><tr><td><code>showPreviewPopup</code> / <code>showPreviewThumbnail</code></td><td>bool</td><td>false</td><td></td></tr><tr><td><code>previewMode</code></td><td>enum</td><td><code>fancybox</code></td><td>یا <code>modal</code></td></tr><tr><td><code>uploadZoneHeight</code></td><td>string</td><td>null</td><td><code>&quot;120px&quot;</code></td></tr><tr><td><code>uploadZoneOrientation</code></td><td>string</td><td><code>&quot;horizontal&quot;</code></td><td>یا <code>vertical</code></td></tr><tr><td><code>deleteTooltipText</code> / <code>replaceTooltipText</code></td><td>string</td><td>null</td><td></td></tr><tr><td><code>disableReplace</code> / <code>disableDelete</code></td><td>bool</td><td>false</td><td></td></tr></tbody></table></div>
<p><strong>رویداد:</strong> <code>$(&quot;#file-picker&quot;).on(&quot;file-picker:change&quot;, (e, data) =&gt; ...)</code>.</p>
<p><strong>JS:</strong> <code>filePickerInstance.setValue({key,name,src,size,extension})</code> یا آرایه (هر فایل حداقل <code>key,name,src</code>).</p>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ اگر <code>src</code> URL باشد حذف/ویرایش درست کار نمی‌کند → id یا مدل فایل.</div></div>
<p><strong>تغییر پویا:</strong> <code>componentManagement(&#039;documents&#039;).clear().setProp(&#039;allowedExtensions&#039;,&#039;jpg,png&#039;).setProp(&#039;maxSize&#039;,2048).updateHelper({max_size:2048, allowed_extensions:&#039;jpg,png&#039;})</code> و <strong>همان قوانین</strong> را در FormRequest شرطی کنید (<code>mimes:jpg,png|max:2048</code>).</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-file-picker
    name=&quot;attachments&quot;
    id=&quot;attachments_picker&quot;
    label=&quot;فایل‌های پیوست&quot;
    :multiple=&quot;true&quot;
    allowed-extensions=&quot;pdf,jpg,png,zip&quot;
    :max-size=&quot;5120&quot;
    :max-selection=&quot;5&quot;
    :value=&quot;$model-&gt;attachment_ids ?? null&quot;
    :show-preview-thumbnail=&quot;true&quot;
    preview-mode=&quot;fancybox&quot;
/&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدارهای حیاتی <code>x-file-picker</code>:</strong><br>- مقادیر <code>minSize</code> و <code>maxSize</code> برحسب <strong>کیلوبایت (KB)</strong> هستند (مثلاً <code>5120</code> معادل ۵ مگابایت).<br>- به پراپ <code>value</code> حتماً <strong>شناسه فایل (<code>id</code>) یا مدل فایل</strong> بدهید؛ اگر URL مستقیم بدهید، عملیات حذف و جایگزینی فایل به‌درستی کار نخواهد کرد.<br>- در صورت تغییر پویای پسوند یا حجم مجاز در JS با <code>setProp</code> و <code>updateHelper</code>، حتماً همان شرط را در <code>FormRequest</code> سمت سرور نیز اعمال کنید.</div></div>
<h2 id="sec-abolframe-form-components-16" class="scroll-mt-header">۱۴. <code>x-image-picker</code></h2>
<p>فقط تصویر؛ cropper، کنترل ابعاد و نسبت.</p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پراپ</th><th>پیش‌فرض</th><th>توضیح</th></tr></thead><tbody><tr><td><code>allowedExtensions</code></td><td>همه تصاویر</td><td></td></tr><tr><td><code>disallowedExtensions</code>, <code>minSize</code>, <code>maxSize</code> (KB)</td><td></td><td></td></tr><tr><td><code>src</code></td><td>null</td><td>id یا مدل فایل (URL نه)</td></tr><tr><td><code>cropper</code>, <code>forceCropping</code>, <code>allowRecropping</code></td><td>false</td><td></td></tr><tr><td><code>quality</code></td><td>0.75</td><td>0..1</td></tr><tr><td><code>minWidth/maxWidth/minHeight/maxHeight</code></td><td>null</td><td>پیکسل</td></tr><tr><td><code>minAspectRatio/maxAspectRatio/aspectRatio</code></td><td>null</td><td></td></tr><tr><td><code>fit</code></td><td><code>&quot;cover&quot;</code></td><td>یا <code>contain</code></td></tr><tr><td><code>uploadZoneHeight</code>, <code>fileNameMaxLength</code>, <code>allowRename</code>, <code>clearable</code>, <code>previewContainerClass</code></td><td></td><td></td></tr><tr><td><code>header</code></td><td>null</td><td>متن بالای ورودی</td></tr><tr><td><code>compactMode</code></td><td>false</td><td>حالت کوچک مثل file-picker</td></tr></tbody></table></div>
<p><strong>رویداد:</strong> <code>image-picker:change</code>. <strong>initialize مجدد:</strong> <code>pickerInstance?.resetValue(); imagePickerElement.data({&#039;allowed-extensions&#039;:..., &#039;max-size&#039;:...}); initializeImagePicker(&quot;#id&quot;); pickerInstance?.updateHelper({max_size, allowed_extensions});</code></p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-image-picker
    name=&quot;avatar_id&quot;
    id=&quot;user_avatar_picker&quot;
    label=&quot;تصویر پروفایل&quot;
    allowed-extensions=&quot;jpg,jpeg,png,webp&quot;
    :max-size=&quot;2048&quot;
    :src=&quot;$user-&gt;avatar_file_id ?? null&quot;
    :cropper=&quot;true&quot;
    :force-cropping=&quot;true&quot;
    aspect-ratio=&quot;1:1&quot;
    :min-width=&quot;300&quot;
    :min-height=&quot;300&quot;
/&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدار:</strong> پراپ <code>src</code> فقط <strong>شناسه فایل (<code>id</code>) یا مدل فایل</strong> را می‌پذیرد (ارسال URL مستقیم مجاز نیست).</div></div>
<h2 id="sec-abolframe-form-components-17" class="scroll-mt-header">۱۵. <code>x-select-image</code></h2>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پراپ</th><th>پیش‌فرض</th><th>توضیح</th></tr></thead><tbody><tr><td><code>value</code></td><td>null</td><td>id یا مدل فایل (URL پشتیبانی نمی‌شود)</td></tr><tr><td><code>options</code></td><td>[]</td><td>آرایه id/مدل</td></tr><tr><td><code>previewSize</code></td><td><code>&quot;48px&quot;</code></td><td></td></tr><tr><td><code>previewBorderRadius</code></td><td><code>&quot;24px&quot;</code></td><td></td></tr><tr><td><code>columns</code></td><td>3</td><td></td></tr><tr><td><code>containerWidth</code></td><td><code>&quot;188px&quot;</code></td><td></td></tr><tr><td><code>maxContainerHeight</code></td><td><code>&quot;400px&quot;</code></td><td></td></tr><tr><td><code>placeholderImageUrl</code></td><td>blank.png</td><td>تنها مقداری که URL می‌پذیرد</td></tr></tbody></table></div>
<p>مقادیر با FileManager به URL تبدیل می‌شوند؛ مقدار نامعتبر = استثنا؛ فایل پیدا نشد = نادیده.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-select-image
    name=&quot;avatar_template_id&quot;
    id=&quot;avatar_template_select&quot;
    label=&quot;انتخاب آواتار پیش‌فرض&quot;
    :options=&quot;$avatarFileIds&quot;
    :value=&quot;old(&#039;avatar_template_id&#039;, $user-&gt;avatar_template_id)&quot;
    :columns=&quot;4&quot;
    preview-size=&quot;56px&quot;
/&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدار:</strong> پراپ‌های <code>value</code> و <code>options</code> فقط شناسه فایل یا مدل FileManager را می‌پذیرند و تنها پراپی که URL مستقیم قبول می‌کند <code>placeholderImageUrl</code> است.</div></div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-form-components-18" class="scroll-mt-header">۱۶. <code>x-item-collector</code> (جمع‌آوری آیتم)</h2>
<p>افزودن/ویرایش/حذف داینامیک آیتم‌ها با فیلدهای فرزند (هر کامپوننت فرم).</p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پراپ</th><th>پیش‌فرض</th><th>توضیح</th></tr></thead><tbody><tr><td><code>containerClass</code>, <code>gridClass</code>, <code>itemsClass</code></td><td>null</td><td>برای ستون‌ها از <code>row-cols-sm-*/md-*/lg-*</code> در <code>itemsClass</code></td></tr><tr><td><code>itemsOrientation</code></td><td><code>&quot;horizontal&quot;</code></td><td><code>vertical</code>/<code>horizontal</code></td></tr><tr><td><code>itemsTitle</code>, <code>itemsTitleSelector</code></td><td>null</td><td></td></tr><tr><td><code>itemsLayout</code></td><td><code>&quot;grid&quot;</code></td><td><code>grid</code> یا <code>flow</code></td></tr><tr><td><code>max</code></td><td>null</td><td></td></tr><tr><td><code>buttonText</code></td><td><code>&quot;افزودن&quot;</code></td><td></td></tr><tr><td><code>values</code></td><td>null</td><td>مقادیر اولیه: <code>[ &#039;field&#039; =&gt; [&#039;text&#039;=&gt;..., &#039;value&#039;=&gt;...] ]</code></td></tr><tr><td><code>clearable</code>, <code>editable</code></td><td>true</td><td></td></tr><tr><td><code>useDeleteAction</code></td><td>false</td><td>حذف با callback</td></tr></tbody></table></div>
<p><strong>جلوگیری از تکرار:</strong> <code>data-prevent-duplicates</code> روی فیلد.</p>
<p><strong>JS:</strong> <code>$(&quot;#id&quot;).data(&quot;instance&quot;).setValues([...])</code>؛ <code>instance.onAction(&quot;delete&quot;, async (e) =&gt; bool)</code> (باید Promise برگرداند؛ true = حذف).</p>
<div class="callout info"><i class="fa fa-circle-info callout-icon"></i><div><strong>اعتبارسنجی (مهم):</strong></div></div>
<ul><li>یک مقدار زیر دو کلید validate می‌شود: <code>x</code> (ورودی مستقل) و <code>item-collector-name.*.x</code> (بعد از افزودن/ارسال). برای جلوگیری از تکرار از <code>itemCollectorRules($name, $fields, collector: [...], forceRemote: true)</code> استفاده کنید. هر فیلد آرایه ساده rules یا <code>[&#039;rules&#039;=&gt;..., &#039;single&#039;=&gt;..., &#039;each&#039;=&gt;...]</code>؛ <code>nullable</code> و <code>required</code> خودکار.</li><li>❌ <code>required</code> را در rules فیلدها ننویسید (ورودی مستقل بعد از افزودن خالی می‌ماند و submit خطا می‌دهد)؛ اجباری‌بودن با پراپ <code>required</code> روی خود input Blade.</li><li>قاعده‌ای که کل مجموعه را می‌بیند (یکتایی، همپوشانی بازه‌ها) فقط در <code>collector:</code>.</li><li>سه دسته: استاتیک (<code>numeric|min|max</code>)، منطقی (<code>Rule::exists</code> / یکتایی در collector)، وابسته به سایر آیتم‌ها (<code>NonOverlappingPeriodsRule</code> در collector).</li></ul>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>return itemCollectorRules(&#039;item_collector&#039;, [
    &#039;license_major_type_id&#039; =&gt; [&#039;rules&#039;=&gt;[Rule::exists(&#039;license_major_types&#039;,&#039;id&#039;)-&gt;withoutTrashed()], &#039;single&#039;=&gt;[new UniqueLicenseMajorSkillRule(&#039;license_major&#039;)]],
    &#039;skill_grade_id&#039; =&gt; [Rule::exists(&#039;skill_grades&#039;,&#039;id&#039;)-&gt;withoutTrashed()],
], collector: [&#039;array&#039;,&#039;required&#039;, new UniqueLicenseMajorSkillRule(&#039;item_collector&#039;)]);</code></pre>
</div>
<h2 id="sec-abolframe-form-components-19" class="scroll-mt-header">۱۷. <code>x-repeater-inputs</code> + <code>x-repeater-input.column</code></h2>
<p>فرم تکرارشونده با افزودن/حذف ردیف.</p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پراپ</th><th>پیش‌فرض</th><th>توضیح</th></tr></thead><tbody><tr><td><code>values</code></td><td>null</td><td>مقادیر اولیه</td></tr><tr><td><code>initialRows</code></td><td>1</td><td></td></tr><tr><td><code>minRows</code> / <code>maxRows</code></td><td>null</td><td></td></tr><tr><td><code>allowDelete</code>, <code>showDelete</code></td><td>true</td><td></td></tr><tr><td><code>showDeleteAll</code></td><td>false</td><td></td></tr><tr><td><code>addRowText</code></td><td><code>افزودن ردیف</code></td><td></td></tr><tr><td><code>tooltip</code>, <code>hint</code>, <code>defaultMessage...</code></td><td></td><td></td></tr><tr><td><code>deleteCondition</code></td><td>null</td><td>شرط حذف (مثلاً \`"$row[year] != '1'</td></tr><tr><td><code>staticRows</code></td><td>null</td><td><code>[[&#039;name&#039;=&gt;&#039;x&#039;,&#039;label&#039;=&gt;&#039;وضع موجود&#039;],...]</code> — نمای جدولی؛ <strong>افزودن ردیف ممکن نیست</strong>؛ <code>label</code> ابتدای ردیف و <code>name</code> اندیس input</td></tr><tr><td><code>minColumnWidth</code></td><td>null</td><td></td></tr><tr><td>slot <code>header</code></td><td></td><td></td></tr></tbody></table></div>
<p><strong>پراپ‌های ستون:</strong> <code>columnName</code> (اجباری)، <code>columnId</code>, <code>columnLabel</code>, <code>columnType</code> (<code>text number select multiselect switch hidden</code>)، <code>columnLabelTooltip</code>, <code>columnIsUnique</code>, <code>columnSuffix</code>, <code>columnWidth</code> (مثلاً <code>200px</code>؛ ویژه switch). پراپ‌های سایر input‌ها با <strong>camelCase</strong> (مثلاً <code>showSeparator</code>).</p>
<p><strong>متدهای jQuery:</strong> <code>getRows()</code>, <code>getRow(i)</code>, <code>resetRepeaterInputs()</code>, <code>toggleRequiredLabel(id, state?)</code> (فقط بعد از رندر کامل).</p>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <code>columnType=&quot;hidden&quot;</code> در پروژه استفاده نشود.</div></div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-repeater-inputs
    name=&quot;educations&quot;
    id=&quot;educations_repeater&quot;
    label=&quot;سوابق تحصیلی&quot;
    :values=&quot;old(&#039;educations&#039;, $userEducations ?? [])&quot;
    :initial-rows=&quot;1&quot;
    :min-rows=&quot;1&quot;
    :max-rows=&quot;10&quot;
    add-row-text=&quot;افزودن مقطع تحصیلی&quot;
&gt;
    &lt;x-repeater-input.column
        column-name=&quot;degree&quot;
        column-label=&quot;مقطع&quot;
        column-type=&quot;select&quot;
        :items=&quot;$degrees&quot;
        :required=&quot;true&quot;
    /&gt;
    &lt;x-repeater-input.column
        column-name=&quot;university&quot;
        column-label=&quot;نام دانشگاه&quot;
        column-type=&quot;text&quot;
        :required=&quot;true&quot;
    /&gt;
    &lt;x-repeater-input.column
        column-name=&quot;gpa&quot;
        column-label=&quot;معدل&quot;
        column-type=&quot;number&quot;
        :allow-decimal=&quot;true&quot;
    /&gt;
&lt;/x-repeater-inputs&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدارهای مهم <code>x-repeater-inputs</code>:</strong><br>- هرگز از <code>columnType=&quot;hidden&quot;</code> در ستون‌های تکرارشونده استفاده نکنید (ممنوعیت سخت زیرساخت).<br>- پراپ‌های اختصاصی هر ستون (مانند <code>showSeparator</code> یا <code>allowDecimal</code>) باید به‌صورت <strong>camelCase</strong> نوشته شوند.<br>- در صورت استفاده از پراپ <code>staticRows</code>، جدول حالت ماتریسی ثابت پیدا می‌کند و امکان افزودن ردیف جدید توسط کاربر وجود نخواهد داشت.</div></div>
<h2 id="sec-abolframe-form-components-20" class="scroll-mt-header">۱۸. <code>x-tag-collector</code> + <code>x-tag-collector.input</code></h2>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پراپ</th><th>پیش‌فرض</th><th>توضیح</th></tr></thead><tbody><tr><td><code>value</code> / <code>values</code></td><td>null</td><td></td></tr><tr><td><code>itemClass</code></td><td>null</td><td></td></tr><tr><td><code>max</code></td><td>null</td><td></td></tr><tr><td><code>allowDuplicates</code></td><td>true</td><td></td></tr><tr><td><code>regex</code></td><td>null</td><td>اعتبارسنجی مقدار</td></tr><tr><td><code>labelFieldLabel</code> / <code>labelFieldName</code></td><td><code>&quot;عنوان&quot;</code> / <code>&quot;title&quot;</code></td><td></td></tr><tr><td><code>valueFieldLabel</code> / <code>valueFieldName</code></td><td><code>&quot;مقدار&quot;</code> / <code>&quot;value&quot;</code></td><td></td></tr><tr><td><code>buttonText</code></td><td><code>&quot;افزودن&quot;</code></td><td></td></tr><tr><td><code>autoComplete</code>, <code>prefix</code>, <code>suffix</code>, <code>readonly</code></td><td></td><td></td></tr></tbody></table></div>
<p>فرزند <code>x-tag-collector.input</code>: <code>type</code> (<code>text</code>, <code>number</code>, <code>select</code>, <code>multiselect</code>), <code>permission</code> مستقل.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-tag-collector
    name=&quot;specifications&quot;
    id=&quot;specs_tag_collector&quot;
    label=&quot;مشخصات فنی&quot;
    label-field-label=&quot;ویژگی&quot;
    label-field-name=&quot;spec_title&quot;
    value-field-label=&quot;مقدار&quot;
    value-field-name=&quot;spec_value&quot;
    :allow-duplicates=&quot;false&quot;
    :max=&quot;20&quot;
    :values=&quot;$productSpecs ?? []&quot;
&gt;
    &lt;x-tag-collector.input type=&quot;text&quot; name=&quot;spec_title&quot; label=&quot;عنوان ویژگی&quot; /&gt;
    &lt;x-tag-collector.input type=&quot;text&quot; name=&quot;spec_value&quot; label=&quot;مقدار ویژگی&quot; /&gt;
&lt;/x-tag-collector&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>نکته:</strong> هر فرزند <code>&lt;x-tag-collector.input&gt;</code> می‌تواند پراپ <code>permission</code> مستقل داشته باشد تا فقط در صورت داشتن مجوز رندر شود.</div></div>
<h2 id="sec-abolframe-form-components-21" class="scroll-mt-header">۱۹. <code>x-tag-input</code></h2>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پراپ</th><th>پیش‌فرض</th><th>توضیح</th></tr></thead><tbody><tr><td><code>value</code></td><td>null</td><td>تگ‌ها جداشده با separator</td></tr><tr><td><code>separator</code></td><td><code>,</code></td><td></td></tr><tr><td><code>draggable</code></td><td>true</td><td>مرتب‌سازی drag &amp; drop</td></tr><tr><td><code>addOnSpace</code></td><td>false</td><td>افزودن با Space</td></tr><tr><td><code>min</code> / <code>max</code></td><td>null</td><td></td></tr><tr><td><code>maxLength</code></td><td>null</td><td>مجموع طول با جداکننده‌ها</td></tr><tr><td><code>itemMaxWidth</code></td><td>null</td><td>پیکسل</td></tr><tr><td><code>autoComplete</code>, <code>prefix</code>, <code>suffix</code></td><td></td><td></td></tr></tbody></table></div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-tag-input
    name=&quot;keywords&quot;
    id=&quot;seo_keywords&quot;
    label=&quot;کلمات کلیدی&quot;
    :value=&quot;old(&#039;keywords&#039;, &#039;لاراول,ابول فریم,زیرساخت&#039;)&quot;
    separator=&quot;,&quot;
    :draggable=&quot;true&quot;
    :min=&quot;2&quot;
    :max=&quot;10&quot;
    :max-length=&quot;250&quot;
/&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدار:</strong> پراپ <code>maxLength</code> مجموع طول تمام تگ‌ها <strong>به‌همراه کاراکترهای جداکننده (<code>separator</code>)</strong> را محاسبه می‌کند.</div></div>
<h2 id="sec-abolframe-form-components-22" class="scroll-mt-header">۲۰. <code>x-email-input</code> و <code>x-url-input</code></h2>
<p>مشترک: <code>value</code>, <code>placeholder</code>, <code>prefix</code>, <code>suffix</code>, <code>minLength</code>, <code>maxLength</code>, <code>autoFocus</code>, <code>textAlign</code> (<code>left</code>/<code>right</code>), <code>readonly</code>.</p>
<ul><li><strong>email:</strong> <code>suggestion</code> (array پیشنهاد ایمیل)؛ <code>trim</code> در مثال.</li><li><strong>url:</strong> <code>trim</code> (پیش‌فرض <strong>true</strong>)، <code>expression</code> (regex)، <code>suggestion</code>, <code>autoComplete</code> (<code>&quot;off&quot;</code>, <code>url</code>)، <code>labelSuffixSlot</code>.</li></ul>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-email-input
    name=&quot;support_email&quot;
    id=&quot;support_email&quot;
    label=&quot;ایمیل پشتیبانی&quot;
    :value=&quot;old(&#039;support_email&#039;, $setting-&gt;support_email ?? &#039;&#039;)&quot;
    :suggestion=&quot;[&#039;gmail.com&#039;, &#039;yahoo.com&#039;, &#039;outlook.com&#039;]&quot;
    :trim=&quot;true&quot;
    :required=&quot;true&quot;
/&gt;

&lt;x-url-input
    name=&quot;website_url&quot;
    id=&quot;website_url&quot;
    label=&quot;آدرس وب‌سایت&quot;
    :value=&quot;old(&#039;website_url&#039;, $company-&gt;website_url ?? &#039;&#039;)&quot;
    :trim=&quot;true&quot;
    placeholder=&quot;https://example.com&quot;
/&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>نکته:</strong> در <code>x-url-input</code> مقدار پیش‌فرض <code>trim</code> برابر <code>true</code> است. در سمت سرور نیز از <code>UrlRule</code> برای اعتبارسنجی دقیق ساختار URL استفاده کنید.</div></div>
<h2 id="sec-abolframe-form-components-23" class="scroll-mt-header">۲۱. <code>x-password-input</code></h2>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پراپ</th><th>پیش‌فرض</th></tr></thead><tbody><tr><td><code>showStrengthMeter</code></td><td>true</td></tr><tr><td><code>requireUppercase</code>, <code>requireNumber</code>, <code>requireLowercase</code>, <code>requireSpecialChar</code></td><td>true</td></tr><tr><td><code>visibilityToggle</code></td><td>true</td></tr><tr><td><code>autocomplete</code></td><td><code>&#039;off&#039;</code></td></tr><tr><td><code>minLength</code>, <code>maxLength</code>, <code>prefix</code>, <code>suffix</code>, <code>autoFocus</code>, <code>readonly</code></td><td></td></tr><tr><td><code>defaultMessageType</code></td><td><code>&quot;warning&quot;</code></td></tr></tbody></table></div>
<p>سمت سرور: <code>generatePasswordRule()</code>.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-password-input
    name=&quot;password&quot;
    id=&quot;user_password&quot;
    label=&quot;رمز عبور جدید&quot;
    :show-strength-meter=&quot;true&quot;
    :visibility-toggle=&quot;true&quot;
    :require-uppercase=&quot;true&quot;
    :require-lowercase=&quot;true&quot;
    :require-number=&quot;true&quot;
    :require-special-char=&quot;true&quot;
    :min-length=&quot;8&quot;
    :max-length=&quot;32&quot;
/&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدار امنیتی:</strong> اعتبارسنجی قدرت رمز در فرانت‌اند صرفاً راهنمای کاربر است؛ در <code>FormRequest</code> سمت سرور حتماً از تابع کمکی <code>generatePasswordRule()</code> استفاده کنید تا قوانین طول و پیچیدگی رمز عبور مطابق کانفیگ مرکزی زیرساخت بررسی شوند.</div></div>
<h2 id="sec-abolframe-form-components-24" class="scroll-mt-header">۲۲. <code>x-plate-input</code></h2>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پراپ</th><th>پیش‌فرض</th><th>توضیح</th></tr></thead><tbody><tr><td><code>vehicleType</code></td><td><code>car</code></td><td><code>car</code> / <code>motorcycle</code></td></tr><tr><td><code>clearable</code></td><td>false</td><td></td></tr><tr><td><code>placeholder</code></td><td><code>&quot; &quot;</code></td><td></td></tr><tr><td><code>messageStyle</code></td><td><code>MESSAGE</code></td><td></td></tr></tbody></table></div>
<p>JS: <code>componentManagement(&quot;my_plate&quot;).setVehicleType(&quot;motorcycle&quot;)</code>, <code>setValue(&quot;11-222-ب-33&quot;)</code>, <code>clear()</code>, <code>setDisabled()</code>, <code>setError()</code>.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-plate-input
    name=&quot;vehicle_plate&quot;
    id=&quot;my_plate&quot;
    label=&quot;پلاک خودرو&quot;
    vehicle-type=&quot;car&quot;
    :clearable=&quot;true&quot;
    :required=&quot;true&quot;
/&gt;

@push(&#039;scripts&#039;)
&lt;script&gt;
    // تغییر نوع پلاک یا مقداردهی از طریق componentManagement
    componentManagement(&#039;my_plate&#039;)
        .setVehicleType(&#039;car&#039;)
        .setValue(&#039;11-222-ب-33&#039;);
&lt;/script&gt;
@endpush</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدار:</strong> پراپ <code>vehicleType</code> فقط مقادیر <code>car</code> (خودرو چهاربخشی) و <code>motorcycle</code> (موتورسیکلت دو بخشی) را می‌پذیرد. برای تغییر نوع پلاک در زمان اجرا حتماً از <code>componentManagement(&#039;id&#039;).setVehicleType(...)</code> استفاده کنید.</div></div>
<h2 id="sec-abolframe-form-components-25" class="scroll-mt-header">۲۳. <code>x-color-input</code></h2>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پراپ</th><th>توضیح</th></tr></thead><tbody><tr><td><code>value</code></td><td>مقدار اولیه (hex)</td></tr><tr><td><code>prefix</code>, <code>suffix</code></td><td></td></tr><tr><td><code>presetColors</code></td><td>آرایه رنگ پیشنهادی (hex یا نام)</td></tr><tr><td><code>onlyPresets</code></td><td>فقط انتخاب از پیشنهادها</td></tr></tbody></table></div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-color-input
    name=&quot;brand_color&quot;
    id=&quot;brand_color_picker&quot;
    label=&quot;رنگ سازمانی&quot;
    :value=&quot;old(&#039;brand_color&#039;, &#039;#5c2d91&#039;)&quot;
    :preset-colors=&quot;presetColors()&quot;
    :only-presets=&quot;false&quot;
/&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>نکته:</strong> برای هماهنگی کامل با پالت رنگ زیرساخت ابول فریم، آرایه <code>presetColors()</code> را به پراپ <code>:preset-colors</code> پاس دهید.</div></div>
<h2 id="sec-abolframe-form-components-26" class="scroll-mt-header">۲۴. <code>x-icon-picker</code></h2>
<p><code>value</code> (کلاس آیکن)، <code>clearable</code> (true)، <code>placeholder</code> (<code>&#039; &#039;</code>)، ورودی خود readonly است؛ جستجو و پیش‌نمایش آیکن (FontAwesome).</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-icon-picker
    name=&quot;menu_icon&quot;
    id=&quot;menu_icon_picker&quot;
    label=&quot;آیکن منو&quot;
    :value=&quot;old(&#039;menu_icon&#039;, &#039;fa-solid fa-layer-group&#039;)&quot;
    :clearable=&quot;true&quot;
/&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>نکته:</strong> فیلد متنی <code>x-icon-picker</code> به‌صورت خودکار <code>readonly</code> است و انتخاب آیکن از طریق پنجره جستجوی بصری FontAwesome انجام می‌شود.</div></div>
<h2 id="sec-abolframe-form-components-27" class="scroll-mt-header">۲۵. <code>x-slug-input</code></h2>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پراپ</th><th>پیش‌فرض</th><th>توضیح</th></tr></thead><tbody><tr><td><code>parentId</code></td><td>—</td><td><strong>اجباری</strong> (معمولاً فیلد عنوان)</td></tr><tr><td><code>separator</code></td><td><code>&quot;-&quot;</code></td><td></td></tr><tr><td><code>mode</code></td><td><code>&quot;normal&quot;</code></td><td><code>normal</code>/<code>advanced</code></td></tr><tr><td><code>removeStopWords</code></td><td>false</td><td>حذف <code>and, a, or, the, is, in, on, at, to</code></td></tr><tr><td><code>removeNumbers</code></td><td>false</td><td></td></tr><tr><td><code>autoComplete</code></td><td>false</td><td></td></tr></tbody></table></div>
<p>تولید خودکار اسلاگ از مقدار فیلد والد؛ rule سرور <code>SlugRule</code>/<code>PersianSlugRule</code>.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-text-input name=&quot;title&quot; id=&quot;article_title&quot; label=&quot;عنوان مقاله&quot; :required=&quot;true&quot; /&gt;

&lt;x-slug-input
    name=&quot;slug&quot;
    id=&quot;article_slug&quot;
    parent-id=&quot;article_title&quot;
    label=&quot;نامک (Slug)&quot;
    separator=&quot;-&quot;
    mode=&quot;normal&quot;
    :remove-stop-words=&quot;true&quot;
/&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدار مهم:</strong> پراپ <code>parentId</code> در <code>x-slug-input</code> <strong>اجباری</strong> است و باید دقیقاً برابر <code>id</code> فیلد عنوان والد باشد. در سمت سرور نیز از <code>SlugRule</code> (انگلیسی) یا <code>PersianSlugRule</code> (فارسی) استفاده کنید.</div></div>
<h2 id="sec-abolframe-form-components-28" class="scroll-mt-header">۲۶. <code>x-search-input</code></h2>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پراپ</th><th>پیش‌فرض</th><th>توضیح</th></tr></thead><tbody><tr><td><code>mode</code></td><td><code>&#039;simple&#039;</code></td><td><code>simple</code> / <code>livewire</code> / <code>qs</code></td></tr><tr><td><code>targetId</code></td><td>null</td><td>simple و livewire: اجباری</td></tr><tr><td><code>itemsSelector</code></td><td>null</td><td>simple: اجباری</td></tr><tr><td><code>qsParamKey</code></td><td><code>&#039;search&#039;</code></td><td>qs: اجباری؛ آیکن فقط راست</td></tr><tr><td><code>icon</code></td><td><code>fa-regular fa-magnifying-glass</code></td><td></td></tr><tr><td><code>iconPosition</code></td><td><code>&#039;right&#039;</code></td><td></td></tr><tr><td><code>placeholder</code></td><td><code>&#039;جستجو کنید...&#039;</code></td><td></td></tr><tr><td><code>id</code></td><td>تصادفی</td><td></td></tr></tbody></table></div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>{{-- جستجوی آنی در آیتم‌های صفحه (حالت simple) --}}
&lt;x-search-input
    id=&quot;faq_search&quot;
    mode=&quot;simple&quot;
    target-id=&quot;faq_list_container&quot;
    items-selector=&quot;.faq-item&quot;
    placeholder=&quot;جستجو در سوالات متداول...&quot;
/&gt;

{{-- جستجوی متصل به Query String آدرس صفحه (حالت qs) --}}
&lt;x-search-input
    id=&quot;table_qs_search&quot;
    mode=&quot;qs&quot;
    qs-param-key=&quot;search&quot;
    placeholder=&quot;جستجو و فیلتر...&quot;
/&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدار:</strong> در حالت <code>simple</code> هر دو پراپ <code>targetId</code> و <code>itemsSelector</code> اجباری هستند؛ در حالت <code>livewire</code> پراپ <code>targetId</code> اجباری است؛ و در حالت <code>qs</code> پراپ <code>qsParamKey</code> اجباری بوده و جایگاه آیکن فقط در سمت راست (<code>right</code>) مجاز است.</div></div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-form-components-29" class="scroll-mt-header">۲۷. <code>x-map</code> (نقشه Maplibre)</h2>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پراپ</th><th>پیش‌فرض</th><th>توضیح</th></tr></thead><tbody><tr><td><code>id</code></td><td><code>x-component-map-RANDOM</code></td><td></td></tr><tr><td><code>style</code></td><td><code>&#039;base&#039;</code></td><td>فقط <code>base</code> یا <code>satellite</code></td></tr><tr><td><code>height</code></td><td><code>&#039;400px&#039;</code></td><td></td></tr><tr><td><code>configClass</code></td><td>null</td><td><strong>با <code>drawable</code> اجباری</strong></td></tr><tr><td><code>zoom</code>/<code>minZoom</code>/<code>maxZoom</code></td><td>4 / 3 / 19</td><td></td></tr><tr><td><code>centerLatitude</code>/<code>centerLongitude</code></td><td>32.2943779 / 53.6833878</td><td></td></tr><tr><td><code>interactive</code></td><td>true</td><td></td></tr><tr><td><code>controls</code></td><td><code>[navigation, fullscreen, geolocation]</code></td><td>فقط همین سه مقدار؛ غیر = خطا</td></tr><tr><td><code>markers</code></td><td>[]</td><td><code>latitude, longitude, title, color</code></td></tr><tr><td><code>zones</code></td><td><code>[38,39,40,41]</code></td><td>zone UTM</td></tr><tr><td><code>searchable</code></td><td>true</td><td></td></tr><tr><td><code>drawable</code></td><td>false</td><td>ابزار رسم و نقطه‌گذاری</td></tr><tr><td><code>selectable</code></td><td>false</td><td>انتخاب نقطه</td></tr><tr><td><code>radiusBoundary</code></td><td>null</td><td><code>[&#039;center_latitude&#039;=&gt;float,&#039;center_longitude&#039;=&gt;float,&#039;radius&#039;=&gt;int]</code></td></tr><tr><td><code>mapOptions</code>, <code>parameters</code></td><td>[] / null</td><td><code>parameters</code> به بک‌اند</td></tr><tr><td><code>boundary</code></td><td>null</td><td>محدوده مجاز</td></tr><tr><td><code>minLatitude/maxLatitude/minLongitude/maxLongitude</code></td><td>-180/180/-90/90</td><td></td></tr><tr><td><code>minXUtm/maxXUtm/minYUtm/maxYUtm</code></td><td>100000/999999/0/10000000</td><td></td></tr><tr><td><code>maxKmlKmzFileSize</code>, <code>maxTxtFileSize</code></td><td>null</td><td></td></tr></tbody></table></div>
<p>اگر <code>drawable</code> غیرفعال و <code>configClass</code> داده شود، نقاط فقط نمایشی‌اند. config: <code>&#039;map&#039; =&gt; [&#039;min_latitude&#039;=&gt;null, ... &#039;max_y_utm&#039;=&gt;null]</code>.</p>
<p><strong>رویدادها:</strong> <code>map:select</code> (data شامل lat/lng)، <code>map:change</code> (data: <code>{center:{latlng:{lat,lng}, utm:{x,y,z}}, area}</code>).</p>
<h3 id="sec-abolframe-form-components-30" class="scroll-mt-header">بک‌اند: <code>configClass extends BaseMap</code></h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>class ProjectMap extends BaseMap
{
    /** @return UtmPoint[] */
    protected function getCurrentValues(): array
    { return [new UtmPoint(x: 681964.6172, y: 4046655.000, z: 39, identifier: 123)]; }
    protected function handleChanges(): void
    {
        $projectId = $this-&gt;getParameters()[&#039;project_id&#039;] ?? null;
        $added = $this-&gt;getAddedPoints(); $deleted = $this-&gt;getDeletedPoints(); $updated = $this-&gt;getUpdatedPoints();
    }
}</code></pre>
</div>
<ul><li>هر <code>UtmPoint</code>: <code>identifier</code>, <code>x</code>, <code>y</code>, <code>z</code> همگی <strong>غیر null</strong>؛ در غیر این صورت <code>InvalidArgumentException</code> («Item at index X must be an instance of UtmPoint / is missing required field: 'identifier' / 'z'»).</li><li>متدها: <code>getParameters()</code>, <code>getCurrentPoints()</code>, <code>getPreviousPoints()</code>, <code>getAddedPoints()</code>, <code>getUpdatedPoints()</code> (شناسه یکسان با مختصات متفاوت), <code>getDeletedPoints()</code>.</li><li><strong><code>sort</code>:</strong> ترتیب نقطه در آرایه درخواست؛ currentPoints از 0؛ addedPoints موقعیت واقعی در آرایه فعلی (نه از 0)؛ updated در آرایه فعلی؛ deleted در آرایه قبلی.</li><li><strong>DTOs:</strong> <code>UtmPoint(x,y,z,identifier,attributes,sort)</code> با <code>getX/getY/getZ/getIdentifier/getSort/toArray/fromArray/fromArrayList/toLatLongPoint()</code>؛ <code>LatLongPoint(latitude, longitude, identifier, attributes, sort)</code> با <code>toUtmPoint()</code>. بدون zone در تبدیل = <code>InvalidArgumentException</code>. facade: <code>Regionalizer::toLatLong()/toUtm()</code>.</li><li>parameters: هر نوع داده؛ نبود = آرایه خالی؛ با <code>??</code> بخوانید.</li></ul>
        `
    },
    {
        id: "abolframe-ui-components",
        title: "۱۱. کامپوننت‌های UI و نمایش (۲۷ کامپوننت)",
        icon: "fa-layer-group",
        category: "مستندات جامع ابول فریم (AbolFrame)",
        content: `
<h1>۱۱. کامپوننت‌های UI و نمایش (Blade) — توضیح کامل</h1>
<div class="callout info"><i class="fa fa-circle-info callout-icon"></i><div>همه کامپوننت‌ها پراپ <code>permission</code> (string|null، پیش‌فرض null، با <code>hasAccess</code>) را می‌پذیرند؛ بدون مجوز، کامپوننت و slotها رندر نمی‌شوند. در جدول‌ها تکرار نشده است.</div></div>
<div class="toc-quick-jump-card my-4 p-3 rounded-3 border bg-body-tertiary"><div class="d-flex align-items-center justify-content-between mb-2"><strong class="text-primary small"><i class="fa fa-compass ms-1"></i> فهرست سریع آیتم‌ها، متدها و کامپوننت‌های این بخش (27 مورد):</strong></div><div class="d-flex flex-wrap gap-2"><a href="#sec-abolframe-ui-components-1" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱. x-accordion و x-accordion-item</a><a href="#sec-abolframe-ui-components-2" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۲. x-alert</a><a href="#sec-abolframe-ui-components-3" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۳. x-audit-log و x-audit-detail-modal</a><a href="#sec-abolframe-ui-components-4" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۴. x-badge</a><a href="#sec-abolframe-ui-components-5" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۵. x-banner</a><a href="#sec-abolframe-ui-components-6" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۶. x-button</a><a href="#sec-abolframe-ui-components-7" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۷. x-card</a><a href="#sec-abolframe-ui-components-8" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۸. x-chat</a><a href="#sec-abolframe-ui-components-9" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۹. x-confirmation-modal</a><a href="#sec-abolframe-ui-components-10" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱۰. x-data-card</a><a href="#sec-abolframe-ui-components-11" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱۱. x-data-display / x-data-item / x-data-list</a><a href="#sec-abolframe-ui-components-12" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱۲. x-data-row</a><a href="#sec-abolframe-ui-components-13" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱۳. x-dropdown-button و x-dropdown-item</a><a href="#sec-abolframe-ui-components-14" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱۴. x-file, x-image, x-video</a><a href="#sec-abolframe-ui-components-15" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱۵. x-gantt-chart (Highcharts Gantt)</a><a href="#sec-abolframe-ui-components-16" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱۶. x-high-chart</a><a href="#sec-abolframe-ui-components-17" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱۷. x-icon</a><a href="#sec-abolframe-ui-components-18" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱۸. x-link</a><a href="#sec-abolframe-ui-components-19" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱۹. x-modal</a><a href="#sec-abolframe-ui-components-20" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۲۰. x-progress-bar و x-progress-bar-item</a><a href="#sec-abolframe-ui-components-21" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۲۱. x-slider و x-slider-item</a><a href="#sec-abolframe-ui-components-22" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۲۲. x-stat-card</a><a href="#sec-abolframe-ui-components-23" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۲۳. x-stepper و x-stepper.step</a><a href="#sec-abolframe-ui-components-24" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۲۴. تب‌ها: x-tab, x-tab-panel, x-minimal-tab</a><a href="#sec-abolframe-ui-components-25" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۲۵. x-table (Livewire)</a><a href="#sec-abolframe-ui-components-26" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۲۶. x-timeline و x-timeline-item</a><a href="#sec-abolframe-ui-components-27" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۲۷. Tooltip (Bootstrap)</a></div></div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-ui-components-1" class="scroll-mt-header">۱. <code>x-accordion</code> و <code>x-accordion-item</code></h2>
<p>آکاردئون تعاملی. <strong>قانون مصوب:</strong> فیلد توضیحات در مدیریت مطالب = آکاردئون.</p>
<p><strong><code>x-accordion</code>:</strong> <code>id</code> (خودکار)، <code>class</code>، <code>type</code> (<code>single</code> پیش‌فرض / <code>multiple</code>)، <code>gap</code> (<code>8px</code>/<code>1rem</code>)، <code>showFormErrors</code> (false؛ در خطای فرم بوردر آیتم هایلایت).</p>
<p><strong><code>x-accordion-item</code>:</strong> <code>id</code>, <code>title</code> (اجباری), <code>icon</code> (FontAwesome), <code>expanded</code> (false), <code>class</code>, <code>showCollapseIcon</code> (true).</p>
<p><strong>Slotها:</strong> <code>headerSlot</code> (دکمه/نشان در هدر)، <code>beforeTitleSlot</code>، <code>default</code>.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-accordion type=&quot;single&quot; gap=&quot;8px&quot;&gt;
    &lt;x-accordion-item title=&quot;...&quot; icon=&quot;fa-duotone fa-solid fa-grid-2&quot;&gt;
        &lt;x-slot:header-slot&gt;&lt;x-badge variant=&quot;primary&quot; appearance=&quot;light&quot; size=&quot;md&quot; value=&quot;ویژه&quot; /&gt;&lt;/x-slot:header-slot&gt;
        محتوا
    &lt;/x-accordion-item&gt;
&lt;/x-accordion&gt;</code></pre>
</div>
<h2 id="sec-abolframe-ui-components-2" class="scroll-mt-header">۲. <code>x-alert</code></h2>
<p>هشدار/موفقیت/خطا/اطلاع.</p>
<p><code>title</code>, <code>variant</code> (<code>primary</code> پیش‌فرض؛ <code>secondary, success, danger, warning, info, info-2, light, dark</code>), <code>icon</code>, <code>message</code>, <code>background</code> (مثل <code>bg-success</code>), <code>class</code>, <code>borderStyle</code> (<code>solid</code>; <code>dashed</code>, <code>dotted</code>), <code>showCloseButton</code> (false), <code>inline</code> (false). slot <code>default</code> (در صورت استفاده <code>title</code> و <code>message</code> نادیده).</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-alert title=&quot;موفق&quot; variant=&quot;success&quot; message=&quot;کاربر شما با موفقیت درج شد&quot; showCloseButton=&quot;true&quot; /&gt;</code></pre>
</div>
<h2 id="sec-abolframe-ui-components-3" class="scroll-mt-header">۳. <code>x-audit-log</code> و <code>x-audit-detail-modal</code></h2>
<p>نمایش خلاصه رخداد (کارت) و جزئیات کامل (Modal). تبدیل خودکار تاریخ به شمسی، Raw JSON، جدول مقایسه Old/New.</p>
<p><strong><code>x-audit-log</code>:</strong> <code>type</code> (<code>create|update|delete</code>), <code>userFullName</code>, <code>section</code>, <code>ip</code>, <code>datetime</code> (<strong>Carbon</strong>), <code>nationalCode</code>, <code>logDetailModalId</code> (باید دقیقاً = <code>id</code> مودال)؛ slot = توضیحات رخداد.</p>
<p><strong><code>x-audit-detail-modal</code>:</strong> <code>id</code> (یکتا), <code>type</code>, <code>userFullName</code>, <code>section</code>, <code>ip</code>, <code>datetime</code>, <code>nationalCode</code>, <code>badgeClass</code>, <code>description</code> (بدون آن بخش توضیحات نمایش داده نمی‌شود).</p>
<p><strong>کلاس JS <code>AuditDetailModal</code>:</strong> <code>new AuditDetailModal(&quot;audit-log-modal&quot;)</code>؛ متدهای <code>setUser, setNationalCode, setSection, setIp, setDateTime, setLogType, setTitle, setDescription, setStatus, setBadgeValue, setBadgeClass, setIconClass, setIconColor, setColor, setData, getData, getValue, init</code>. جدول مقایسه فقط با <code>init({old:{...}, new:{...}})</code> (Raw JSON + مقایسه Old/New). <code>setData({user, section, ip, logType, description})</code> برای تغییر هم‌زمان.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-audit-log
    type=&quot;update&quot;
    user-full-name=&quot;علی رضایی&quot;
    national-code=&quot;0012345678&quot;
    section=&quot;مدیریت بانک‌ها&quot;
    ip=&quot;192.168.1.10&quot;
    :datetime=&quot;now()&quot;
    log-detail-modal-id=&quot;bank_audit_modal&quot;
&gt;
    ویرایش اطلاعات پایه بانک ملت
&lt;/x-audit-log&gt;

&lt;x-audit-detail-modal
    id=&quot;bank_audit_modal&quot;
    type=&quot;update&quot;
    user-full-name=&quot;علی رضایی&quot;
    national-code=&quot;0012345678&quot;
    section=&quot;مدیریت بانک‌ها&quot;
    ip=&quot;192.168.1.10&quot;
    :datetime=&quot;now()&quot;
    description=&quot;جزئیات فیلدهای تغییریافته&quot;
/&gt;

@push(&#039;scripts&#039;)
&lt;script&gt;
    const auditModal = new AuditDetailModal(&#039;bank_audit_modal&#039;);
    auditModal.init({
        old: { name: &#039;بانک ملت&#039;, is_active: 0 },
        new: { name: &#039;بانک ملت ایران&#039;, is_active: 1 }
    });
&lt;/script&gt;
@endpush</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدارهای مهم:</strong><br>- مقدار <code>logDetailModalId</code> در <code>&lt;x-audit-log&gt;</code> باید دقیقاً برابر <code>id</code> کامپوننت <code>&lt;x-audit-detail-modal&gt;</code> باشد.<br>- پراپ <code>datetime</code> حتماً باید نمونه <code>Carbon</code> باشد.<br>- در <code>&lt;x-audit-detail-modal&gt;</code> اگر پراپ <code>description</code> ارسال نشود، بخش توضیحات در مودال رندر نخواهد شد. جدول مقایسه Old/New نیز تنها با فراخوانی متد <code>init({ old: {...}, new: {...} })</code> ساخته می‌شود.</div></div>
<h2 id="sec-abolframe-ui-components-4" class="scroll-mt-header">۴. <code>x-badge</code></h2>
<p>برچسب رنگی (وضعیت، شمارنده).</p>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پراپ</th><th>پیش‌فرض</th><th>توضیح</th></tr></thead><tbody><tr><td><code>variant</code></td><td><code>primary</code></td><td>یا هر رنگ با <code>customColor</code></td></tr><tr><td><code>appearance</code></td><td><code>solid</code></td><td><code>solid, light, outline, transparent, none</code></td></tr><tr><td><code>value</code></td><td>null</td><td>متن/عدد</td></tr><tr><td><code>icon</code> / <code>iconPosition</code></td><td>null / <code>right</code></td><td></td></tr><tr><td><code>size</code></td><td><code>md</code></td><td><code>xs, sm, md, lg</code></td></tr><tr><td><code>pill</code></td><td>false</td><td>گرد کامل</td></tr><tr><td><code>href</code> / <code>target</code></td><td>null / <code>_self</code></td><td>تبدیل به لینک؛ <code>_blank, _self, _parent, _top</code></td></tr><tr><td><code>customColor</code></td><td>null</td><td><strong>فقط hex شش‌رقمی</strong> (<code>#FFAA00</code>)؛ با آن همیشه حالت light</td></tr><tr><td><code>tooltip</code>, <code>label</code> (متن کوچک بالای badge), <code>class</code>, <code>elementStyle</code></td><td></td><td></td></tr></tbody></table></div>
<p>حداقل یکی از <code>value</code> یا <code>icon</code> لازم (وگرنه نمایش داده نمی‌شود). JS: <code>$(&quot;#sample-badge&quot;).setBadgeColor(&quot;#ff0000&quot;)</code>.</p>
<p>رنگ‌های مصوب بدج‌های پروژه (SKILL): کد=<code>success</code>، گروه علمی=<code>primary</code>، عنوان=<code>success</code>، ارسال‌کننده=<code>warning</code>.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-badge variant=&quot;success&quot; appearance=&quot;light&quot; size=&quot;md&quot; value=&quot;تأیید شده&quot; icon=&quot;fa-solid fa-check&quot; /&gt;
&lt;x-badge variant=&quot;primary&quot; appearance=&quot;solid&quot; :pill=&quot;true&quot; value=&quot;۱۲&quot; /&gt;
&lt;x-badge custom-color=&quot;#FFAA00&quot; value=&quot;برچسب سفارشی&quot; tooltip=&quot;رنگ Hex شش‌رقمی&quot; /&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدارهای مهم <code>x-badge</code>:</strong><br>- حداقل یکی از دو پراپ <code>value</code> یا <code>icon</code> باید مقدار داشته باشد؛ در غیر این صورت بج اصلاً رندر نمی‌شود.<br>- پراپ <code>customColor</code> <strong>فقط کد رنگ Hex شش‌رقمی</strong> (مانند <code>#FFAA00</code>) را می‌پذیرد و با فعال بودن آن، ظاهر بج همیشه در حالت <code>light</code> رندر می‌شود.<br>- طبق استاندارد رنگ‌های مصوب: کد = <code>success</code>، گروه علمی = <code>primary</code>، عنوان = <code>success</code>، ارسال‌کننده = <code>warning</code>.</div></div>
<h2 id="sec-abolframe-ui-components-5" class="scroll-mt-header">۵. <code>x-banner</code></h2>
<p>بنر معرفی: <code>title</code>, <code>items</code> (<code>[[&#039;icon&#039;=&gt;..., &#039;content&#039;=&gt;...]]</code>), <code>class</code>, <code>titleClass</code>, <code>itemsClass</code>, <code>titlePrefix</code>, <code>titleSuffix</code>, <code>actions</code>. slotها: <code>actions</code>, <code>titlePrefix</code>, <code>titleSuffix</code>. در صفحات show/edit Banner Generator ترجیح دارد.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-banner
    title=&quot;اطلاعات پرونده شماره ۱۰۴۵&quot;
    :items=&quot;[
        [&#039;icon&#039; =&gt; &#039;fa-solid fa-user&#039;, &#039;content&#039; =&gt; &#039;مالک: محمد احمدی&#039;],
        [&#039;icon&#039; =&gt; &#039;fa-solid fa-calendar&#039;, &#039;content&#039; =&gt; &#039;تاریخ ثبت: ۱۴۰۳/۰۸/۱۵&#039;],
    ]&quot;
&gt;
    &lt;x-slot:actions&gt;
        &lt;x-button title=&quot;چاپ خلاصه&quot; variant=&quot;info&quot; appearance=&quot;light&quot; size=&quot;sm&quot; icon=&quot;fa-solid fa-print&quot; /&gt;
    &lt;/x-slot:actions&gt;
&lt;/x-banner&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>نکته معماری:</strong> در صفحات <code>show</code> و <code>edit</code> پنل مدیریت، به‌جای نوشتن مستقیم تگ <code>&lt;x-banner&gt;</code> در Blade، استفاده از <strong>Banner Generator</strong> (<code>BladeLayout::banner(...)</code>) ارجحیت دارد.</div></div>
<h2 id="sec-abolframe-ui-components-6" class="scroll-mt-header">۶. <code>x-button</code></h2>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پراپ</th><th>پیش‌فرض</th><th>توضیح</th></tr></thead><tbody><tr><td><code>variant</code></td><td><code>primary</code></td><td></td></tr><tr><td><code>appearance</code></td><td><code>solid</code></td><td><code>solid, light, outline, transparent</code></td></tr><tr><td><code>title</code>, <code>icon</code>, <code>iconPosition</code> (<code>left</code>/<code>right</code>), <code>size</code> (<code>xs..lg</code>)</td><td></td><td></td></tr><tr><td><code>roundedPosition</code></td><td><code>rounded</code></td><td><code>rounded-top/end/bottom/start/circle/pill</code></td></tr><tr><td><code>disabled</code>, <code>disabledVariant</code>, <code>tooltip</code>, <code>disabledTooltip</code></td><td></td><td></td></tr><tr><td><code>type</code></td><td><code>button</code></td><td><code>button</code> یا <code>link</code></td></tr><tr><td><code>buttonType</code></td><td><code>button</code></td><td><code>submit/reset/button</code> (فقط type=button)</td></tr><tr><td><code>href</code>, <code>targetLink</code></td><td></td><td>href الزامی با <code>type=link</code>؛ با type=button نباید باشد</td></tr><tr><td><code>formId</code></td><td>null</td><td>اتصال به فرم</td></tr><tr><td><code>badgeValue</code>, <code>badgePosition</code> (<code>top-left</code>/<code>top-right</code>), <code>badgeClass</code>, <code>badgeSize</code>, <code>badgeVariant</code></td><td></td><td></td></tr><tr><td><code>containerClass</code>, <code>class</code>, <code>style</code>, <code>extraAttributes</code></td><td></td><td></td></tr><tr><td><code>formValidationTooltipVisibility</code> (true), <code>formValidationTooltipMessage</code></td><td></td><td></td></tr><tr><td><code>confirmation</code> (false), <code>confirmationMessage</code>, <code>confirmationType</code> (<code>info</code>), <code>confirmationIcon</code> (<code>fa-solid fa-question</code>), <code>confirmationConfirmCallback</code>, <code>confirmButtonText</code>, <code>cancelButtonText</code></td><td></td><td></td></tr></tbody></table></div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ پیش‌فرض <code>confirmationMessage</code> = «آیا از انجام این عملیات اطمینان دارید؟؟» ⇒ همیشه پیام مصوب (کلید ترجمه) را صریح بدهید. حداقل یکی از <code>title</code>/<code>icon</code> لازم.</div></div>
<p>علامت <code>+</code> برای دکمه «درج» (قانون مصوب).</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>{{-- دکمه درج استاندارد با علامت + --}}
&lt;x-button
    type=&quot;link&quot;
    :href=&quot;route(&#039;admin.basic.banks.create&#039;)&quot;
    title=&quot;+ افزودن بانک جدید&quot;
    variant=&quot;success&quot;
    permission=&quot;admin.basic.banks.create&quot;
/&gt;

{{-- دکمه عملیات حساس با دیالوگ تأییدیه --}}
&lt;x-button
    type=&quot;button&quot;
    button-type=&quot;submit&quot;
    form-id=&quot;delete-bank-form&quot;
    title=&quot;حذف بانک&quot;
    icon=&quot;fa-solid fa-trash&quot;
    variant=&quot;danger&quot;
    appearance=&quot;light&quot;
    :confirmation=&quot;true&quot;
    confirmation-type=&quot;danger&quot;
    confirmation-message=&quot;آیا از عملیات حذف مطمئن هستید؟&quot;
    confirm-button-text=&quot;بله، حذف شود&quot;
    cancel-button-text=&quot;انصراف&quot;
/&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدارهای مهم <code>x-button</code>:</strong><br>- متن پیش‌فرض <code>confirmationMessage</code> دارای دو علامت سؤال (<code>«آیا از انجام این عملیات اطمینان دارید؟؟»</code>) است؛ بنابراین <strong>همیشه</strong> پیام مصوب (<code>«آیا از عملیات حذف مطمئن هستید؟»</code>) را از طریق کلید ترجمه به‌صورت صریح ارسال کنید.<br>- وقتی <code>type=&quot;link&quot;</code> است، پراپ <code>href</code> <strong>اجباری</strong> است؛ و وقتی <code>type=&quot;button&quot;</code> است، ارسال <code>href</code> <strong>غیرمجاز</strong> بوده و باعث خطا می‌شود.<br>- حداقل یکی از <code>title</code> یا <code>icon</code> الزامی است.</div></div>
<h2 id="sec-abolframe-ui-components-7" class="scroll-mt-header">۷. <code>x-card</code></h2>
<p><code>title</code>, <code>titleClass</code>, <code>titleIcon</code>, <code>headerClass</code>, <code>bodyClass</code>, <code>contentClass</code>, <code>footerClass</code>, <code>subtitle</code>, <code>class</code>, <code>defaultExpanded</code> (true), <code>expanded</code> (false), <code>noPadding</code>, <code>maxHeight</code> (<code>400px</code>/<code>50vh</code>). Slotها: <code>default</code>, <code>headerActions</code>, <code>headerBottom</code>, <code>subtitleCustom</code>, <code>headerBadges</code>, <code>footer</code>.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-card
    title=&quot;مشخصات پایه بانک&quot;
    subtitle=&quot;اطلاعات رسمی ثبت‌شده در بانک مرکزی&quot;
    title-icon=&quot;fa-solid fa-building-columns&quot;
    :default-expanded=&quot;true&quot;
&gt;
    &lt;x-slot:headerActions&gt;
        &lt;x-badge variant=&quot;success&quot; appearance=&quot;light&quot; value=&quot;فعال&quot; /&gt;
    &lt;/x-slot:headerActions&gt;

    &lt;p&gt;محتوای اصلی کارت در این بخش قرار می‌گیرد...&lt;/p&gt;

    &lt;x-slot:footer&gt;
        &lt;div class=&quot;d-flex justify-content-end gap-2&quot;&gt;
            &lt;x-button title=&quot;ذخیره تغییرات&quot; button-type=&quot;submit&quot; variant=&quot;primary&quot; /&gt;
        &lt;/div&gt;
    &lt;/x-slot:footer&gt;
&lt;/x-card&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>نکته:</strong> برای کارت‌های قابل جمع‌شدن (Collapsible)، از ترکیب <code>:expanded=&quot;true&quot;</code> و <code>:default-expanded=&quot;false&quot;</code> استفاده کنید و در صورت طولانی بودن محتوا، <code>max-height=&quot;400px&quot;</code> را تنظیم نمایید.</div></div>
<h2 id="sec-abolframe-ui-components-8" class="scroll-mt-header">۸. <code>x-chat</code></h2>
<p><code>items</code> (اجباری) هر پیام: <code>is_admin</code> (bool)، <code>message</code>, <code>sender_name</code>, <code>created_at</code> (اجباری)؛ اختیاری: <code>attachments</code> (<code>[[&#039;url&#039;=&gt;..., &#039;name&#039;=&gt;...]]</code>), <code>avatar_url</code>, <code>ip</code>. <code>height</code> (<code>500px</code>).</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-chat
    height=&quot;480px&quot;
    :items=&quot;[
        [
            &#039;is_admin&#039; =&gt; false,
            &#039;sender_name&#039; =&gt; &#039;سارا محمدی&#039;,
            &#039;message&#039; =&gt; &#039;سلام، مدارک پیوست ارسال شد.&#039;,
            &#039;created_at&#039; =&gt; &#039;۱۴۰۳/۰۸/۱۲ - ۱۰:۳۰&#039;,
            &#039;attachments&#039; =&gt; [[&#039;url&#039; =&gt; &#039;/files/doc1.pdf&#039;, &#039;name&#039; =&gt; &#039;مدرک.pdf&#039;]],
        ],
        [
            &#039;is_admin&#039; =&gt; true,
            &#039;sender_name&#039; =&gt; &#039;پشتیبان سامانه&#039;,
            &#039;message&#039; =&gt; &#039;مدارک شما بررسی و تأیید گردید.&#039;,
            &#039;created_at&#039; =&gt; &#039;۱۴۰۳/۰۸/۱۲ - ۱۱:۱۵&#039;,
        ],
    ]&quot;
/&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدار:</strong> پراپ <code>items</code> اجباری است و هر آیتم پیام باید حداقل کلیدهای <code>is_admin</code> (بولین)، <code>message</code>، <code>sender_name</code> و <code>created_at</code> را داشته باشد.</div></div>
<h2 id="sec-abolframe-ui-components-9" class="scroll-mt-header">۹. <code>x-confirmation-modal</code></h2>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پراپ</th><th>پیش‌فرض</th><th>توضیح</th></tr></thead><tbody><tr><td><code>id</code></td><td>—</td><td><strong>اجباری</strong> و یکتا</td></tr><tr><td><code>message</code></td><td>«...؟؟»</td><td></td></tr><tr><td><code>closeButtonVisibility</code></td><td>true</td><td>دکمه X</td></tr><tr><td><code>closable</code></td><td>true</td><td>بستن با کلیک بیرون/ESC</td></tr><tr><td><code>type</code></td><td><code>info</code></td><td><code>primary, danger, warning, success, info</code></td></tr><tr><td><code>icon</code></td><td><code>fa-solid fa-question</code></td><td></td></tr><tr><td><code>confirmButtonText</code>/<code>cancelButtonText</code></td><td>«تایید»/«انصراف»</td><td></td></tr><tr><td><code>confirmButtonClass</code>/<code>cancelButtonClass</code>/<code>footerClass</code>/<code>containerClass</code></td><td></td><td></td></tr><tr><td><code>confirmCallback</code></td><td>null</td><td>نام تابع JS یا عبارت اجرا بعد از تایید</td></tr></tbody></table></div>
<p>باز شدن با دکمه: <code>data-bs-toggle=&quot;confirmation-modal&quot; data-bs-target=&quot;#id&quot;</code>. slot <code>actions</code> (جایگزین دکمه‌ها؛ دکمه بستن باید attribute <code>close-btn</code> داشته باشد) و slot <code>content</code> (زیر پیام).</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-confirmation-modal
    id=&quot;approve_request_modal&quot;
    type=&quot;success&quot;
    icon=&quot;fa-solid fa-check-circle&quot;
    message=&quot;آیا از تأیید نهایی این درخواست اطمینان دارید؟&quot;
    confirm-button-text=&quot;بله، تأیید شود&quot;
    cancel-button-text=&quot;انصراف&quot;
    confirm-callback=&quot;handleApproveRequest&quot;
/&gt;

&lt;button type=&quot;button&quot; class=&quot;btn btn-success&quot; data-bs-toggle=&quot;confirmation-modal&quot; data-bs-target=&quot;#approve_request_modal&quot;&gt;
    تأیید درخواست
&lt;/button&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدار:</strong> پراپ <code>id</code> در <code>x-confirmation-modal</code> اجباری و یکتا است. اگر از <code>&lt;x-slot:actions&gt;</code> برای جایگزینی دکمه‌های فوتر استفاده می‌کنید، دکمه انصراف/بستن حتماً باید دارای اتریبیوت <code>close-btn</code> باشد.</div></div>
<h2 id="sec-abolframe-ui-components-10" class="scroll-mt-header">۱۰. <code>x-data-card</code></h2>
<p>کارت اطلاعاتی با پیش‌نمایش تصویر/آیکن.</p>
<p><code>title</code>, <code>titleIcon</code>, <code>titleSuffix</code>, <code>description</code>, <code>previewSrc</code> (object/int/string: id/مدل/URL), <code>previewIcon</code>, <code>previewBadgeTitle</code>, <code>showPreview</code> (true), <code>showPreviewIcon</code> (true), <code>showVideoThumbnail</code> (false), <code>previewMode</code> (<code>fancybox</code>/<code>modal</code>/<code>custom</code>), <code>previewTooltip</code>, <code>iconTooltip</code>, <code>previewNotFoundTooltip</code>, <code>endSection</code>, <code>orientation</code> (<code>vertical</code>/<code>horizontal</code> — غیر = خطا), <code>titleClass/contentClass/descriptionClass/previewClass/endSectionClass/class/containerClass</code>, <code>type</code> (<code>default</code>; برای کلیک‌پذیر <code>link</code>), <code>route</code> (<code>&#039;/&#039;</code>), <code>previewVariant</code> (<code>light</code>), <code>disabled</code> (واریانت خودکار <code>secondary</code>).</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-data-card
    title=&quot;سند مالکیت ساختمان مرکزی&quot;
    description=&quot;تصویر اسکن‌شده سند رسمی&quot;
    :preview-src=&quot;$document-&gt;file_id&quot;
    preview-mode=&quot;fancybox&quot;
    orientation=&quot;horizontal&quot;
    preview-badge-title=&quot;PDF / JPG&quot;
/&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدار:</strong> پراپ <code>orientation</code> فقط یکی از دو مقدار <code>vertical</code> یا <code>horizontal</code> را می‌پذیرد و ارسال هر مقدار دیگر باعث پرتاب خطا می‌شود. برای <code>previewSrc</code> نیز شناسه یا مدل FileManager را پاس دهید.</div></div>
<h2 id="sec-abolframe-ui-components-11" class="scroll-mt-header">۱۱. <code>x-data-display</code> / <code>x-data-item</code> / <code>x-data-list</code></h2>
<p>نمایش مشخصات/جزئیات در چند ستون.</p>
<p><strong><code>x-data-display</code>:</strong> <code>bordered</code> (<code>all</code> پیش‌فرض, <code>items</code>, <code>outside</code>, <code>none</code>; غیر = خطا), <code>containerClass</code>, <code>cols</code> (2), <code>alignValues</code> (false), <code>labelWidth</code> (px), <code>class</code>, <code>wrap</code> (false), <code>gap</code>.</p>
<p><strong><code>x-data-item</code>:</strong> دو حالت:</p>
<ol><li><strong>Key-Value:</strong> <code>label</code>, <code>labelTooltip</code>, <code>value</code> (خالی ⇒ مقدار پیش‌فرض از config), <code>badge</code> (+<code>badgeSize</code> md, <code>badgeVariant</code> primary, <code>badgeAppearance</code> solid, <code>badgeIcon</code>, <code>badgeIconPosition</code>, <code>badgeCustomColor</code>), <code>href</code>, <code>orientation</code> (<code>horizontal</code>/<code>vertical</code>), <code>suffix</code>, <code>prefix</code>, <code>icon</code>, <code>iconColor</code>, <code>dir</code>, <code>valueClass</code>, <code>labelClass</code>, <code>suffixClass</code>, <code>prefixClass</code>, <code>showColon</code> (true), <code>class</code>, <code>span</code> (<code>full</code>, <code>1</code>, <code>2</code>...).</li><li><strong>Slot:</strong> محتوای آزاد؛ ساختار key-value رندر نمی‌شود؛ پیش‌فرض تمام‌عرض (<code>grid-cols-full</code>)؛ با <code>span=&quot;2&quot;</code> فقط ۲ ستون؛ attributeهای اضافی به <code>.data-item-slot</code> منتقل می‌شوند.</li></ol>
<p><strong><code>x-data-list</code>:</strong> <code>value</code> (آرایه — اجباری؛ هر عنصر <code>[&#039;text&#039;=&gt;..., &#039;href&#039;=&gt;..., &#039;dir&#039;=&gt;..., &#039;badge&#039;=&gt;true, &#039;badgeVariant&#039;=&gt;...]</code>), <code>label</code>, <code>separator</code>, و بقیه مثل data-item.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-data-display bordered=&quot;all&quot; cols=&quot;4&quot;&gt;
    &lt;x-data-item label=&quot;وضعیت پروژه&quot; value=&quot;در حال انجام&quot; badge=&quot;true&quot; badgeVariant=&quot;warning&quot; /&gt;
    &lt;x-data-list label=&quot;مکان&quot; :value=&quot;[[&#039;text&#039;=&gt;&#039;تهران&#039;,&#039;href&#039;=&gt;&#039;...&#039;],[&#039;text&#039;=&gt;&#039;مشهد&#039;]]&quot; separator=&quot; | &quot; /&gt;
    &lt;x-data-item label=&quot;توضیحات&quot; value=&quot;...&quot; span=&quot;full&quot; orientation=&quot;vertical&quot; /&gt;
&lt;/x-data-display&gt;</code></pre>
</div>
<p>کد/تاریخ با <code>dir=&quot;ltr&quot;</code> و <code>valueClass=&quot;text-right&quot;</code>.</p>
<h2 id="sec-abolframe-ui-components-12" class="scroll-mt-header">۱۲. <code>x-data-row</code></h2>
<p>ردیف ساختاریافته: <code>id</code>, <code>title</code>, <code>class</code>, <code>titleClass</code>, <code>prefix</code>, <code>prefixClass</code>, <code>titleSuffix</code>, <code>titleSuffixClass</code>, <code>subtitle</code>, <code>subtitleClass</code>, <code>badge</code> (+<code>badgeSize</code> xs, <code>badgeVariant</code> primary, <code>badgeAppearance</code> solid, <code>badgeIcon</code>, <code>badgeIconPosition</code> left), <code>actions</code>, <code>actionsClass</code>, <code>contentClass</code>. slotها: <code>subtitle</code>, <code>actions</code>، default.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-data-row
    id=&quot;row_national_id&quot;
    title=&quot;شناسه ملی شرکت&quot;
    subtitle=&quot;ثبت‌شده در سامانه ثبت شرکت‌ها&quot;
    badge=&quot;تأیید شده&quot;
    badge-variant=&quot;success&quot;
&gt;
    &lt;x-slot:actions&gt;
        &lt;x-button title=&quot;استعلام&quot; size=&quot;xs&quot; variant=&quot;info&quot; appearance=&quot;light&quot; /&gt;
    &lt;/x-slot:actions&gt;
    10103456789
&lt;/x-data-row&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>نکته:</strong> می‌توانید از اسلات‌های <code>subtitle</code> و <code>actions</code> برای قرار دادن بج‌ها یا دکمه‌های عملیاتی در سمت چپ ردیف استفاده کنید.</div></div>
<h2 id="sec-abolframe-ui-components-13" class="scroll-mt-header">۱۳. <code>x-dropdown-button</code> و <code>x-dropdown-item</code></h2>
<p>منوی کشویی/دکمه Actions.</p>
<p><strong>دکمه:</strong> <code>variant</code> (primary), <code>appearance</code> (solid), <code>title</code>, <code>icon</code> (مثل <code>fa-solid fa-ellipsis-vertical</code>), <code>size</code> (md), <code>iconPosition</code> (left), <code>iconRotation</code>, <code>roundedPosition</code>, <code>roundedSize</code>, <code>elementClass</code>, <code>closeOnClick</code> (true), <code>id</code>, <code>position</code> (<code>bottom|top|right|left</code>), <code>menuPosition</code> (<code>left|right</code>), <code>maxWidth</code> (<code>300px</code>).</p>
<p><strong>آیتم:</strong> <code>id</code>, <code>title</code>, <code>href</code>, <code>icon</code>, <code>iconPosition</code> (right), <code>disabled</code>, <code>elementClass</code>, <code>variant</code> (light), <code>tooltip</code>, <code>disabledTooltip</code>, <code>targetLink</code>, <code>confirmation</code> (+<code>confirmationMessage</code>, <code>confirmationType</code> <code>primary|danger|warning|success|info|info-2</code>, <code>confirmationIcon</code>, <code>confirmButtonText</code>, <code>cancelButtonText</code>, <code>confirmationConfirmCallback</code>), <code>isActive</code>, <code>visibility</code> (true), <code>method</code> (<code>get|post|put|patch|delete</code>).</p>
<div class="callout info"><i class="fa fa-circle-info callout-icon"></i><div><strong>قواعد:</strong> <code>href</code> و <code>confirmationConfirmCallback</code> هم‌زمان ⇒ خطا. آیتم می‌تواند slot آزاد (مثلاً <code>x-switch-input</code>) داشته باشد. تاییدیه‌دار داخل <code>x-table</code> ⇒ <code>confirmation-id</code> یکتا.</div></div>
<p>این همان دکمه «Actions» قانون مصوب است.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-dropdown-button
    id=&quot;row_actions_menu&quot;
    title=&quot;عملیات&quot;
    icon=&quot;fa-solid fa-ellipsis-vertical&quot;
    variant=&quot;primary&quot;
    appearance=&quot;light&quot;
    size=&quot;sm&quot;
&gt;
    &lt;x-dropdown-item
        title=&quot;مشاهده جزئیات&quot;
        :href=&quot;route(&#039;admin.basic.banks.show&#039;, $bank-&gt;id)&quot;
        icon=&quot;fa-solid fa-eye&quot;
        permission=&quot;admin.basic.banks.show&quot;
    /&gt;
    &lt;x-dropdown-item
        title=&quot;ویرایش&quot;
        :href=&quot;route(&#039;admin.basic.banks.edit&#039;, $bank-&gt;id)&quot;
        icon=&quot;fa-solid fa-pen&quot;
        permission=&quot;admin.basic.banks.edit&quot;
    /&gt;
    &lt;x-dropdown-item
        id=&quot;delete_bank_{{ $bank-&gt;id }}&quot;
        title=&quot;حذف&quot;
        :href=&quot;route(&#039;admin.basic.banks.destroy&#039;, $bank-&gt;id)&quot;
        method=&quot;delete&quot;
        variant=&quot;danger&quot;
        icon=&quot;fa-solid fa-trash&quot;
        :confirmation=&quot;true&quot;
        confirmation-type=&quot;danger&quot;
        confirmation-message=&quot;آیا از عملیات حذف مطمئن هستید؟&quot;
        permission=&quot;admin.basic.banks.destroy&quot;
    /&gt;
&lt;/x-dropdown-button&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدارهای مهم <code>x-dropdown-item</code>:</strong><br>- استفاده هم‌زمان از <code>href</code> و <code>confirmationConfirmCallback</code> روی یک آیتم <strong>غیرمجاز</strong> است و باعث خطا می‌شود.<br>- اگر آیتم دارای تأییدیه (<code>confirmation=&quot;true&quot;</code>) در داخل جدول (<code>x-table</code>) قرار دارد، حتماً یک <code>id</code> / <code>confirmation-id</code> یکتا (شامل شناسه ردیف) به آن بدهید.<br>- طبق قانون مصوب پروژه، تمام منوهای قابل‌مشاهده سکشن‌های رکورد باید در دکمه عملیاتی (<code>Actions</code>) جدول نیز حضور داشته باشند.</div></div>
<h2 id="sec-abolframe-ui-components-14" class="scroll-mt-header">۱۴. <code>x-file</code>, <code>x-image</code>, <code>x-video</code></h2>
<p><strong><code>x-file</code>:</strong> <code>src</code> (string|int|object — اجباری)، <code>containerClass</code>, <code>class</code>, <code>name</code>, <code>width</code> (<code>100%</code>), <code>height</code> (<code>400px</code>), <code>id</code>, <code>size</code> (بایت). تشخیص خودکار نوع بر اساس پسوند: تصویر → <code>&lt;img&gt;</code>، ویدیو → <code>&lt;video&gt;</code>، PDF → <code>&lt;embed&gt;</code>، دیگر → لینک دانلود با آیکن و نام/حجم. JS: <code>$(&quot;#x&quot;).getInstance().setValue(url, name, size)</code>.</p>
<p><strong><code>x-image</code>:</strong> <code>src</code>, <code>alt</code>, <code>title</code>, <code>showPopup</code> (fancybox), <code>showIcon</code>, <code>icon</code> (<code>fa-light fa-file-magnifying-glass</code>), <code>iconClass</code>, <code>containerClass</code>, <code>class</code>, <code>radius</code> (px یا <code>full</code>), <code>width</code>, <code>height</code>, <code>aspectRatio</code>, <code>fit</code> (<code>cover</code>/<code>contain</code>), <code>fallbackSrc</code>. placeholder لودینگ/آیکن خطا و lazy. اگر <code>showPopup</code> و <code>showIcon</code> هم‌زمان، آیکن فقط در حالت popup.</p>
<p><strong><code>x-video</code></strong> (video.js): <code>src</code> (آدرس/id/مدل)، <code>id</code>, <code>containerClass</code>, <code>class</code>, <code>controls</code> (true), <code>autoplay</code>, <code>loop</code>, <code>muted</code>, <code>poster</code>.</p>
<p>id/مدل از FileManager؛ URL دستی نسازید.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>{{-- نمایش هوشمند فایل (تصویر، ویدیو، PDF یا باکس دانلود) --}}
&lt;x-file id=&quot;contract_file_view&quot; :src=&quot;$contract-&gt;file_id&quot; width=&quot;100%&quot; height=&quot;420px&quot; /&gt;

{{-- نمایش تصویر با قابلیت بزرگ‌نمایی Fancybox و نسبت تصویر --}}
&lt;x-image
    :src=&quot;$user-&gt;avatar_id&quot;
    alt=&quot;تصویر کاربر&quot;
    :show-popup=&quot;true&quot;
    :show-icon=&quot;true&quot;
    width=&quot;120px&quot;
    height=&quot;120px&quot;
    radius=&quot;full&quot;
    fit=&quot;cover&quot;
/&gt;

{{-- پخش‌کننده ویدیو (Video.js) --}}
&lt;x-video id=&quot;intro_video&quot; :src=&quot;$course-&gt;intro_video_id&quot; :controls=&quot;true&quot; /&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدار مهم:</strong> به پراپ <code>src</code> در هر سه کامپوننت <code>x-file</code>، <code>x-image</code> و <code>x-video</code> شناسه فایل یا مدل FileManager را بدهید و هرگز URL دستی نسازید.</div></div>
<h2 id="sec-abolframe-ui-components-15" class="scroll-mt-header">۱۵. <code>x-gantt-chart</code> (Highcharts Gantt)</h2>
<p><code>id</code>, <code>items</code> (آرایه‌ای از آرایه‌ها), <code>options</code> (Highcharts), <code>range</code> (<code>monthly</code>/<code>yearly</code>), <code>class</code>. هر آیتم: <code>name</code>, <code>start</code> و <code>end</code> (<strong>Carbon</strong> — اجباری), <code>order</code>, <code>completed</code> (<code>[&#039;amount&#039;=&gt;0..1]</code>), <code>color</code> (hex), <code>badges</code> (<code>value</code>, <code>variant</code>, <code>appearance</code> — اجباری). مقادیر نامعتبر ⇒ <code>InvalidArgumentException</code>. تقویم شمسی پشتیبانی می‌شود؛ <code>jalali(&#039;1403-08-01&#039;)-&gt;toCarbon()</code>.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-gantt-chart
    id=&quot;project_phases_gantt&quot;
    range=&quot;monthly&quot;
    :items=&quot;[
        [
            &#039;name&#039; =&gt; &#039;فاز اول: تحلیل و طراحی&#039;,
            &#039;start&#039; =&gt; jalali(&#039;1403-07-01&#039;)-&gt;toCarbon(),
            &#039;end&#039; =&gt; jalali(&#039;1403-08-15&#039;)-&gt;toCarbon(),
            &#039;order&#039; =&gt; 1,
            &#039;completed&#039; =&gt; [&#039;amount&#039; =&gt; 0.85],
            &#039;color&#039; =&gt; &#039;#5c2d91&#039;,
            &#039;badges&#039; =&gt; [
                [&#039;value&#039; =&gt; &#039;در حال اجرا&#039;, &#039;variant&#039; =&gt; &#039;primary&#039;, &#039;appearance&#039; =&gt; &#039;light&#039;]
            ],
        ],
    ]&quot;
/&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدار:</strong> کلیدهای <code>start</code> و <code>end</code> در هر آیتم گانت <strong>اجباری</strong> بوده و باید از نوع <code>Carbon</code> باشند. همچنین در آرایه <code>badges</code>، هر سه کلید <code>value</code>، <code>variant</code> و <code>appearance</code> اجباری هستند و ارسال مقدار نامعتبر باعث پرتاب <code>InvalidArgumentException</code> می‌شود.</div></div>
<h2 id="sec-abolframe-ui-components-16" class="scroll-mt-header">۱۶. <code>x-high-chart</code></h2>
<p><code>id</code>, <code>type</code> (<code>pie, column, line, bar, area, spline, areaspline</code>), <code>series</code>, <code>options</code>, <code>categories</code> (داده سری هر دسته؛ <code>options.content</code> برای محتوای سفارشی بین نمودار و انتخاب دسته)، <code>categoryType</code> (<code>tabs</code>/<code>select</code>), <code>categorySelector</code> (در حالت select ضروری), <code>class</code>, <code>containerClass</code>. RTL و responsive. محتوای سفارشی با <code>renderComponent(Badge::class, [...])</code>.</p>
<p><strong>Livewire:</strong> حتماً <code>&lt;div wire:ignore&gt;&lt;x-high-chart .../&gt;&lt;/div&gt;</code>؛ بدون آن با هر رندر Livewire نمودار ناپدید می‌شود (div خالی جایگزین می‌شود)؛ کامپوننت خودش از ساخت دوباره جلوگیری می‌کند (چون <code>abolframe.ready</code> همه callbackها را دوباره اجرا می‌کند). ⚠️ با <code>wire:ignore</code> داده از سرور خودکار به‌روز نمی‌شود؛ از رویداد JS و <code>chart.update()</code> استفاده کنید.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;div wire:ignore&gt;
    &lt;x-high-chart
        id=&quot;sales_monthly_chart&quot;
        type=&quot;column&quot;
        category-type=&quot;tabs&quot;
        :series=&quot;[
            [&#039;name&#039; =&gt; &#039;فروش ماهانه&#039;, &#039;data&#039; =&gt; [120, 180, 240, 310]]
        ]&quot;
        :options=&quot;[&#039;title&#039; =&gt; [&#039;text&#039; =&gt; &#039;نمودار فروش فصلی&#039;]]&quot;
    /&gt;
&lt;/div&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدار حیاتی در Livewire:</strong> کامپوننت <code>&lt;x-high-chart&gt;</code> را در صفحات Livewire <strong>حتماً</strong> داخل <code>&lt;div wire:ignore&gt;</code> قرار دهید؛ در غیر این صورت با هر بار رندر مجدد Livewire، نمودار ناپدید می‌شود. توجه داشته باشید که با <code>wire:ignore</code>، به‌روزرسانی داده‌های نمودار باید از طریق رویداد جاوااسکریپت و متد <code>chart.update()</code> انجام شود.</div></div>
<h2 id="sec-abolframe-ui-components-17" class="scroll-mt-header">۱۷. <code>x-icon</code></h2>
<p><code>class</code> (پیش‌فرض <code>fa-solid fa-info</code>), <code>containerClass</code>, <code>color</code>, <code>fontSize</code>, <code>tooltip</code>.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-icon class=&quot;fa-solid fa-circle-info&quot; color=&quot;#1b84ff&quot; font-size=&quot;1.25rem&quot; tooltip=&quot;راهنمای فیلد&quot; /&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>نکته:</strong> در صورت عدم ارسال <code>class</code>، آیکن پیش‌فرض <code>fa-solid fa-info</code> نمایش داده می‌شود.</div></div>
<h2 id="sec-abolframe-ui-components-18" class="scroll-mt-header">۱۸. <code>x-link</code></h2>
<p><code>href</code> (اجباری), <code>variant</code> (<code>info</code>; رشته یا enum <code>Variant</code>), <code>decoration</code> (<code>none</code>/<code>underline</code>), <code>target</code> (<code>_self</code> ...), <code>icon</code>, <code>iconPosition</code> (<code>right</code>/<code>left</code>), <code>disabled</code>, <code>class</code>. مقدار نامعتبر variant/target/decoration/iconPosition ⇒ خطا.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-link
    :href=&quot;route(&#039;admin.users.show&#039;, $user-&gt;id)&quot;
    variant=&quot;info&quot;
    decoration=&quot;none&quot;
    target=&quot;_self&quot;
    icon=&quot;fa-solid fa-arrow-up-right-from-square&quot;
    icon-position=&quot;left&quot;
&gt;
    مشاهده پروفایل کاربر
&lt;/x-link&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدار:</strong> پراپ <code>href</code> اجباری است و ارسال مقادیر خارج از لیست استاندارد برای <code>variant</code>، <code>target</code>، <code>decoration</code> یا <code>iconPosition</code> باعث پرتاب Exception می‌شود. همچنین برای لینک دادن به پروفایل کاربر در جداول و کارت‌ها، به‌جای تگ لینک دستی، همیشه از تابع کمکی <code>linkUserInfo()</code> استفاده کنید.</div></div>
<h2 id="sec-abolframe-ui-components-19" class="scroll-mt-header">۱۹. <code>x-modal</code></h2>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پراپ</th><th>پیش‌فرض</th><th>توضیح</th></tr></thead><tbody><tr><td><code>id</code></td><td>—</td><td>اجباری و یکتا</td></tr><tr><td><code>title</code></td><td>—</td><td></td></tr><tr><td><code>showCloseIcon</code></td><td>true</td><td></td></tr><tr><td><code>closable</code></td><td>true</td><td>کلیک بیرون/ESC</td></tr><tr><td><code>size</code></td><td><code>md</code></td><td><code>sm, md, lg, xl, fullscreen</code></td></tr><tr><td><code>onCloseAction</code></td><td>null</td><td><code>clear</code>/<code>reset</code></td></tr><tr><td><code>scrollable</code></td><td>true</td><td></td></tr><tr><td><code>class</code>, <code>contentClass</code>, <code>headerClass</code>, <code>footerClass</code>, <code>bodyClass</code>, <code>containerClass</code></td><td></td><td></td></tr><tr><td><code>verticalAlign</code></td><td><code>center</code></td><td><code>top</code> ...</td></tr></tbody></table></div>
<p>Slotها: <code>title_badges</code>, <code>header_bottom</code>, <code>footer</code>, default. باز شدن: <code>data-bs-toggle=&quot;modal&quot; data-bs-target=&quot;#id&quot;</code>؛ بستن: <code>data-bs-dismiss=&quot;modal&quot;</code>. مثال مستند <code>isNonClosable</code> پراپ واقعی نیست. عنوان پویا: <code>setModalTitle(id, title)</code>.</p>
<p><strong>قانون مصوب:</strong> هدر دیالوگ‌ها: نام و کد رویداد در دو Badge مجزا. هنگام <code>hidden.bs.modal</code> آکاردئون‌ها collapse و پیام‌ها پاک شود.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-modal
    id=&quot;event_details_modal&quot;
    title=&quot;جزئیات رویداد علمی&quot;
    size=&quot;lg&quot;
    :closable=&quot;true&quot;
    :scrollable=&quot;true&quot;
    on-close-action=&quot;reset&quot;
&gt;
    &lt;x-slot:title_badges&gt;
        &lt;x-badge variant=&quot;primary&quot; appearance=&quot;light&quot; value=&quot;جشنواره خوارزمی&quot; /&gt;
        &lt;x-badge variant=&quot;success&quot; appearance=&quot;light&quot; value=&quot;کد: ۱۴۰۳-۱۰۲&quot; /&gt;
    &lt;/x-slot:title_badges&gt;

    &lt;p&gt;محتوای بدنه مودال...&lt;/p&gt;

    &lt;x-slot:footer&gt;
        &lt;x-button title=&quot;بستن&quot; variant=&quot;secondary&quot; data-bs-dismiss=&quot;modal&quot; /&gt;
    &lt;/x-slot:footer&gt;
&lt;/x-modal&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدارهای مهم <code>x-modal</code>:</strong><br>- پراپ <code>isNonClosable</code> وجود ندارد؛ برای غیرقابل‌بستن کردن مودال با کلیک بیرون یا دکمه ESC از <code>:closable=&quot;false&quot;</code> استفاده کنید.<br>- طبق قانون مصوب پروژه: در هدر مودال‌ها، نام و کد رویداد باید در <strong>دو Badge مجزا</strong> (در اسلات <code>title_badges</code>) نمایش داده شوند و هنگام رویداد <code>hidden.bs.modal</code> تمام آکاردئون‌های داخل مودال بسته (<code>collapse</code>) و پیام‌های خطای فرم پاک‌سازی شوند.</div></div>
<h2 id="sec-abolframe-ui-components-20" class="scroll-mt-header">۲۰. <code>x-progress-bar</code> و <code>x-progress-bar-item</code></h2>
<p><strong>bar:</strong> <code>id</code>, <code>class</code>, <code>height</code>, <code>label</code> (در Stepper placeholder: <code>:current</code>/<code>{current}</code>/<code>:step</code>/<code>{step}</code>، <code>:total</code>/<code>{total}</code>/<code>:totalSteps</code>/<code>{totalSteps}</code>/<code>:steps</code>/<code>{steps}</code>), <code>labelClass</code>, <code>totalProgress</code>, <code>totalProgressClass</code>, <code>useAsStepper</code> (false), <code>totalSteps</code>, <code>initialStep</code> (از 0).</p>
<p><strong>item:</strong> <code>id</code>, <code>class</code>, <code>label</code>, <code>labelClass</code>, <code>percentage</code> (0..100), <code>showLabel</code> (true), <code>tooltip</code>, <code>variant</code>, <code>striped</code>, <code>animated</code>, <code>rounded</code> (true), <code>badgeTitle</code>, <code>badgeVariant</code>, <code>backgroundColor</code>, <code>textColor</code>.</p>
<p><strong>کنترل JS (Stepper):</strong> <code>new ProgressBarBaseController(&quot;id&quot;)</code> — بدون <code>:useAsStepper=&quot;true&quot;</code> خطا. فقط <strong>اولین آیتم</strong> نگه داشته می‌شود (بقیه حذف). متدها: <code>next()</code>/<code>prev()</code> (bool)، <code>goToStep(n)</code>, <code>setLabel()</code>. getterها: <code>canNext</code>, <code>canPrev</code>, <code>isFirst</code>, <code>isLast</code>. فرمت پیش‌فرض برچسب: فارسی <code>{label} ۱ از ۳</code>؛ انگلیسی <code>{label} 1 of 3</code>. <code>totalProgress</code> خودکار با تغییر گام محاسبه می‌شود. متغیر CSS انیمیشن: <code>--x-progress-bar-transition</code>. <code>id</code> ثابت بدهید.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>{{-- ۱. نوار پیشرفت معمولی یا چندبخشی --}}
&lt;x-progress-bar id=&quot;storage_usage_bar&quot; label=&quot;میزان مصرف فضا&quot; height=&quot;12px&quot;&gt;
    &lt;x-progress-bar-item :percentage=&quot;65&quot; variant=&quot;primary&quot; :striped=&quot;true&quot; :animated=&quot;true&quot; label=&quot;۶۵٪ اسناد&quot; /&gt;
&lt;/x-progress-bar&gt;

{{-- ۲. استفاده در حالت گام‌شمار (Stepper Mode) --}}
&lt;x-progress-bar
    id=&quot;wizard_progress&quot;
    :use-as-stepper=&quot;true&quot;
    :total-steps=&quot;4&quot;
    :initial-step=&quot;1&quot;
    label=&quot;مرحله :current از :total&quot;
&gt;
    &lt;x-progress-bar-item variant=&quot;success&quot; /&gt;
&lt;/x-progress-bar&gt;

@push(&#039;scripts&#039;)
&lt;script&gt;
    const progressCtrl = new ProgressBarBaseController(&#039;wizard_progress&#039;);
    progressCtrl.next(); // رفتن به گام بعدی
&lt;/script&gt;
@endpush</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدارهای مهم <code>ProgressBarBaseController</code>:</strong><br>- استفاده از <code>new ProgressBarBaseController(&#039;id&#039;)</code> بدون فعال کردن <code>:use-as-stepper=&quot;true&quot;</code> روی کامپوننت باعث پرتاب خطا می‌شود.<br>- در حالت <code>useAsStepper=&quot;true&quot;</code>، فقط <strong>اولین</strong> <code>&lt;x-progress-bar-item&gt;</code> حفظ می‌شود و سایر آیتم‌های فرزند حذف می‌گردند.<br>- حتماً یک <code>id</code> ثابت به کامپوننت بدهید.</div></div>
<h2 id="sec-abolframe-ui-components-21" class="scroll-mt-header">۲۱. <code>x-slider</code> و <code>x-slider-item</code></h2>
<p><code>autoPlay</code> (false), <code>hasNavigator</code> (true), <code>autoPlayInterval</code> (3000), <code>scrollSpeed</code> (500), <code>slidesPerView</code> (1؛ <code>auto</code> = عرض بر اساس محتوا), <code>spaceBetween</code> (0), <code>centeredSlides</code>, <code>gridRows</code> (1), <code>slidesPerGroup</code> (1), <code>breakpoints</code> (<code>[0=&gt;[...], 768=&gt;[...], 1024=&gt;[...]]</code> با <code>slidesPerView/spaceBetween/slidesPerGroup</code>). آیتم بدون پراپ اختصاصی؛ فقط <code>permission</code>.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-slider
    :auto-play=&quot;true&quot;
    :auto-play-interval=&quot;4000&quot;
    :has-navigator=&quot;true&quot;
    :slides-per-view=&quot;3&quot;
    :space-between=&quot;16&quot;
&gt;
    @foreach($banners as $banner)
        &lt;x-slider-item permission=&quot;admin.banners.view&quot;&gt;
            &lt;x-image :src=&quot;$banner-&gt;image_id&quot; width=&quot;100%&quot; height=&quot;220px&quot; radius=&quot;12px&quot; /&gt;
        &lt;/x-slider-item&gt;
    @endforeach
&lt;/x-slider&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>نکته:</strong> کامپوننت فرزند <code>&lt;x-slider-item&gt;</code> هیچ پراپ اختصاصی ظاهری ندارد و فقط پراپ <code>permission</code> را برای کنترل سطح دسترسی رندر هر اسلاید می‌پذیرد.</div></div>
<h2 id="sec-abolframe-ui-components-22" class="scroll-mt-header">۲۲. <code>x-stat-card</code></h2>
<p><code>label</code> (اجباری), <code>value</code>, <code>valueSlot</code>, <code>class</code>, <code>containerClass</code>, <code>labelClass</code>, <code>labelIcon</code>, <code>labelIconClass</code>, <code>valueClass</code>, <code>icon</code>, <code>iconClass</code>, <code>suffix</code>, <code>suffixClass</code>, <code>prefix</code>, <code>prefixClass</code>, <code>orientation</code> (<code>vertical</code>/<code>horizontal</code>), <code>variant</code> (<code>light</code>...). slot <code>suffix</code> (مثلاً badge).</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-stat-card
    label=&quot;تعداد کل شرکت‌کنندگان&quot;
    value=&quot;{{ numberSeparator($totalParticipants) }}&quot;
    suffix=&quot;نفر&quot;
    icon=&quot;fa-solid fa-users&quot;
    variant=&quot;primary&quot;
    orientation=&quot;horizontal&quot;
&gt;
    &lt;x-slot:suffix&gt;
        &lt;x-badge variant=&quot;success&quot; appearance=&quot;light&quot; size=&quot;sm&quot; value=&quot;+۱۲٪ رشد&quot; /&gt;
    &lt;/x-slot:suffix&gt;
&lt;/x-stat-card&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>نکته:</strong> پراپ <code>label</code> اجباری است و می‌توانید به‌جای پراپ <code>value</code>، از اسلات <code>valueSlot</code> برای رندر محتوای HTML سفارشی در بخش مقدار کارت استفاده کنید.</div></div>
<h2 id="sec-abolframe-ui-components-23" class="scroll-mt-header">۲۳. <code>x-stepper</code> و <code>x-stepper.step</code></h2>
<p><strong>stepper:</strong> <code>id</code>, <code>class</code>, <code>allowBackTracking</code> (false).</p>
<p><strong>step:</strong> <code>id</code>, <code>title</code>, <code>icon</code> (<code>fa-solid fa-info</code>), <code>nextButton</code> («بعدی»), <code>prevButton</code> («قبلی»), <code>active</code> (فقط یک step), <code>visible</code> (true), <code>headerSlot</code>, <code>targetModal</code>, <code>href</code>.</p>
<p><strong>JS:</strong> <code>$(&quot;#id&quot;).goToNextStep()</code>, <code>goToPrevStep()</code>, <code>goToStep(index)</code>, <code>getCurrentStep()</code>, <code>toggleStepVisibility(stepOrSelector, forceVisibility?)</code>. دکمه‌های <code>x-button</code> با <code>stepper-id</code> و <code>stepper-action=&quot;prev|next&quot;</code>.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-stepper id=&quot;registration_stepper&quot; :allow-back-tracking=&quot;true&quot;&gt;
    &lt;x-stepper.step id=&quot;step_personal&quot; title=&quot;اطلاعات فردی&quot; icon=&quot;fa-solid fa-user&quot; :active=&quot;true&quot;&gt;
        &lt;p&gt;فرم اطلاعات فردی...&lt;/p&gt;
    &lt;/x-stepper.step&gt;
    &lt;x-stepper.step id=&quot;step_documents&quot; title=&quot;بارگذاری مدارک&quot; icon=&quot;fa-solid fa-file-arrow-up&quot;&gt;
        &lt;p&gt;فرم مدارک...&lt;/p&gt;
    &lt;/x-stepper.step&gt;
&lt;/x-stepper&gt;

&lt;div class=&quot;d-flex gap-2 mt-3&quot;&gt;
    &lt;x-button title=&quot;قبلی&quot; stepper-id=&quot;registration_stepper&quot; stepper-action=&quot;prev&quot; variant=&quot;secondary&quot; /&gt;
    &lt;x-button title=&quot;بعدی&quot; stepper-id=&quot;registration_stepper&quot; stepper-action=&quot;next&quot; variant=&quot;primary&quot; /&gt;
&lt;/div&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدار:</strong> در بین گام‌های <code>&lt;x-stepper.step&gt;</code>، حداکثر <strong>یک گام</strong> می‌تواند دارای <code>:active=&quot;true&quot;</code> باشد.</div></div>
<h2 id="sec-abolframe-ui-components-24" class="scroll-mt-header">۲۴. تب‌ها: <code>x-tab</code>, <code>x-tab-panel</code>, <code>x-minimal-tab</code></h2>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>کامپوننت</th><th>کاربرد</th></tr></thead><tbody><tr><td><code>x-tab</code></td><td>تب‌های لینکی: <code>tabs</code> (اجباری؛ هر تب <code>title</code>, <code>href</code>, <code>active</code>, <code>disabled</code>, <code>badge</code>(int), <code>subTitle</code>, <code>tooltip</code>)، <code>mode</code> (<code>default</code>/<code>minimal</code>؛ در minimal <code>subTitle</code> غیرفعال)</td></tr><tr><td><code>x-tab-panel</code> + <code>x-tab-item</code></td><td>محتوایی: panel: <code>id</code>, <code>orientation</code> (<code>vertical</code> پیش‌فرض/<code>horizontal</code>), <code>containerClass</code>, <code>navClass</code>, <code>contentClass</code>, <code>title</code>, <code>count</code> (3, اسکلتون)؛ item: <code>id</code>, <code>active</code>, <code>title</code>, <code>class</code>, <code>badge</code></td></tr><tr><td><code>x-minimal-tab</code> + <code>.item</code></td><td>مینیمال: tab: <code>id</code>, <code>containerClass</code>, <code>navClass</code>, <code>contentClass</code>, <code>count</code>؛ item: <code>id</code>, <code>active</code>, <code>title</code>, <code>class</code>, <code>badge</code></td></tr></tbody></table></div>
<p>صفحات پنل با Tab Generator (route-محور). نام فرزندان در مستندات هم با نقطه هم خط‌تیره آمده؛ با کد پروژه تطبیق دهید.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>{{-- ۱. تب‌های لینکی (x-tab) --}}
&lt;x-tab
    mode=&quot;default&quot;
    :tabs=&quot;[
        [&#039;title&#039; =&gt; &#039;اطلاعات پایه&#039;, &#039;href&#039; =&gt; route(&#039;admin.events.show&#039;, $event-&gt;id), &#039;active&#039; =&gt; true],
        [&#039;title&#039; =&gt; &#039;شرکت‌کنندگان&#039;, &#039;href&#039; =&gt; route(&#039;admin.events.participants&#039;, $event-&gt;id), &#039;badge&#039; =&gt; 42],
    ]&quot;
/&gt;

{{-- ۲. تب‌های محتوایی درجا (x-tab-panel + x-tab-item) --}}
&lt;x-tab-panel id=&quot;user_profile_tabs&quot; orientation=&quot;horizontal&quot; title=&quot;بخش‌های پروفایل&quot;&gt;
    &lt;x-tab-item id=&quot;tab_info&quot; title=&quot;مشخصات&quot; :active=&quot;true&quot;&gt;
        &lt;p&gt;محتوای تب مشخصات...&lt;/p&gt;
    &lt;/x-tab-item&gt;
    &lt;x-tab-item id=&quot;tab_logs&quot; title=&quot;سوابق ورود&quot; :badge=&quot;5&quot;&gt;
        &lt;p&gt;محتوای تب سوابق...&lt;/p&gt;
    &lt;/x-tab-item&gt;
&lt;/x-tab-panel&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>نکته معماری:</strong> در صفحات اصلی پنل مدیریت که هر تب یک Route مجزا دارد، به‌جای نوشتن دستی <code>&lt;x-tab&gt;</code>، از <strong>Tab Generator</strong> (<code>BladeLayout::tab(...)</code>) استفاده کنید. همچنین در حالت <code>mode=&quot;minimal&quot;</code>، ویژگی <code>subTitle</code> تب‌ها غیرفعال می‌شود.</div></div>
<h2 id="sec-abolframe-ui-components-25" class="scroll-mt-header">۲۵. <code>x-table</code> (Livewire)</h2>
<p>جدول داخلی بخش‌ها (برای صفحات مدیریت Table Generator).</p>
<p><strong><code>x-table</code>:</strong> <code>id</code> (اجباری), <code>dataSource</code> (اجباری: مدل/Query/Closure), <code>dataSourceCallback</code> (<code>function (Builder $query, array $parameters): Builder</code>), <code>perPage</code> (5), <code>containerClass</code>, <code>headerSlot</code>, <code>defaultSortField</code>, <code>defaultSortDirection</code>, <code>modifierClosure</code> (دقیقاً یک پارامتر آرایه و خروجی آرایه), <code>parameters</code>, <code>showRecordCount</code>, <code>showIndex</code>, <code>selectable</code>, <code>selectionField</code> (الزامی با selectable), <code>selectedValues</code>, <code>selectionFilterComponent</code>, <code>align</code> (<code>left|right|center</code>).</p>
<p><strong><code>x-table-header</code>:</strong> <code>rowSpan</code>, <code>colSpan</code>, <code>level</code>, <code>label</code>, <code>name</code>, <code>sortColumn</code>, <code>class</code>, <code>width</code>.</p>
<p><strong><code>x-table.column</code>:</strong> <code>name</code>, <code>label</code> (اجباری), <code>searchable</code>, <code>sortable</code>, <code>headerClass</code>, <code>headerTooltip</code>, <code>bodyClass</code>, <code>bodyTooltip</code>, <code>width</code>, <code>badgeMap</code> (مقدار → <code>[&#039;text&#039;,&#039;variant&#039;,&#039;appearance&#039;]</code>), <code>theadSeparator</code>, <code>tbodySeparator</code>, <code>mergeWith</code> (نام ستون‌ها با کاما), <code>mergeOrientation</code>, <code>align</code>, <code>slot</code> (جایگزینی <code>$row[key]</code> و <code>condition</code>), <code>customHeader</code> (slot/پراپ؛ sort حفظ می‌شود), <code>groupBreakLine</code>, <code>groupBreakLineSection</code>. پیش‌فرض <code>align/theadSeparator/tbodySeparator</code> در config.</p>
<p><strong>جستجو/فیلتر:</strong> فرم با <code>data-table-target=&quot;table-id&quot;</code>؛ OR با کاما در name (<code>first_name,last_name</code>)؛ operator: <code>data-table-filter-operator=&quot;=&quot;</code> (پیش‌فرض like)؛ تعداد در صفحه: select با <code>data-table-target</code> و <code>name=&quot;perPage&quot;</code>.</p>
<p><strong>انتخاب سطری:</strong> <code>getInstance().getCurrentSelectedValues()/getAddedValues()/getRemovedValues()/getChangedValues()</code> ({added, removed})؛ <code>setValue([&quot;14&quot;,&quot;11&quot;])</code>؛ رویداد <code>table:changed</code> (data.value, data.checked).</p>
<p><strong>به‌روزرسانی:</strong> <code>setComponentParams({...})</code> + <code>refreshComponent(resetParams)</code>.</p>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <code>$row[...]</code> و <code>modifierClosure</code> escape خودکار ندارند.</div></div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-table
    id=&quot;event_comments_table&quot;
    :data-source=&quot;\\App\\Models\\Comment::class&quot;
    :per-page=&quot;10&quot;
    default-sort-field=&quot;created_at&quot;
    default-sort-direction=&quot;desc&quot;
    :selectable=&quot;true&quot;
    selection-field=&quot;id&quot;
    :show-index=&quot;true&quot;
    :show-record-count=&quot;true&quot;
&gt;
    &lt;x-table.column name=&quot;sender_name&quot; label=&quot;ارسال‌کننده&quot; :searchable=&quot;true&quot; :sortable=&quot;true&quot; /&gt;
    &lt;x-table.column
        name=&quot;status&quot;
        label=&quot;وضعیت&quot;
        :badge-map=&quot;[
            1 =&gt; [&#039;text&#039; =&gt; &#039;در حال بررسی&#039;, &#039;variant&#039; =&gt; &#039;warning&#039;, &#039;appearance&#039; =&gt; &#039;light&#039;],
            2 =&gt; [&#039;text&#039; =&gt; &#039;تأیید شده&#039;, &#039;variant&#039; =&gt; &#039;success&#039;, &#039;appearance&#039; =&gt; &#039;light&#039;],
        ]&quot;
    /&gt;
&lt;/x-table&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدار امنیتی بسیار مهم (<code>XSS</code>):</strong> مقادیر جایگزین‌شده با <code>$row[key]</code> در اسلات ستون‌ها و همچنین خروجی <code>modifierClosure</code> در <code>x-table</code> به‌صورت خودکار Escape نمی‌شوند؛ بنابراین هنگام نمایش ورودی‌های کاربر حتماً از <code>e()</code> در PHP استفاده کنید. همچنین در صورت فعال بودن <code>:selectable=&quot;true&quot;</code>، پراپ <code>selectionField</code> اجباری است.</div></div>
<h2 id="sec-abolframe-ui-components-26" class="scroll-mt-header">۲۶. <code>x-timeline</code> و <code>x-timeline-item</code></h2>
<p><strong>timeline:</strong> <code>id</code>, <code>class</code>, <code>scrollable</code> (true), <code>maxHeight</code> (700).</p>
<p><strong>item:</strong> <code>class</code>, <code>variant</code> (primary), <code>customColor</code> (hex/rgb؛ اولویت بر variant), <code>title</code>, <code>orientation</code> (<code>horizontal</code>/<code>vertical</code>), <code>titleClass</code>, <code>value</code>, <code>valueClass</code>, <code>badge</code> (false), <code>badgeVariant</code>, <code>badgeSize</code> (<code>sm</code>). slot <code>timeLineHeader</code> (دکمه/زمان در هدر)، default (بدنه؛ مثل <code>x-data-display</code>). در حالت horizontal با value، «:» خودکار بعد از عنوان.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">BLADE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;x-timeline id=&quot;request_workflow_timeline&quot; :scrollable=&quot;true&quot; :max-height=&quot;500&quot;&gt;
    &lt;x-timeline-item
        title=&quot;ثبت اولیه درخواست&quot;
        value=&quot;توسط متقاضی ثبت گردید&quot;
        variant=&quot;success&quot;
        orientation=&quot;horizontal&quot;
        :badge=&quot;true&quot;
        badge-variant=&quot;success&quot;
    &gt;
        &lt;x-slot:timeLineHeader&gt;
            &lt;span class=&quot;text-muted small&quot; dir=&quot;ltr&quot;&gt;1403/08/10 09:15&lt;/span&gt;
        &lt;/x-slot:timeLineHeader&gt;
    &lt;/x-timeline-item&gt;
&lt;/x-timeline&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>نکته:</strong> در حالت <code>orientation=&quot;horizontal&quot;</code> هنگامی که پراپ <code>value</code> مقدار داشته باشد، علامت دونقطه (<code>:</code>) به‌صورت خودکار بعد از <code>title</code> درج می‌شود؛ بنابراین داخل متن <code>title</code> دونقطه اضافه نگذارید.</div></div>
<h2 id="sec-abolframe-ui-components-27" class="scroll-mt-header">۲۷. Tooltip (Bootstrap)</h2>
<p><code>data-bs-toggle=&quot;tooltip&quot;</code> (اجباری), <code>data-bs-placement</code> (<code>top|bottom|left|right</code>), <code>data-bs-custom-class</code> (<code>default-tooltip</code>, <code>success-tooltip</code>, <code>error-tooltip</code>, <code>warning-tooltip</code>, <code>info-tooltip</code>, <code>primary-tooltip</code>), <code>title</code>.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">HTML</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;button
    type=&quot;button&quot;
    class=&quot;btn btn-light&quot;
    data-bs-toggle=&quot;tooltip&quot;
    data-bs-placement=&quot;top&quot;
    data-bs-custom-class=&quot;primary-tooltip&quot;
    title=&quot;متن راهنمای دکمه&quot;
&gt;
    هاور کنید
&lt;/button&gt;</code></pre>
</div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ <strong>هشدار:</strong> طبق قانون مصوب پروژه، در بدج‌های وضعیت/ارسال‌کننده، متن <code>tooltip</code> باید فقط <strong>عنوان استاتیک</strong> (مثلاً «ارسال کننده») باشد، نه تکرار مقدار پویای داخل بدج.</div></div>
        `
    },
    {
        id: "abolframe-component-management-select-controller",
        title: "۱۲. Component Management و SelectController",
        icon: "fa-sliders",
        category: "مستندات جامع ابول فریم (AbolFrame)",
        content: `
<h1>۱۲. Component Management و SelectController — توضیح کامل</h1>
<div class="toc-quick-jump-card my-4 p-3 rounded-3 border bg-body-tertiary"><div class="d-flex align-items-center justify-content-between mb-2"><strong class="text-primary small"><i class="fa fa-compass ms-1"></i> فهرست سریع آیتم‌ها، متدها و کامپوننت‌های این بخش (24 مورد):</strong></div><div class="d-flex flex-wrap gap-2"><a href="#sec-abolframe-component-management-select-controller-1" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش A — componentManagement (API یکپارچه فرانت‌اند)</a><a href="#sec-abolframe-component-management-select-controller-2" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.1 شروع</a><a href="#sec-abolframe-component-management-select-controller-3" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.2 مقادیر و وضعیت‌ها</a><a href="#sec-abolframe-component-management-select-controller-4" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.3 رابط کاربری و خطاها</a><a href="#sec-abolframe-component-management-select-controller-5" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.4 عملیات فرم</a><a href="#sec-abolframe-component-management-select-controller-6" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.5 Propها (data-*)</a><a href="#sec-abolframe-component-management-select-controller-7" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.6 فراخوانی متدهای اختصاصی</a><a href="#sec-abolframe-component-management-select-controller-8" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.7 دسترسی به DOM و instance</a><a href="#sec-abolframe-component-management-select-controller-9" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.8 مثال‌ها</a><a href="#sec-abolframe-component-management-select-controller-10" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.9 Best Practices</a><a href="#sec-abolframe-component-management-select-controller-11" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش B — SelectController (تأمین داده x-select)</a><a href="#sec-abolframe-component-management-select-controller-12" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.1 data() یا query() — دقیقاً یکی</a><a href="#sec-abolframe-component-management-select-controller-13" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.2 کانستنت‌ها</a><a href="#sec-abolframe-component-management-select-controller-14" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.3 VALUES_ARE_IDENTIFIERS</a><a href="#sec-abolframe-component-management-select-controller-15" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.4 متد selected()</a><a href="#sec-abolframe-component-management-select-controller-16" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.5 labelColumn</a><a href="#sec-abolframe-component-management-select-controller-17" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.6 ساختار حداقلی آیتم</a><a href="#sec-abolframe-component-management-select-controller-18" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.7 همگام‌سازی خودکار selected</a><a href="#sec-abolframe-component-management-select-controller-19" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.8 resolveLabelsForIds()</a><a href="#sec-abolframe-component-management-select-controller-20" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.9 parentSelected و parentChain</a><a href="#sec-abolframe-component-management-select-controller-21" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.10 قابلیت‌های دیگر</a><a href="#sec-abolframe-component-management-select-controller-22" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.11 مثال‌ها</a><a href="#sec-abolframe-component-management-select-controller-23" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.12 جمع‌بندی</a><a href="#sec-abolframe-component-management-select-controller-24" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش C — Dependent Select در Table Generator</a></div></div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-component-management-select-controller-1" class="scroll-mt-header">بخش A — <code>componentManagement</code> (API یکپارچه فرانت‌اند)</h2>
<p>تابعی که رابط یکپارچه (Unified API) برای تعامل با <strong>همه کامپوننت‌های فرم و UI</strong> AbolFrame می‌دهد. نیازی نیست برای هر کامپوننت (Select، Editor، File Picker، ...) کد متفاوت بنویسید. نوع کامپوننت را بر اساس کلاس‌های CSS ظرف نگه‌دارنده (<code>.x-form-component</code>) تشخیص می‌دهد و متدهای استاندارد خواندن/تغییر مقدار، مدیریت وضعیت‌ها و اعمال خطا را <strong>به‌صورت زنجیره‌ای (Chainable)</strong> فراهم می‌کند.</p>
<h3 id="sec-abolframe-component-management-select-controller-2" class="scroll-mt-header">A.1 شروع</h3>
<p><code>id</code> عنصر ورودی را بدهید؛ خروجی یک شیء fluent است:</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">JS</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>const usernameInput = componentManagement(&quot;username_field&quot;);
usernameInput.setValue(&quot;john_doe&quot;).setDisabled(false).setRequired(true).focus();</code></pre>
</div>
<p>اگر id در DOM نباشد یا داخل <code>.x-form-component</code> نباشد، تابع <strong>فوراً Error پرتاب می‌کند.</strong></p>
<h3 id="sec-abolframe-component-management-select-controller-3" class="scroll-mt-header">A.2 مقادیر و وضعیت‌ها</h3>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>متد</th><th>خروجی</th><th>توضیح</th></tr></thead><tbody><tr><td><code>getValue()</code></td><td>unknown</td><td>مقدار فعلی</td></tr><tr><td><code>setValue(value)</code></td><td>this</td><td>تنظیم مقدار؛ رویدادهای <code>input</code> و <code>change</code> تریگر می‌شوند</td></tr><tr><td><code>setDisabled(bool)</code></td><td>this</td><td>فعال (false) / غیرفعال (true)</td></tr><tr><td><code>setReadonly(bool)</code></td><td>this</td><td>فقط‌خواندنی</td></tr><tr><td><code>setRequired(bool)</code></td><td>this</td><td>الزامی بودن برای اعتبارسنجی</td></tr></tbody></table></div>
<h3 id="sec-abolframe-component-management-select-controller-4" class="scroll-mt-header">A.3 رابط کاربری و خطاها</h3>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>متد</th><th>توضیح</th></tr></thead><tbody><tr><td><code>setLabel(text)</code></td><td>تغییر متن label</td></tr><tr><td><code>setPlaceholder(text)</code></td><td>تغییر placeholder</td></tr><tr><td><code>setError(message)</code></td><td>فیلد را قرمز و پیام خطا را زیر آن نمایش می‌دهد</td></tr><tr><td><code>clearError()</code></td><td>پاک‌کردن استایل و پیام خطا</td></tr></tbody></table></div>
<h3 id="sec-abolframe-component-management-select-controller-5" class="scroll-mt-header">A.4 عملیات فرم</h3>
<p><code>focus()</code>، <code>blur()</code>، <code>reset()</code> (بازگرداندن به <code>defaultValue</code>)، <code>clear()</code> (خالی کامل)، <code>refresh()</code> (معادل تریگر <code>change</code>).</p>
<h3 id="sec-abolframe-component-management-select-controller-6" class="scroll-mt-header">A.5 Propها (<code>data-*</code>)</h3>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>متد</th><th>توضیح</th></tr></thead><tbody><tr><td><code>getProps()</code></td><td>همه <code>data-*</code> به‌صورت شیء</td></tr><tr><td><code>getProp(key)</code></td><td>مقدار یک prop</td></tr><tr><td><code>setProp(key, value)</code></td><td>آپدیت روی DOM (هم jQuery و هم Attribute)؛ نام camelCase خودکار به kebab-case</td></tr><tr><td><code>setProps(obj)</code></td><td>گروهی</td></tr></tbody></table></div>
<h3 id="sec-abolframe-component-management-select-controller-7" class="scroll-mt-header">A.6 فراخوانی متدهای اختصاصی</h3>
<p>با مکانیزم <strong>Proxy</strong>: اگر instance کامپوننت پیچیده (Editor، File Picker، Plate) متد خاص داشته باشد مستقیم صدا بزنید:</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">JS</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>componentManagement(&quot;my_editor&quot;).insertHtml(&quot;&lt;p&gt;New content&lt;/p&gt;&quot;);
componentManagement(&quot;my_editor&quot;).call(&quot;insertHtml&quot;, &quot;&lt;p&gt;New content&lt;/p&gt;&quot;).setReadonly(true);   // حفظ زنجیره</code></pre>
</div>
<p>نمونه‌ها: <code>setVehicleType()</code> (plate)، <code>setOptions()</code> (radio-group)، <code>updateHelper()</code> (file/image picker).</p>
<h3 id="sec-abolframe-component-management-select-controller-8" class="scroll-mt-header">A.7 دسترسی به DOM و instance</h3>
<p><code>getInput()</code> (Input/Textarea/Select)، <code>getContainer()</code> (<code>.x-form-component</code>)، <code>get$Input()</code>، <code>get$Container()</code>، <code>getInstance()</code> (instance کلاس JS کامپوننت یا null).</p>
<h3 id="sec-abolframe-component-management-select-controller-9" class="scroll-mt-header">A.8 مثال‌ها</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">JS</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>// ۱: سوییچ و ورودی وابسته
const discountInput = componentManagement(&quot;discount_amount&quot;);
$(&quot;#enable_discount&quot;).on(&quot;change&quot;, function (e) {
  if (e.target.checked) discountInput.setDisabled(false).focus();
  else discountInput.clear().setDisabled(true).clearError();
});

// ۲: File Picker پویا
componentManagement(&quot;user_avatar&quot;).setProp(&quot;maxSize&quot;, 2048).setProp(&quot;allowedFiles&quot;, [&quot;jpg&quot;,&quot;png&quot;]).setLabel(&quot;Upload your photo (Max 2MB)&quot;).refresh();

// ۳: خطای سرور روی Editor
componentManagement(&quot;post_content&quot;).setError(errorData.errors.content[0]).focus();</code></pre>
</div>
<h3 id="sec-abolframe-component-management-select-controller-10" class="scroll-mt-header">A.9 Best Practices</h3>
<ol><li><strong>عدم استفاده مستقیم از jQuery</strong> برای کامپوننت‌های AbolFrame: به‌جای <code>$(&#039;#id&#039;).val(v)</code> از <code>componentManagement(&#039;id&#039;).setValue(v)</code>؛ چون در کامپوننت‌های پیچیده تغییر مقدار input کافی نیست و state داخلی هم باید به‌روز شود.</li><li><strong>زنجیره‌پذیری:</strong> جز متدهای دریافت داده (<code>getValue</code>, <code>getInput</code>)، بقیه <code>this</code> برمی‌گردانند.</li><li><strong>خطای یافت‌نشدن</strong> (بالا).</li></ol>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-component-management-select-controller-11" class="scroll-mt-header">بخش B — SelectController (تأمین داده <code>x-select</code>)</h2>
<p>کلاس پایه برای تأمین داده کامپوننت <code>x-select</code>: کنترلر فرزند می‌سازید و منطق داده را داخل آن پیاده می‌کنید.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>use MyLaravelCore\\Controllers\\SelectController;</code></pre>
</div>
<h3 id="sec-abolframe-component-management-select-controller-12" class="scroll-mt-header">B.1 <code>data()</code> یا <code>query()</code> — دقیقاً یکی</h3>
<ul><li>هیچ‌کدام پیاده نشود ⇒ خطا؛ هر دو ⇒ خطا؛ کد خطا <code>SELECT_INVALID_FILTER_CONFIGURATION</code>.</li><li><strong><code>data()</code>:</strong> خروجی <code>array</code>، <code>Collection</code> یا <code>LengthAwarePaginator</code>؛ وقتی خروجی از قبل (سرویس/ریپازیتوری) آماده است و کنترل کامل لازم دارید.</li><li><strong><code>query()</code> (پیشنهادی):</strong> باید Eloquent Builder برگرداند؛ SelectController خودش: اولویت آیتم‌های انتخاب‌شده، صفحه‌بندی، و تلاش برای تکمیل label آیتم‌های selected از دیتابیس (اگر در خروجی <code>selected()</code> نباشد).</li></ul>
<h3 id="sec-abolframe-component-management-select-controller-13" class="scroll-mt-header">B.2 کانستنت‌ها</h3>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>کانستنت</th><th>پیش‌فرض</th><th>مقادیر</th></tr></thead><tbody><tr><td><code>PER_PAGE</code></td><td>15</td><td></td></tr><tr><td><code>QUERY_RESULT_MODE</code></td><td><code>&#039;paginate&#039;</code></td><td><code>&#039;paginate&#039;</code> (paginate لاراول)، <code>&#039;abolframe_paginate&#039;</code> (<code>abolframe()-&gt;abolframePaginate()</code>)، <code>&#039;get&#039;</code> (بدون صفحه‌بندی)</td></tr></tbody></table></div>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>protected const int PER_PAGE = 30;
protected const string QUERY_RESULT_MODE = &#039;abolframe_paginate&#039;;</code></pre>
</div>
<p>برای infinite scroll حتماً pagination.</p>
<h3 id="sec-abolframe-component-management-select-controller-14" class="scroll-mt-header">B.3 <code>VALUES_ARE_IDENTIFIERS</code></h3>
<p>گزینه‌ها همیشه با کلید <code>id</code> برگردانده می‌شوند و لایه رمزنگاری شناسه را از روی همین نام تشخیص می‌دهد ⇒ مقدار هر گزینه در مسیر خروجی <strong>رمز</strong> می‌شود. برای ردیف جدول درست است. اما وقتی مقدار گزینه شناسه نیست (مثلاً select روی enum که مقدار enum زیر <code>id</code> است) رمز کردن چیزی را محافظت نمی‌کند و مشکل می‌سازد: فرم رشته رمزشده را پس می‌فرستد، سمت ورودی فقط کلیدهای <code>id</code>، <code>*_id</code>، <code>*_ids</code> رمزگشایی می‌شوند ⇒ rule اعتبارسنجی مقداری می‌بیند که نمی‌پذیرد. <strong>فقط وقتی رمزنگاری روشن است دیده می‌شود</strong> (روی <code>none</code> ناپدید می‌شود).</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>class SubjectCategoryTypeController extends SelectController
{
    /** گزینه‌ها مقدار خود enum را دارند، نه ردیف جدول. */
    protected const bool VALUES_ARE_IDENTIFIERS = false;
}</code></pre>
</div>
<p>پیش‌فرض <code>true</code>. با <code>false</code>: مقدار گزینه‌ها و <code>meta.selected[].id</code> رمز نمی‌شود؛ همان مقدار ساده در مسیر برگشت پذیرفته می‌شود؛ select وابسته مشکلی ندارد.</p>
<ul><li>⚠️ با <code>false</code> کل بدنه پاسخ آن اندپوینت از رمزگذاری رد می‌شود ⇒ ستون شناسه دیگر (<code>parent_id</code>) برنگردانید.</li><li>⚠️ تغییر ناسازگار <code>true → false</code>: صفحه رندرشده هنوز مقدار رمزشده دارد و تا رفرش خطای اعتبارسنجی می‌گیرد؛ مصرف‌کننده‌های دیگر باید بازبینی شوند.</li></ul>
<h3 id="sec-abolframe-component-management-select-controller-15" class="scroll-mt-header">B.4 متد <code>selected()</code></h3>
<p>دو فرمت:</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>public function selected(): array { return [5, 8, 12]; }                                 // فقط شناسه
public function selected(): array { return [[&#039;id&#039;=&gt;5,&#039;label&#039;=&gt;&#039;ملت&#039;], [&#039;id&#039;=&gt;8,&#039;label&#039;=&gt;&#039;صادرات&#039;]]; } // شناسه+label</code></pre>
</div>
<p>اگر label بدهید کنترلر دوباره استخراج نمی‌کند. <strong>ادغام:</strong> مقادیر انتخاب‌شده از request/session قبل از اجرای نهایی با خروجی <code>selected()</code> merge می‌شوند — تک‌انتخابی در <code>$this-&gt;selectedItem</code>، چندانتخابی در <code>$this-&gt;selectedItems</code>. یعنی انتخاب فعلی کاربر هم به مقدار اولیه افزوده می‌شود.</p>
<h3 id="sec-abolframe-component-management-select-controller-16" class="scroll-mt-header">B.5 <code>labelColumn</code></h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>protected string $labelColumn = &#039;title&#039;;</code></pre>
</div>
<p>پیش‌فرض <code>name</code>. <strong>تغییر نسبت به قبل:</strong> <code>selectedLabelColumn()</code> حذف شده و fallback خودکار <code>name → title</code> وجود ندارد. وجود ستون label در <strong>همه</strong> آیتم‌های خروجی اجباری؛ وگرنه: «The label column 'name' does not exist in the returned data.»</p>
<h3 id="sec-abolframe-component-management-select-controller-17" class="scroll-mt-header">B.6 ساختار حداقلی آیتم</h3>
<ul><li><code>id</code> — اجباری (پیش‌فرض شناسه و رمز می‌شود؛ <code>VALUES_ARE_IDENTIFIERS</code>).</li><li>ستون label — اجباری.</li><li><code>is_active</code>: در <code>query()</code> اگر <code>is_active</code> در <code>fillable</code> مدل باشد <strong>اجباری</strong> و از داده خوانده می‌شود؛ در غیر این صورت (مدل بدون <code>is_active</code> یا حالت <code>data()</code>) اختیاری و پیش‌فرض فعال (<code>IsActive::YES = 1</code>)؛ مقادیر ارسال‌شده دست‌نخورده.</li><li><code>selected</code> — اختیاری.</li></ul>
<h3 id="sec-abolframe-component-management-select-controller-18" class="scroll-mt-header">B.7 همگام‌سازی خودکار <code>selected</code></h3>
<p>کنترلر پیش از ارسال، <code>selected</code> همه آیتم‌ها را با شناسه‌های انتخاب‌شده واقعی (request/session و <code>selected()</code>) بازنویسی می‌کند؛ <code>selected =&gt; true</code> در داده خام که واقعاً انتخاب نشده ⇒ <code>false</code> و برعکس.</p>
<h3 id="sec-abolframe-component-management-select-controller-19" class="scroll-mt-header">B.8 <code>resolveLabelsForIds()</code></h3>
<p>label شناسه‌ها را سمت سرور با همان منطق <code>data()/query()</code> برمی‌گرداند:</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>$labels = app(CitySelectController::class)-&gt;resolveLabelsForIds([5, 8], parentSelected: 21);
// [&#039;5&#039; =&gt; &#039;ساری&#039;, &#039;8&#039; =&gt; &#039;بابل&#039;] ؛ نیافتن label ⇒ null</code></pre>
</div>
<p><code>parentSelected</code> برای select وابسته. کاربرد: تنظیم فیلترهای پیش‌فرض جدول برای select وابسته/API‌محور.</p>
<h3 id="sec-abolframe-component-management-select-controller-20" class="scroll-mt-header">B.9 <code>parentSelected</code> و <code>parentChain</code></h3>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>انتخاب کاربر در والد</th><th><code>parentSelected</code></th></tr></thead><tbody><tr><td>هیچ</td><td><code>null</code></td></tr><tr><td>یک مقدار</td><td>مثلاً <code>&#039;12&#039;</code></td></tr><tr><td>چند مقدار (والد چندانتخابی)</td><td><code>[&#039;12&#039;,&#039;15&#039;,&#039;21&#039;]</code></td></tr></tbody></table></div>
<p>والد چندانتخابی همه مقادیر را در <strong>یک درخواست</strong> می‌فرستد. در کنترلر فرزند:</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>-&gt;whereIn(&#039;province_id&#039;, (array) $this-&gt;parentSelected)</code></pre>
</div>
<p>با <code>where(...)</code> فقط حالت تک‌مقداری درست کار می‌کند.</p>
<h3 id="sec-abolframe-component-management-select-controller-21" class="scroll-mt-header">B.10 قابلیت‌های دیگر</h3>
<ul><li>مقدار <code>search</code> از request (برای کوئری).</li><li>در حالت <code>from_filter</code> مقدار selected از session مربوط به table generator.</li><li>آیتم‌های selected در مرتب‌سازی اولویت دارند (معمولاً بالاتر).</li></ul>
<h3 id="sec-abolframe-component-management-select-controller-22" class="scroll-mt-header">B.11 مثال‌ها</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>// ۱: data()
class CitySelectController extends SelectController
{
    public function data(): mixed
    {
        return City::query()-&gt;when($this-&gt;search, fn ($q) =&gt; $q-&gt;where(&#039;name&#039;, &#039;like&#039;, &quot;%{$this-&gt;search}%&quot;))-&gt;orderBy(&#039;name&#039;)-&gt;get();
    }
    public function selected(): array { return [1, 2]; }
}

// ۲: query() (پیشنهادی)
class BankSelectController extends SelectController
{
    protected const int PER_PAGE = 20;
    protected const string QUERY_RESULT_MODE = &#039;paginate&#039;;
    public function query(): ?Builder
    {
        return Bank::query()-&gt;when($this-&gt;search, fn ($q) =&gt; $q-&gt;where(&#039;name&#039;, &#039;like&#039;, &quot;%{$this-&gt;search}%&quot;));
    }
    public function selected(): array { return [[&#039;id&#039;=&gt;5,&#039;label&#039;=&gt;&#039;test 5&#039;], [&#039;id&#039;=&gt;8,&#039;label&#039;=&gt;&#039;test 8&#039;]]; }
}

// ۳: وابسته با parentSelected
class ProvinceCitySelectController extends SelectController
{
    public function query(): ?Builder
    {
        return City::query()-&gt;whereIn(&#039;province_id&#039;, (array) $this-&gt;parentSelected)
            -&gt;when($this-&gt;search, fn ($q) =&gt; $q-&gt;where(&#039;name&#039;, &#039;like&#039;, &quot;%{$this-&gt;search}%&quot;));
    }
}</code></pre>
</div>
<h3 id="sec-abolframe-component-management-select-controller-23" class="scroll-mt-header">B.12 جمع‌بندی</h3>
<p>فقط یکی از <code>data()</code>/<code>query()</code>؛ <code>query()</code> برای صفحه‌بندی ساده؛ infinite scroll با pagination؛ <code>PER_PAGE</code>، <code>QUERY_RESULT_MODE</code>، <code>labelColumn</code> در صورت نیاز؛ <code>labelColumn</code> اجباری اگر ستون label <code>name</code> نیست؛ <code>VALUES_ARE_IDENTIFIERS=false</code> برای مقدار غیرشناسه.</p>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-component-management-select-controller-24" class="scroll-mt-header">بخش C — Dependent Select در Table Generator</h2>
<p>در <code>addFilter</code>، <code>options</code> با پیشوند <code>select*</code> (<code>selectParentId</code>, <code>selectRouteName</code>, <code>selectInfiniteScroll</code>) یا نسخه بدون پیشوند در Morph Filter (<code>parentId</code>, <code>infiniteScroll</code>, <code>routeName</code>, <code>parameters.element</code>, <code>perPage</code>). کنترلر باید <code>table_generator_class</code> را از request بخواند و <code>tableGenerators</code> را پر کند (فایل Table Generator، بخش C.4).</p>
        `
    },
    {
        id: "abolframe-auth-user-management",
        title: "۱۳. راهنمای توسعه و معماری (Handbook)",
        icon: "fa-book-open-reader",
        category: "مستندات جامع ابول فریم (AbolFrame)",
        content: `
<h1>۱۳. راهنمای توسعه (Developer Handbook) — توضیح کامل</h1>
<div class="toc-quick-jump-card my-4 p-3 rounded-3 border bg-body-tertiary"><div class="d-flex align-items-center justify-content-between mb-2"><strong class="text-primary small"><i class="fa fa-compass ms-1"></i> فهرست سریع آیتم‌ها، متدها و کامپوننت‌های این بخش (22 مورد):</strong></div><div class="d-flex flex-wrap gap-2"><a href="#sec-abolframe-auth-user-management-1" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱. نام‌گذاری</a><a href="#sec-abolframe-auth-user-management-2" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۲. Service Pattern</a><a href="#sec-abolframe-auth-user-management-3" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۳. Repository Pattern</a><a href="#sec-abolframe-auth-user-management-4" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۴. ساختار Request</a><a href="#sec-abolframe-auth-user-management-5" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۵. Route و Permission</a><a href="#sec-abolframe-auth-user-management-6" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۶. Enum</a><a href="#sec-abolframe-auth-user-management-7" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۷. استاندارد Response</a><a href="#sec-abolframe-auth-user-management-8" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۸. Generatorها</a><a href="#sec-abolframe-auth-user-management-9" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۹. File Manager</a><a href="#sec-abolframe-auth-user-management-10" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱۰. Settings</a><a href="#sec-abolframe-auth-user-management-11" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱۱. Soft Delete</a><a href="#sec-abolframe-auth-user-management-12" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱۲. مدیریت خطا</a><a href="#sec-abolframe-auth-user-management-13" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱۳. Validation</a><a href="#sec-abolframe-auth-user-management-14" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱۴. ترجمه</a><a href="#sec-abolframe-auth-user-management-15" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱۵. Blade</a><a href="#sec-abolframe-auth-user-management-16" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱۶. Component (قوانین کامپوننت)</a><a href="#sec-abolframe-auth-user-management-17" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱۷. Clean Code</a><a href="#sec-abolframe-auth-user-management-18" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱۸. اصول SOLID</a><a href="#sec-abolframe-auth-user-management-19" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۱۹. Performance</a><a href="#sec-abolframe-auth-user-management-20" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۲۰. Database</a><a href="#sec-abolframe-auth-user-management-21" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۲۱. Security</a><a href="#sec-abolframe-auth-user-management-22" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">۲۲. Logging</a></div></div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-auth-user-management-1" class="scroll-mt-header">۱. نام‌گذاری</h2>
<p>نام‌گذاری باید <strong>قابل‌پیش‌بینی، domain‌محور و هماهنگ با stack</strong> پروژه باشد.</p>
<p><strong>Backend / Domain</strong></p>
<ul><li>class → <code>PascalCase</code>؛ method و property → <code>camelCase</code>؛ enum → <strong>مفرد</strong>.</li><li>interface نام <em>contract</em> را نشان دهد، نه پیشوند/پسوند تزئینی.</li><li>booleanها با <code>is</code>، <code>has</code>، <code>can</code>، <code>should</code> شروع شوند.</li></ul>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>final class UserActivationService
{
    public function canActivate(User $user): bool { return ! $user-&gt;isActive(); }
}</code></pre>
</div>
<p><strong>Markup / UI:</strong> <code>id</code> و <code>class</code> با <code>kebab-case</code>؛ نام component هدف را نشان دهد؛ نام template/view با feature هماهنگ.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">HTML</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>&lt;div id=&quot;user-profile-form&quot; class=&quot;user-profile-form&quot;&gt;&lt;/div&gt;</code></pre>
</div>
<p><strong>JavaScript:</strong> variable/function <code>camelCase</code>؛ constant واقعی <code>UPPER_SNAKE_CASE</code>؛ event handler، action را توضیح دهد.</p>
<p><strong>Route/Endpoint:</strong> resource-oriented و قابل‌پیش‌بینی: <code>admin.users.index</code>, <code>admin.users.store</code>, <code>admin.users.update</code>.</p>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div><strong>ممنوع:</strong> نام‌های مبهم (<code>data</code>, <code>item</code>, <code>handle</code>) بدون context؛ abbreviation ناشناخته؛ مخلوط فارسی/انگلیسی در identifier؛ نام‌گذاری بر اساس پیاده‌سازی موقت.</div></div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-auth-user-management-2" class="scroll-mt-header">۲. Service Pattern</h2>
<p>Service محل پیاده‌سازی <strong>business logic</strong> است، نه جایگزین controller یا repository.</p>
<p><strong>مسئولیت:</strong> اجرای use case؛ enforce قوانین کسب‌وکار؛ هماهنگی چند repository/model؛ transaction در عملیات چندنوشتنی؛ پرتاب exception معنی‌دار domain.</p>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div><strong>ممنوع:</strong> دسترسی مستقیم به <code>request()</code>؛ ساخت response؛ وابستگی به session/frontend؛ validation خام input؛ مخلوط query پیچیده و orchestration سنگین در یک method.</div></div>
<p><strong>ورودی/خروجی:</strong> ورودی explicit (scalarهای validate‌شده، DTO، model مشخص، value object)؛ خروجی domain result نه HTTP response.</p>
<h2 id="sec-abolframe-auth-user-management-3" class="scroll-mt-header">۳. Repository Pattern</h2>
<p>فقط وقتی query/persistence ارزش جدا شدن از service یا model را دارد.</p>
<p><strong>مناسب:</strong> queryهای پیچیده و پرتکرار؛ filter و sort چندگانه؛ persistence پشت contract؛ جدا کردن query از use case سنگین.</p>
<p><strong>نامناسب:</strong> wrapper ساده <code>Model::query()</code>؛ repository برای هر model بدون نیاز؛ مخفی کردن Eloquent پشت abstraction ضعیف.</p>
<div class="callout info"><i class="fa fa-circle-info callout-icon"></i><div><strong>قواعد:</strong> repository response نمی‌سازد؛ permission تصمیم نمی‌گیرد (مگر contract آن access-scoped باشد)؛ methodها business-readable؛ pagination و eager loading آگاهانه. <strong>پیش‌فرض پروژه: Repository نساز.</strong></div></div>
<h2 id="sec-abolframe-auth-user-management-4" class="scroll-mt-header">۴. ساختار Request</h2>
<p>FormRequest بر اساس <strong>action/use case</strong> تفکیک شود، نه model.</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">CODE</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>Http/Requests/UserStoreRequest.php, UserUpdateRequest.php, UserChangeStatusRequest.php</code></pre>
</div>
<p>قوانین: هر action مهم request مستقل؛ rules خوانا؛ داده normalize‌شده از <code>validated()</code> یا DTO بگذرد.</p>
<p>ممنوع: <code>$request-&gt;all()</code> برای ذخیره؛ یک request عمومی برای چند action؛ nullable کردن گسترده برای reuse.</p>
<h2 id="sec-abolframe-auth-user-management-5" class="scroll-mt-header">۵. Route و Permission</h2>
<ul><li>Route Naming: dot notation و resource-oriented.</li><li><strong>Permission:</strong> هر route حساس permission مشخص؛ permissionها از routeها قابل تولید یا trace؛ ترجمه permission هم‌زمان؛ permissionهای حذف‌شده اثر روی roleها را بررسی کنند.</li><li><strong>Command تولید Permission:</strong> پس از افزودن/تغییر route اجرا و خروجی review شود.</li><li><strong>ممنوع:</strong> route بدون نام؛ route حساس بدون permission؛ نام permission نامرتبط با action؛ تغییر route name بدون بررسی مصرف‌کننده‌ها.</li></ul>
<h2 id="sec-abolframe-auth-user-management-6" class="scroll-mt-header">۶. Enum</h2>
<p>برای stateها و مقدارهای محدود domain.</p>
<p><strong>قوانین:</strong> نام مفرد؛ مقدار stable؛ در module مالک domain؛ label از translation؛ cast در model صریح.</p>
<p><strong>مناسب:</strong> وضعیت سفارش، نوع پرداخت، سطح دسترسی محدود، stateهای business محدود.</p>
<p><strong>نامناسب:</strong> configuration متغیر runtime؛ داده قابل مدیریت توسط ادمین؛ لیست‌های DB.</p>
<p><strong>تغییر Enum:</strong> قبل از تغییر مقدار بررسی کنید: داده موجود DB، backward compatibility API، translationها، filterها و گزارش‌ها.</p>
<h2 id="sec-abolframe-auth-user-management-7" class="scroll-mt-header">۷. استاندارد Response</h2>
<p>در پروژه‌های AbolFrame response از <strong>ساختار مشترک</strong> عبور کند.</p>
<ul><li>استفاده از response macro الزامی؛ raw <code>json()</code> در controller ممنوع؛ error/success ساختار قابل‌پیش‌بینی؛ pagination ساختار استاندارد؛ شناسه‌های حساس در صورت policy پروژه encrypted.</li><li><strong>Pagination:</strong> items، current page، per page، total، links (در صورت نیاز). (نمونه واقعی: <code>meta.pagination: {page,pageSize,pageCount,total}</code>.)</li><li><strong>ممنوع:</strong> ساختار متفاوت برای endpointهای مشابه؛ برگرداندن exception message خام؛ expose کردن id/field حساس برخلاف policy.</li></ul>
<h2 id="sec-abolframe-auth-user-management-8" class="scroll-mt-header">۸. Generatorها</h2>
<p>برای ایجاد ساختار اولیه، نه جایگزین review و طراحی.</p>
<p><strong>قوانین:</strong> خروجی review شود؛ نام‌ها هماهنگ با convention ابول فریم؛ scope مشخص؛ permission و routeهای تولیدی بررسی شود؛ migration تولیدی قبل از اجرا خوانده شود.</p>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div><strong>ممنوع:</strong> merge بدون cleanup؛ stub استفاده‌نشده؛ کد تکراری بی‌دلیل؛ تغییر generator بدون بررسی خروجی نمونه.</div></div>
<h2 id="sec-abolframe-auth-user-management-9" class="scroll-mt-header">۹. File Manager</h2>
<p>کار با فایل <strong>امن، قابل ردیابی و هماهنگ با permission</strong>.</p>
<p><strong>قوانین:</strong> upload validation کامل؛ path از input خام ساخته نشود؛ نوع و اندازه محدود؛ کنترل دسترسی download و preview؛ حذف فایل اثر روی entityهای وابسته را بررسی کند؛ متد <code>entity</code> همراه نام ستون فایل؛ <strong>اتصال entity فقط در آپلود تک‌فایلی</strong>.</p>
<p><strong>امنیت:</strong> فایل executable بدون کنترل ذخیره/serve نشود؛ نام اصلی فایل مبنای trust نیست؛ metadata حساس بی‌دلیل نگهداری نشود.</p>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div><strong>ممنوع:</strong> ذخیره در مسیر public بدون policy؛ expose کردن path داخلی؛ log محتوای فایل؛ استفاده هم‌زمان از <code>entity</code> و آپلود چندفایلی.</div></div>
<h2 id="sec-abolframe-auth-user-management-10" class="scroll-mt-header">۱۰. Settings</h2>
<p>Settings برای configuration <strong>قابل‌تغییر runtime</strong> است، نه secret یا ثابت کد.</p>
<p><strong>قوانین:</strong> هر setting owner و purpose؛ type و default روشن؛ تغییر حساس audit شود؛ cache با invalidation مشخص.</p>
<p><strong>نامناسب:</strong> secret/credential؛ ثابت code-level؛ featureهایی که migration و contract می‌خواهند.</p>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div><strong>ممنوع:</strong> خواندن setting در loop بدون cache؛ string key پراکنده؛ تغییر معنی setting بدون migration/rollout plan.</div></div>
<h2 id="sec-abolframe-auth-user-management-11" class="scroll-mt-header">۱۱. Soft Delete</h2>
<p>فقط وقتی <strong>نیاز واقعی</strong> به restore، audit یا حفظ relation هست.</p>
<p><strong>مناسب:</strong> داده قابل‌بازیابی؛ entity دارای relationهای مهم؛ حذف فیزیکی با ریسک business؛ نیاز به audit/trace.</p>
<p><strong>قوانین:</strong> رفتار listها نسبت به رکورد حذف‌شده مشخص؛ restore با authorization؛ حذف نهایی review شود؛ unique constraintها با soft delete سازگار؛ relationها اثر حذف را درست مدیریت کنند.</p>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div><strong>ممنوع:</strong> soft delete برای همه modelها بدون نیاز؛ نمایش رکورد حذف‌شده بدون label/filter؛ restore بدون بررسی conflict؛ حذف وابسته‌ها بدون policy.</div></div>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>⚠️ تعارض با دستور پروژه: «همیشه trait فونداسیون SoftDeletes» — وقتی مدل حذف نرم دارد فقط trait فونداسیون؛ اینکه جدول جدید حتماً حذف نرم بگیرد یا نه تصمیم باز است.</div></div>
<h2 id="sec-abolframe-auth-user-management-12" class="scroll-mt-header">۱۲. مدیریت خطا</h2>
<p>قابل‌پیش‌بینی، قابل log و قابل تبدیل به خروجی استاندارد.</p>
<ul><li><strong>try/catch</strong> فقط با recovery، تبدیل exception یا context logging؛ swallow ممنوع؛ catch عمومی بدون rethrow/log ممنوع؛ exception domain معنی business.</li><li><strong>Response خطا:</strong> API پاسخ استاندارد؛ raw JSON پراکنده ممنوع؛ پیام خطا stack trace/داده حساس افشا نکند؛ تبدیل exception به response فقط در entry point، handler یا transformer.</li><li><strong>Debug:</strong> <code>dd</code>, <code>dump</code>, <code>var_dump</code> در کد قابل merge ممنوع؛ debug موقت قبل از MR حذف؛ production فقط log و monitoring.</li><li><strong>Logging خطا:</strong> هر خطای مهم context کافی: شناسه request، user (اگر هست)، action/use case، شناسه entity.</li></ul>
<h2 id="sec-abolframe-auth-user-management-13" class="scroll-mt-header">۱۳. Validation</h2>
<p>همه inputهای خارجی قبل از استفاده validate شوند.</p>
<p><strong>اصول:</strong> validation در لایه مشخص و قابل تست؛ authorization مرتبط با action نزدیک همان action؛ sanitize/normalize قبل از ذخیره؛ policy <code>nullable</code> صریح.</p>
<p><strong>Mass Assignment:</strong> DTO/allowlist آگاهانه؛ پاس‌دادن کل payload به persistence ممنوع؛ فقط فیلدهای مجاز.</p>
<p><strong>Nullable Policy:</strong> هر nullable دلیل مشخص: واقعاً اختیاری، بعداً در flow دیگر تکمیل می‌شود، سازگار با داده legacy؛ nullable برای دور زدن validation ممنوع.</p>
<p><strong>File Upload:</strong> نوع، اندازه، تعداد، مسیر ذخیره، دسترسی مشاهده/دانلود.</p>
<h2 id="sec-abolframe-auth-user-management-14" class="scroll-mt-header">۱۴. ترجمه</h2>
<p>متن نمایشی نباید مستقیم در code/template/component پراکنده شود.</p>
<p><strong>اصول:</strong> متن UI از فایل translation؛ کلید stable و domain‌محور؛ پیام validation قابل‌ترجمه؛ متن error بدون اطلاعات فنی حساس.</p>
<p><strong>نام‌گذاری کلید:</strong> <code>users.fields.email</code>, <code>users.messages.created</code>, <code>users.errors.activation_failed</code> (در پروژه با namespace ماژول: <code>{module}::{file}.{key}</code>).</p>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div><strong>ممنوع:</strong> hardcode فارسی/انگلیسی در چند نقطه؛ متن فنی برای کاربر نهایی؛ تغییر کلید بدون بررسی مصرف‌کننده‌ها.</div></div>
<h2 id="sec-abolframe-auth-user-management-15" class="scroll-mt-header">۱۵. Blade</h2>
<p>Blade فقط <strong>presentation</strong>. query، business logic ممنوع؛ conditionهای ساده نمایشی مجاز؛ componentهای reusable؛ id/class kebab-case؛ داده view قبل از render آماده شود.</p>
<p><strong>Component:</strong> input مشخص؛ بدون side effect؛ بدون business validation؛ markup قابل‌پیش‌بینی.</p>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div><strong>ممنوع:</strong> model query در view؛ محاسبه سنگین در template؛ permission logic پیچیده در Blade؛ hardcode متن قابل‌ترجمه.</div></div>
<h2 id="sec-abolframe-auth-user-management-16" class="scroll-mt-header">۱۶. Component (قوانین کامپوننت)</h2>
<p>presentation قابل reuse، نه business logic پنهان. props واضح و محدود؛ بدون query؛ بدون permission پیچیده؛ eventها نام قابل‌فهم؛ state داخلی حداقلی.</p>
<p><strong>Form Componentها:</strong> <code>name</code>/<code>value</code> explicit؛ error state؛ <code>disabled</code>/<code>readonly</code> درست؛ accessibility پایه.</p>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div><strong>ممنوع:</strong> side effect در render؛ وابستگی غیرضروری به global state؛ hardcode متن.</div></div>
<p><strong>کنترل دسترسی:</strong> پراپ <code>permission</code> (رشته/null) با <code>hasAccess</code>؛ بدون آن رفتار قبلی؛ بدون مجوز کامپوننت و slotها رندر نمی‌شوند.</p>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-auth-user-management-17" class="scroll-mt-header">۱۷. Clean Code</h2>
<p>کدی که تغییرش کم‌ریسک و خواندنش سریع باشد.</p>
<ul><li>هر کلاس یک مسئولیت؛ لایه ورودی فقط orchestration؛ business logic در use case/service؛ validation در لایه مشخص و قابل ردیابی؛ duplication <strong>واقعی</strong> حذف شود؛ abstraction فقط وقتی پیچیدگی واقعی را کم می‌کند.</li><li><strong>Separation of Concerns:</strong> Entry Point (دریافت input، فراخوانی use case)؛ Validation Layer؛ Use Case/Service (business rule و orchestration)؛ Persistence (query/ذخیره پیچیده)؛ Domain Model (رفتار نزدیک به داده و invariant)؛ Presentation (rendering/response mapping).</li><li><strong>DRY:</strong> تکرار کورکورانه بد، اما حذف زودهنگام هر شباهت ظاهری هم می‌تواند کد را پیچیده کند. قبل از استخراج: دلیل مشترک تغییر؟ نام واضح؟ خوانایی بهتر؟</li><li><strong>ممنوع:</strong> methodهای بسیار بلند؛ شرط‌های تو‌در‌تو؛ query و business rule در لایه ورودی؛ helper برای business logic؛ کد dead/کامنت‌شده.</li></ul>
<h2 id="sec-abolframe-auth-user-management-18" class="scroll-mt-header">۱۸. اصول SOLID</h2>
<p>(بهبود maintainability، extensibility و کاهش coupling؛ مهم برای Service/Infra/پکیج‌های reusable.)</p>
<ol><li><strong>SRP:</strong> هر کلاس فقط یک دلیل برای تغییر. مزایا: کاهش پیچیدگی، تغییرات ایزوله. نقض: کلاس که هم Validation + DB + Logging می‌کند.</li><li><strong>OCP:</strong> باز برای توسعه، بسته برای تغییر؛ با Interface، Strategy، Event/Listener. نقض: تغییر مکرر کلاس core برای feature جدید.</li><li><strong>LSP:</strong> زیرکلاس بدون مشکل جایگزین کلاس پایه؛ قرارداد والد نشکند. نقض: override با رفتار غیرمنتظره یا exception که پایه ندارد.</li><li><strong>ISP:</strong> چند Interface کوچک به‌جای یک بزرگ. نقض: Interface با متدهای زیاد و نامرتبط.</li><li><strong>DIP:</strong> وابستگی به Abstraction نه Implementation. نقض: استفاده مستقیم از concrete در سرویس‌ها.</li></ol>
<p><strong>در عمل:</strong> بیشترین استفاده در Service و Infra؛ استفاده بیش از حد abstraction = Over-Engineering؛ SOLID هدفمند، نه برای «تمیز به نظر رسیدن».</p>
<h2 id="sec-abolframe-auth-user-management-19" class="scroll-mt-header">۱۹. Performance</h2>
<p>از طراحی query، pagination و عملیات سنگین شروع شود، نه بعد از کند شدن production.</p>
<ul><li><strong>Query:</strong> N+1 ممنوع؛ query در loop ممنوع؛ eager loading هدفمند؛ <code>exists()</code> به‌جای <code>count()</code>؛ ستون غیرضروری select نشود.</li><li><strong>Pagination:</strong> لیست‌های API و tableها pagination؛ export با محدودیت/queue/chunk؛ برگرداندن کل داده بدون limit ممنوع.</li><li><strong>Batch/عملیات سنگین:</strong> chunk؛ کارهای زمان‌بر queue؛ jobها idempotent؛ retry بدون اثر جانبی تکراری.</li><li><strong>Cache:</strong> با strategy روشن: کلید، زمان انقضا، شرایط invalidation، اثر روی داده stale.</li></ul>
<h2 id="sec-abolframe-auth-user-management-20" class="scroll-mt-header">۲۰. Database</h2>
<p>migration‌پذیر، قابل index، هماهنگ با domain.</p>
<ul><li><strong>Migration Naming:</strong> <code>create_users_table</code>, <code>add_status_to_orders_table</code>, <code>rename_total_to_grand_total_on_invoices_table</code>.</li><li><strong>Foreign Key:</strong> نام قابل‌پیش‌بینی؛ constraint در migration؛ رفتار delete/update صریح.</li><li><strong>Nullable Policy:</strong> فقط با دلیل domain؛ برای راحتی seed/import موقت پذیرفته نیست؛ تغییر nullable اثر روی داده موجود را بسنجد.</li><li><strong>Index Policy:</strong> FKها، ستون‌های پرکاربرد filter و sort، unique business.</li><li><strong>Transaction:</strong> برای عملیات چندنوشتنی الزامی: ایجاد entity همراه relationها، تغییر وضعیت همراه log، عملیات مالی/موجودی، چند update وابسته.</li><li><strong>Soft Delete و Enum:</strong> soft delete فقط با نیاز business؛ enum با strategy ذخیره‌سازی روشن و بررسی backward compatibility.</li></ul>
<h2 id="sec-abolframe-auth-user-management-21" class="scroll-mt-header">۲۱. Security</h2>
<p>هیچ endpoint/action/view نباید صرفاً به frontend یا پنهان‌بودن لینک اعتماد کند.</p>
<ul><li><strong>Authorization:</strong> برای actionهای حساس الزامی؛ permission نزدیک endpoint و قابل‌ردیابی؛ دسترسی داده در query/policy/access layer؛ تغییر permission review جداگانه.</li><li><strong>Input و Upload:</strong> ورودی frontend قابل اعتماد نیست؛ فایل: type، size، path کنترل‌شده؛ نام فایل و path از input خام ساخته نشود؛ محتوای نمایشی escape شود.</li><li><strong>داده حساس:</strong> در response برنگردد؛ secretها فقط از env/secret manager؛ در config commit نشود؛ password، token، national id و اطلاعات مالی log نشوند.</li><li><strong>Blockerها:</strong> نبود permission check؛ expose شدن stack trace؛ اعتماد به hidden input؛ direct object reference بدون کنترل دسترسی؛ ذخیره secret در repository.</li></ul>
<h2 id="sec-abolframe-auth-user-management-22" class="scroll-mt-header">۲۲. Logging</h2>
<p>برای debugging production و audit فنی؛ نه محل dump داده خام.</p>
<ul><li><strong>سطح‌ها:</strong> <code>debug</code> (local/troubleshooting کنترل‌شده)، <code>info</code> (رخداد مهم موفق)، <code>warning</code> (رفتار غیرعادی قابل‌ادامه)، <code>error</code> (نیازمند بررسی)، <code>critical</code> (اختلال جدی در service/داده).</li><li><strong>Structured:</strong> مثال <code>{&quot;level&quot;:&quot;error&quot;,&quot;message&quot;:&quot;Order payment failed&quot;,&quot;request_id&quot;:&quot;req-123&quot;,&quot;order_id&quot;:&quot;ord-456&quot;,&quot;user_id&quot;:&quot;usr-789&quot;}</code>.</li><li><strong>ممنوع در log:</strong> password، token، secret، فایل خام، اطلاعات مالی حساس، داده شخصی غیرضروری.</li><li><strong>قواعد:</strong> request-id قابل‌ردیابی؛ dump logging ممنوع؛ قابل‌جستجو و aggregation؛ پیام log action و failure را روشن کند.</li></ul>
        `
    },
    {
        id: "abolframe-css-color-palette",
        title: "۱۴. پالت رنگ، قراردادها و قوانین مصوب",
        icon: "fa-palette",
        category: "مستندات جامع ابول فریم (AbolFrame)",
        content: `
<h1>۱۴. طراحی، قراردادهای AbolFrame، تناقض‌ها و موارد باز — توضیح کامل</h1>
<div class="toc-quick-jump-card my-4 p-3 rounded-3 border bg-body-tertiary"><div class="d-flex align-items-center justify-content-between mb-2"><strong class="text-primary small"><i class="fa fa-compass ms-1"></i> فهرست سریع آیتم‌ها، متدها و کامپوننت‌های این بخش (20 مورد):</strong></div><div class="d-flex flex-wrap gap-2"><a href="#sec-abolframe-css-color-palette-1" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش A — سفارشی‌سازی دیزاین (رنگ‌ها)</a><a href="#sec-abolframe-css-color-palette-2" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.1 پالت‌ها (نام ← مقدار)</a><a href="#sec-abolframe-css-color-palette-3" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.2 کد CSS</a><a href="#sec-abolframe-css-color-palette-4" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">A.3 رهنمود</a><a href="#sec-abolframe-css-color-palette-5" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش B — قراردادهای دامنه AbolFrame (SKILL)</a><a href="#sec-abolframe-css-color-palette-6" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.1 FileManager</a><a href="#sec-abolframe-css-color-palette-7" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.2 روابط چندریختی</a><a href="#sec-abolframe-css-color-palette-8" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.3 کد ملی</a><a href="#sec-abolframe-css-color-palette-9" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.4 linkUserInfo</a><a href="#sec-abolframe-css-color-palette-10" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.5 فرم: Validation در برابر Toastr</a><a href="#sec-abolframe-css-color-palette-11" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.6 مودال‌های تغییر وضعیت/گردش</a><a href="#sec-abolframe-css-color-palette-12" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.7 حفاظت حذف مطالب دارای نظر</a><a href="#sec-abolframe-css-color-palette-13" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.8 پاک‌سازی مودال</a><a href="#sec-abolframe-css-color-palette-14" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.9 EventScientificField</a><a href="#sec-abolframe-css-color-palette-15" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">B.10 محدودیت‌های سخت</a><a href="#sec-abolframe-css-color-palette-16" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش C — قوانین مصوب پروژه (Decided Rules)</a><a href="#sec-abolframe-css-color-palette-17" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش D — تناقض‌ها: قانون پروژه بر مستندات زیرساخت</a><a href="#sec-abolframe-css-color-palette-18" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش E — باگ‌ها و هشدارهای شناخته‌شده زیرساخت</a><a href="#sec-abolframe-css-color-palette-19" class="toc-jump-pill btn btn-sm btn-light border text-secondary" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">ملاحظات امنیتی</a><a href="#sec-abolframe-css-color-palette-20" class="toc-jump-pill btn btn-sm btn-primary-subtle border border-primary-subtle text-primary fw-semibold" style="font-size: 0.78rem; padding: 3px 9px; border-radius: 6px; text-decoration: none;">بخش F — موارد باز (نیازمند تصمیم)</a></div></div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-css-color-palette-1" class="scroll-mt-header">بخش A — سفارشی‌سازی دیزاین (رنگ‌ها)</h2>
<p>در پروژه‌های AbolFrame می‌توان رنگ‌های پروژه را مطابق متغیرهای Figma سفارشی کرد: یک فایل CSS بسازید، مقادیر را با <strong>همان نام‌ها</strong> override کنید و در assetهای پروژه قرار دهید. اگر در دیزاین متغیر رنگی خارج از این ساختار هست، به تیم زیرساخت اطلاع دهید.</p>
<h3 id="sec-abolframe-css-color-palette-2" class="scroll-mt-header">A.1 پالت‌ها (نام ← مقدار)</h3>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>پالت</th><th>پایه</th><th>active</th><th>light</th><th>clarity-20</th></tr></thead><tbody><tr><td>primary</td><td><code>#5c2d91</code></td><td><code>#4a2475</code></td><td><code>#f3f0f7</code></td><td><code>#68409633</code></td></tr><tr><td>success</td><td><code>#22c55e</code></td><td><code>#15803d</code></td><td><code>#f0fdf4</code></td><td><code>#22c55e33</code></td></tr><tr><td>danger</td><td><code>#f8285a</code></td><td><code>#d81a48</code></td><td><code>#ffeef3</code></td><td><code>#f8285a33</code></td></tr><tr><td>info</td><td><code>#1b84ff</code></td><td><code>#056ee9</code></td><td><code>#eff6ff</code></td><td><code>#1b84ff33</code></td></tr><tr><td>info-2</td><td><code>#7239ea</code></td><td><code>#5014d0</code></td><td><code>#f8f5ff</code></td><td><code>#7239ea33</code></td></tr><tr><td>warning</td><td><code>#f6b100</code></td><td><code>#dfa000</code></td><td><code>#fff8dd</code></td><td><code>#f6b10033</code></td></tr><tr><td>secondary</td><td><code>#f9f9f9</code></td><td><code>#f9f9f9</code></td><td><code>#f9f9f9</code></td><td><code>#f9f9f933</code></td></tr><tr><td>light</td><td><code>#ffffff</code></td><td><code>#fcfcfc</code></td><td><code>#ffffff</code></td><td><code>#ffffff33</code></td></tr><tr><td>dark</td><td><code>#1e2129</code></td><td><code>#111318</code></td><td><code>#f9f9f9</code></td><td><code>#1e212933</code></td></tr></tbody></table></div>
<p><strong>Gray:</strong> <code>gray-100 #f9f9f9</code>، <code>200 #f1f1f4</code>، <code>300 #dbdfe9</code>، <code>400 #c4cada</code>، <code>500 #99a1b7</code>، <code>600 #78829d</code>، <code>700 #4b5675</code>، <code>800 #252f4a</code>، <code>900 #071437</code>، <code>1000 #1b1b28</code>.</p>
<h3 id="sec-abolframe-css-color-palette-3" class="scroll-mt-header">A.2 کد CSS</h3>
<p><code>bs-*</code> رنگ‌های Bootstrap و <code>x-*</code> رنگ‌های سفارشی:</p>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">CSS</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>:root, [data-bs-theme=&quot;light&quot;] {
    --bs-primary: #5c2d91;  --bs-primary-active: #4a2475;  --bs-primary-light: #f3f0f7;  --x-primary-clarity-20: #68409633;
    --bs-success: #22c55e;  --bs-success-active: #15803d;  --bs-success-light: #f0fdf4;  --x-success-clarity-20: #22c55e33;
    --bs-danger:  #f8285a;  --bs-danger-active:  #d81a48;  --bs-danger-light:  #ffeef3;  --x-danger-clarity-20:  #f8285a33;
    --bs-info:    #1b84ff;  --bs-info-active:    #056ee9;  --bs-info-light:    #eff6ff;  --x-info-clarity-20:    #1b84ff33;
    --x-info-2:   #7239ea;  --x-info-2-active:   #5014d0;  --bs-info-2-light:  #f8f5ff;  --x-info-2-clarity-20:  #7239ea33;
    --bs-warning: #f6b100;  --bs-warning-active: #dfa000;  --bs-warning-light: #fff8dd;  --x-warning-clarity-20: #f6b10033;
    --bs-secondary:#f9f9f9; --bs-secondary-active:#f9f9f9; --bs-secondary-light:#f9f9f9; --x-secondary-clarity-20:#f9f9f933;
    --bs-light: #ffffff;    --bs-light-active: #fcfcfc;    --x-light-clarity-20: #ffffff33; --x-light-light: #ffffff;
    --bs-dark: #1e2129;     --bs-dark-active: #111318;     --x-dark-clarity-20: #1e212933;  --x-dark-light: #f9f9f9;
    --bs-gray-100:#f9f9f9; --bs-gray-200:#f1f1f4; --bs-gray-300:#dbdfe9; --bs-gray-400:#c4cada; --bs-gray-500:#99a1b7;
    --bs-gray-600:#78829d; --bs-gray-700:#4b5675; --bs-gray-800:#252f4a; --bs-gray-900:#071437; --bs-gray-1000:#1b1b28;
}</code></pre>
</div>
<p>نکته: <code>info-2</code> ترکیبی از <code>--x-</code> و <code>--bs-</code> دارد (<code>--x-info-2</code>, <code>--bs-info-2-light</code>) — نام‌ها را دقیق همین‌طور نگه دارید.</p>
<h3 id="sec-abolframe-css-color-palette-4" class="scroll-mt-header">A.3 رهنمود</h3>
<p>در بج‌ها/سلول‌ها/دکمه‌ها از <code>variant</code> (<code>success/primary/warning/info/danger</code>) استفاده کنید نه hex دستی. هنگام تحویل Figma/اسکرین‌شات: ابتدا بررسی کنید کامپوننت معادل در زیرساخت هست؛ اگر مبهم بود بپرسید.</p>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-css-color-palette-5" class="scroll-mt-header">بخش B — قراردادهای دامنه AbolFrame (SKILL)</h2>
<h3 id="sec-abolframe-css-color-palette-6" class="scroll-mt-header">B.1 FileManager</h3>
<div class="code-box">
    <div class="code-header">
        <span class="code-lang">PHP</span>
        <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
    </div>
    <pre><code>use MyLaravelCore\\Facades\\FileManager;
$url = !empty($fileId) ? FileManager::url($fileId) : null;</code></pre>
</div>
<p>هرگز URL builder دستی یا کلاس غیر‌foundation.</p>
<h3 id="sec-abolframe-css-color-palette-7" class="scroll-mt-header">B.2 روابط چندریختی</h3>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>❌ <code>instanceof</code> و <code>find()</code> دستی؛ ✅ <code>$creator = $this-&gt;creatable ?? $this-&gt;participant?-&gt;member;</code> — لاراول/AbolFrame با <code>morphTo</code> (<code>creatable</code>, <code>changeable</code>, <code>commentable</code>, ...) مدل را خودکار resolve می‌کند. (این مثال «creator» است؛ با قانون «Participant ID هرگز از member_id» اشتباه گرفته نشود.)</div></div>
<h3 id="sec-abolframe-css-color-palette-8" class="scroll-mt-header">B.3 کد ملی</h3>
<p>در بج‌ها، هدر کارت و پرانتز کنار نام: ارقام ساده <code>(2080864440)</code>؛ هرگز <code>208-086444-0</code>. ماسک فقط وقتی فیلد ورودی ماسک‌دار لازم دارد.</p>
<h3 id="sec-abolframe-css-color-palette-9" class="scroll-mt-header">B.4 <code>linkUserInfo</code></h3>
<ul><li><strong>شرکت‌کننده/ارسال‌کننده:</strong> route <code>admin.participant.show</code> با <code>[&#039;participant&#039; =&gt; encryptStaticValue($participantId)]</code>.</li><li><strong>ادمین/کاربر عمومی:</strong> route <code>admin.admins.management.show</code> با <code>[&#039;user&#039; =&gt; encryptStaticValue($admin-&gt;id)]</code>.</li><li><strong>Participant ID:</strong> همیشه <code>participant_id</code> واقعی، <strong>هرگز</strong> <code>created_by</code>/<code>creatable_id</code>/<code>member_id</code>. اگر <code>$comment-&gt;participant_id</code> null: <code>Participant::where(&#039;event_id&#039;,$eventId)-&gt;where(&#039;member_id&#039;,$memberId)-&gt;value(&#039;id&#039;)</code>. اگر هیچ‌کدام: <code>linked: false</code> (یا <code>route: &#039;#&#039;</code>).</li><li>لینک دستی <code>&lt;a&gt;</code> وقتی <code>linkUserInfo</code> ممکن است ممنوع. <code>linkUserInfo</code> کنترل دسترسی (<code>hasAccess</code>)، ماسک کد، استایل و markup استاندارد را انجام می‌دهد.</li></ul>
<h3 id="sec-abolframe-css-color-palette-10" class="scroll-mt-header">B.5 فرم: Validation در برابر Toastr</h3>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>❌ <code>toastr.error()</code> برای فیلد الزامی. ✅ پیام inline زیر ورودی با <code>showComponentMessage({ type:&#039;error&#039;, targetElement:$container, message:&#039;...&#039; })</code> یا FormValidator؛ و پاک‌کردن بلادرنگ با <code>clearComponentMessage</code> هنگام تغییر ورودی.</div></div>
<h3 id="sec-abolframe-css-color-palette-11" class="scroll-mt-header">B.6 مودال‌های تغییر وضعیت/گردش</h3>
<ul><li>Badgeها هم‌خوان: کد <code>success</code> (title «کد»)، گروه علمی <code>primary</code> («گروه علمی»)، عنوان (در گردش نظر) <code>success</code> («عنوان»)، ارسال‌کننده <code>warning</code> («کاربر ارسال کننده»/«ارسال کننده»).</li><li><strong>کد ملی داخل بدج کاربر</strong> در پرانتز <code>نام (کدملی)</code>؛ بدج جدا نه.</li><li>tooltip بدج فقط عنوان استاتیک («ارسال کننده») نه مقدار پویا.</li><li>لیبل فیلد توضیحات: «توضیحات» (نه «توضیحات ادمین/مدیر»).</li></ul>
<h3 id="sec-abolframe-css-color-palette-12" class="scroll-mt-header">B.7 حفاظت حذف مطالب دارای نظر</h3>
<p>اگر <code>comments()-&gt;exists()</code> ⇒ حذف نشود؛ پیام «به دلیل وجود نظر برای این مطلب، امکان حذف آن وجود ندارد.»؛ دکمه حذف در جدول/کارت با tooltip مفید غیرفعال؛ پیام‌های واحد <code>__(&#039;base::message.destroy_not_changeable&#039;)</code> و <code>__(&#039;base::message.update_not_allowed&#039;)</code>. (ترجیح: <code>DeleteDependency::relation(&#039;comments&#039;)</code>.)</p>
<h3 id="sec-abolframe-css-color-palette-13" class="scroll-mt-header">B.8 پاک‌سازی مودال</h3>
<p>هنگام <code>hidden.bs.modal</code> در مودال‌های دارای آکاردئون/فرم داینامیک: آکاردئون‌ها به حالت بسته و پیام‌های خطا پاک شوند.</p>
<h3 id="sec-abolframe-css-color-palette-14" class="scroll-mt-header">B.9 <code>EventScientificField</code></h3>
<div class="callout warning"><i class="fa fa-triangle-exclamation callout-icon"></i><div>❌ <code>DB::table(&#039;event_scientific_fields&#039;)</code>. ✅ <code>Modules\\Event\\Models\\SupplementaryInformation\\EventScientificField::query()</code> یا <code>$event-&gt;scientificFields()</code>.</div></div>
<h3 id="sec-abolframe-css-color-palette-15" class="scroll-mt-header">B.10 محدودیت‌های سخت</h3>
<ul><li>❌ <code>Schema::hasColumn(...)</code> هرگز؛ مستقیم از مدل بر اساس schema دامنه.</li><li>❌ <code>&lt;input type=&quot;hidden&quot;&gt;</code> در فرم/template.</li><li>رمزنگاری/رمزگشایی شناسه غیرفعال است: شناسه خام بدون wrapper دستی.</li><li>Route Model Binding فعال؛ تابع کمکی رمزگشایی (<code>resolveId</code>, <code>decryptValueIfEncrypted</code>) روی پارامتر route ممنوع؛ <code>request()-&gt;route(&#039;event&#039;)</code> مستقیم مدل <code>Event</code>.</li></ul>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-css-color-palette-16" class="scroll-mt-header">بخش C — قوانین مصوب پروژه (Decided Rules)</h2>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>قانون</th><th>شرح</th></tr></thead><tbody><tr><td>حفاظت حذف وضعیت ثابت</td><td>رکورد «تایید شده» حذف نشود؛ ابتدا از ویرایش وضعیت را تغییر دهید</td></tr><tr><td>ترتیب select وضعیت</td><td>۱. در حال بررسی ۲. تایید شده ۳. تایید نشده (= <code>ConfirmationStatus</code>)</td></tr><tr><td>پیام حذف یکسان</td><td>«آیا از عملیات حذف مطمئن هستید؟»</td></tr><tr><td>هدر دیالوگ‌ها</td><td>نام و کد رویداد در دو Badge مجزا</td></tr><tr><td>پیوست طرح</td><td>فایل طرح در تمام صفحات جزئیات، در سکشن پیوست‌ها</td></tr><tr><td>دکمه عملیاتی</td><td>تمام منوهای قابل‌مشاهده سکشن‌ها در Actions هم باشند</td></tr><tr><td>آکاردئون توضیحات</td><td>در مدیریت مطالب، فیلد توضیحات = آکاردئون</td></tr><tr><td>متون استاتیک</td><td>فعلاً <code>&lt;p&gt;</code> (بدون تاریخ پایان؛ باز)</td></tr><tr><td>درصد</td><td>ماسک <code>%</code> و <code>max:100</code></td></tr><tr><td>وضعیت‌های قابل انتقال</td><td>در جزئیات با کاما؛ در جدول حداکثر ۲ + <code>...</code> و tooltip هاور</td></tr><tr><td>فیلتر تاریخ</td><td>«تاریخ شروع» و «تاریخ پایان» یک سطر</td></tr><tr><td>ماسک تاریخ</td><td>برای همه فیلدهای تاریخ</td></tr><tr><td>نقطه پایان پیام</td><td>پایان همه پیام‌ها/هشدارها/خطاها نقطه (استثنا ضمنی: پیام تایید «؟»)</td></tr><tr><td>دکمه درج</td><td>علامت <code>+</code></td></tr><tr><td>مرتب‌سازی پیش‌فرض</td><td>آخرین رکورد (<code>created_at DESC</code>/<code>latest()</code>; بهتر: tie-breaker <code>id DESC</code>)</td></tr><tr><td>اعتبارسنجی نام/عنوان</td><td>فارسی + فاصله + <code>()</code> + <code>-</code> + <code>_</code> + اعداد (Rule اختصاصی لازم؛ <code>PersianNameRule</code> کافی نیست)</td></tr><tr><td>تاریخ ثبت/ویرایش</td><td>یعنی زمان ثبت/ویرایش با ساعت و دقیقه</td></tr><tr><td>منوها</td><td>بر اساس صفحه منوها در Confluence</td></tr><tr><td>وضعیت اولیه</td><td>رکورد <code>is_start</code> و ساخت Status Log</td></tr></tbody></table></div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-css-color-palette-17" class="scroll-mt-header">بخش D — تناقض‌ها: قانون پروژه بر مستندات زیرساخت</h2>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>موضوع</th><th>مستندات زیرساخت</th><th>قانون پروژه</th><th>تصمیم</th></tr></thead><tbody><tr><td>رمزنگاری route id</td><td><code>encryptValue($id)</code> در مثال‌ها</td><td>route id رمز نمی‌شود</td><td>id خام؛ <code>encryptValue</code> فقط اگر <code>EncryptMethod ≠ NONE</code> و الگوی موجود</td></tr><tr><td><code>encryptStaticValue</code></td><td>در <code>linkUserInfo</code></td><td>«رمزنگاری غیرفعال»</td><td>ابهام (بخش E سؤال ۱)</td></tr><tr><td>hidden input</td><td><code>addHiddenInputs()</code>، repeater <code>hidden</code></td><td>ممنوع</td><td>شناسه از action/route/data-*</td></tr><tr><td>خطای فیلد</td><td><code>showToast</code></td><td>toastr ممنوع</td><td><code>showComponentMessage</code></td></tr><tr><td>پیام تایید حذف</td><td>«آیا از حذف این مورد اطمینان دارید ؟» / پیش‌فرض x-button «؟؟»</td><td>پیام یکسان مصوب</td><td>پیام مصوب با کلید ترجمه</td></tr><tr><td><code>PersianNameRule</code></td><td>فارسی+فاصله</td><td>+ <code>()</code> <code>-</code> <code>_</code> عدد</td><td>Rule اختصاصی</td></tr><tr><td><code>DB::table</code>/<code>Schema::hasColumn</code></td><td>—</td><td>ممنوع</td><td>فقط Eloquent</td></tr><tr><td>response</td><td><code>response()-&gt;json()</code> در مثال لایه‌بندی</td><td>ممنوع</td><td><code>Response::success/error</code></td></tr><tr><td><code>try/catch (Exception)</code></td><td>مثال CRUD</td><td>محدود</td><td>فقط recovery/ترجمه/context log</td></tr><tr><td>Soft delete</td><td>«نه برای همه»</td><td>همیشه trait فونداسیون</td><td>فقط trait فونداسیون؛ نیاز جدول جدید → سؤال</td></tr><tr><td><code>is_start</code></td><td>scope پیش‌فرض ندارد</td><td>وضعیت اولیه</td><td>افزودن به کانفیگ یا where صریح</td></tr><tr><td><code>Auth::user()</code></td><td>در مثال Filter/Navbar</td><td>helper</td><td><code>authUser()</code>/<code>authId()</code></td></tr><tr><td><code>x-table</code> برای index</td><td>ممکن</td><td>Table Generator</td><td>Table Generator؛ <code>x-table</code> برای جدول داخلی</td></tr></tbody></table></div>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-css-color-palette-18" class="scroll-mt-header">بخش E — باگ‌ها و هشدارهای شناخته‌شده زیرساخت</h2>
<ul><li><strong>Audit:</strong> <code>AuditQuery::get()</code> ← <code>FilterMetaCollector</code> ناموجود.</li><li><strong>Section:</strong> <code>permission()</code> و <code>activate()</code> بی‌اثر؛ badge صفر در lite نمایش داده نمی‌شود.</li><li><strong>Tab:</strong> <code>classic</code> فقط lite.</li><li><strong>SoftDeletes:</strong> <code>trashed()</code> ندارد؛ <code>where()-&gt;delete()</code> N query.</li><li><strong>ValidPolygon:</strong> بسته‌بودن/تقاطع را نمی‌سنجد.</li><li><strong>Jalali:</strong> mutable؛ <code>jalali(&#039;میلادی&#039;)</code> بی‌صدا غلط.</li><li><strong>Route cache:</strong> <code>customFilter</code>/<code>onlySidebar</code> ناسازگار.</li><li><strong>DeleteDependency:</strong> جهت <code>condition()</code> مبهم؛ حذف از query builder ایونت را اجرا نمی‌کند.</li><li><strong>Octane:</strong> ثبت route به‌ازای رکورد DB ممنوع (<code>appendDynamicRoutes</code>).</li><li><strong>Morph sort:</strong> subquery بدون index.</li><li><strong>نام کامپوننت‌ها ناهماهنگ:</strong> <code>x-text-area</code>/<code>x-textarea-input</code>، نقطه/خط‌تیره در فرزندان.</li><li><strong>مثال‌های نادرست:</strong> <code>x-modal isNonClosable</code>؛ <code>UpdateBankRequest</code> با <code>@canAccess(&#039;...store&#039;)</code>؛ <code>x-banner</code> با کوتیشن بسته‌نشده.</li><li><strong>x-item-collector:</strong> <code>required</code> در rules submit را می‌شکند.</li><li><strong>x-high-chart + Livewire:</strong> <code>wire:ignore</code> لازم.</li><li><strong>x-confirmation-modal/x-dropdown-item:</strong> <code>href</code> + <code>confirmationConfirmCallback</code> ⇒ خطا.</li><li><strong>x-select وابسته:</strong> <code>where</code> به‌جای <code>whereIn((array))</code>.</li><li><strong>x-map:</strong> drawable بدون <code>configClass</code>، <code>controls</code> نامعتبر، <code>getCurrentValues()</code> ناقص ⇒ خطا.</li><li><strong>خروجی‌های <code>mixed</code>:</strong> (<code>authUser()</code>, <code>getLanguage()</code>) منطق سنگین روی نوع آن‌ها بنا نشود.</li></ul>
<h3 id="sec-abolframe-css-color-palette-19" class="scroll-mt-header">ملاحظات امنیتی</h3>
<p>خروجی Closure سلول جدول، <code>linkUserInfo</code> و هر HTML خام ⇒ <code>e()</code>؛ <code>visibility/disabled</code> محافظت route نیست؛ <code>FormRequest::authorize()</code> برای هر action؛ Audit API نیازمند policy؛ <code>confirmationConfirmCallback</code> رشته JS اجراشونده است و هرگز از ورودی کاربر ساخته نشود.</p>
<hr class="my-4 border-secondary-subtle">
<h2 id="sec-abolframe-css-color-palette-20" class="scroll-mt-header">بخش F — موارد باز (نیازمند تصمیم)</h2>
<div class="table-responsive"><table class="docs-table"><thead><tr><th>#</th><th>سؤال</th></tr></thead><tbody><tr><td>1</td><td><code>EncryptMethod</code> فعلی پروژه؟ <code>encryptStaticValue</code> دقیقاً چه می‌کند و چرا با «رمزنگاری غیرفعال» هم‌زمان است؟ (لایه رمزنگاری خودکار <code>id/*_id/*_ids</code> با <code>none</code> غیرفعال می‌شود؛ تکلیف <code>encryptValue/encryptStaticValue</code> روشن نیست)</td></tr><tr><td>2</td><td><code>is_start</code> به <code>additional_boolean_scope_fields</code> اضافه شود یا <code>where</code> صریح؟</td></tr><tr><td>3</td><td>نام command تولید permission؟</td></tr><tr><td>4</td><td>فرمت تاریخ ذخیره/نمایش: <code>Y/m/d</code> شمسی؟ ذخیره UTC و نمایش <code>Asia/Tehran</code>؟</td></tr><tr><td>5</td><td>Rule اختصاصی عنوان/نام: نیم‌فاصله، اعداد فارسی/انگلیسی، <code>ي/ك</code> عربی؟</td></tr><tr><td>6</td><td>جهت دقیق <code>DeleteDependency::condition</code> (با تست)</td></tr><tr><td>7</td><td>اولویت پیام وقتی «تایید شده» و «دارای نظر» هم‌زمان؟</td></tr><tr><td>8</td><td>روش «دستی» تأیید CRUD: tinker / Feature Test / مرورگر؟</td></tr><tr><td>9</td><td>امضا و escape در <code>linkUserInfo</code> و رفتار <code>linked:false</code></td></tr><tr><td>10</td><td>مهلت قانون «متن استاتیک = <code>&lt;p&gt;</code>»</td></tr><tr><td>11</td><td>رنگ بج‌ها در صفحات غیر از گردش وضعیت</td></tr><tr><td>12</td><td>Glossary دامنه (Event، Participant، Member، Submission، Comment، Scientific Field و روابط)</td></tr><tr><td>13</td><td>تعارض Soft delete (راهنما) با دستور پروژه برای جدول جدید</td></tr><tr><td>14</td><td>نام دقیق کامپوننت‌های فرزند (نقطه/خط‌تیره) و <code>x-text-area</code></td></tr><tr><td>15</td><td>escape در <code>modifierClosure</code>/<code>slot</code> جدول <code>x-table</code></td></tr></tbody></table></div>
        `
    }
];
