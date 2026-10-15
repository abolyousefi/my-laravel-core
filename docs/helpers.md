# راهنمای توابع کمکی گلوبال (Helpers Guide)

این پکیج شامل مجموعه‌ای جامع از توابع کمکی گلوبال است که به صورت مستقیم در تمامی کنترلرها، مدل‌ها، و فایل‌های Blade بدون نیاز به import در دسترس هستند.

---

## ۱. کار با اعداد و ارقام فارسی

### `persian_digits($value)`
تبدیل ارقام انگلیسی و عربی به فارسی.
```php
echo persian_digits('12345'); // ۱۲۳۴۵
echo persian_digits('١٢٣');   // ۱۲۳
```

### `english_digits($value)`
تبدیل ارقام فارسی و عربی به انگلیسی (مناسب ذخیره‌سازی در دیتابیس).
```php
echo english_digits('۱۲۳۴۵'); // 12345
```

### `arabic_to_persian($string)`
استانداردسازی حروف عربی «ي» و «ك» به حروف فارسی «ی» و «ک».
```php
echo arabic_to_persian('كتاب علي'); // کتاب علی
```

---

## ۲. اعتبارسنجی‌ها (Validations)

### `is_valid_national_code($code)`
اعتبارسنجی الگوریتم کد ملی ۱۰ رقمی با محاسبه رقم کنترل (Checksum).
```php
if (!is_valid_national_code($request->national_code)) {
    return back()->withErrors(['national_code' => 'کد ملی وارد شده نامعتبر است.']);
}
```

### `is_valid_mobile($mobile)`
بررسی صحت ساختار شماره موبایل اپراتورهای ایران (`09...` یا `+989...` یا `989...`).
```php
is_valid_mobile('09123456789'); // true
is_valid_mobile('+989123456789'); // true
is_valid_mobile('08123456789'); // false
```

### `clean_mobile($mobile)`
یکپارچه‌سازی و تبدیل شماره موبایل به فرمت استاندارد `09XXXXXXXXX`.
```php
echo clean_mobile('+989123456789'); // 09123456789
echo clean_mobile('989123456789');  // 09123456789
```

### `is_valid_card_number($cardNumber)`
اعتبارسنجی شماره ۱۶ رقمی کارت‌های بانکی عضو شبکه شتاب با الگوریتم Luhn.
```php
if (!is_valid_card_number($cardNumber)) {
    // شماره کارت معتبر نیست
}
```

### `mask_card_number($cardNumber, $separator = '-')`
ماسک کردن ۴ رقم میانی شماره کارت جهت نمایش امن به کاربر.
```php
echo mask_card_number('6037991122334455'); // 6037-99**-****-4455
```

---

## ۳. ارز، قیمت و مبالغ

### `format_money($amount, $currency = 'تومان', $persianDigits = true)`
فرمت‌بندی سه رقم سه رقم با امکان نمایش ارقام فارسی.
```php
echo format_money(1250000); // ۱,۲۵۰,۰۰۰ تومان
echo format_money(1250000, 'ریال', false); // 1,250,000 ریال
```

### `toman($amount, $persianDigits = true)`
میانبر فرمت مبلغ به تومان.
```php
echo toman(50000); // ۵۰,۰۰۰ تومان
```

### `rial($amount, $persianDigits = true)`
میانبر فرمت مبلغ به ریال.
```php
echo rial(500000); // ۵۰۰,۰۰۰ ریال
```

### `rial_to_toman($rial)` و `toman_to_rial($toman)`
تبدیل ریال به تومان و برعکس.
```php
$toman = rial_to_toman(1000000); // 100000
$rial = toman_to_rial(50000);     // 500000
```

### `number_to_words_fa($number)`
تبدیل عدد به حروف فارسی (مناسب برای فاکتور و چک).
```php
echo number_to_words_fa(1250000); // یک میلیون و دویست و پنجاه هزار
echo number_to_words_fa(45);      // چهل و پنج
```

---

## ۴. تاریخ و تقویم شمسی (Jalali Date)

### `jdate($format = 'Y/m/d H:i', $timestamp = null, $persianDigits = true)`
قالب‌بندی زمان میلادی یا Timestamp به تاریخ شمسی.
```php
echo jdate(); // تاریخ و زمان فعلی (مثال: ۱۴۰۵/۰۱/۱۵ ۱۲:۳۰)
echo jdate('l j F Y', now()); // دوشنبه ۱۵ فروردین ۱۴۰۵
echo jdate('Y/m/d', '2026-03-21', false); // 1405/01/01
```

### `gregorian_to_jalali($gy, $gm, $gd)`
تبدیل سال، ماه، روز میلادی به آرایه شمسی `[$jy, $jm, $jd]`.
```php
[$jy, $jm, $jd] = gregorian_to_jalali(2026, 3, 21);
// [1405, 1, 1]
```

### `jalali_to_gregorian($jy, $jm, $jd)`
تبدیل تاریخ شمسی به میلادی `[$gy, $gm, $gd]`.
```php
[$gy, $gm, $gd] = jalali_to_gregorian(1405, 1, 1);
// [2026, 3, 21]
```

### `to_gregorian($jalaliDate, $format = 'Y-m-d')`
تبدیل رشته تاریخ شمسی به فرمت تاریخ استاندارد میلادی (جهت ذخیره در دیتابیس).
```php
$birthDate = to_gregorian('1405/01/01'); // 2026-03-21
```

---

## ۵. رشته‌ها و متون فارسی

### `slugify_fa($string, $separator = '-')`
تولید اسلاگ (Slug) بهینه برای سئو با پشتیبانی از کلمات فارسی، انگلیسی و اعداد.
```php
echo slugify_fa('راهنمای خرید لپ‌تاپ در سال ۱۴۰۵!');
// راهنمای-خرید-لپتاپ-در-سال-۱۴۰۵
```

### `str_limit_words($text, $limit = 20, $end = '...')`
خلاصه کردن متن بر اساس تعداد کلمات.
```php
echo str_limit_words($longText, 15);
```

---

## ۶. دسترسی به منیجر و فاساد مرکزی

### `core()`
دسترسی مستقیم به تمامی سرویس‌های زیرساخت:
```php
// آپلود فایل
core()->uploader()->upload($request->file('avatar'));

// پرداخت آنلاین
core()->payment('zarinpal')->amount(50000)->callbackUrl('/verify')->request();

// ارسال پیامک
core()->sms('kavenegar')->send('09121112233', 'سلام خوش آمدید');

// پاسخ API
return core()->api()->success($data);
```

### `api_response()`
میانبر ارسال پاسخ‌های استاندارد JSON:
```php
return api_response()->success($user, 'کاربر با موفقیت دریافت شد.');
return api_response()->notFound('موردی یافت نشد.');
```
