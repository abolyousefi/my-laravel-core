# مستندات کتابخانه جاوااسکریپت (Core JavaScript SDK)

کتابخانه `Core` به صورت پیش‌فرض در تمام صفحات بارگذاری شده و دسترسی سریع به ابزارهای فرانت‌اند را فراهم می‌کند:

---

## ۱. اعلان‌های تست (Toast Notifications)
```javascript
// موفقیت
Core.notify.success('اطلاعات با موفقیت ذخیره گردید.', 'ثبت رکورد');

// خطا
Core.notify.error('خطا در برقراری ارتباط با سرور!', 'خطای سیستمی');

// هشدار
Core.notify.warning('حجم فایل بیش از حد مجاز است.', 'هشدار');

// اطلاع‌رسانی
Core.notify.info('پیام از طرف سیستم دریافت شد.', 'اطلاعیه');
```

---

## ۲. دیالوگ مدرن تأیید (Confirm Dialog)
جایگزین پنجره تأیید سنتی مرورگر با ظاهر مدرن RTL:
```javascript
Core.dialog.confirm({
    title: 'آیا از حذف مطمئن هستید؟',
    message: 'این رکورد پس از حذف قابل بازیابی نخواهد بود.',
    variant: 'danger',
    confirmText: 'بله، حذف کن',
    cancelText: 'انصراف',
    onConfirm: function() {
        // عملیات حذف یا ارسال درخواست AJAX
    }
});
```

یا مستقیماً با Attribute در HTML:
```html
<button type="submit" class="btn btn-danger" data-core-confirm="آیا از حذف این فاکتور مطمئن هستید؟">
    حذف فاکتور
</button>
```

---

## ۳. ابزارهای تبدیل و فرمت‌بندی فارسی
```javascript
// تبدیل به ارقام فارسی
Core.format.persianDigits('123456'); // '۱۲۳۴۵۶'

// تبدیل مبلغ به تومان
Core.format.toman(1500000); // '۱,۵۰۰,۰۰۰ تومان'

// تبدیل عدد به حروف فارسی فاکتور
Core.format.numberToWords(1540000); // 'یک میلیون و پانصد و چهل هزار'

// فرمت‌بندی شماره کارت بانکی
Core.format.cardNumber('6037991812345678'); // '6037-9918-1234-5678'

// فرمت‌بندی شبا
Core.format.sheba('IR120170000000123456789012'); // 'IR12-0170-0000-0001-2345-6789-012'
```

---

## ۴. کپی در کلیپ‌بورد با یک کلیک
```javascript
Core.clipboard.copy('IR120170000000123456789012', 'شماره شبا کپی شد!');
```
یا در تگ‌های HTML:
```html
<button class="btn btn-sm btn-light border" data-core-copy="6037-9918-1234-5678">
    <i class="fa fa-copy"></i> کپی شماره کارت
</button>
```

---

## ۵. درخواست‌های AJAX با CSRF خودکار
```javascript
// درخواست GET
const data = await Core.ajax.get('/api/products', { status: 'active' });

// درخواست POST
Core.ajax.post('/api/products', { name: 'نام محصول', price: 50000 })
    .then(response => {
        Core.notify.success('محصول ذخیره شد.');
    });
```
