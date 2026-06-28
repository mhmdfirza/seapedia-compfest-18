<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AppReview extends Model
{
    protected $fillable = [
        'reviewer_name',
        'rating',
        'comment',
        'user_id',
        'ip_address',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
