<?php

namespace MyLaravelCore\Services;

use ReflectionClass;
use ReflectionMethod;
use ReflectionParameter;
use ReflectionProperty;

class StubGenerator
{
    /**
     * Generate constructor-only and signature-only stub content for a given class.
     */
    public function generateClassStub(string|object $class): ?string
    {
        if (!class_exists($class) && !interface_exists($class) && !trait_exists($class)) {
            return null;
        }

        $ref = new ReflectionClass($class);
        $namespace = $ref->getNamespaceName();
        $shortName = $ref->getShortName();

        $type = 'class';
        if ($ref->isInterface()) {
            $type = 'interface';
        } elseif ($ref->isTrait()) {
            $type = 'trait';
        } elseif ($ref->isAbstract()) {
            $type = 'abstract class';
        }

        // Extends
        $extends = '';
        if ($parent = $ref->getParentClass()) {
            $extends = ' extends \\' . $parent->getName();
        }

        // Implements
        $implements = '';
        $interfaces = $ref->getInterfaceNames();
        if (!empty($interfaces)) {
            $implementsList = array_map(fn($i) => '\\' . $i, $interfaces);
            $implements = ($ref->isInterface() ? ' extends ' : ' implements ') . implode(', ', $implementsList);
        }

        $stub = "<?php\n\n";
        if ($namespace) {
            $stub .= "namespace {$namespace};\n\n";
        }

        // Docblock
        $stub .= "/**\n";
        $stub .= " * Stub definition for {$shortName}.\n";
        $stub .= " * Note: Implementation details are protected. Only constructor and public API signatures are shown.\n";
        $stub .= " */\n";

        $stub .= "{$type} {$shortName}{$extends}{$implements}\n{\n";

        // Constructor
        $constructor = $ref->getConstructor();
        if ($constructor && $constructor->getDeclaringClass()->getName() === $ref->getName()) {
            $stub .= $this->generateMethodStub($constructor, true);
        }

        // Public methods
        foreach ($ref->getMethods(ReflectionMethod::IS_PUBLIC) as $method) {
            if ($method->getName() === '__construct') {
                continue;
            }
            // Only methods declared in this class or overridden
            if ($method->getDeclaringClass()->getName() === $ref->getName()) {
                $stub .= $this->generateMethodStub($method, false);
            }
        }

        $stub .= "}\n";

        return $stub;
    }

    /**
     * Generate method/constructor stub with empty body.
     */
    protected function generateMethodStub(ReflectionMethod $method, bool $isConstructor = false): string
    {
        $doc = "    /**\n";
        $doc .= "     * " . ($isConstructor ? "Constructor" : $method->getName()) . " signature.\n";
        $doc .= "     */\n";

        $params = [];
        foreach ($method->getParameters() as $param) {
            $paramStr = '';

            // Promoted properties in constructor
            if ($isConstructor && $param->isPromoted()) {
                $paramStr .= 'public ';
            }

            // Type
            if ($param->hasType()) {
                $type = $param->getType();
                $paramStr .= (string) $type . ' ';
            }

            // Variadic
            if ($param->isVariadic()) {
                $paramStr .= '...';
            }

            // Name
            $paramStr .= '$' . $param->getName();

            // Default value
            if ($param->isDefaultValueAvailable()) {
                $default = $param->getDefaultValue();
                $paramStr .= ' = ' . $this->exportDefaultValue($default);
            }

            $params[] = $paramStr;
        }

        $paramsFormatted = '';
        if (count($params) > 2) {
            $paramsFormatted = "\n        " . implode(",\n        ", $params) . "\n    ";
        } else {
            $paramsFormatted = implode(', ', $params);
        }

        $returnType = '';
        if ($method->hasReturnType()) {
            $returnType = ': ' . (string) $method->getReturnType();
        }

        $visibility = 'public';
        if ($method->isProtected()) {
            $visibility = 'protected';
        }

        $static = $method->isStatic() ? ' static' : '';

        // Empty body - zero implementation code exposed!
        $body = " {\n        // Protected implementation\n    }\n\n";

        return $doc . "    {$visibility}{$static} function {$method->getName()}({$paramsFormatted}){$returnType}{$body}";
    }

    /**
     * Safely export default value to PHP code.
     */
    protected function exportDefaultValue(mixed $value): string
    {
        if (is_array($value) && empty($value)) {
            return '[]';
        }
        if (is_null($value)) {
            return 'null';
        }
        if (is_bool($value)) {
            return $value ? 'true' : 'false';
        }
        return var_export($value, true);
    }
}
