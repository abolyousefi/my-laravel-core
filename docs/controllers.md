# مستندات کنترلرهای My Laravel Core

## معماری کنترلرها
زیرساخت My Laravel Core شامل سه کنترلر پایه برای پاسخگویی به تمام نیازهای وب و API است:
1. `BaseController`: کنترلر اصلی مجهز به نان‌ریزه (Breadcrumb)، پیام‌های وضعیت (Flash Messages)، اشتراک متغیرها در ویو و دسترسی به سرویس‌های اصلی.
2. `CrudController`: کنترلر انتزاعی با پیاده‌سازی خودکار تمامی عملیات‌های `index`, `create`, `store`, `show`, `edit`, `update`, `destroy`, `bulkDestroy` و `toggleStatus`.
3. `ApiController`: کنترلر مخصوص وب‌سرویس‌های RESTful با ساختار استاندارد پاسخ‌های JSON و صفحه‌بندی.

---

## ۱. نحوه استفاده از BaseController

```php
namespace App\Http\Controllers;

use MyLaravelCore\Controllers\BaseController;

class DashboardController extends BaseController
{
    public function index()
    {
        $this->setTitle('داشبورد مدیریت');
        $this->addBreadcrumb('داشبورد', route('admin.dashboard'), 'fa-home');
        
        $this->flashSuccess('خوش آمدید!');

        return view('admin.dashboard');
    }
}
```

### متدهای کلیدی BaseController:
- `addBreadcrumb(string $title, ?string $url = null, ?string $icon = null)`
- `setTitle(string $title)`
- `share(string|array $key, mixed $value = null)`
- `flashSuccess(string $message)`
- `flashError(string $message)`
- `flashWarning(string $message)`
- `flashInfo(string $message)`
- `uploader()`: دسترسی به سرویس آپلود فایل
- `payment()`: دسترسی به سرویس درگاه پرداخت
- `sms()`: دسترسی به سرویس ارسال پیامک

---

## ۲. نحوه استفاده از CrudController

کنترلر CrudController اتصال مستقیمی با مدل Eloquent و کلاس Table دارد:

```php
namespace App\Http\Controllers\Admin;

use MyLaravelCore\Controllers\CrudController;
use App\Models\Product;
use App\Tables\ProductTable;
use Illuminate\Http\Request;

class ProductController extends CrudController
{
    protected string $modelClass = Product::class;
    protected ?string $tableClass = ProductTable::class;
    protected string $viewPath = 'admin.products';
    protected string $routePrefix = 'admin.products';
    protected string $resourceTitle = 'محصول';
    
    protected array $uploadFields = [
        'image' => ['directory' => 'products']
    ];

    protected function rules(Request $request, string $action = 'store', ?Model $model = null): array
    {
        return [
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
        ];
    }
}
```

### روت‌های پیشنهادی:
```php
Route::resource('products', ProductController::class);
Route::post('products/bulk-delete', [ProductController::class, 'bulkDestroy'])->name('products.bulk-delete');
Route::post('products/{id}/toggle-status', [ProductController::class, 'toggleStatus'])->name('products.toggle-status');
```

---

## ۳. نحوه استفاده از ApiController

```php
namespace App\Http\Controllers\Api;

use MyLaravelCore\Controllers\ApiController;
use App\Models\Product;

class ProductApiController extends ApiController
{
    public function index()
    {
        $products = Product::latest()->paginate(15);
        return $this->respondWithPagination($products, 'محصولات دریافت شد.');
    }
}
```
