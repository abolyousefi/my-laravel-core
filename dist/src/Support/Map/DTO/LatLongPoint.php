<?php

namespace MyLaravelCore\Support\Map\DTO;

class LatLongPoint
{
    public function __construct(
        protected float $latitude,
        protected float $longitude,
        protected int|string|null $identifier = null,
        protected array $attributes = [],
        protected int $sort = 0
    ) {
    }

    public function getLatitude(): float
    {
        return $this->latitude;
    }

    public function getLongitude(): float
    {
        return $this->longitude;
    }

    public function getIdentifier(): int|string|null
    {
        return $this->identifier;
    }

    public function getSort(): int
    {
        return $this->sort;
    }

    public function toUtmPoint(): UtmPoint
    {
        $a = 6378137.0;
        $e2 = 0.00669438;
        $k0 = 0.9996;
        $zone = (int) floor(($this->longitude + 180) / 6) + 1;
        $longOrigin = ($zone - 1) * 6 - 180 + 3;

        $latRad = deg2rad($this->latitude);
        $longRad = deg2rad($this->longitude);
        $longOriginRad = deg2rad($longOrigin);

        $N = $a / sqrt(1 - $e2 * sin($latRad) * sin($latRad));
        $T = tan($latRad) * tan($latRad);
        $A = cos($latRad) * ($longRad - $longOriginRad);
        $M = $a * ((1 - $e2 / 4 - 3 * $e2 * $e2 / 64) * $latRad - (3 * $e2 / 8) * sin(2 * $latRad));

        $easting = $k0 * $N * ($A + (1 - $T) * pow($A, 3) / 6) + 500000.0;
        $northing = $k0 * ($M + $N * tan($latRad) * ($A * $A / 2));

        return new UtmPoint(
            x: round($easting, 2),
            y: round($northing, 2),
            z: $zone,
            identifier: $this->identifier ?? 0,
            attributes: $this->attributes,
            sort: $this->sort
        );
    }
}