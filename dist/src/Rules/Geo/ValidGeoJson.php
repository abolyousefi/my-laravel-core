<?php

namespace MyLaravelCore\Rules\Geo;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidGeoJson implements ValidationRule
{
    public function __construct(protected ?string $expectedType = null)
    {
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $data = is_string($value) ? json_decode($value, true) : $value;
        if (!is_array($data) || empty($data['type']) || !isset($data['coordinates']) || !is_array($data['coordinates'])) {
            $fail('ساختار GeoJSON در فیلد :attribute نامعتبر است.');
            return;
        }

        $type = (string) $data['type'];
        if (!in_array($type, ['Point', 'Polygon', 'MultiPolygon'], true)) {
            $fail('نوع هندسه GeoJSON در :attribute پشتیبانی نمی‌شود.');
            return;
        }

        if ($this->expectedType !== null && $type !== $this->expectedType) {
            $fail("نوع GeoJSON در :attribute باید {$this->expectedType} باشد.");
            return;
        }

        $coords = $data['coordinates'];
        if ($type === 'Point') {
            if (count($coords) < 2 || !is_numeric($coords[0]) || !is_numeric($coords[1])) {
                $fail('مختصات Point در :attribute نامعتبر است.');
            }
        } elseif ($type === 'Polygon') {
            foreach ($coords as $ring) {
                if (!is_array($ring) || count($ring) < 4) {
                    $fail('هر حلقه Polygon در :attribute باید حداقل ۴ نقطه داشته باشد.');
                    return;
                }
            }
        }
    }
}