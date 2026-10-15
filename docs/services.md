# راهنمای سرویس‌ها و تریت‌ها (Services & Traits Guide)

این بخش معماری و نحوه استفاده از سرویس‌های تجاری و تریت‌های مدل‌های Eloquent در پکیج **My Laravel Core** را توضیح می‌دهد.

---

## ۱. سرویس آپلود فایل (`UploaderService`)

این سرویس امکان مدیریت، دسته‌بندی خودکار سال/ماه، و اعتبارسنجی فایل‌های آپلودی را روی دیسک‌های مختلف (Local, Public, S3) فراهم می‌کند.

### تزریق مستقیم یا از طریق `core()->uploader()`:

```php
use MyLaravelCore\Services\UploaderService;

public function store(Request $request, UploaderService $uploader)
{
    if ($request->hasFile('avatar')) {
        $fileData = $uploader->upload(
            file: $request->file('avatar'),
            directory: 'avatars',
            disk: 'public'
        );

        /*
        خروجی $fileData:
        [
            'name' => 'f4a8b...1728.jpg',
            'original_name' => 'my-pic.jpg',
            'path' => 'uploads/avatars/f4a8b...1728.jpg',
            'url' => '/storage/uploads/avatars/f4a8b...1728.jpg',
            'size' => 1048576,
            'mime' => 'image/jpeg',
            'extension' => 'jpg',
            'disk' => 'public'
        ]
        */

        $user->avatar = $fileData['path'];
        $user->save();
    }
}
```

### آپلود همزمان چند فایل:
```php
$uploadedFiles = core()->uploader()->uploadMultiple($request->file('attachments'), 'documents');
```

### حذف فایل:
```php
core()->uploader()->delete($user->avatar, 'public');
```

---

## ۲. سرویس یکپارچه درگاه پرداخت (`PaymentManager`)

یک درگاه پرداخت یکسان که از درگاه‌های ایرانی (مانند زرین‌پال و درگاه تستی Mock) پشتیبانی می‌کند.

### شروع پرداخت و ریدایرکت کاربر:
```php
use MyLaravelCore\Facades\Core;

public function checkout(Order $order)
{
    $payment = Core::payment('zarinpal')
        ->amount($order->total_price)
        ->callbackUrl(route('payment.callback', ['order' => $order->id]))
        ->description("پرداخت فاکتور شماره {$order->id}")
        ->payer($order->user->mobile, $order->user->email);

    $response = $payment->request();

    // ذخیره توکن/شناسه تراکنش
    $order->update(['authority' => $response['authority']]);

    // انتقال کاربر به صفحه پرداخت بانک
    return redirect($response['redirect_url']);
}
```

### تأیید تراکنش پس از بازگشت از بانک (Verify):
```php
public function callback(Request $request, Order $order)
{
    $authority = $request->query('Authority');

    $result = Core::payment('zarinpal')->verify($authority, $order->total_price);

    if ($result['success']) {
        $order->update([
            'status' => 'paid',
            'ref_id' => $result['ref_id'],
            'card_pan' => $result['card_pan'],
        ]);

        return redirect()->route('orders.show', $order)->with('success', 'پرداخت با موفقیت تأیید شد.');
    }

    return redirect()->route('orders.show', $order)->with('error', $result['message']);
}
```

> **نکته:** برای تست روی لوکال‌هاست، درگاه به صورت پیش‌فرض روی `mock` تنظیم شده است که نیازی به درگاه واقعی ندارد!

---

## ۳. سرویس ارسال پیامک (`SmsManager`)

پشتیبانی از درایور لاگ (جهت تست محلی)، درایور کاوه‌نگار، و ارسال الگو/پترن اعتبارسنجی (OTP).

### ارسال پیامک متنی ساده:
```php
Core::sms('kavenegar')->send(
    receptor: '09123456789',
    message: 'سفارش شما با موفقیت ثبت شد.'
);
```

### ارسال کد تأیید بر اساس الگو/پترن (Lookup / Pattern):
```php
Core::sms('kavenegar')->sendPattern(
    receptor: '09123456789',
    template: 'verify-code',
    tokens: [
        'token' => '54321', // کد یکبار مصرف
    ]
);
```

---

## ۴. تریت‌های قدرتمند مدل‌های Eloquent

### ۴.۱ `HasUuid`
به طور خودکار هنگام ایجاد مدل، یک شناسه UUID اختصاص می‌دهد.
```php
use MyLaravelCore\Traits\HasUuid;

class Product extends Model
{
    use HasUuid;
}

// متدهای در دسترس:
$product = Product::findByUuid('493b80b2-...');
$product = Product::findByUuidOrFail('493b80b2-...');
$query = Product::whereUuid('493b80b2-...');
```

### ۴.۲ `HasSlug`
تولید خودکار اسلاگ فارسی منحصر‌به‌فرد از فیلد عنوان:
```php
use MyLaravelCore\Traits\HasSlug;

class Article extends Model
{
    use HasSlug;

    protected string $slugSource = 'title'; // اختیاری (پیش‌فرض: title یا name)
}

// متدها:
$article = Article::findBySlug('راهنمای-لاراول');
```

### ۴.۳ `Auditable`
ثبت خودکار شناسه‌های `created_by`، `updated_by`، و `deleted_by` از کاربر لاگین شده و تعریف روابط:
```php
use MyLaravelCore\Traits\Auditable;

class Invoice extends Model
{
    use Auditable;
}

// روابط خودکار:
$invoice->creator; // کاربری که ایجاد کرده
$invoice->updater; // آخرین کاربری که ویرایش کرده
$invoice->deleter; // کاربری که حذف نرم کرده
```

### ۴.۴ `HasStatus`
مدیریت وضعیت‌های فعال و غیرفعال:
```php
use MyLaravelCore\Traits\HasStatus;

class Category extends Model
{
    use HasStatus;
}

// متدها و اسکوپ‌ها:
if ($category->isActive()) { ... }
$category->activate();
$category->deactivate();
$category->toggleStatus();

$activeCategories = Category::active()->get();
$inactiveCategories = Category::inactive()->get();
```

### ۴.۵ `Filterable`
فیلتر و جستجوی داینامیک از پارامترهای Query String:
```php
use MyLaravelCore\Traits\Filterable;

class Product extends Model
{
    use Filterable;

    protected array $searchable = ['title', 'sku', 'brand.name'];
    protected array $filterable = ['category_id', 'status'];
}

// در کنترلر:
public function index(Request $request)
{
    // به صورت خودکار پارامترهای زیر اعمال می‌شوند:
    // ?search=گوشی
    // ?status=1
    // ?from_date=1405/01/01
    // ?to_date=1405/01/30
    // ?sort_by=price&sort_order=asc
    $products = Product::filter()->paginate(20);
    return view('products.index', compact('products'));
}
```

---

## ۵. ارسال پاسخ‌های استاندارد JSON در کنترلر (`ApiResponseTrait`)

```php
use MyLaravelCore\Traits\ApiResponseTrait;

class ApiUserController extends Controller
{
    use ApiResponseTrait;

    public function index()
    {
        $users = User::paginate(10);
        return $this->paginated($users, 'لیست کاربران دریافت شد.');
    }

    public function show(User $user)
    {
        return $this->success($user);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return $this->success(null, 'کاربر با موفقیت حذف شد.');
    }
}
```
