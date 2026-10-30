<?php

use MyLaravelCore\Services\ApiResponse;

if (!function_exists('persian_digits')) {
    /**
     * Convert English and Arabic digits to Persian digits.
     */
    function persian_digits(mixed $value): string
    {
        $value = (string) $value;
        $farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        $englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        $arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

        $value = str_replace($arabicDigits, $farsiDigits, $value);
        return str_replace($englishDigits, $farsiDigits, $value);
    }
}

if (!function_exists('persian_number')) {
    /**
     * Alias for persian_digits.
     */
    function persian_number(mixed $value): string
    {
        return persian_digits($value);
    }
}

if (!function_exists('english_digits')) {
    /**
     * Convert Persian and Arabic digits to English digits.
     */
    function english_digits(mixed $value): string
    {
        $value = (string) $value;
        $farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        $arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        $englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        $value = str_replace($farsiDigits, $englishDigits, $value);
        return str_replace($arabicDigits, $englishDigits, $value);
    }
}

if (!function_exists('arabic_to_persian')) {
    /**
     * Standardize Arabic letters (ي, ك, ة) to Persian characters (ی, ک, ه/ت).
     */
    function arabic_to_persian(string $text): string
    {
        $arabic = ['ي', 'ك', 'دِ', 'بِ', 'زِ', 'ذِ', 'شِ', 'سِ', 'ى', 'ئ', 'ة'];
        $persian = ['ی', 'ک', 'د', 'ب', 'ز', 'ذ', 'ش', 'س', 'ی', 'ی', 'ه'];

        return str_replace($arabic, $persian, $text);
    }
}

if (!function_exists('is_valid_national_code')) {
    /**
     * Validate Iranian National Code (کد ملی).
     */
    function is_valid_national_code(mixed $code): bool
    {
        $code = english_digits(trim((string) $code));

        if (!preg_match('/^[0-9]{10}$/', $code)) {
            return false;
        }

        // Check repetitive digits like 0000000000, 1111111111
        for ($i = 0; $i < 10; $i++) {
            if (str_repeat((string) $i, 10) === $code) {
                return false;
            }
        }

        $sum = 0;
        for ($i = 0; $i < 9; $i++) {
            $sum += ((int) $code[$i]) * (10 - $i);
        }

        $remainder = $sum % 11;
        $lastDigit = (int) $code[9];

        if ($remainder < 2) {
            return $lastDigit === $remainder;
        }

        return $lastDigit === (11 - $remainder);
    }
}

if (!function_exists('is_valid_mobile')) {
    /**
     * Check if a mobile number is a valid Iranian mobile.
     */
    function is_valid_mobile(mixed $mobile): bool
    {
        $mobile = english_digits(trim((string) $mobile));
        return (bool) preg_match('/^(?:(?:\+?98)|(?:0))?9\d{9}$/', $mobile);
    }
}

if (!function_exists('clean_mobile')) {
    /**
     * Normalize Iranian mobile number to 09XXXXXXXXX format.
     */
    function clean_mobile(mixed $mobile): string
    {
        $mobile = english_digits(trim((string) $mobile));
        $mobile = preg_replace('/\D+/', '', $mobile);

        if (str_starts_with($mobile, '989')) {
            return '0' . substr($mobile, 2);
        }
        if (str_starts_with($mobile, '9') && strlen($mobile) === 10) {
            return '0' . $mobile;
        }

        return $mobile;
    }
}

if (!function_exists('is_valid_card_number')) {
    /**
     * Validate Iranian Bank Card number using Luhn algorithm.
     */
    function is_valid_card_number(mixed $cardNumber): bool
    {
        $cardNumber = english_digits(preg_replace('/\D+/', '', (string) $cardNumber));

        if (strlen($cardNumber) !== 16) {
            return false;
        }

        $sum = 0;
        for ($i = 0; $i < 16; $i++) {
            $digit = (int) $cardNumber[$i];
            if ($i % 2 === 0) {
                $digit *= 2;
                if ($digit > 9) {
                    $digit -= 9;
                }
            }
            $sum += $digit;
        }

        return ($sum % 10 === 0);
    }
}

if (!function_exists('mask_card_number')) {
    /**
     * Mask credit card number (e.g. 6037-99**-****-1234).
     */
    function mask_card_number(mixed $cardNumber, string $separator = '-'): string
    {
        $cardNumber = english_digits(preg_replace('/\D+/', '', (string) $cardNumber));
        if (strlen($cardNumber) !== 16) {
            return (string) $cardNumber;
        }

        $part1 = substr($cardNumber, 0, 4);
        $part2 = substr($cardNumber, 4, 2) . '**';
        $part3 = '****';
        $part4 = substr($cardNumber, 12, 4);

        return implode($separator, [$part1, $part2, $part3, $part4]);
    }
}

if (!function_exists('format_money')) {
    /**
     * Format number as currency with thousand separator.
     */
    function format_money(mixed $amount, string $currency = 'تومان', bool $persianDigits = true): string
    {
        $number = (float) english_digits((string) $amount);
        $formatted = number_format($number, 0, '.', ',');

        if ($persianDigits) {
            $formatted = persian_digits($formatted);
        }

        return trim($formatted . ($currency ? ' ' . $currency : ''));
    }
}

if (!function_exists('toman')) {
    /**
     * Format number as Toman.
     */
    function toman(mixed $amount, bool $persianDigits = true): string
    {
        return format_money($amount, 'تومان', $persianDigits);
    }
}

if (!function_exists('rial')) {
    /**
     * Format number as Rial.
     */
    function rial(mixed $amount, bool $persianDigits = true): string
    {
        return format_money($amount, 'ریال', $persianDigits);
    }
}

if (!function_exists('rial_to_toman')) {
    /**
     * Convert Rial to Toman.
     */
    function rial_to_toman(int|float $rial): int|float
    {
        return $rial / 10;
    }
}

if (!function_exists('toman_to_rial')) {
    /**
     * Convert Toman to Rial.
     */
    function toman_to_rial(int|float $toman): int|float
    {
        return $toman * 10;
    }
}

if (!function_exists('number_to_words_fa')) {
    /**
     * Convert number to Persian words.
     */
    function number_to_words_fa(int|float $number): string
    {
        $number = (int) english_digits((string) $number);
        if ($number === 0) {
            return 'صفر';
        }

        $words = [
            0 => '',
            1 => 'یک',
            2 => 'دو',
            3 => 'سه',
            4 => 'چهار',
            5 => 'پنج',
            6 => 'شش',
            7 => 'هفت',
            8 => 'هشت',
            9 => 'نه',
            10 => 'ده',
            11 => 'یازده',
            12 => 'دوازده',
            13 => 'سیزده',
            14 => 'چهارده',
            15 => 'پانزده',
            16 => 'شانزده',
            17 => 'هفده',
            18 => 'هجده',
            19 => 'نوزده',
            20 => 'بیست',
            30 => 'سی',
            40 => 'چهل',
            50 => 'پنجاه',
            60 => 'شصت',
            70 => 'هفتاد',
            80 => 'هشتاد',
            90 => 'نود',
            100 => 'صد',
            200 => 'دویست',
            300 => 'سیصد',
            400 => 'چهارصد',
            500 => 'پانصد',
            600 => 'ششصد',
            700 => 'هفتصد',
            800 => 'هشتصد',
            900 => 'نهصد',
        ];

        $units = ['', 'هزار', 'میلیون', 'میلیارد', 'تریلیون'];

        $isNegative = $number < 0;
        $number = abs($number);

        $groups = [];
        while ($number > 0) {
            $groups[] = $number % 1000;
            $number = intdiv($number, 1000);
        }

        $result = [];
        foreach ($groups as $i => $group) {
            if ($group === 0) {
                continue;
            }

            $part = [];
            $hundreds = intdiv($group, 100) * 100;
            $remainder = $group % 100;

            if ($hundreds > 0) {
                $part[] = $words[$hundreds];
            }

            if ($remainder > 0) {
                if (isset($words[$remainder])) {
                    $part[] = $words[$remainder];
                } else {
                    $tens = intdiv($remainder, 10) * 10;
                    $ones = $remainder % 10;
                    if ($tens > 0) {
                        $part[] = $words[$tens];
                    }
                    if ($ones > 0) {
                        $part[] = $words[$ones];
                    }
                }
            }

            $unitText = $units[$i] ?? '';
            $groupText = implode(' و ', $part);
            if (!empty($unitText)) {
                $groupText .= ' ' . $unitText;
            }

            $result[] = $groupText;
        }

        $final = implode(' و ', array_reverse($result));
        return ($isNegative ? 'منفی ' : '') . $final;
    }
}

if (!function_exists('gregorian_to_jalali')) {
    /**
     * Convert Gregorian date to Jalali date array [year, month, day].
     *
     * @return array{0: int, 1: int, 2: int}
     */
    function gregorian_to_jalali(int $gy, int $gm, int $gd): array
    {
        $g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        if ($gy > 1600) {
            $jy = 979;
            $gy -= 1600;
        } else {
            $jy = 0;
            $gy -= 621;
        }

        $gy2 = ($gm > 2) ? ($gy + 1) : $gy;
        $days = (365 * $gy) + intdiv($gy2 + 3, 4) - intdiv($gy2 + 99, 100) + intdiv($gy2 + 399, 400) - 80 + $gd + $g_d_m[$gm - 1];
        $jy += 33 * intdiv($days, 12053);
        $days %= 12053;
        $jy += 4 * intdiv($days, 1461);
        $days %= 1461;

        if ($days > 365) {
            $jy += intdiv($days - 1, 365);
            $days = ($days - 1) % 365;
        }

        $jm = ($days < 186) ? 1 + intdiv($days, 31) : 7 + intdiv($days - 186, 30);
        $jd = 1 + (($days < 186) ? ($days % 31) : (($days - 186) % 30));

        return [$jy, $jm, $jd];
    }
}

if (!function_exists('jalali_to_gregorian')) {
    /**
     * Convert Jalali date to Gregorian date array [year, month, day].
     *
     * @return array{0: int, 1: int, 2: int}
     */
    function jalali_to_gregorian(int $jy, int $jm, int $jd): array
    {
        if ($jy > 979) {
            $gy = 1600;
            $jy -= 979;
        } else {
            $gy = 621;
        }

        $days = (365 * $jy) + (intdiv($jy, 33) * 8) + intdiv(($jy % 33) + 3, 4) + 78 + $jd + (($jm < 7) ? ($jm - 1) * 31 : (($jm - 7) * 30) + 186);
        $gy += 400 * intdiv($days, 146097);
        $days %= 146097;

        if ($days > 36524) {
            $gy += 100 * intdiv(--$days, 36524);
            $days %= 36524;
            if ($days >= 365) {
                $days++;
            }
        }

        $gy += 4 * intdiv($days, 1461);
        $days %= 1461;

        if ($days > 365) {
            $gy += intdiv($days - 1, 365);
            $days = ($days - 1) % 365;
        }

        $sal_a = [0, 31, (($gy % 4 === 0 && $gy % 100 !== 0) || ($gy % 400 === 0)) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        $gm = 0;
        while ($gm < 13 && $days >= $sal_a[$gm]) {
            $days -= $sal_a[$gm];
            $gm++;
        }
        $gd = $days + 1;

        return [$gy, $gm, $gd];
    }
}

if (!function_exists('jdate')) {
    /**
     * Format timestamp as Jalali date string.
     */
    function jdate(string $format = 'Y/m/d H:i', mixed $timestamp = null, bool $persianDigits = true): string
    {
        if ($timestamp === null) {
            $timestamp = time();
        } elseif (is_string($timestamp)) {
            $timestamp = strtotime($timestamp) ?: time();
        } elseif ($timestamp instanceof \DateTimeInterface) {
            $timestamp = $timestamp->getTimestamp();
        }

        $gy = (int) date('Y', $timestamp);
        $gm = (int) date('m', $timestamp);
        $gd = (int) date('d', $timestamp);

        [$jy, $jm, $jd] = gregorian_to_jalali($gy, $gm, $gd);

        $jMonths = [
            1 => 'فروردین', 2 => 'اردیبهشت', 3 => 'خرداد',
            4 => 'تیر', 5 => 'مرداد', 6 => 'شهریور',
            7 => 'مهر', 8 => 'آبان', 9 => 'آذر',
            10 => 'دی', 11 => 'بهمن', 12 => 'اسفند'
        ];

        $jDays = [
            'Saturday' => 'شنبه',
            'Sunday' => 'یکشنبه',
            'Monday' => 'دوشنبه',
            'Tuesday' => 'سه‌شنبه',
            'Wednesday' => 'چهارشنبه',
            'Thursday' => 'پنج‌شنبه',
            'Friday' => 'جمعه',
        ];

        $replace = [
            'Y' => sprintf('%04d', $jy),
            'y' => substr(sprintf('%04d', $jy), 2, 2),
            'm' => sprintf('%02d', $jm),
            'n' => $jm,
            'F' => $jMonths[$jm],
            'd' => sprintf('%02d', $jd),
            'j' => $jd,
            'l' => $jDays[date('l', $timestamp)] ?? '',
            'H' => date('H', $timestamp),
            'h' => date('h', $timestamp),
            'i' => date('i', $timestamp),
            's' => date('s', $timestamp),
            'a' => (date('a', $timestamp) === 'am') ? 'ق.ظ' : 'ب.ظ',
            'A' => (date('A', $timestamp) === 'AM') ? 'قبل از ظهر' : 'بعد از ظهر',
        ];

        $output = strtr($format, $replace);

        return $persianDigits ? persian_digits($output) : $output;
    }
}

if (!function_exists('to_gregorian')) {
    /**
     * Convert Jalali date string (YYYY/MM/DD) to Gregorian date string (YYYY-MM-DD).
     */
    function to_gregorian(string $jalaliDate, string $format = 'Y-m-d'): string
    {
        $clean = english_digits(str_replace(['-', '/'], '/', trim($jalaliDate)));
        $parts = explode('/', $clean);

        if (count($parts) < 3) {
            return $jalaliDate;
        }

        $jy = (int) $parts[0];
        $jm = (int) $parts[1];
        $jd = (int) $parts[2];

        [$gy, $gm, $gd] = jalali_to_gregorian($jy, $jm, $jd);

        return sprintf(
            '%04d-%02d-%02d',
            $gy,
            $gm,
            $gd
        );
    }
}

if (!function_exists('slugify_fa')) {
    /**
     * Generate SEO-friendly slug supporting Persian, English, and numbers.
     */
    function slugify_fa(string $string, string $separator = '-'): string
    {
        $string = arabic_to_persian($string);
        // Remove special chars except Persian, English, and numbers
        $string = preg_replace('/[^\p{Arabic}\p{Latin}\p{N}\s\-]/u', '', $string);
        // Replace spaces and repeated dashes with single separator
        $string = preg_replace('/[\s\-]+/u', $separator, trim($string));

        return mb_strtolower($string, 'UTF-8');
    }
}

if (!function_exists('str_limit_words')) {
    /**
     * Limit string to a number of words.
     */
    function str_limit_words(string $text, int $limit = 20, string $end = '...'): string
    {
        $words = preg_split('/\s+/u', trim($text));
        if (count($words) <= $limit) {
            return $text;
        }

        return implode(' ', array_slice($words, 0, $limit)) . $end;
    }
}

if (!function_exists('api_response')) {
    /**
     * Get ApiResponse helper instance.
     */
    function api_response(): ApiResponse
    {
        return app(ApiResponse::class);
    }
}

if (!function_exists('core')) {
    /**
     * Get CoreManager instance.
     */
    function core(): \MyLaravelCore\CoreManager
    {
        return app(\MyLaravelCore\CoreManager::class);
    }
}

if (!function_exists('core_asset')) {
    /**
     * Generate an asset path for package assets.
     */
    function core_asset(string $path): string
    {
        return asset('vendor/core/' . ltrim($path, '/'));
    }
}

/* =========================================================================
 * FINANCIAL & BANKING HELPERS (توابع مالی و بانکی)
 * ========================================================================= */

if (!function_exists('number_to_words_fa')) {
    /**
     * Convert number to Persian words (تبدیل عدد به حروف فارسی).
     * e.g. 1250000 => یک میلیون و دویست و پنجاه هزار
     */
    function number_to_words_fa(int|float $number): string
    {
        if ($number == 0) {
            return 'صفر';
        }

        if ($number < 0) {
            return 'منفی ' . number_to_words_fa(abs($number));
        }

        $ones = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
        $teens = ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'];
        $tens = ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
        $hundreds = ['', 'صد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];
        $scales = ['', 'هزار', 'میلیون', 'میلیارد', 'تریلیون'];

        $numberStr = (string) floor($number);
        $groups = [];
        $len = strlen($numberStr);

        for ($i = $len; $i > 0; $i -= 3) {
            $start = max(0, $i - 3);
            $length = $i - $start;
            $groups[] = (int) substr($numberStr, $start, $length);
        }

        $result = [];
        foreach ($groups as $idx => $group) {
            if ($group === 0) {
                continue;
            }

            $h = (int) floor($group / 100);
            $t = (int) floor(($group % 100) / 10);
            $o = $group % 10;

            $groupWords = [];
            if ($h > 0) {
                $groupWords[] = $hundreds[$h];
            }

            if ($t === 1) {
                $groupWords[] = $teens[$o];
            } else {
                if ($t > 1) {
                    $groupWords[] = $tens[$t];
                }
                if ($o > 0) {
                    $groupWords[] = $ones[$o];
                }
            }

            $scaleWord = $scales[$idx] ?? '';
            $scaleSuffix = $scaleWord ? ' ' . $scaleWord : '';
            $result[] = implode(' و ', $groupWords) . $scaleSuffix;
        }

        $result = array_reverse($result);
        return implode(' و ', $result);
    }
}

if (!function_exists('toman_words')) {
    /**
     * Convert amount in Toman to Persian words with unit.
     */
    function toman_words(int|float $amount): string
    {
        return number_to_words_fa($amount) . ' تومان';
    }
}

if (!function_exists('rial_words')) {
    /**
     * Convert amount in Rial to Persian words with unit.
     */
    function rial_words(int|float $amount): string
    {
        return number_to_words_fa($amount) . ' ریال';
    }
}

if (!function_exists('is_valid_card_number')) {
    /**
     * Validate Iranian debit/credit card number using Luhn algorithm.
     */
    function is_valid_card_number(string $cardNumber): bool
    {
        $card = english_digits(preg_replace('/[^0-9]/', '', $cardNumber));

        if (strlen($card) !== 16) {
            return false;
        }

        $sum = 0;
        for ($i = 0; $i < 16; $i++) {
            $digit = (int) $card[$i];
            if ($i % 2 === 0) {
                $res = $digit * 2;
                $sum += ($res > 9) ? ($res - 9) : $res;
            } else {
                $sum += $digit;
            }
        }

        return ($sum % 10 === 0);
    }
}

if (!function_exists('card_number_format')) {
    /**
     * Format card number into 4-4-4-4 blocks.
     */
    function card_number_format(string $cardNumber, string $separator = '-'): string
    {
        $card = english_digits(preg_replace('/[^0-9]/', '', $cardNumber));
        if (strlen($card) !== 16) {
            return $cardNumber;
        }

        return substr($card, 0, 4) . $separator .
               substr($card, 4, 4) . $separator .
               substr($card, 8, 4) . $separator .
               substr($card, 12, 4);
    }
}

if (!function_exists('mask_card_number')) {
    /**
     * Mask bank card number (e.g. 6037-****-****-5678).
     */
    function mask_card_number(string $cardNumber, string $mask = '****-****'): string
    {
        $card = english_digits(preg_replace('/[^0-9]/', '', $cardNumber));
        if (strlen($card) !== 16) {
            return $cardNumber;
        }

        return substr($card, 0, 4) . '-' . $mask . '-' . substr($card, 12, 4);
    }
}

if (!function_exists('card_bank_info')) {
    /**
     * Detect Iranian Bank from card BIN (first 6 digits).
     *
     * @return array{name: string, bin: string, color: string, code: string}|null
     */
    function card_bank_info(string $cardNumber): ?array
    {
        $card = english_digits(preg_replace('/[^0-9]/', '', $cardNumber));
        $bin = substr($card, 0, 6);

        $banks = [
            '603799' => ['name' => 'بانک ملی ایران', 'code' => 'bmi', 'color' => '#0b4079'],
            '589210' => ['name' => 'بانک سپه', 'code' => 'sepah', 'color' => '#3b3b3b'],
            '627648' => ['name' => 'بانک توسعه صادرات', 'code' => 'edbi', 'color' => '#1d5a38'],
            '627961' => ['name' => 'بانک صنعت و معدن', 'code' => 'bim', 'color' => '#725114'],
            '603770' => ['name' => 'بانک کشاورزی', 'code' => 'bki', 'color' => '#1e7e34'],
            '628023' => ['name' => 'بانک مسکن', 'code' => 'maskan', 'color' => '#e85f00'],
            '627760' => ['name' => 'پست بانک ایران', 'code' => 'post', 'color' => '#00703c'],
            '502908' => ['name' => 'بانک توسعه تعاون', 'code' => 'tt', 'color' => '#003366'],
            '627412' => ['name' => 'بانک اقتصاد نوین', 'code' => 'en', 'color' => '#5c2d91'],
            '622106' => ['name' => 'بانک پارسیان', 'code' => 'parsian', 'color' => '#931215'],
            '502229' => ['name' => 'بانک پاسارگاد', 'code' => 'bpi', 'color' => '#fdb913'],
            '627488' => ['name' => 'بانک کارآفرین', 'code' => 'karafarin', 'color' => '#006d55'],
            '621986' => ['name' => 'بانک سامان', 'code' => 'sb', 'color' => '#0066b2'],
            '639346' => ['name' => 'بانک سینا', 'code' => 'sina', 'color' => '#005f73'],
            '639607 =>' => ['name' => 'بانک سرمایه', 'code' => 'sarmayeh', 'color' => '#4484ce'],
            '636214' => ['name' => 'بانک آینده', 'code' => 'ayandeh', 'color' => '#6d141b'],
            '502806' => ['name' => 'بانک شهر', 'code' => 'shahr', 'color' => '#d71920'],
            '502938' => ['name' => 'بانک دی', 'code' => 'day', 'color' => '#e4002b'],
            '603769' => ['name' => 'بانک صادرات ایران', 'code' => 'bsi', 'color' => '#102d69'],
            '610433' => ['name' => 'بانک ملت', 'code' => 'mellat', 'color' => '#e30613'],
            '627353' => ['name' => 'بانک تجارت', 'code' => 'tejarat', 'color' => '#083c6c'],
            '589463' => ['name' => 'بانک رفاه کارگران', 'code' => 'refah', 'color' => '#1d3557'],
            '627381' => ['name' => 'بانک انصار', 'code' => 'ansar', 'color' => '#004b49'],
            '505785' => ['name' => 'بانک ایران زمین', 'code' => 'iz', 'color' => '#8338ec'],
            '505416' => ['name' => 'بانک گردشگری', 'code' => 'tourism', 'color' => '#3a0ca3'],
            '504172' => ['name' => 'بانک قرض‌الحسنه رسالت', 'code' => 'resalat', 'color' => '#028090'],
            '606373' => ['name' => 'بانک قرض‌الحسنه مهر ایران', 'code' => 'qmb', 'color' => '#05668d'],
            '823431' => ['name' => 'بلو بانک (سامان)', 'code' => 'blubank', 'color' => '#0077ff'],
        ];

        if (isset($banks[$bin])) {
            return array_merge(['bin' => $bin], $banks[$bin]);
        }

        return null;
    }
}

if (!function_exists('is_valid_sheba')) {
    /**
     * Validate Iranian IBAN / Sheba (شماره شبا).
     */
    function is_valid_sheba(string $sheba): bool
    {
        $clean = strtoupper(trim(english_digits(str_replace([' ', '-'], '', $sheba))));

        if (!preg_match('/^IR[0-9]{24}$/', $clean)) {
            return false;
        }

        // ISO 7064 Mod 97-10 check
        // Move IR (I=18, R=27) and two check digits to end
        $rearranged = substr($clean, 4) . '1827' . substr($clean, 2, 2);

        // Perform modulo 97 on large numeric string
        $remainder = 0;
        foreach (str_split($rearranged, 7) as $chunk) {
            $remainder = (int) (($remainder . $chunk) % 97);
        }

        return $remainder === 1;
    }
}

if (!function_exists('sheba_format')) {
    /**
     * Format Sheba into readable 4-digit blocks.
     */
    function sheba_format(string $sheba): string
    {
        $clean = strtoupper(trim(english_digits(str_replace([' ', '-'], '', $sheba))));
        if (!str_starts_with($clean, 'IR')) {
            $clean = 'IR' . $clean;
        }

        return implode('-', str_split($clean, 4));
    }
}

/* =========================================================================
 * IDENTIFICATION & CONTACT HELPERS (احراز هویت و اطلاعات تماس)
 * ========================================================================= */

if (!function_exists('is_valid_postal_code')) {
    /**
     * Validate Iranian 10-digit Postal Code (کد پستی ده رقمی).
     */
    function is_valid_postal_code(string $postalCode): bool
    {
        $code = english_digits(trim($postalCode));

        // 10 digits, cannot start with 0 or 2, no repeated 5 digits
        if (!preg_match('/^[13-9]{4}[1-9][0-9]{5}$/', $code)) {
            return false;
        }

        return true;
    }
}

if (!function_exists('mobile_operator')) {
    /**
     * Detect Iranian Mobile Operator (همراه اول، ایرانسل، رایتل و ...).
     */
    function mobile_operator(string $mobile): ?string
    {
        $m = english_digits(trim($mobile));
        $m = preg_replace('/^(?:\+98|0098|98)/', '0', $m);

        if (!str_starts_with($m, '0')) {
            $m = '0' . $m;
        }

        $prefix = substr($m, 0, 4);

        $mci = ['0910', '0911', '0912', '0913', '0914', '0915', '0916', '0917', '0918', '0919', '0990', '0991', '0992', '0993', '0994'];
        $irancell = ['0930', '0933', '0935', '0936', '0937', '0938', '0939', '0901', '0902', '0903', '0904', '0905'];
        $rightel = ['0920', '0921', '0922', '0923'];
        $shatel = ['0998'];

        if (in_array($prefix, $mci, true)) {
            return 'همراه اول';
        }
        if (in_array($prefix, $irancell, true)) {
            return 'ایرانسل';
        }
        if (in_array($prefix, $rightel, true)) {
            return 'رایتل';
        }
        if (in_array($prefix, $shatel, true)) {
            return 'شاتل موبایل';
        }

        return null;
    }
}

if (!function_exists('format_mobile')) {
    /**
     * Format mobile number to standard standard styles.
     * styles: '09' (09123456789), '+98' (+989123456789), 'pretty' (0912 345 6789)
     */
    function format_mobile(string $mobile, string $style = '09'): string
    {
        $m = english_digits(trim($mobile));
        $m = preg_replace('/^(?:\+98|0098|98)/', '0', $m);

        if (!str_starts_with($m, '0')) {
            $m = '0' . $m;
        }

        if (strlen($m) !== 11) {
            return $mobile;
        }

        return match ($style) {
            '+98' => '+98' . substr($m, 1),
            'pretty' => substr($m, 0, 4) . ' ' . substr($m, 4, 3) . ' ' . substr($m, 7, 4),
            default => $m,
        };
    }
}

if (!function_exists('mask_mobile')) {
    /**
     * Mask mobile number (e.g. 0912***6789).
     */
    function mask_mobile(string $mobile, string $mask = '***'): string
    {
        $m = format_mobile($mobile, '09');
        if (strlen($m) !== 11) {
            return $mobile;
        }

        return substr($m, 0, 4) . $mask . substr($m, 7, 4);
    }
}

/* =========================================================================
 * TIME & JALALI DATE HELPERS (توابع زمان و تاریخ شمسی)
 * ========================================================================= */

if (!function_exists('jdate_ago')) {
    /**
     * Get natural Persian time elapsed (e.g. ۵ دقیقه پیش، دیروز، ۳ ماه پیش).
     */
    function jdate_ago(mixed $date): string
    {
        if (is_numeric($date)) {
            $timestamp = (int) $date;
        } elseif (is_string($date)) {
            $timestamp = strtotime($date);
        } elseif ($date instanceof \DateTimeInterface) {
            $timestamp = $date->getTimestamp();
        } else {
            return '';
        }

        $diff = time() - $timestamp;

        if ($diff < 60) {
            return 'چند لحظه پیش';
        }
        if ($diff < 3600) {
            $min = (int) floor($diff / 60);
            return persian_digits($min) . ' دقیقه پیش';
        }
        if ($diff < 86400) {
            $hours = (int) floor($diff / 3600);
            return persian_digits($hours) . ' ساعت پیش';
        }
        if ($diff < 172800) {
            return 'دیروز';
        }
        if ($diff < 2592000) {
            $days = (int) floor($diff / 86400);
            return persian_digits($days) . ' روز پیش';
        }
        if ($diff < 31536000) {
            $months = (int) floor($diff / 2592000);
            return persian_digits($months) . ' ماه پیش';
        }

        $years = (int) floor($diff / 31536000);
        return persian_digits($years) . ' سال پیش';
    }
}

if (!function_exists('jalali_month_name')) {
    /**
     * Get Persian month name by index (1 = فروردین, 12 = اسفند).
     */
    function jalali_month_name(int $month): string
    {
        $months = [
            1 => 'فروردین',
            2 => 'اردیبهشت',
            3 => 'خرداد',
            4 => 'تیر',
            5 => 'مرداد',
            6 => 'شهریور',
            7 => 'مهر',
            8 => 'آبان',
            9 => 'آذر',
            10 => 'دی',
            11 => 'بهمن',
            12 => 'اسفند',
        ];

        return $months[$month] ?? '';
    }
}

if (!function_exists('is_leap_jyear')) {
    /**
     * Check if Jalali year is leap (سال کبیسه).
     */
    function is_leap_jyear(int $year): bool
    {
        $mod = ($year + 38) * 31 % 128;
        return $mod < 31;
    }
}

/* =========================================================================
 * STRING, FILE & SECURITY HELPERS (توابع متن، فایل و امنیت)
 * ========================================================================= */

if (!function_exists('human_filesize')) {
    /**
     * Format bytes into human readable format with Persian units (بایت، کیلوبایت، مگابایت، گیگابایت).
     */
    function human_filesize(int|float $bytes, int $decimals = 2, bool $persianDigits = true): string
    {
        $units = ['بایت', 'کیلوبایت', 'مگابایت', 'گیگابایت', 'ترابایت'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);

        $bytes /= pow(1024, $pow);
        $formatted = round($bytes, $decimals);

        $out = $formatted . ' ' . $units[$pow];
        return $persianDigits ? persian_digits($out) : $out;
    }
}

if (!function_exists('file_icon')) {
    /**
     * Get FontAwesome icon class and badge color based on file extension.
     */
    function file_icon(string $filename): array
    {
        $ext = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

        return match ($ext) {
            'pdf' => ['icon' => 'fa-file-pdf', 'color' => 'danger', 'name' => 'PDF'],
            'doc', 'docx' => ['icon' => 'fa-file-word', 'color' => 'primary', 'name' => 'Word'],
            'xls', 'xlsx', 'csv' => ['icon' => 'fa-file-excel', 'color' => 'success', 'name' => 'Excel'],
            'ppt', 'pptx' => ['icon' => 'fa-file-powerpoint', 'color' => 'warning', 'name' => 'PowerPoint'],
            'zip', 'rar', '7z', 'tar', 'gz' => ['icon' => 'fa-file-zipper', 'color' => 'warning', 'name' => 'Archive'],
            'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg' => ['icon' => 'fa-file-image', 'color' => 'info', 'name' => 'Image'],
            'mp3', 'wav', 'ogg' => ['icon' => 'fa-file-audio', 'color' => 'secondary', 'name' => 'Audio'],
            'mp4', 'mkv', 'avi', 'mov' => ['icon' => 'fa-file-video', 'color' => 'danger', 'name' => 'Video'],
            'php', 'js', 'html', 'css', 'json', 'py', 'ts' => ['icon' => 'fa-file-code', 'color' => 'dark', 'name' => 'Code'],
            default => ['icon' => 'fa-file', 'color' => 'secondary', 'name' => strtoupper($ext ?: 'File')],
        };
    }
}

if (!function_exists('reading_time')) {
    /**
     * Calculate estimated reading time in minutes for Persian articles.
     */
    function reading_time(string $text, int $wordsPerMinute = 200): int
    {
        $wordCount = count(preg_split('/\s+/u', strip_tags(trim($text))));
        return (int) max(1, ceil($wordCount / $wordsPerMinute));
    }
}

if (!function_exists('random_otp')) {
    /**
     * Generate secure numeric OTP code.
     */
    function random_otp(int $length = 5): string
    {
        $min = (int) pow(10, $length - 1);
        $max = (int) pow(10, $length) - 1;
        return (string) random_int($min, $max);
    }
}

if (!function_exists('generate_tracking_code')) {
    /**
     * Generate unique alphanumeric tracking code (کد رهگیری).
     */
    function generate_tracking_code(string $prefix = 'TRK', int $randomLength = 8): string
    {
        $bytes = random_bytes((int) ceil($randomLength / 2));
        $random = strtoupper(substr(bin2hex($bytes), 0, $randomLength));
        return ($prefix ? $prefix . '-' : '') . $random;
    }
}

if (!function_exists('clean_persian_text')) {
    /**
     * Clean and normalize Persian text (standardizes letters, removes extra spaces, fixes half-spaces).
     */
    function clean_persian_text(string $text): string
    {
        $text = arabic_to_persian($text);
        // Replace multiple whitespace with single space
        $text = preg_replace('/[ \t]+/u', ' ', $text);
        // Fix spaces before/after punctuation
        $text = preg_replace('/ +([.,;:!?،؛؟])/u', '$1', $text);
        $text = preg_replace('/([.,;:!?،؛؟])(?=[^\s\d])/u', '$1 ', $text);

        return trim($text);
    }
}
