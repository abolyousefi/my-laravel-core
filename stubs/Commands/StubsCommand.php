<?php

namespace MyLaravelCore\Commands;

/**
 * Stub definition for StubsCommand.
 * Note: Implementation details are protected. Only constructor and public API signatures are shown.
 */
class StubsCommand extends \Illuminate\Console\Command implements \Symfony\Component\Console\Command\SignalableCommandInterface
{
    /**
     * handle signature.
     */
    public function handle(MyLaravelCore\Services\StubGenerator $generator): int {
        // Protected implementation
    }

}
