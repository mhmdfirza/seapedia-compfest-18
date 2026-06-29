<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Casts\Attribute;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'avatar',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class, 'user_roles')->withTimestamps();
    }

    public function activeRoleRecord(): HasOne
    {
        return $this->hasOne(UserActiveRole::class);
    }

    public function store(): HasOne
    {
        return $this->hasOne(Store::class);
    }

    public function appReviews(): HasMany
    {
        return $this->hasMany(AppReview::class);
    }

    public function hasRole(string $roleName): bool
    {
        return $this->roles->contains('name', $roleName);
    }

    public function hasMultipleNonAdminRoles(): bool
    {
        return $this->roles->where('name', '!=', Role::ADMIN)->count() > 1;
    }

    public function isAdmin(): bool
    {
        return $this->hasRole(Role::ADMIN);
    }

    public function getActiveRole(): ?string
    {
        return $this->activeRoleRecord?->active_role;
    }

    protected function activeRole(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->getActiveRole(),
        );
    }
}
