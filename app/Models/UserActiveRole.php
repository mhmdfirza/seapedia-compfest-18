<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserActiveRole extends Model
{
    protected $fillable = [
        'user_id',
        'active_role',
    ];
    
    // Disable created_at for this table as per migration (updated_at only, handled by useCurrentOnUpdate maybe? Actually wait, Eloquent expects both if $timestamps is true. We'll disable it and handle updated_at manually or configure it.)
    public $timestamps = false;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
