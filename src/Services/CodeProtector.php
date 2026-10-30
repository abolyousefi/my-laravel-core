<?php

namespace MyLaravelCore\Services;

class CodeProtector
{
    /**
     * Obfuscate and protect PHP source code.
     */
    public function protectCode(string $phpCode): string
    {
        // Remove open tag if present to process code
        $clean = preg_replace('/^<\?php\s*/i', '', trim($phpCode));

        // Strip comments and multi-line docblocks
        $clean = $this->stripComments($clean);

        // Compress and encode
        $compressed = gzdeflate($clean, 9);
        $encoded = base64_encode($compressed);

        // Build protected runtime wrapper
        $header = "<?php\n";
        $header .= "/**\n";
        $header .= " * Protected by MyLaravelCore Infrastructure Shield.\n";
        $header .= " * Proprietary software - Unauthorized modification, reverse engineering or extraction is prohibited.\n";
        $header .= " */\n";
        $header .= "\$__CORE_ENC__ = '{$encoded}';\n";
        $header .= "eval(gzinflate(base64_decode(\$__CORE_ENC__)));\n";

        return $header;
    }

    /**
     * Strip single and multi-line comments.
     */
    protected function stripComments(string $code): string
    {
        $tokens = token_get_all('<?php ' . $code);
        $output = '';

        foreach ($tokens as $token) {
            if (is_array($token)) {
                // Skip comments and doc comments
                if ($token[0] === T_COMMENT || $token[0] === T_DOC_COMMENT) {
                    continue;
                }
                $output .= $token[1];
            } else {
                $output .= $token;
            }
        }

        // Remove opening tag we added
        return preg_replace('/^<\?php\s*/i', '', $output);
    }
}
