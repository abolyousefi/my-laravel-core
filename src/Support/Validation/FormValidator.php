<?php

namespace MyLaravelCore\Support\Validation;

class FormValidator
{
    /**
     * Render client-side FormValidation initialization script for a FormRequest class and form selector.
     */
    public static function formRequest(string $requestClass, string $formSelector = 'form'): string
    {
        $rules = [];
        if (class_exists($requestClass)) {
            try {
                $instance = new $requestClass();
                if (method_exists($instance, 'rules')) {
                    $rawRules = $instance->rules();
                    foreach ($rawRules as $field => $fieldRules) {
                        $normalized = is_array($fieldRules) ? $fieldRules : explode('|', (string) $fieldRules);
                        $rules[$field] = array_values(array_filter(array_map(
                            fn ($r) => is_string($r) ? $r : (is_object($r) ? class_basename($r) : null),
                            $normalized
                        )));
                    }
                }
            } catch (\Throwable) {
                // ignore if rules() depends on runtime route parameters
            }
        }

        $jsonRules = json_encode($rules, JSON_UNESCAPED_UNICODE);
        $escapedClass = addslashes($requestClass);
        $escapedSelector = addslashes($formSelector);

        return <<<HTML
<script>
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('{$escapedSelector}');
    if (form) {
        form.dataset.formRequest = '{$escapedClass}';
        form.dataset.validationRules = '{$jsonRules}';
    }
});
</script>
HTML;
    }
}