<?php

namespace MyLaravelCore\Support\Map;

use InvalidArgumentException;
use MyLaravelCore\Support\Map\DTO\UtmPoint;

abstract class BaseMap
{
    protected array $parameters = [];
    /** @var array<int, UtmPoint> */
    protected array $currentPoints = [];

    /**
     * @return array<int, UtmPoint>
     */
    abstract protected function getCurrentValues(): array;

    abstract protected function handleChanges(): void;

    public function setParameters(array $parameters): self
    {
        $this->parameters = $parameters;
        return $this;
    }

    public function getParameters(): array
    {
        return $this->parameters;
    }

    /**
     * @param array<int, UtmPoint|array> $points
     */
    public function setCurrentPoints(array $points): self
    {
        $this->currentPoints = UtmPoint::fromArrayList($points);
        return $this;
    }

    /**
     * @return array<int, UtmPoint>
     */
    public function getCurrentPoints(): array
    {
        return $this->currentPoints;
    }

    /**
     * @return array<int, UtmPoint>
     */
    public function getPreviousPoints(): array
    {
        $vals = $this->getCurrentValues();
        foreach ($vals as $idx => $item) {
            if (!$item instanceof UtmPoint) {
                throw new InvalidArgumentException("Item at index {$idx} must be an instance of UtmPoint");
            }
        }
        return array_values($vals);
    }

    /**
     * @return array<int, UtmPoint>
     */
    public function getAddedPoints(): array
    {
        $prevIds = array_map(fn (UtmPoint $p) => (string) $p->getIdentifier(), $this->getPreviousPoints());
        return array_values(array_filter(
            $this->currentPoints,
            fn (UtmPoint $p) => !in_array((string) $p->getIdentifier(), $prevIds, true)
        ));
    }

    /**
     * @return array<int, UtmPoint>
     */
    public function getDeletedPoints(): array
    {
        $currIds = array_map(fn (UtmPoint $p) => (string) $p->getIdentifier(), $this->currentPoints);
        return array_values(array_filter(
            $this->getPreviousPoints(),
            fn (UtmPoint $p) => !in_array((string) $p->getIdentifier(), $currIds, true)
        ));
    }

    /**
     * @return array<int, UtmPoint>
     */
    public function getUpdatedPoints(): array
    {
        $prevById = [];
        foreach ($this->getPreviousPoints() as $p) {
            $prevById[(string) $p->getIdentifier()] = $p;
        }

        $updated = [];
        foreach ($this->currentPoints as $curr) {
            $id = (string) $curr->getIdentifier();
            if (!isset($prevById[$id])) {
                continue;
            }
            $prev = $prevById[$id];
            if ($prev->getX() !== $curr->getX() || $prev->getY() !== $curr->getY() || $prev->getZ() !== $curr->getZ()) {
                $updated[] = $curr;
            }
        }

        return $updated;
    }
}