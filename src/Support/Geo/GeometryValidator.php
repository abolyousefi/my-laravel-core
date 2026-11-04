<?php

namespace MyLaravelCore\Support\Geo;

class GeometryValidator
{
    protected int $minPoints = 3;
    /** @var array<int, GeometryCheck> */
    protected array $extraChecks = [];

    public static function default(int $minPoints = 3): self
    {
        $v = new self();
        $v->minPoints = $minPoints;
        return $v;
    }

    public function with(GeometryCheck $check): self
    {
        $this->extraChecks[] = $check;
        return $this;
    }

    public function validate(array $rawPoints): GeometryValidationResult
    {
        $result = GeometryValidationResult::pass();
        $points = [];

        // 1. CoordinatesCheck
        foreach ($rawPoints as $idx => $pt) {
            $norm = self::normalizePoint($pt);
            if ($norm === null) {
                return GeometryValidationResult::fail(
                    'point.malformed',
                    'فرمت مختصات نقطه نامعتبر است.',
                    ['index' => $idx]
                );
            }
            if ($norm['lat'] < -90 || $norm['lat'] > 90) {
                $result->addError('point.latitude_out_of_range', 'عرض جغرافیایی خارج از بازه مجاز است.', ['index' => $idx]);
            }
            if ($norm['lng'] < -180 || $norm['lng'] > 180) {
                $result->addError('point.longitude_out_of_range', 'طول جغرافیایی خارج از بازه مجاز است.', ['index' => $idx]);
            }
            $points[] = $norm;
        }

        if (!$result->isValid()) {
            return $result;
        }

        // 2. MinimumPointsCheck (distinct points excluding closing point)
        $distinct = [];
        foreach ($points as $p) {
            $key = $p['lat'] . ',' . $p['lng'];
            $distinct[$key] = true;
        }
        if (count($distinct) < $this->minPoints) {
            $result->addError(
                'polygon.not_enough_points',
                "حداقل {$this->minPoints} نقطه متمایز برای چندضلعی الزامی است.",
                ['distinct_count' => count($distinct), 'min' => $this->minPoints]
            );
        }

        // 3. ContiguousEdgesCheck
        for ($i = 0, $n = count($points); $i < $n - 1; $i++) {
            if ($points[$i]['lat'] === $points[$i + 1]['lat'] && $points[$i]['lng'] === $points[$i + 1]['lng']) {
                $result->addError('polygon.repeated_point', 'نقطه تکراری متوالی در محدوده وجود دارد.', ['index' => $i]);
            }
        }

        // 4. ClosedRingCheck
        if (count($points) >= 3) {
            $first = $points[0];
            $last = $points[count($points) - 1];
            if ($first['lat'] !== $last['lat'] || $first['lng'] !== $last['lng']) {
                $result->addError('polygon.not_closed', 'نقطه شروع و پایان محدوده باید یکسان باشد.', []);
            }
        }

        // 5. SimpleRingCheck (self-intersection)
        $edgeCount = count($points) - 1;
        for ($i = 0; $i < $edgeCount; $i++) {
            for ($j = $i + 2; $j < $edgeCount; $j++) {
                if ($i === 0 && $j === $edgeCount - 1) {
                    continue;
                }
                if (self::segmentsIntersect($points[$i], $points[$i + 1], $points[$j], $points[$j + 1])) {
                    $e1 = $i + 1;
                    $e2 = $j + 1;
                    $result->addError(
                        'polygon.self_intersects',
                        "اضلاع محدوده یکدیگر را قطع می‌کنند (ضلع {$e1} و ضلع {$e2}).",
                        ['edges' => [$i, $j]]
                    );
                }
            }
        }

        // 6. Extra checks (e.g. AreaRangeCheck)
        foreach ($this->extraChecks as $check) {
            $result->merge($check->check($points));
        }

        return $result;
    }

    /**
     * @return array{lat: float, lng: float}|null
     */
    public static function normalizePoint(mixed $point): ?array
    {
        if (is_string($point)) {
            $parts = explode(',', trim($point));
            if (count($parts) !== 2 || !is_numeric(trim($parts[0])) || !is_numeric(trim($parts[1]))) {
                return null;
            }
            return ['lat' => (float) trim($parts[0]), 'lng' => (float) trim($parts[1])];
        }

        if (is_object($point)) {
            $point = (array) $point;
        }

        if (is_array($point)) {
            $lat = $point['latitude'] ?? $point['lat'] ?? null;
            $lng = $point['longitude'] ?? $point['lng'] ?? null;
            if ($lat === null || $lng === null || !is_numeric($lat) || !is_numeric($lng)) {
                return null;
            }
            $fLat = (float) $lat;
            $fLng = (float) $lng;
            if (!is_finite($fLat) || !is_finite($fLng)) {
                return null;
            }
            return ['lat' => $fLat, 'lng' => $fLng];
        }

        return null;
    }

    public static function calculatePolygonArea(array $points): float
    {
        if (count($points) < 3) {
            return 0.0;
        }
        $R = 6378137.0;
        $area = 0.0;
        $n = count($points);
        for ($i = 0; $i < $n; $i++) {
            $p1 = $points[$i];
            $p2 = $points[($i + 1) % $n];
            $x1 = deg2rad($p1['lng']);
            $y1 = deg2rad($p1['lat']);
            $x2 = deg2rad($p2['lng']);
            $y2 = deg2rad($p2['lat']);
            $area += ($x2 - $x1) * (2 + sin($y1) + sin($y2));
        }
        return round(abs(($area * $R * $R) / 2.0), 2);
    }

    protected static function segmentsIntersect(array $a, array $b, array $c, array $d): bool
    {
        $ccw = fn ($p1, $p2, $p3) => ($p3['lat'] - $p1['lat']) * ($p2['lng'] - $p1['lng']) > ($p2['lat'] - $p1['lat']) * ($p3['lng'] - $p1['lng']);
        return ($ccw($a, $c, $d) !== $ccw($b, $c, $d)) && ($ccw($a, $b, $c) !== $ccw($a, $b, $d));
    }
}