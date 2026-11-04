<?php

namespace MyLaravelCore\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @method static string formRequest(string $requestClass, string $formSelector = 'form')
 * @see \MyLaravelCore\Support\Validation\FormValidator
 */
class FormValidator extends Facade
{
    protected static function getFacadeAccessor(): string
    {
        return \MyLaravelCore\Support\Validation\FormValidator::class;
    }
}