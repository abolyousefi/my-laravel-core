<?php

namespace MyLaravelCore\Support\Workflow\DTO;

use Carbon\Carbon;
use Carbon\CarbonInterface;
use DateTimeInterface;
use MyLaravelCore\Support\Jalali\Jalali;

/**
 * Defines a time-window schedule (daily hours, days of week, and/or Jalali/Gregorian date range)
 * controlling when a workflow rule or transition is active.
 */
class TimeWindow
{
    protected ?string $hoursFrom = null;

    protected ?string $hoursTo = null;

    protected ?CarbonInterface $startsAt = null;

    protected ?CarbonInterface $endsAt = null;

    /** @var array<int, string>|null Normalized lowercase English weekday names */
    protected ?array $days = null;

    protected ?string $timezone = null;

    protected ?string $label = null;

    protected const PERSIAN_DAY_MAP = [
        'شنبه' => 'saturday',
        'یکشنبه' => 'sunday',
        'يكشنبه' => 'sunday',
        'دوشنبه' => 'monday',
        'سه‌شنبه' => 'tuesday',
        'سه شنبه' => 'tuesday',
        'چهارشنبه' => 'wednesday',
        'پنج‌شنبه' => 'thursday',
        'پنجشنبه' => 'thursday',
        'پنج شنبه' => 'thursday',
        'جمعه' => 'friday',
    ];

    protected const DAY_ALIASES = [
        'sat' => 'saturday',
        'saturday' => 'saturday',
        'sun' => 'sunday',
        'sunday' => 'sunday',
        'mon' => 'monday',
        'monday' => 'monday',
        'tue' => 'tuesday',
        'tues' => 'tuesday',
        'tuesday' => 'tuesday',
        'wed' => 'wednesday',
        'wednesday' => 'wednesday',
        'thu' => 'thursday',
        'thur' => 'thursday',
        'thursday' => 'thursday',
        'fri' => 'friday',
        'friday' => 'friday',
    ];

    /**
     * Carbon dayOfWeek constants: 0=Sunday .. 6=Saturday.
     */
    protected const CARBON_DOW_MAP = [
        0 => 'sunday',
        1 => 'monday',
        2 => 'tuesday',
        3 => 'wednesday',
        4 => 'thursday',
        5 => 'friday',
        6 => 'saturday',
    ];

    public static function make(): self
    {
        return new self();
    }

    public static function always(): self
    {
        return new self();
    }

    /**
     * Restrict access to daily time range (e.g. '08:00' to '16:00', supports overnight '22:00' to '06:00').
     */
    public function hours(string $from, string $to): self
    {
        $this->hoursFrom = self::normalizeTimeString($from);
        $this->hoursTo = self::normalizeTimeString($to);

        return $this;
    }

    /**
     * Restrict access between two datetimes (accepts Jalali strings, Gregorian strings, Carbon, or Jalali instances).
     */
    public function between(mixed $startsAt, mixed $endsAt): self
    {
        $tz = $this->resolveTimezone();
        $this->startsAt = $startsAt !== null ? self::parseDateTime($startsAt, $tz) : null;
        $this->endsAt = $endsAt !== null ? self::parseDateTime($endsAt, $tz) : null;

        return $this;
    }

    public function from(mixed $startsAt): self
    {
        $this->startsAt = $startsAt !== null ? self::parseDateTime($startsAt, $this->resolveTimezone()) : null;

        return $this;
    }

    public function until(mixed $endsAt): self
    {
        $this->endsAt = $endsAt !== null ? self::parseDateTime($endsAt, $this->resolveTimezone()) : null;

        return $this;
    }

    /**
     * Restrict access to specific days of the week (English, Persian names, or Carbon dayOfWeek integers 0..6).
     *
     * @param array<int, string|int>|string $days
     */
    public function days(array|string $days): self
    {
        $list = is_array($days) ? $days : [$days];
        $normalized = [];

        foreach ($list as $day) {
            $mapped = self::normalizeDay($day);
            if ($mapped !== null) {
                $normalized[] = $mapped;
            }
        }

        $this->days = array_values(array_unique($normalized));

        return $this;
    }

    /**
     * Alias for days().
     *
     * @param array<int, string|int>|string $days
     */
    public function onDays(array|string $days): self
    {
        return $this->days($days);
    }

    public function timezone(string $timezone): self
    {
        $this->timezone = $timezone;

        return $this;
    }

    public function label(string $label): self
    {
        $this->label = $label;

        return $this;
    }

    public function getHoursFrom(): ?string
    {
        return $this->hoursFrom;
    }

    public function getHoursTo(): ?string
    {
        return $this->hoursTo;
    }

    public function getStartsAt(): ?CarbonInterface
    {
        return $this->startsAt;
    }

    public function getEndsAt(): ?CarbonInterface
    {
        return $this->endsAt;
    }

    /**
     * @return array<int, string>|null
     */
    public function getDays(): ?array
    {
        return $this->days;
    }

    public function getLabel(): ?string
    {
        return $this->label;
    }

    /**
     * Determine whether the time window is active at the given timestamp (or now).
     */
    public function isSatisfiedAt(CarbonInterface|DateTimeInterface|Jalali|string|null $at = null): bool
    {
        $tz = $this->resolveTimezone();
        $moment = $at === null
            ? Carbon::now($tz)
            : self::parseDateTime($at, $tz)->copy()->setTimezone($tz);

        if ($this->startsAt !== null && $moment->lt($this->startsAt->copy()->setTimezone($tz))) {
            return false;
        }

        if ($this->endsAt !== null && $moment->gt($this->endsAt->copy()->setTimezone($tz))) {
            return false;
        }

        if ($this->days !== null && ! empty($this->days)) {
            $currentDay = strtolower($moment->englishDayOfWeek);
            if (! in_array($currentDay, $this->days, true)) {
                return false;
            }
        }

        if ($this->hoursFrom !== null && $this->hoursTo !== null) {
            $currentSeconds = self::timeToSeconds($moment->format('H:i:s'));
            $fromSeconds = self::timeToSeconds($this->hoursFrom);
            $toSeconds = self::timeToSeconds($this->hoursTo);

            // Equal start and end represents a full 24h match.
            if ($fromSeconds !== $toSeconds) {
                if ($fromSeconds < $toSeconds) {
                    if ($currentSeconds < $fromSeconds || $currentSeconds > $toSeconds) {
                        return false;
                    }
                } else {
                    // Overnight window e.g. 22:00 -> 06:00
                    if ($currentSeconds < $fromSeconds && $currentSeconds > $toSeconds) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    public function toArray(): array
    {
        return [
            'label' => $this->label,
            'timezone' => $this->resolveTimezone(),
            'hours_from' => $this->hoursFrom,
            'hours_to' => $this->hoursTo,
            'days' => $this->days,
            'starts_at' => $this->startsAt?->toIso8601String(),
            'ends_at' => $this->endsAt?->toIso8601String(),
        ];
    }

    protected function resolveTimezone(): string
    {
        if ($this->timezone !== null) {
            return $this->timezone;
        }

        if (function_exists('config')) {
            return (string) config('core.workflow.default_timezone', config('core.date.timezone', 'Asia/Tehran'));
        }

        return 'Asia/Tehran';
    }

    public static function parseDateTime(mixed $value, string $timezone = 'Asia/Tehran'): CarbonInterface
    {
        if ($value instanceof Jalali) {
            return $value->toCarbon()->copy()->setTimezone($timezone);
        }

        if ($value instanceof CarbonInterface) {
            return $value->copy()->setTimezone($timezone);
        }

        if ($value instanceof DateTimeInterface) {
            return Carbon::instance($value)->setTimezone($timezone);
        }

        $raw = function_exists('english_digits') ? english_digits(trim((string) $value)) : trim((string) $value);

        // Automatically treat strings starting with Jalali centuries 13xx / 14xx / 15xx as Jalali dates.
        if (preg_match('/^(13|14|15)\d{2}[\/\-]\d{1,2}[\/\-]\d{1,2}/', $raw)) {
            return Jalali::parse($raw, $timezone)->toCarbon();
        }

        return Carbon::parse($raw, $timezone);
    }

    protected static function normalizeTimeString(string $time): string
    {
        $clean = function_exists('english_digits') ? english_digits(trim($time)) : trim($time);

        if (preg_match('/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/', $clean, $m)) {
            return sprintf('%02d:%02d:%02d', (int) $m[1], (int) $m[2], (int) ($m[3] ?? 0));
        }

        return $clean;
    }

    protected static function timeToSeconds(string $hms): int
    {
        $parts = array_map('intval', explode(':', self::normalizeTimeString($hms)));

        return ($parts[0] ?? 0) * 3600 + ($parts[1] ?? 0) * 60 + ($parts[2] ?? 0);
    }

    protected static function normalizeDay(int|string $day): ?string
    {
        if (is_int($day)) {
            return self::CARBON_DOW_MAP[$day] ?? null;
        }

        $trimmed = trim((string) $day);
        if (isset(self::PERSIAN_DAY_MAP[$trimmed])) {
            return self::PERSIAN_DAY_MAP[$trimmed];
        }

        $lower = strtolower($trimmed);

        return self::DAY_ALIASES[$lower] ?? null;
    }
}
