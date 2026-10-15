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
