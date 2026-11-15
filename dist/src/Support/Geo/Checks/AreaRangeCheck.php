<?php

namespace MyLaravelCore\Support\Geo\Checks;

use MyLaravelCore\Support\Geo\GeometryCheck;
use MyLaravelCore\Support\Geo\GeometryValidationResult;
use MyLaravelCore\Support\Geo\GeometryValidator;

class AreaRangeCheck implements GeometryCheck
{
    public function __construct(
        protected ?float $minimumSquareMeters = null,
        protected ?float $maximumSquareMeters = null
    ) {
    }

    public function check(array $points): GeometryValidationResult
    {
        $res = GeometryValidationResult::pass();
        if (count($points) < 3) {
            return $res;
        }

        $area = GeometryValidator::calculatePolygonArea($points);

        if ($this->minimumSquareMeters !== null && $area < $this->minimumSquareMeters) {
            $res->addError(
                'polygon.area_too_small',
                'مساحت محدوده کمتر از حداقل مجاز است.',
                ['area' => $area, 'min' => $this->minimumSquareMeters]
            );
        }

        if ($this->maximumSquareMeters !== null && $area > $this->maximumSquareMeters) {
            $res->addError(
                'polygon.area_too_large',
                'مساحت محدوده بیشتر از حداکثر مجاز است.',
                ['area' => $area, 'max' => $this->maximumSquareMeters]
            );
        }

        return $res;
    }
}