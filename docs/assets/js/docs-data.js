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

            <h2>۲. کارت محتوا (&lt;x-card&gt;)</h2>
            <div class="code-box">
                <div class="code-header">
                    <span class="code-lang">BLADE</span>
                    <button class="btn-copy" onclick="copyCode(this)"><i class="fa fa-copy"></i> کپی کد</button>
                </div>
                <pre><code>&lt;x-card title="لیست سفارشات" icon="fa-shopping-bag" :collapsible="true"&gt;
    &lt;x-slot:headerActions&gt;
        &lt;x-button size="sm" variant="primary" icon="fa-plus"&gt;سفارش جدید&lt;/x-button&gt;
    &lt;/x-slot:headerActions&gt;

    محتوای درون کارت...
&lt;/x-card&gt;</code></pre>
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
            <h1>🛠️ لیست متدها و توابع کمکی گلوبال (Global Helpers)</h1>
            <p>این توابع در تمام بخش‌های برنامه (کنترلرها، مدل‌ها و فایل‌های Blade) بدون نیاز به تعریف یا <code>use</code> در دسترس هستند.</p>

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
                    <tr><td><code>persian_digits($val)</code></td><td>'123'</td><td>'۱۲۳'</td><td>تبدیل ارقام انگلیسی/عربی به فارسی</td></tr>
                    <tr><td><code>english_digits($val)</code></td><td>'۱۲۳'</td><td>'123'</td><td>استانداردسازی ارقام جهت ثبت در DB</td></tr>
                    <tr><td><code>is_valid_national_code($code)</code></td><td>'0010350810'</td><td>true</td><td>اعتبارسنجی الگوریتم ۱۰ رقمی کد ملی</td></tr>
                    <tr><td><code>is_valid_card_number($card)</code></td><td>'6037...'</td><td>true</td><td>اعتبارسنجی شماره ۱۶ رقمی کارت بانکی (Luhn)</td></tr>
                    <tr><td><code>is_valid_mobile($mobile)</code></td><td>'0912...'</td><td>true</td><td>بررسی صحت شماره موبایل ایران</td></tr>
                    <tr><td><code>clean_mobile($mobile)</code></td><td>'+98912...'</td><td>'0912...'</td><td>فرمت‌بندی موبایل به ساختار 09...</td></tr>
                    <tr><td><code>toman($amount)</code></td><td>150000</td><td>'۱۵۰,۰۰۰ تومان'</td><td>فرمت سه رقم و اضافه کردن تومان</td></tr>
                    <tr><td><code>rial($amount)</code></td><td>150000</td><td>'۱۵۰,۰۰۰ ریال'</td><td>فرمت سه رقم و اضافه کردن ریال</td></tr>
                    <tr><td><code>rial_to_toman($r)</code></td><td>10000</td><td>1000</td><td>تبدیل ریال به تومان</td></tr>
                    <tr><td><code>toman_to_rial($t)</code></td><td>1000</td><td>10000</td><td>تبدیل تومان به ریال</td></tr>
                    <tr><td><code>number_to_words_fa($n)</code></td><td>1250000</td><td>'یک میلیون و دویست و پنجاه هزار'</td><td>تبدیل عدد به حروف فارسی فاکتور</td></tr>
                    <tr><td><code>jdate($format, $time)</code></td><td>'Y/m/d'</td><td>'۱۴۰۵/۰۱/۱۵'</td><td>فرمت زمان به تاریخ شمسی</td></tr>
                    <tr><td><code>to_gregorian($jdate)</code></td><td>'1405/01/01'</td><td>'2026-03-21'</td><td>تبدیل تاریخ شمسی به میلادی</td></tr>
                    <tr><td><code>slugify_fa($str)</code></td><td>'راهنمای لاراول'</td><td>'راهنمای-لاراول'</td><td>تولید اسلاگ سئو فارسی یکتا</td></tr>
                    <tr><td><code>core()</code></td><td>-</td><td>CoreManager</td><td>دسترسی به تمامی سرویس‌های زیرساخت</td></tr>
                    <tr><td><code>api_response()</code></td><td>-</td><td>ApiResponse</td><td>ارسال پاسخ‌های یکپارچه JSON</td></tr>
                </tbody>
            </table>
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
