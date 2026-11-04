<?php

namespace MyLaravelCore\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static \MyLaravelCore\Support\Jalali\Jalali now(\DateTimeZone|string|null $timezone = null)
 * @method static \MyLaravelCore\Support\Jalali\Jalali today(\DateTimeZone|string|null $timezone = null)
 * @method static \MyLaravelCore\Support\Jalali\Jalali tomorrow(\DateTimeZone|string|null $timezone = null)
 * @method static \MyLaravelCore\Support\Jalali\Jalali yesterday(\DateTimeZone|string|null $timezone = null)
 * @method static \MyLaravelCore\Support\Jalali\Jalali parse(string $jalaliString, \DateTimeZone|string|null $timezone = null)
 * @method static \MyLaravelCore\Support\Jalali\Jalali create(int $year, int $month = 1, int $day = 1, int $hour = 0, int $minute = 0, int $second = 0, \DateTimeZone|string|null $timezone = null)
 * @method static \MyLaravelCore\Support\Jalali\Jalali createGregorian(int $year, int $month = 1, int $day = 1, int $hour = 0, int $minute = 0, int $second = 0, \DateTimeZone|string|null $timezone = null)
 * @method static \MyLaravelCore\Support\Jalali\Jalali fromCarbon(\Carbon\CarbonInterface $carbon)
 * @method static \MyLaravelCore\Support\Jalali\Jalali fromHijri(\MyLaravelCore\Support\Hijri\Hijri $hijri)
 * @method static \MyLaravelCore\Support\Jalali\Jalali fromDateTime(\DateTimeInterface $dateTime)
 * @method static \MyLaravelCore\Support\Jalali\Jalali fromTimestamp(int $timestamp, \DateTimeZone|string|null $timezone = null)
 * @method static bool isValidDate(int $year, int $month, int $day)
 * @see \MyLaravelCore\Support\Jalali\Jalali
 */
class Jalali extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return \MyLaravelCore\Support\Jalali\Jalali::class;
    }
}
