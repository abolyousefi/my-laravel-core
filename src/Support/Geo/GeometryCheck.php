<?php

namespace MyLaravelCore\Support\Geo;

interface GeometryCheck
{
    /**
     * @param array<int, array{lat: float, lng: float}> $points
     */
    public function check(array $points): GeometryValidationResult;
}