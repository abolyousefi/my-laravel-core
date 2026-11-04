<?php

namespace MyLaravelCore\Tables\DTO;

class APIResourceDTO
{
    public function __construct(
        public string $connection,
        public string $method = 'GET',
        public string $path = '/'
    ) {
    }
}