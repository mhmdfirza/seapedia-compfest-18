<?php

namespace App\Helpers;

class SanitizationHelper
{
    /**
     * Sanitize short text fields like name, title.
     * Prevents any HTML and avoids script tags.
     */
    public static function sanitizeText(?string $value): ?string
    {
        if ($value === null) return null;
        
        $value = strip_tags($value);
        return trim(htmlspecialchars($value, ENT_QUOTES | ENT_HTML5, 'UTF-8'));
    }

    /**
     * Sanitize Rich Text, allowing only specific safe tags using simple stripping
     * Note: In a real app, HTMLPurifier is recommended for rich text.
     */
    public static function sanitizeRichText(?string $value): ?string
    {
        if ($value === null) return null;
        
        // Allowed tags: <p><br><strong><em><ul><ol><li><h3><h4><blockquote><a>
        $allowedTags = '<p><br><strong><em><ul><ol><li><h3><h4><blockquote><a>';
        $value = strip_tags($value, $allowedTags);
        
        // Remove on* event handlers (a naive approach, HTMLPurifier is robust but this covers basic needs)
        $value = preg_replace('#(<[^>]+?[\x00-\x20\"\'])(?:on|xmlns)[^>]*+>#iu', '$1>', $value);
        // Remove javascript: links
        $value = preg_replace('#href=[\'"]?javascript:[^\'"]*[\'"]?#iu', 'href="#"', $value);
        
        return trim($value);
    }

    /**
     * Sanitize comments purely as text, discarding any HTML and capping length.
     */
    public static function sanitizeComment(?string $value, int $maxLength = 2000): ?string
    {
        if ($value === null) return null;
        
        $value = strip_tags($value);
        $value = trim($value);
        
        if (mb_strlen($value) > $maxLength) {
            $value = mb_substr($value, 0, $maxLength);
        }
        
        return $value;
    }
}
