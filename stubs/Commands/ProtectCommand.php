<?php

namespace MyLaravelCore\Commands;

/**
 * Stub definition for ProtectCommand.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class ProtectCommand extends \Illuminate\Console\Command implements \Symfony\Component\Console\Command\SignalableCommandInterface
{
    /**
     * handle signature.
     */
    public function handle(MyLaravelCore\Services\CodeProtector $protector, MyLaravelCore\Services\StubGenerator $stubGen): int {
        // Protected implementation
    }

}
