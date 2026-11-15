<?php

namespace MyLaravelCore\Support\Jalali;

use Carbon\Carbon;
use Carbon\CarbonInterface;
use DateTime;
use DateTimeInterface;
use DateTimeZone;
use MyLaravelCore\Exceptions\InvalidJalaliDateException;
use MyLaravelCore\Support\Hijri\Hijri;

/**
 * Full-featured mutable Jalali (Persian Solar) Date class backed by Carbon.
 *
 * @property-read int $year
 * @property-read int $month
 * @property-read int $day
 * @property-read int $hour
 * @property-read int $minute
 * @property-read int $second
 * @property-read int $timestamp
 */
class Jalali
{
    protected Carbon $carbon;

    protected static ?string $defaultTz = null;
    protected static ?string $storageTz = null;
    protected static ?string $displayTz = null;

    public const MONTH_NAMES = [
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

    public const DAY_NAMES = [
        'Saturday' => ['full' => 'شنبه', 'short' => 'ش', 'num' => 1],
        'Sunday' => ['full' => 'یکشنبه', 'short' => 'ی', 'num' => 2],
        'Monday' => ['full' => 'دوشنبه', 'short' => 'د', 'num' => 3],
        'Tuesday' => ['full' => 'سه‌شنبه', 'short' => 'س', 'num' => 4],
        'Wednesday' => ['full' => 'چهارشنبه', 'short' => 'چ', 'num' => 5],
        'Thursday' => ['full' => 'پنج‌شنبه', 'short' => 'پ', 'num' => 6],
        'Friday' => ['full' => 'جمعه', 'short' => 'ج', 'num' => 7],
    ];

    public function __construct(CarbonInterface $carbon)
    {
        $this->carbon = Carbon::instance($carbon);
    }

    /* =========================================================================
     * TIMEZONE CONFIGURATION
     * ========================================================================= */

    public static function defaultTimezone(): string
    {
        return self::$defaultTz ?? (function_exists('config') ? config('jalali.timezone', config('core.date.timezone', 'Asia/Tehran')) : 'Asia/Tehran');
    }

    public static function storageTimezone(): string
    {
        return self::$storageTz ?? (function_exists('config') ? config('jalali.storage', 'UTC') : 'UTC');
    }

    public static function displayTimezone(): string
    {
        return self::$displayTz ?? (function_exists('config') ? config('jalali.display', config('core.date.timezone', 'Asia/Tehran')) : 'Asia/Tehran');
    }

    public static function setDefaultTimezone(string $tz): void
    {
        self::$defaultTz = $tz;
    }

    public static function setStorageTimezone(string $tz): void
    {
        self::$storageTz = $tz;
    }

    public static function setDisplayTimezone(string $tz): void
    {
        self::$displayTz = $tz;
    }

    /* =========================================================================
     * FACTORY & CREATION METHODS
     * ========================================================================= */

    public static function now(DateTimeZone|string|null $timezone = null): self
    {
        return new self(Carbon::now($timezone ?? self::defaultTimezone()));
    }

    public static function today(DateTimeZone|string|null $timezone = null): self
    {
        return self::now($timezone)->startOfDay();
    }

    public static function tomorrow(DateTimeZone|string|null $timezone = null): self
    {
        return self::today($timezone)->addDay();
    }

    public static function yesterday(DateTimeZone|string|null $timezone = null): self
    {
        return self::today($timezone)->subDay();
    }

    /**
     * Parse a Jalali date/datetime string (e.g. '1403/05/14 13:30:00' or '1403-05-14').
     * Strings are ALWAYS interpreted as Jalali calendar dates.
     */
    public static function parse(string $jalaliString, DateTimeZone|string|null $timezone = null): self
    {
        $clean = function_exists('english_digits') ? english_digits(trim($jalaliString)) : trim($jalaliString);

        if (!preg_match('/^(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})(?:\s+(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?)?$/', $clean, $m)) {
            throw new InvalidJalaliDateException("Invalid Jalali date format: [{$jalaliString}]");
        }

        $jy = (int) $m[1];
        $jm = (int) $m[2];
        $jd = (int) $m[3];
        $hour = isset($m[4]) ? (int) $m[4] : 0;
        $minute = isset($m[5]) ? (int) $m[5] : 0;
        $second = isset($m[6]) ? (int) $m[6] : 0;

        return self::create($jy, $jm, $jd, $hour, $minute, $second, $timezone);
    }

    /**
     * Create Jalali instance from Jalali components.
     */
    public static function create(
        int $year,
        int $month = 1,
        int $day = 1,
        int $hour = 0,
        int $minute = 0,
        int $second = 0,
        DateTimeZone|string|null $timezone = null
    ): self {
        if (!self::isValidDate($year, $month, $day)) {
            throw new InvalidJalaliDateException(
                sprintf('Invalid Jalali date: %04d/%02d/%02d', $year, $month, $day)
            );
        }

        [$gy, $gm, $gd] = jalali_to_gregorian($year, $month, $day);
        $tz = $timezone ?? self::defaultTimezone();

        return new self(Carbon::create($gy, $gm, $gd, $hour, $minute, $second, $tz));
    }

    /**
     * Create Jalali instance from Gregorian components.
     */
    public static function createGregorian(
        int $year,
        int $month = 1,
        int $day = 1,
        int $hour = 0,
        int $minute = 0,
        int $second = 0,
        DateTimeZone|string|null $timezone = null
    ): self {
        $tz = $timezone ?? self::defaultTimezone();
        return new self(Carbon::create($year, $month, $day, $hour, $minute, $second, $tz));
    }

    public static function fromCarbon(CarbonInterface $carbon): self
    {
        return new self($carbon->copy());
    }

    public static function fromHijri(Hijri $hijri): self
    {
        return new self($hijri->toCarbon());
    }

    public static function fromDateTime(DateTimeInterface $dateTime): self
    {
        return new self(Carbon::instance($dateTime));
    }

    public static function fromTimestamp(int $timestamp, DateTimeZone|string|null $timezone = null): self
    {
        $tz = $timezone ?? self::defaultTimezone();
        return new self(Carbon::createFromTimestamp($timestamp, $tz));
    }

    /* =========================================================================
     * VALIDATION & CALENDAR RULES
     * ========================================================================= */

    public static function isValidDate(int $year, int $month, int $day): bool
    {
        if ($year < 1 || $year > 3178 || $month < 1 || $month > 12 || $day < 1) {
            return false;
        }

        $maxDays = self::daysInMonthFor($year, $month);
        return $day <= $maxDays;
    }

    public static function isYearLeap(int $year): bool
    {
        return is_leap_jyear($year);
    }

    public static function daysInMonthFor(int $year, int $month): int
    {
        if ($month >= 1 && $month <= 6) {
            return 31;
        }
        if ($month >= 7 && $month <= 11) {
            return 30;
        }
        if ($month === 12) {
            return self::isYearLeap($year) ? 30 : 29;
        }

        throw new InvalidJalaliDateException("Invalid Jalali month: {$month}");
    }

    public function isLeapYear(): bool
    {
        return self::isYearLeap($this->year());
    }

    public function daysInMonth(): int
    {
        return self::daysInMonthFor($this->year(), $this->month());
    }

    /* =========================================================================
     * GETTERS & MAGIC PROPERTIES
     * ========================================================================= */

    /**
     * @return array{0: int, 1: int, 2: int}
     */
    public function toArrayJalali(): array
    {
        return gregorian_to_jalali(
            (int) $this->carbon->year,
            (int) $this->carbon->month,
            (int) $this->carbon->day
        );
    }

    public function year(): int
    {
        return $this->toArrayJalali()[0];
    }

    public function month(): int
    {
        return $this->toArrayJalali()[1];
    }

    public function day(): int
    {
        return $this->toArrayJalali()[2];
    }

    public function hour(): int
    {
        return (int) $this->carbon->hour;
    }

    public function minute(): int
    {
        return (int) $this->carbon->minute;
    }

    public function second(): int
    {
        return (int) $this->carbon->second;
    }

    public function timestamp(): int
    {
        return (int) $this->carbon->timestamp;
    }

    public function monthName(): string
    {
        return self::MONTH_NAMES[$this->month()] ?? '';
    }

    public function dayName(): string
    {
        $eng = $this->carbon->format('l');
        return self::DAY_NAMES[$eng]['full'] ?? '';
    }

    /**
     * Day of week where Saturday = 1 ... Friday = 7.
     */
    public function dayOfWeek(): int
    {
        $eng = $this->carbon->format('l');
        return self::DAY_NAMES[$eng]['num'] ?? 1;
    }

    public function __get(string $name): mixed
    {
        return match ($name) {
            'year' => $this->year(),
            'month' => $this->month(),
            'day' => $this->day(),
            'hour' => $this->hour(),
            'minute' => $this->minute(),
            'second' => $this->second(),
            'timestamp' => $this->timestamp(),
            'dayName' => $this->dayName(),
            'monthName' => $this->monthName(),
            default => null,
        };
    }

    /* =========================================================================
     * FORMATTING
     * ========================================================================= */

    public function formatDate(): string
    {
        return $this->format('Y/m/d');
    }

    public function formatDatetime(): string
    {
        return $this->format('Y/m/d H:i:s');
    }

    public function formatTime(): string
    {
        return $this->format('H:i:s');
    }

    public function formatWord(): string
    {
        return $this->format('l j F Y');
    }

    public function format(string $format): string
    {
        [$jy, $jm, $jd] = $this->toArrayJalali();
        $engDay = $this->carbon->format('l');
        $dayInfo = self::DAY_NAMES[$engDay] ?? ['full' => '', 'short' => '', 'num' => 1];

        $tokens = [
            'Y' => sprintf('%04d', $jy),
            'y' => substr(sprintf('%04d', $jy), 2, 2),
            'm' => sprintf('%02d', $jm),
            'n' => (string) $jm,
            'd' => sprintf('%02d', $jd),
            'j' => (string) $jd,
            'F' => self::MONTH_NAMES[$jm] ?? '',
            'M' => self::MONTH_NAMES[$jm] ?? '',
            'l' => $dayInfo['full'],
            'D' => $dayInfo['short'],
            'w' => (string) $dayInfo['num'],
            'N' => (string) $dayInfo['num'],
            't' => (string) self::daysInMonthFor($jy, $jm),
            'L' => self::isYearLeap($jy) ? '1' : '0',
            'H' => $this->carbon->format('H'),
            'G' => $this->carbon->format('G'),
            'h' => $this->carbon->format('h'),
            'g' => $this->carbon->format('g'),
            'i' => $this->carbon->format('i'),
            's' => $this->carbon->format('s'),
            'A' => $this->carbon->format('A') === 'AM' ? 'قبل از ظهر' : 'بعد از ظهر',
            'a' => $this->carbon->format('a') === 'am' ? 'ق.ظ' : 'ب.ظ',
            'U' => (string) $this->carbon->timestamp,
        ];

        $out = '';
        $len = strlen($format);
        for ($i = 0; $i < $len; $i++) {
            $ch = $format[$i];
            if ($ch === '\\' && $i + 1 < $len) {
                $out .= $format[++$i];
                continue;
            }
            $out .= $tokens[$ch] ?? $ch;
        }

        return $out;
    }

    public function __toString(): string
    {
        return $this->formatDatetime();
    }

    /* =========================================================================
     * CONVERSIONS & TIMEZONE TRANSFERS
     * ========================================================================= */

    public function toCarbon(): Carbon
    {
        return $this->carbon->copy();
    }

    public function toHijri(): Hijri
    {
        return Hijri::fromCarbon($this->carbon);
    }

    public function toDateTime(): DateTime
    {
        return $this->carbon->toDateTime();
    }

    public function toStorage(): Carbon
    {
        return $this->carbon->copy()->setTimezone(self::storageTimezone());
    }

    public function toDisplay(): self
    {
        return $this->copy()->setTimezone(self::displayTimezone());
    }

    public function setTimezone(DateTimeZone|string $tz): self
    {
        $this->carbon->setTimezone($tz);
        return $this;
    }

    public function timezone(DateTimeZone|string $tz): self
    {
        return $this->setTimezone($tz);
    }

    public function getTimezone(): DateTimeZone
    {
        return $this->carbon->getTimezone();
    }

    /* =========================================================================
     * MUTATIONS (MUTABLE OBJECT + COPY)
     * ========================================================================= */

    public function copy(): self
    {
        return new self($this->carbon->copy());
    }

    public function addDay(): self
    {
        return $this->addDays(1);
    }

    public function addDays(int $days): self
    {
        $this->carbon->addDays($days);
        return $this;
    }

    public function subDay(): self
    {
        return $this->subDays(1);
    }

    public function subDays(int $days): self
    {
        $this->carbon->subDays($days);
        return $this;
    }

    public function addWeek(): self
    {
        return $this->addWeeks(1);
    }

    public function addWeeks(int $weeks): self
    {
        $this->carbon->addWeeks($weeks);
        return $this;
    }

    public function subWeek(): self
    {
        return $this->subWeeks(1);
    }

    public function subWeeks(int $weeks): self
    {
        $this->carbon->subWeeks($weeks);
        return $this;
    }

    public function addMonth(): self
    {
        return $this->addMonths(1);
    }

    public function addMonths(int $months): self
    {
        [$jy, $jm, $jd] = $this->toArrayJalali();
        $totalMonths = ($jy * 12) + ($jm - 1) + $months;
        $targetYear = intdiv($totalMonths, 12);
        $targetMonth = ($totalMonths % 12) + 1;
        if ($targetMonth <= 0) {
            $targetMonth += 12;
            $targetYear--;
        }

        $maxDay = self::daysInMonthFor($targetYear, $targetMonth);
        $targetDay = min($jd, $maxDay);

        return $this->setDateJalali($targetYear, $targetMonth, $targetDay);
    }

    public function subMonth(): self
    {
        return $this->subMonths(1);
    }

    public function subMonths(int $months): self
    {
        return $this->addMonths(-$months);
    }

    public function addYear(): self
    {
        return $this->addYears(1);
    }

    public function addYears(int $years): self
    {
        [$jy, $jm, $jd] = $this->toArrayJalali();
        $targetYear = $jy + $years;
        $maxDay = self::daysInMonthFor($targetYear, $jm);
        $targetDay = min($jd, $maxDay);

        return $this->setDateJalali($targetYear, $jm, $targetDay);
    }

    public function subYear(): self
    {
        return $this->subYears(1);
    }

    public function subYears(int $years): self
    {
        return $this->addYears(-$years);
    }

    public function addHours(int $hours): self
    {
        $this->carbon->addHours($hours);
        return $this;
    }

    public function subHours(int $hours): self
    {
        $this->carbon->subHours($hours);
        return $this;
    }

    public function addMinutes(int $minutes): self
    {
        $this->carbon->addMinutes($minutes);
        return $this;
    }

    public function subMinutes(int $minutes): self
    {
        $this->carbon->subMinutes($minutes);
        return $this;
    }

    public function addSeconds(int $seconds): self
    {
        $this->carbon->addSeconds($seconds);
        return $this;
    }

    public function subSeconds(int $seconds): self
    {
        $this->carbon->subSeconds($seconds);
        return $this;
    }

    public function startOfDay(): self
    {
        $this->carbon->startOfDay();
        return $this;
    }

    public function endOfDay(): self
    {
        $this->carbon->endOfDay();
        return $this;
    }

    public function setTime(int $hour, int $minute, int $second = 0): self
    {
        $this->carbon->setTime($hour, $minute, $second);
        return $this;
    }

    public function setDateJalali(int $year, int $month, int $day): self
    {
        if (!self::isValidDate($year, $month, $day)) {
            throw new InvalidJalaliDateException(
                sprintf('Invalid Jalali date: %04d/%02d/%02d', $year, $month, $day)
            );
        }

        [$gy, $gm, $gd] = jalali_to_gregorian($year, $month, $day);
        $this->carbon->setDate($gy, $gm, $gd);

        return $this;
    }

    /* =========================================================================
     * COMPARISONS & DIFFERENCES
     * ========================================================================= */

    protected function coerceToCarbon(self|CarbonInterface|DateTimeInterface|string $other): Carbon
    {
        if ($other instanceof self) {
            return $other->toCarbon();
        }
        if ($other instanceof CarbonInterface) {
            return Carbon::instance($other);
        }
        if ($other instanceof DateTimeInterface) {
            return Carbon::instance($other);
        }

        return self::parse($other, $this->getTimezone())->toCarbon();
    }

    public function eq(self|CarbonInterface|DateTimeInterface|string $other): bool
    {
        return $this->carbon->eq($this->coerceToCarbon($other));
    }

    public function ne(self|CarbonInterface|DateTimeInterface|string $other): bool
    {
        return $this->carbon->ne($this->coerceToCarbon($other));
    }

    public function gt(self|CarbonInterface|DateTimeInterface|string $other): bool
    {
        return $this->carbon->gt($this->coerceToCarbon($other));
    }

    public function gte(self|CarbonInterface|DateTimeInterface|string $other): bool
    {
        return $this->carbon->gte($this->coerceToCarbon($other));
    }

    public function lt(self|CarbonInterface|DateTimeInterface|string $other): bool
    {
        return $this->carbon->lt($this->coerceToCarbon($other));
    }

    public function lte(self|CarbonInterface|DateTimeInterface|string $other): bool
    {
        return $this->carbon->lte($this->coerceToCarbon($other));
    }

    public function between(
        self|CarbonInterface|DateTimeInterface|string $start,
        self|CarbonInterface|DateTimeInterface|string $end
    ): bool {
        return $this->carbon->between($this->coerceToCarbon($start), $this->coerceToCarbon($end));
    }

    public function isPast(): bool
    {
        return $this->carbon->isPast();
    }

    public function isFuture(): bool
    {
        return $this->carbon->isFuture();
    }

    public function isToday(): bool
    {
        return $this->carbon->isToday();
    }

    public function isSaturday(): bool
    {
        return $this->carbon->isSaturday();
    }

    public function isSunday(): bool
    {
        return $this->carbon->isSunday();
    }

    public function isMonday(): bool
    {
        return $this->carbon->isMonday();
    }

    public function isTuesday(): bool
    {
        return $this->carbon->isTuesday();
    }

    public function isWednesday(): bool
    {
        return $this->carbon->isWednesday();
    }

    public function isThursday(): bool
    {
        return $this->carbon->isThursday();
    }

    public function isFriday(): bool
    {
        return $this->carbon->isFriday();
    }

    public function diffDays(self|CarbonInterface|DateTimeInterface|string $other, bool $absolute = true): int
    {
        return (int) $this->carbon->diffInDays($this->coerceToCarbon($other), $absolute);
    }

    public function diffHours(self|CarbonInterface|DateTimeInterface|string $other, bool $absolute = true): int
    {
        return (int) $this->carbon->diffInHours($this->coerceToCarbon($other), $absolute);
    }

    public function diffMinutes(self|CarbonInterface|DateTimeInterface|string $other, bool $absolute = true): int
    {
        return (int) $this->carbon->diffInMinutes($this->coerceToCarbon($other), $absolute);
    }

    public function diffSeconds(self|CarbonInterface|DateTimeInterface|string $other, bool $absolute = true): int
    {
        return (int) $this->carbon->diffInSeconds($this->coerceToCarbon($other), $absolute);
    }

    public function diffForHumans(): string
    {
        return english_digits(jdate_ago($this->carbon));
    }
}
