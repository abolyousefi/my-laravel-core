<?php

namespace MyLaravelCore\Rules\Geo;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use MyLaravelCore\Support\Geo\Checks\AreaRangeCheck;
use MyLaravelCore\Support\Geo\GeometryValidator;

class ValidGeometry implements ValidationRule
{
    public function __construct(
        protected int $minPoints = 3,
        protected ?float $minArea = null,
        protected ?float $maxArea = null
    ) {
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (!is_array($value)) {
            $fail('فیلد :attribute باید آرایه‌ای از مختصات باشد.');
            return;
        }

        $validator = GeometryValidator::default($this->minPoints);
        if ($this->minArea !== null || $this->maxArea !== null) {
            $validator->with(new AreaRangeCheck($this->minArea, $this->maxArea));
        }

        $result = $validator->validate($value);
        if (!$result->isValid()) {
            foreach ($result->getErrors() as $err) {
                $fail($err['message']);
            }
        }
    }
}