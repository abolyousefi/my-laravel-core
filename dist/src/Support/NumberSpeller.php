<?php

namespace MyLaravelCore\Support;

use InvalidArgumentException;

class NumberSpeller
{
    protected const ONES = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
    protected const TEENS = ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'];
    protected const TENS = ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
    protected const HUNDREDS = ['', 'صد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];
    protected const SCALES = ['', 'هزار', 'میلیون', 'میلیارد', 'تریلیون', 'کوادریلیون', 'کوینتیلیون'];

    /**
     * Convert a number to Persian words (matching browser convertAmountToText).
     * Ignores decimal parts; throws InvalidArgumentException for non-numeric or out-of-range inputs.
     */
    public static function spell(mixed $number, string $suffix = ''): string
    {
        if (is_string($number)) {
            $number = function_exists('english_digits') ? english_digits(trim($number)) : trim($number);
            $number = str_replace(',', '', $number);
        }

        if ($number === '' || $number === null || is_bool($number) || !is_numeric($number)) {
            throw new InvalidArgumentException('Input must be a valid number.');
        }

        $floatVal = (float) $number;
        if (abs($floatVal) > PHP_INT_MAX) {
            throw new InvalidArgumentException('Number is out of supported integer range.');
        }

        $intVal = (int) ($floatVal < 0 ? ceil($floatVal) : floor($floatVal));
        $suffixPart = trim($suffix) !== '' ? ' ' . trim($suffix) : '';

        if ($intVal === 0) {
            return 'صفر' . $suffixPart;
        }

        $isNegative = $intVal < 0;
        $absStr = (string) abs($intVal);

        $groups = [];
        $len = strlen($absStr);
        for ($i = $len; $i > 0; $i -= 3) {
            $start = max(0, $i - 3);
            $groups[] = (int) substr($absStr, $start, $i - $start);
        }

        $result = [];
        foreach ($groups as $idx => $group) {
            if ($group === 0) {
                continue;
            }

            $h = intdiv($group, 100);
            $t = intdiv($group % 100, 10);
            $o = $group % 10;

            $parts = [];
            if ($h > 0) {
                $parts[] = self::HUNDREDS[$h];
            }

            if ($t === 1) {
                $parts[] = self::TEENS[$o];
            } else {
                if ($t > 1) {
                    $parts[] = self::TENS[$t];
                }
                if ($o > 0) {
                    $parts[] = self::ONES[$o];
                }
            }

            $scale = self::SCALES[$idx] ?? '';
            $groupText = implode(' و ', $parts) . ($scale !== '' ? ' ' . $scale : '');
            $result[] = $groupText;
        }

        $spelled = ($isNegative ? 'منفی ' : '') . implode(' و ', array_reverse($result));

        return $spelled . $suffixPart;
    }
}
