# راهنمای جامع کامپوننت‌های Blade (UI Components Guide)

پکیج **My Laravel Core** شامل ۳۳ کامپوننت غنی و مدرن برای Blade است که از استایل‌های فارسی (RTL)، اعتبارسنجی خودکار لاراول (`$errors`)، و متدهای جاوااسکریپت کنترلر پشتیبانی می‌کنند.

تمامی کامپوننت‌ها به هر دو شکل زیر قابل فراخوانی هستند:
1. `<x-{component-name}>`
2. `<x-core-{component-name}>`

---

## ۰. کامپوننت لایه‌بندی اصلی (`<x-default-layout>`)

برای بارگذاری کامل لایه‌بندی پروژه شامل تگ‌های HTML5، متاتگ‌ها، فونت Vazirmatn، استایل‌های Bootstrap 5 RTL، فونت‌آوسام، اسکریپت‌های Core UI، نوبار، فوتر و مدیریت خودکار پیام‌های سشن، کافی است ویوهای خود را درون `<x-default-layout>` قرار دهید:

### ویژگی‌ها (Props):
| Prop | نوع | پیش‌فرض | توضیح |
|---|---|---|---|
| `title` | string | null | عنوان صفحه (Title) |
| `dir` | string | "rtl" | جهت صفحه (rtl / ltr) |
| `navbar` | bool | true | نمایش/مخفی‌سازی نوبار بالا |
| `sidebar` | bool | false | فعال‌سازی ساختار گرید سایدبار |
| `container` | string/bool | "container" | کلاس ظرف محتوا (container, container-fluid, false) |
| `footer` | bool | true | نمایش/مخفی‌سازی فوتر |
| `alerts` | bool | true | نمایش خودکار پیام‌های session('success') و ... |
| `brand` | string | config('app.name') | نام برند در نوبار |
| `brandUrl` | string | url('/') | آدرس لینک لوگو/برند |

### اسلات‌ها (Slots):
- `default` — محتوای اصلی صفحه
- `header` — هدر صفحه یا Breadcrumb
- `nav` — آیتم‌های سفارشی منوی بالا
- `navActions` — دکمه‌های سفارشی سمت چپ منو
- `sidebarContent` — محتوای درون سایدبار (در صورت `sidebar="true"`)
- `styles` — فایل‌ها و کدهای CSS اختصاصی صفحه
- `scripts` — فایل‌ها و کدهای JS اختصاصی صفحه

### نمونه استفاده ساده:
```blade
<x-default-layout title="داشبورد مدیریت">
    <x-card title="به پنل مدیریت خوش آمدید">
        محتوای صفحه شما در اینجا قرار می‌گیرد...
    </x-card>
</x-default-layout>
```

### نمونه کامل با اسلات‌ها و سایدبار:
```blade
<x-default-layout title="پروفایل کاربری" :sidebar="true">
    <x-slot:header>
        <h4 class="mb-0 fw-bold">مدیریت حساب کاربری</h4>
    </x-slot:header>

    <x-slot:sidebarContent>
        <ul class="nav nav-pills flex-column">
            <li class="nav-item"><a href="#" class="nav-link active">اطلاعات پایه</a></li>
            <li class="nav-item"><a href="#" class="nav-link">امنیت و رمز عبور</a></li>
        </ul>
    </x-slot:sidebarContent>

    <x-card title="ویرایش اطلاعات">
        <form method="POST" action="/profile">
            @csrf
            <x-text-input name="name" label="نام کامل" :value="auth()->user()->name" />
            <x-button type="submit" variant="primary">بروزرسانی</x-button>
        </form>
    </x-card>
</x-default-layout>
```

---

## ۱. کامپوننت‌های فرم (Form Components - 16 عدد)

### ۱.۱ ورودی متن (`<x-text-input>`)
```blade
<x-text-input
    name="title"
    label="عنوان مقاله"
    :value="old('title', $post->title ?? '')"
    :required="true"
    icon="fa-heading"
    iconPosition="right"
    hint="حداکثر ۱۲۸ کاراکتر"
/>

<x-text-input
    name="price"
    label="قیمت محصول"
    addon="تومان"
    addonPosition="left"
/>
```

### ۱.۲ متن چندخطی (`<x-textarea>`)
```blade
<x-textarea
    name="description"
    label="توضیحات"
    :rows="5"
    :maxlength="2000"
    :showCounter="true"
    :autoResize="true"
    placeholder="متن کامل خود را بنویسید..."
/>
```

### ۱.۳ عدد با جداکننده هزارگان و دکمه‌های گام (`<x-number-input>`)
```blade
<x-number-input
    name="quantity"
    label="تعداد"
    :min="1"
    :max="100"
    :step="1"
    :showButtons="true"
    unit="عدد"
/>

<x-number-input
    name="price"
    label="قیمت فروش"
    :thousandSeparator="true"
    :persianDigits="true"
    unit="تومان"
/>
```

### ۱.۴ سلکت پیشرفته و آبشاری (`<x-select-input>`)
```blade
{{-- حالت ساده --}}
<x-select-input
    name="status"
    label="وضعیت"
    :options="[
        ['id' => 1, 'title' => 'فعال'],
        ['id' => 0, 'title' => 'غیرفعال']
    ]"
/>

{{-- حالت چندانتخابی با جستجو --}}
<x-select-input
    name="categories[]"
    label="دسته‌بندی‌ها"
    :options="$categories"
    :multiple="true"
    :searchable="true"
/>

{{-- حالت وابسته به فیلد والد (Dependent Select) --}}
<x-select-input
    name="city_id"
    label="شهر"
    parentField="province_id"
    parentRoute="/api/provinces/cities"
/>
```

### ۱.۵ چک‌باکس تکی (`<x-checkbox>`)
```blade
<x-checkbox
    name="is_featured"
    label="نمایش در صفحه اصلی"
    :checked="true"
    variant="primary"
/>
```

### ۱.۶ گروه چک‌باکس با دکمه انتخاب همه (`<x-checkbox-group>`)
```blade
<x-checkbox-group
    name="permissions[]"
    label="دسترسی‌های کاربر"
    :options="$permissions"
    :value="$userPermissions"
    :columns="3"
    :selectAll="true"
/>
```

### ۱.۷ گروه دکمه رادیویی (`<x-radio-group>`)
```blade
<x-radio-group
    name="gender"
    label="جنسیت"
    :options="[
        ['id' => 'male', 'title' => 'مرد'],
        ['id' => 'female', 'title' => 'زن']
    ]"
    :inline="true"
/>
```

### ۱.۸ انتخابگر تاریخ و زمان شمسی (`<x-datetime-picker>`)
```blade
{{-- تاریخ ساده --}}
<x-datetime-picker
    name="published_at"
    label="تاریخ انتشار"
    calendar="jalali"
    format="YYYY/MM/DD"
/>

{{-- تاریخ همراه با زمان --}}
<x-datetime-picker
    name="start_time"
    label="زمان شروع همایش"
    calendar="jalali"
    withTime
    :timeStep="15"
    :disablePast="true"
/>
```

### ۱.۹ انتخابگر بازه تاریخ (`<x-datetime-range-picker>`)
```blade
<x-datetime-range-picker
    name="report_period"
    label="بازه گزارش مالی"
    startName="from_date"
    endName="to_date"
    calendar="jalali"
    :presets="true"
/>
```

### ۱.۱۰ ویرایشگر متن ادیتور (`<x-editor>`)
```blade
<x-editor
    name="body"
    label="متن مقاله"
    :height="350"
    toolbar="full"
    direction="rtl"
    uploadRoute="/admin/uploads/editor"
/>
```

### ۱.۱۱ آپلودر فایل و تصاویر (`<x-file-picker>`)
```blade
<x-file-picker
    name="attachment"
    label="فایل پیوست"
    accept=".pdf,.docx,.zip"
    :maxSize="5120"
    :dropzone="true"
    :preview="true"
/>

{{-- چند فایلی --}}
<x-file-picker
    name="gallery[]"
    label="تصاویر گالری"
    accept="image/*"
    :multiple="true"
    :maxSize="2048"
/>
```

### ۱.۱۲ انتخابگر آیکون فونت‌آوسام (`<x-icon-picker>`)
```blade
<x-icon-picker
    name="menu_icon"
    label="آیکون منو"
    :value="old('menu_icon', 'fa-home')"
/>
```

### ۱.۱۳ ردیف‌های داینامیک آیتم کالکتور (`<x-item-collector>`)
```blade
<x-item-collector
    name="specs"
    label="مشخصات فنی محصول"
    :items="old('specs', $product->specs ?? [])"
    :fields="[
        ['name' => 'key', 'label' => 'ویژگی', 'type' => 'text'],
        ['name' => 'val', 'label' => 'مقدار', 'type' => 'text']
    ]"
    :sortable="true"
    addLabel="افزودن مشخصه"
/>
```

### ۱.۱۴ جمع‌آوری برچسب متادیتا Key/Value (`<x-tag-collector>`)
```blade
<x-tag-collector
    name="custom_fields"
    label="فیلدهای سفارشی"
    :tags="$item->custom_fields ?? []"
    keyLabel="نام فیلد"
    valueLabel="مقدار"
    :suggestions="['رنگ', 'سایز', 'وزن', 'گارانتی']"
/>
```

### ۱.۱۵ ورودی برچسب ساده (`<x-tag-input>`)
```blade
<x-tag-input
    name="tags"
    label="کلمات کلیدی"
    :value="['لاراول', 'برنامه‌نویسی', 'پی‌اچ‌پی']"
    :maxTags="10"
/>
```

### ۱.۱۶ دسته‌بندی درختی آبشاری (`<x-nested-selects>`)
```blade
<x-nested-selects
    name="category_id"
    label="دسته‌بندی والد و فرزند"
    :source="\App\Models\Category::class"
    labelColumn="name"
    parentColumn="parent_id"
/>
```

---

## ۲. کامپوننت‌های نمایشی و دیزاین (Design Components - 17 عدد)

### ۲.۱ هشدار (`<x-alert>`)
```blade
<x-alert type="success" title="موفقیت‌آمیز" message="اطلاعات با موفقیت ذخیره شد." :dismissible="true" />
```

### ۲.۲ نشان (`<x-badge>`)
```blade
<x-badge variant="success" :pill="true" :dot="true">تأیید شده</x-badge>
<x-badge variant="danger" :outline="true">مسدود</x-badge>
```

### ۲.۳ بنر بالای صفحه (`<x-banner>`)
```blade
<x-banner
    type="warning"
    title="نسخه جدید در دسترس است"
    description="سیستم نیازمند بروزرسانی پایگاه داده است."
    icon="fa-bell"
    :actions="[
        ['label' => 'بروزرسانی', 'url' => '/upgrade', 'variant' => 'primary'],
        ['label' => 'بعداً', 'dismiss' => true]
    ]"
/>
```

### ۲.۴ دکمه (`<x-button>`)
```blade
<x-button variant="primary" type="submit" icon="fa-save">ذخیره</x-button>
<x-button variant="danger" icon="fa-trash" confirm="آیا واقعاً حذف شود؟">حذف</x-button>
<x-button variant="info" :loading="true">در حال دریافت...</x-button>
<x-button variant="light" href="/dashboard">بازگشت</x-button>
```

### ۲.۵ دکمه منودار (`<x-dropdown-button>`)
```blade
<x-dropdown-button
    label="عملیات سریع"
    variant="primary"
    :items="[
        ['label' => 'مشاهده جزئیات', 'icon' => 'fa-eye', 'url' => '/view'],
        ['label' => 'خروجی اکسل', 'icon' => 'fa-file-excel', 'url' => '/export'],
        ['divider' => true],
        ['label' => 'حذف آیتم', 'icon' => 'fa-trash', 'url' => '/delete', 'variant' => 'danger']
    ]"
/>
```

### ۲.۶ کارت پیشرفته بدون نیاز به div دستی (`<x-card>`)
کامپوننت کارت تمامی نیازهای UI را بدون نیاز به نوشتن دستی تگ‌های `card-header`، `card-body` و `card-footer` هندل می‌کند:

```blade
<x-card 
    title="اطلاعات سفارش" 
    subtitle="ثبت شده در سامانه" 
    icon="fa-shopping-cart"
    badge="ویژه"
    badgeVariant="danger"
    :hover="true"
    padding="4"
    rounded="4"
    shadow="sm"
    :collapsible="true"
>
    <x-slot:actions>
        <x-button size="sm" variant="light" icon="fa-print">چاپ فاکتور</x-button>
    </x-slot:actions>

    <p>محتوای اصلی بدنه کارت بدون نیاز به ایجاد تگ‌های div دستی...</p>

    <x-slot:footer>
        <div class="d-flex justify-content-between align-items-center w-100">
            <span class="text-muted small">آخرین بروزرسانی: دقایقی پیش</span>
            <button class="btn btn-sm btn-primary">ذخیره تغییرات</button>
        </div>
    </x-slot:footer>
</x-card>
```

### ۲.۷ جدول هوشمند داده‌ها و فیلتر خودکار (`<x-table>` یا `<x-data-table>`)
این کامپوننت قدرتمند، تمامی مراحل رندر جدول، باکس فیلتر، فرم جستجو، آیکون‌ها، فرمت‌بندی تومان/تاریخ/عکس، حالت خالی (Empty State) و صفحه‌بندی را به صورت کاملاً خودکار و در ۳۰ ثانیه ایجاد می‌کند:

```blade
<x-table 
    title="مدیریت محصولات"
    subtitle="لیست کامل اقلام فروشگاه"
    icon="fa-box"
    :columns="[
        ['key' => 'image', 'label' => 'تصویر', 'type' => 'image', 'width' => '70px'],
        ['key' => 'title', 'label' => 'عنوان محصول', 'sub' => 'slug', 'badge' => 'is_featured', 'badgeLabel' => 'ویژه'],
        ['key' => 'category.title', 'label' => 'دسته‌بندی', 'type' => 'badge', 'variant' => 'warning'],
        ['key' => 'price', 'label' => 'قیمت', 'type' => 'toman'],
        ['key' => 'stock', 'label' => 'موجودی', 'type' => 'number'],
        ['key' => 'status', 'label' => 'وضعیت', 'type' => 'status'],
        [
            'key' => 'actions', 
            'label' => 'عملیات', 
            'align' => 'center', 
            'width' => '130px',
            'view' => fn($row) => route('products.show', $row->slug),
            'edit' => fn($row) => route('admin.products.edit', $row->id),
            'delete' => fn($row) => route('admin.products.destroy', $row->id),
        ],
    ]"
    :rows="$products"
    :searchable="true"
    searchPlaceholder="جستجو در محصولات..."
>
    {{-- نوار ابزار بالا --}}
    <x-slot:toolbar>
        <a href="/admin/products/create" class="btn btn-warning text-dark fw-bold rounded-pill">
            <i class="fa fa-plus me-1"></i> افزودن جدید
        </a>
    </x-slot:toolbar>

    {{-- فیلترهای سفارشی کنار باکس جستجو --}}
    <x-slot:filters>
        <select name="category_id" class="form-select" onchange="this.form.submit()">
            <option value="">همه دسته‌بندی‌ها</option>
            @foreach($categories as $cat)
                <option value="{{ $cat->id }}">{{ $cat->title }}</option>
            @endforeach
        </select>
    </x-slot:filters>
</x-table>
```

### ۲.۷ کارت آماری و شاخص کلیدی عملکرد (`<x-data-card>`)
```blade
<x-data-card
    title="درآمد این ماه"
    value="۱۲,۴۵۰,۰۰۰ تومان"
    icon="fa-wallet"
    color="success"
    :trend="15.8"
    trendDirection="up"
    trendLabel="نسبت به ماه گذشته"
    link="/reports/sales"
/>
```

### ۲.۸ نمایش و دانلود فایل (`<x-file>`)
```blade
<x-file
    name="قرارداد_همکاری.pdf"
    url="/downloads/contract.pdf"
    :size="2048"
    type="pdf"
    :downloadable="true"
/>
```

### ۲.۹ آیکون (`<x-icon>`)
```blade
<x-icon name="fa-user-shield" size="lg" color="primary" />
<x-icon name="fa-sync" :spin="true" />
```

### ۲.۱۰ تصویر (`<x-image>`)
```blade
<x-image
    src="/images/avatar.jpg"
    alt="تصویر کاربر"
    :circle="true"
    :width="64"
    :height="64"
    :lightbox="true"
/>
```

### ۲.۱۱ پیوند (`<x-link>`)
```blade
<x-link href="/help" label="مرکز راهنمایی" icon="fa-question-circle" />
<x-link href="https://laravel.com" :external="true">لاراول داکیومنت</x-link>
```

### ۲.۱۲ پنجره مودال (`<x-modal>`)
```blade
<x-modal id="create-modal" title="افزودن کاربر جدید" size="lg">
    <form action="/users" method="POST" id="create-form">
        @csrf
        <x-text-input name="name" label="نام کامل" :required="true" />
        <x-text-input name="email" type="email" label="پست الکترونیک" :required="true" />
    </form>

    <x-slot:footer>
        <x-button variant="light" data-bs-dismiss="modal">انصراف</x-button>
        <x-button variant="primary" type="submit" form="create-form">ثبت نام</x-button>
    </x-slot:footer>
</x-modal>

{{-- دکمه فراخوانی مودال --}}
<x-button variant="primary" data-bs-toggle="modal" data-bs-target="#create-modal">
    باز کردن مودال
</x-button>
```

### ۲.۱۳ خط زمان رویدادها (`<x-timeline>`)
```blade
<x-timeline :items="[
    ['title' => 'ثبت سفارش', 'time' => '1405/01/10 12:30', 'icon' => 'fa-check', 'color' => 'success'],
    ['title' => 'پرداخت اینترنتی', 'time' => '1405/01/10 12:35', 'icon' => 'fa-credit-card', 'color' => 'info'],
    ['title' => 'ارسال به انبار', 'time' => '1405/01/11 09:00', 'icon' => 'fa-box', 'color' => 'primary']
]" />
```

### ۲.۱۴ راهنما تولتیپ (`<x-tooltip>`)
```blade
<x-tooltip text="ویرایش سریع رکورد" placement="top">
    <x-button size="sm" variant="light" icon="fa-edit" />
</x-tooltip>
```

### ۲.۱۵ آکاردئون (`<x-accordion>`)
```blade
<x-accordion type="single">
    <x-accordion.item title="بخش اول: تنظیمات عمومی" icon="fa-cog" :expanded="true">
        محتوای تنظیمات عمومی...
    </x-accordion.item>
    <x-accordion.item title="بخش دوم: اعلانات" icon="fa-bell">
        محتوای اعلانات...
    </x-accordion.item>
</x-accordion>
```
