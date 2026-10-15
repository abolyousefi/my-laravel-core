<?php

return [
    /*
    |--------------------------------------------------------------------------
    | UI & Components Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration for Blade components, styling, prefix, and RTL direction.
    |
    */
    'ui' => [
        // Component prefix (leave empty '' for direct <x-text-input> or 'core' for <x-core-text-input>)
        'prefix' => '',

        // Also register with 'core' prefix simultaneously (allows <x-text-input> and <x-core-text-input>)
        'dual_prefix' => true,

        // Direction: 'rtl' or 'ltr'
        'direction' => 'rtl',

        // Theme colors
        'colors' => [
            'primary' => '#5c2d91',
            'secondary' => '#6c757d',
            'success' => '#198754',
            'danger' => '#dc3545',
            'warning' => '#ffc107',
            'info' => '#0dcaf0',
            'light' => '#f8f9fa',
            'dark' => '#212529',
        ],

        // Default Icon Set ('fontawesome', 'bootstrap-icons', or 'feather')
        'icon_set' => 'fontawesome',

        // Auto load core CSS and JS in layouts
        'inject_assets' => true,
    ],

    /*
    |--------------------------------------------------------------------------
    | Jalali Date & Time Configuration
    |--------------------------------------------------------------------------
    |
    | Default calendar and date formatting options.
    |
    */
    'date' => [
        'default_calendar' => 'jalali', // jalali, gregorian, hijri
        'timezone' => 'Asia/Tehran',
        'display_format' => 'Y/m/d H:i',
        'date_format' => 'Y/m/d',
        'time_format' => 'H:i',
        'convert_digits' => true, // convert digits to Persian in formatted dates
    ],

    /*
    |--------------------------------------------------------------------------
    | File Manager & Uploader Configuration
    |--------------------------------------------------------------------------
    |
    | Upload limits, default disks, and thumbnail options.
    |
    */
    'uploader' => [
        'disk' => env('CORE_UPLOADER_DISK', 'public'),
        'base_directory' => 'uploads',
        'max_file_size' => 10240, // In Kilobytes (10 MB)
        'allowed_extensions' => [
            'images' => ['jpg', 'jpeg', 'png', 'webp', 'svg', 'gif'],
            'documents' => ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt', 'csv'],
            'archives' => ['zip', 'rar', 'tar', 'gz'],
        ],
        'image_thumbnails' => [
            'thumb' => [150, 150],
            'medium' => [600, 600],
            'large' => [1200, 1200],
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Payment Gateways Configuration
    |--------------------------------------------------------------------------
    |
    | Supported Iranian and international payment providers.
    |
    */
    'payment' => [
        'default' => env('CORE_PAYMENT_DEFAULT', 'mock'),
        'currency' => env('CORE_PAYMENT_CURRENCY', 'IRT'), // IRT (Toman) or IRR (Rial)

        'gateways' => [
            'zarinpal' => [
                'merchant_id' => env('ZARINPAL_MERCHANT_ID', ''),
                'sandbox' => env('ZARINPAL_SANDBOX', false),
            ],
            'mellat' => [
                'terminal_id' => env('MELLAT_TERMINAL_ID', ''),
                'username' => env('MELLAT_USERNAME', ''),
                'password' => env('MELLAT_PASSWORD', ''),
            ],
            'idpay' => [
                'api_key' => env('IDPAY_API_KEY', ''),
                'sandbox' => env('IDPAY_SANDBOX', false),
            ],
            'mock' => [
                'success_by_default' => true,
            ],
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | SMS Providers Configuration
    |--------------------------------------------------------------------------
    |
    | Supported Iranian SMS service providers (Kavenegar, Ghasedak, FarazSMS).
    |
    */
    'sms' => [
        'default' => env('CORE_SMS_DEFAULT', 'log'),

        'providers' => [
            'kavenegar' => [
                'api_key' => env('KAVENEGAR_API_KEY', ''),
                'sender' => env('KAVENEGAR_SENDER', ''),
            ],
            'ghasedak' => [
                'api_key' => env('GHASEDAK_API_KEY', ''),
                'sender' => env('GHASEDAK_SENDER', ''),
            ],
            'farazsms' => [
                'api_key' => env('FARAZSMS_API_KEY', ''),
                'username' => env('FARAZSMS_USERNAME', ''),
                'password' => env('FARAZSMS_PASSWORD', ''),
                'sender' => env('FARAZSMS_SENDER', ''),
            ],
            'log' => [
                'channel' => env('CORE_SMS_LOG_CHANNEL', 'stack'),
            ],
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Audit & Model Tracking
    |--------------------------------------------------------------------------
    |
    | Tracking user changes and models history.
    |
    */
    'audit' => [
        'user_model' => env('CORE_USER_MODEL', 'App\\Models\\User'),
        'track_ip' => true,
        'track_user_agent' => true,
    ],
];
