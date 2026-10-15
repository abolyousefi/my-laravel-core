<?php

namespace PHPSTORM_META {
    // PhpStorm Metadata for MyLaravelCore
    override(\app(0), map([
        'core' => \MyLaravelCore\CoreManager::class,
        'core.payment' => \MyLaravelCore\Services\Payment\PaymentManager::class,
        'core.sms' => \MyLaravelCore\Services\Sms\SmsManager::class,
        'core.uploader' => \MyLaravelCore\Services\UploaderService::class,
    ]));

    override(\MyLaravelCore\Facades\Core::class, map([
        '' => '@',
    ]));
}
