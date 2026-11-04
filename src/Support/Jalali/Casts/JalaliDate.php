<?php

namespace MyLaravelCore\Support\Jalali\Casts;

use Carbon\Carbon;
use Carbon\CarbonInterface;
use DateTimeInterface;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;
use MyLaravelCore\Support\Jalali\Jalali;

class JalaliDate implements CastsAttributes
{
    protected string $format;

    public function __construct(string $format = 'Y-m-d H:i:s')
    {
        $this->format = $format;
    }

    /**
     * Transform the attribute from the underlying model values to a Jalali instance in display timezone.
     */
    public function get(Model $model, string $key, mixed $value, array $attributes): ?Jalali
    {
        if ($value === null || $value === '') {
            return null;
        }

        if ($value instanceof Jalali) {
            return $value->toDisplay();
        }

        $carbon = Carbon::parse($value, Jalali::storageTimezone());

        return Jalali::fromCarbon($carbon)->toDisplay();
    }

    /**
     * Transform the attribute to its underlying storage value in storage timezone.
     */
    public function set(Model $model, string $key, mixed $value, array $attributes): ?string
    {
        if ($value === null || $value === '') {
            return null;
        }

        if ($value instanceof Jalali) {
            return $value->toStorage()->format($this->format);
        }

        if ($value instanceof CarbonInterface || $value instanceof DateTimeInterface) {
            return Jalali::fromDateTime($value)->toStorage()->format($this->format);
        }

        if (is_string($value)) {
            $clean = function_exists('english_digits') ? english_digits(trim($value)) : trim($value);
            // If string looks like a Jalali year (1300-1500), parse via Jalali::parse
            if (preg_match('/^(13\d{2}|14\d{2})[\/\-]/', $clean)) {
                return Jalali::parse($clean)->toStorage()->format($this->format);
            }

            return Carbon::parse($clean, Jalali::displayTimezone())
                ->setTimezone(Jalali::storageTimezone())
                ->format($this->format);
        }

        return (string) $value;
    }
}
