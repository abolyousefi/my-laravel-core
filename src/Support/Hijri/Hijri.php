<?php

namespace MyLaravelCore\Support\Hijri;

use Carbon\Carbon;
use Carbon\CarbonInterface;
use DateTimeInterface;
use DateTimeZone;
use MyLaravelCore\Support\Jalali\Jalali;

/**
 * Immutable Islamic Lunar (Hijri) Date value object.
 */
class Hijri
{
    protected int $hYear;
    protected int $hMonth;
    protected int $hDay;
    protected Carbon $carbon;

    public const MONTH_NAMES = [
        1 => 'محرم',
        2 => 'صفر',
        3 => 'ربیع‌الاول',
        4 => 'ربیع‌الثانی',
        5 => 'جمادی‌الاول',
        6 => 'جمادی‌الثانی',
        7 => 'رجب',
        8 => 'شعبان',
        9 => 'رمضان',
        10 => 'شوال',
        11 => 'ذیقعده',
        12 => 'ذیحجه',
    ];

    public function __construct(mixed $datetime = null, DateTimeZone|string|null $timezone = null)
    {
        $tz = $timezone ?? config('core.date.timezone', 'Asia/Tehran');

        if ($datetime === null) {
            $this->carbon = Carbon::now($tz);
            [$this->hYear, $this->hMonth, $this->hDay] = self::gregorianToHijri(
                $this->carbon->year,
                $this->carbon->month,
                $this->carbon->day
            );
            return;
        }

        if ($datetime instanceof CarbonInterface || $datetime instanceof DateTimeInterface) {
            $this->carbon = Carbon::instance($datetime)->setTimezone($tz);
            [$this->hYear, $this->hMonth, $this->hDay] = self::gregorianToHijri(
                $this->carbon->year,
                $this->carbon->month,
                $this->carbon->day
            );
            return;
        }

        if (is_int($datetime)) {
            $this->carbon = Carbon::createFromTimestamp($datetime, $tz);
            [$this->hYear, $this->hMonth, $this->hDay] = self::gregorianToHijri(
                $this->carbon->year,
                $this->carbon->month,
                $this->carbon->day
            );
            return;
        }

        // Parse Hijri string like '1446-09-25' or '1446/09/25'
        $clean = str_replace('/', '-', trim((string) $datetime));
        if (preg_match('/^(\d{4})-(\d{1,2})-(\d{1,2})(?:\s+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?$/', $clean, $m)) {
            $hy = (int) $m[1];
            $hm = (int) $m[2];
            $hd = (int) $m[3];
            $hour = isset($m[4]) ? (int) $m[4] : 0;
            $min = isset($m[5]) ? (int) $m[5] : 0;
            $sec = isset($m[6]) ? (int) $m[6] : 0;

            if ($hy >= 1300 && $hy <= 1600) {
                $this->hYear = $hy;
                $this->hMonth = $hm;
                $this->hDay = $hd;
                [$gy, $gm, $gd] = self::hijriToGregorian($hy, $hm, $hd);
                $this->carbon = Carbon::create($gy, $gm, $gd, $hour, $min, $sec, $tz);
                return;
            }
        }

        $this->carbon = Carbon::parse((string) $datetime, $tz);
        [$this->hYear, $this->hMonth, $this->hDay] = self::gregorianToHijri(
            $this->carbon->year,
            $this->carbon->month,
            $this->carbon->day
        );
    }

    public static function now(DateTimeZone|string|null $timezone = null): self
    {
        return new self(null, $timezone);
    }

    public static function fromCarbon(CarbonInterface $carbon): self
    {
        return new self($carbon);
    }

    public function toCarbon(): Carbon
    {
        return $this->carbon->copy();
    }

    public function toJalali(): Jalali
    {
        return Jalali::fromCarbon($this->toCarbon());
    }

    public function year(): int
    {
        return $this->hYear;
    }

    public function month(): int
    {
        return $this->hMonth;
    }

    public function day(): int
    {
        return $this->hDay;
    }

    public function monthName(): string
    {
        return self::MONTH_NAMES[$this->hMonth] ?? '';
    }

    public function format(string $format = 'Y/m/d'): string
    {
        $map = [
            'Y' => sprintf('%04d', $this->hYear),
            'y' => substr(sprintf('%04d', $this->hYear), 2, 2),
            'm' => sprintf('%02d', $this->hMonth),
            'n' => (string) $this->hMonth,
            'd' => sprintf('%02d', $this->hDay),
            'j' => (string) $this->hDay,
            'F' => $this->monthName(),
            'H' => $this->carbon->format('H'),
            'i' => $this->carbon->format('i'),
            's' => $this->carbon->format('s'),
        ];

        return strtr($format, $map);
    }

    public function __toString(): string
    {
        return $this->format('Y/m/d');
    }

    /**
     * Convert Gregorian (Y, M, D) to Hijri [year, month, day] using Kuwaiti algorithm.
     *
     * @return array{0: int, 1: int, 2: int}
     */
    public static function gregorianToHijri(int $gy, int $gm, int $gd): array
    {
        if (($gy > 1582) || (($gy === 1582) && ($gm > 10)) || (($gy === 1582) && ($gm === 10) && ($gd > 14))) {
            $jd = intdiv(1461 * ($gy + 4800 + intdiv($gm - 14, 12)), 4)
                + intdiv(367 * ($gm - 2 - 12 * intdiv($gm - 14, 12)), 12)
                - intdiv(3 * intdiv($gy + 4900 + intdiv($gm - 14, 12), 100), 4)
                + $gd - 32075;
        } else {
            $jd = 367 * $gy - intdiv(7 * ($gy + 5001 + intdiv($gm - 9, 7)), 4)
                + intdiv(275 * $gm, 9) + $gd + 1729777;
        }

        $l = $jd - 1948440 + 10632;
        $n = intdiv($l - 1, 10631);
        $l = $l - 10631 * $n + 354;
        $j = (intdiv(10985 - $l, 5316)) * (intdiv(50 * $l, 17719))
            + (intdiv($l, 5670)) * (intdiv(43 * $l, 15238));
        $l = $l - (intdiv(30 - $j, 15)) * (intdiv(17719 * $j, 50))
            - (intdiv($j, 16)) * (intdiv(15238 * $j, 43)) + 29;
        $hm = intdiv(24 * $l, 709);
        $hd = $l - intdiv(709 * $hm, 24);
        $hy = 30 * $n + $j - 30;

        return [$hy, $hm, $hd];
    }

    /**
     * Convert Hijri [year, month, day] to Gregorian [year, month, day].
     *
     * @return array{0: int, 1: int, 2: int}
     */
    public static function hijriToGregorian(int $hy, int $hm, int $hd): array
    {
        $jd = intdiv(11 * $hy + 3, 30) + 354 * $hy + 30 * $hm - intdiv($hm - 1, 2) + $hd + 1948440 - 385;

        if ($jd > 2299160) {
            $l = $jd + 68569;
            $n = intdiv(4 * $l, 146097);
            $l = $l - intdiv(146097 * $n + 3, 4);
            $i = intdiv(4000 * ($l + 1), 1461001);
            $l = $l - intdiv(1461 * $i, 4) + 31;
            $j = intdiv(80 * $l, 2447);
            $gd = $l - intdiv(2447 * $j, 80);
            $l = intdiv($j, 11);
            $gm = $j + 2 - 12 * $l;
            $gy = 100 * ($n - 49) + $i + $l;
        } else {
            $j = $jd + 1402;
            $k = intdiv($j - 1, 1461);
            $l = $j - 1461 * $k;
            $n = intdiv($l - 1, 365) - intdiv($l, 1461);
            $i = $l - 365 * $n + 30;
            $j = intdiv(80 * $i, 2447);
            $gd = $i - intdiv(2447 * $j, 80);
            $i = intdiv($j, 11);
            $gm = $j + 2 - 12 * $i;
            $gy = 4 * $k + $n + $i - 4716;
        }

        return [$gy, $gm, $gd];
    }
}
