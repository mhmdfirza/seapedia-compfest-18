<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    public const ADMIN = 'admin';
    public const SELLER = 'seller';
    public const BUYER = 'buyer';
    public const DRIVER = 'driver';

    protected $fillable = [
        'name',
        'display_name',
        'description',
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_roles')->withTimestamps();
    }

    public function scopeNonAdmin($query)
    {
        return $query->where('name', '!=', self::ADMIN);
    }
}
