<?php

namespace MyLaravelCore\Support\Workflow;

use InvalidArgumentException;

/**
 * Central registry and resolver for AbolFrame role-and-time-based workflows.
 */
class WorkflowManager
{
    /** @var array<string, class-string<BaseWorkflow>|BaseWorkflow> */
    protected array $workflows = [];

    /**
     * Register a workflow class or instance under its name() or an explicit alias.
     *
     * @param class-string<BaseWorkflow>|BaseWorkflow $workflow
     */
    public function register(string|BaseWorkflow $nameOrWorkflow, string|BaseWorkflow|null $workflow = null): self
    {
        if ($workflow === null) {
            $instance = $this->instantiate($nameOrWorkflow);
            $this->workflows[$instance->name()] = $instance;

            return $this;
        }

        $this->workflows[(string) $nameOrWorkflow] = $workflow;

        return $this;
    }

    /**
     * Resolve a workflow instance by registered name or FQCN.
     */
    public function for(string $nameOrClass): BaseWorkflow
    {
        if (isset($this->workflows[$nameOrClass])) {
            $entry = $this->workflows[$nameOrClass];

            if ($entry instanceof BaseWorkflow) {
                return $entry;
            }

            return $this->workflows[$nameOrClass] = $this->instantiate($entry);
        }

        // Check config-registered workflows (core.workflow.workflows)
        if (function_exists('config')) {
            $configured = config('core.workflow.workflows', []);
            if (isset($configured[$nameOrClass])) {
                return $this->workflows[$nameOrClass] = $this->instantiate($configured[$nameOrClass]);
            }
        }

        // Allow passing the FQCN directly (e.g. App\Workflows\PurchaseWorkflow::class)
        if (class_exists($nameOrClass) && is_subclass_of($nameOrClass, BaseWorkflow::class)) {
            $instance = $this->instantiate($nameOrClass);
            $this->workflows[$nameOrClass] = $instance;
            $this->workflows[$instance->name()] = $instance;

            return $instance;
        }

        throw new InvalidArgumentException("Workflow [{$nameOrClass}] is not registered.");
    }

    public function has(string $nameOrClass): bool
    {
        if (isset($this->workflows[$nameOrClass])) {
            return true;
        }

        if (function_exists('config') && isset(config('core.workflow.workflows', [])[$nameOrClass])) {
            return true;
        }

        return class_exists($nameOrClass) && is_subclass_of($nameOrClass, BaseWorkflow::class);
    }

    /**
     * Return all registered workflow instances keyed by name.
     *
     * @return array<string, BaseWorkflow>
     */
    public function all(): array
    {
        $configured = function_exists('config') ? config('core.workflow.workflows', []) : [];
        foreach ($configured as $key => $class) {
            if (! isset($this->workflows[$key])) {
                $this->workflows[$key] = $class;
            }
        }

        $instances = [];
        foreach ($this->workflows as $key => $entry) {
            $instance = $this->instantiate($entry);
            $this->workflows[$key] = $instance;
            $instances[$instance->name()] = $instance;
        }

        return $instances;
    }

    /**
     * @param class-string<BaseWorkflow>|BaseWorkflow $entry
     */
    protected function instantiate(string|BaseWorkflow $entry): BaseWorkflow
    {
        if ($entry instanceof BaseWorkflow) {
            return $entry;
        }

        if (function_exists('app')) {
            return app($entry);
        }

        return new $entry();
    }
}
