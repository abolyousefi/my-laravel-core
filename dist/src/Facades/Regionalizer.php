<?php

namespace MyLaravelCore\Facades;

use MyLaravelCore\Support\Map\DTO\LatLongPoint;
use MyLaravelCore\Support\Map\DTO\UtmPoint;

class Regionalizer
{
    public static function toLatLong(float $x, float $y, int $z, int|string $id = 0): LatLongPoint
    {
        return (new UtmPoint($x, $y, $z, $id))->toLatLongPoint();
    }

    public static function toUtm(float $latitude, float $longitude, int|string|null $id = null): UtmPoint
    {
        return (new LatLongPoint($latitude, $longitude, $id))->toUtmPoint();
    }
}