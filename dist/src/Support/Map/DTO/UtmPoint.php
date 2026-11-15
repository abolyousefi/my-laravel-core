<?php

namespace MyLaravelCore\Support\Map\DTO;

use InvalidArgumentException;

class UtmPoint
{
    public function __construct(
        protected float $x,
        protected float $y,
        protected int $z,
        protected int|string $identifier,
        protected array $attributes = [],
        protected int $sort = 0
    ) {
        if ($this->z < 1 || $this->z > 60) {
            throw new InvalidArgumentException("Invalid UTM zone: {$this->z}");
        }
    }

    public function getX(): float
    {
        return $this->x;
    }

    public function getY(): float
    {
        return $this->y;
    }

    public function getZ(): int
    {
        return $this->z;
    }

    public function getIdentifier(): int|string
    {
        return $this->identifier;
    }

    public function getAttributes(): array
    {
        return $this->attributes;
    }

    public function getSort(): int
    {
        return $this->sort;
    }

    public function toArray(): array
    {
        return [
            'x' => $this->x,
            'y' => $this->y,
            'z' => $this->z,
            'identifier' => $this->identifier,
            'attributes' => $this->attributes,
            'sort' => $this->sort,
        ];
    }

    public static function fromArray(array $data, int $sort = 0): self
    {
        foreach (['x', 'y', 'z', 'identifier'] as $req) {
            if (!isset($data[$req]) || $data[$req] === '') {
                throw new InvalidArgumentException("Item is missing required field: '{$req}'");
            }
        }

        return new self(
            x: (float) $data['x'],
            y: (float) $data['y'],
            z: (int) $data['z'],
            identifier: $data['identifier'],
            attributes: (array) ($data['attributes'] ?? []),
            sort: (int) ($data['sort'] ?? $sort)
        );
    }

    /**
     * @return array<int, self>
     */
    public static function fromArrayList(array $list): array
    {
        $out = [];
        foreach (array_values($list) as $idx => $item) {
            if ($item instanceof self) {
                $out[] = $item;
            } elseif (is_array($item)) {
                $out[] = self::fromArray($item, $idx);
            } else {
                throw new InvalidArgumentException("Item at index {$idx} must be an instance of UtmPoint or array.");
            }
        }
        return $out;
    }

    public function toLatLongPoint(): LatLongPoint
    {
        // Simplified WGS84 UTM to Lat/Lng conversion
        $k0 = 0.9996;
        $a = 6378137.0;
        $e2 = 0.00669438;
        $e1 = (1 - sqrt(1 - $e2)) / (1 + sqrt(1 - $e2));
        $x = $this->x - 500000.0;
        $y = $this->y;
        $longOrigin = ($this->z - 1) * 6 - 180 + 3;
        $M = $y / $k0;
        $mu = $M / ($a * (1 - $e2 / 4 - 3 * $e2 * $e2 / 64));
        $phi1 = $mu + (3 * $e1 / 2) * sin(2 * $mu) + (21 * $e1 * $e1 / 16) * sin(4 * $mu);
        $N1 = $a / sqrt(1 - $e2 * sin($phi1) * sin($phi1));
        $T1 = tan($phi1) * tan($phi1);
        $R1 = $a * (1 - $e2) / pow(1 - $e2 * sin($phi1) * sin($phi1), 1.5);
        $D = $x / ($N1 * $k0);

        $lat = rad2deg($phi1 - ($N1 * tan($phi1) / $R1) * ($D * $D / 2));
        $lng = $longOrigin + rad2deg(($D - (1 + 2 * $T1) * pow($D, 3) / 6) / cos($phi1));

        return new LatLongPoint(
            latitude: round($lat, 6),
            longitude: round($lng, 6),
            identifier: $this->identifier,
            attributes: $this->attributes,
            sort: $this->sort
        );
    }
}