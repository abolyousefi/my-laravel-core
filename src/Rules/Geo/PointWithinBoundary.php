<?php

namespace MyLaravelCore\Rules\Geo;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use MyLaravelCore\Support\Geo\GeometryValidator;

class PointWithinBoundary implements ValidationRule
{
    public function __construct(protected ?array $boundary = null)
    {
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $pt = GeometryValidator::normalizePoint($value);
        if ($pt === null) {
            $fail('نقطه انتخاب‌شده در :attribute نامعتبر است.');
            return;
        }

        $rawBoundary = $this->boundary ?? config('core.map.boundary', []);
        if (!is_array($rawBoundary) || count($rawBoundary) < 3) {
            return; // No active boundary constraint
        }

        $poly = [];
        foreach ($rawBoundary as $b) {
            $norm = GeometryValidator::normalizePoint($b);
            if ($norm !== null) {
                $poly[] = $norm;
            }
        }

        if (count($poly) < 3) {
            return;
        }

        if (!self::pointInPolygon($pt, $poly)) {
            $fail('نقطه انتخاب‌شده در :attribute خارج از محدوده مجاز است.');
        }
    }

    protected static function pointInPolygon(array $point, array $polygon): bool
    {
        $inside = false;
        $x = $point['lng'];
        $y = $point['lat'];
        $n = count($polygon);

        for ($i = 0, $j = $n - 1; $i < $n; $j = $i++) {
            $xi = $polygon[$i]['lng'];
            $yi = $polygon[$i]['lat'];
            $xj = $polygon[$j]['lng'];
            $yj = $polygon[$j]['lat'];

            $intersect = (($yi > $y) !== ($yj > $y))
                && ($x < ($xj - $xi) * ($y - $yi) / (($yj - $yi) ?: 1e-12) + $xi);
            if ($intersect) {
                $inside = !$inside;
            }
        }

        return $inside;
    }
}