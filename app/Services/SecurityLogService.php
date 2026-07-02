<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;

class SecurityLogService
{
    public static function logUnauthorizedAccess($userId, $attemptedUrl, $requiredRole, $currentActiveRole)
    {
        Log::channel('security')->warning('Unauthorized access attempt due to role restriction', [
            'user_id' => $userId,
            'attempted_url' => $attemptedUrl,
            'required_role' => $requiredRole,
            'current_active_role' => $currentActiveRole,
        ]);
    }

    public static function logSuspiciousInput($userId, $fieldName, $inputValue, $ruleViolated)
    {
        Log::channel('security')->warning('Suspicious input detected', [
            'user_id' => $userId ?? 'guest',
            'field_name' => $fieldName,
            'input_value' => mb_strimwidth($inputValue, 0, 50, "..."), // truncate
            'rule_violated' => $ruleViolated,
        ]);
    }

    public static function logSuccessfulRoleSwitch($userId, $previousRole, $newRole)
    {
        Log::channel('security')->info('User successfully switched role', [
            'user_id' => $userId,
            'previous_role' => $previousRole,
            'new_role' => $newRole,
        ]);
    }

    public static function logFailedAuthentication($email, $ipAddress)
    {
        Log::channel('security')->warning('Failed authentication attempt', [
            'email' => $email,
            'ip_address' => $ipAddress,
        ]);
    }
}
