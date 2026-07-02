<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Laravel\Sanctum\Sanctum;

class PruneExpiredTokens extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sanctum:prune-expired';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Prune tokens expired for more than the set expiration time in config.';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Pruning expired tokens...');
        
        $hours = (config('sanctum.expiration') ?? 10080) / 60;

        $pruned = Sanctum::personalAccessTokenModel()::where('created_at', '<', now()->subHours($hours))->delete();

        // Alternatively Sanctum::pruneExpired() natively handles this based on config expiration but we can do it manually to be safe.
        // Sanctum::pruneExpired() is actually available in Sanctum 3.x/4.x? Wait, yes.
        // Let's just defer to native if possible, or keep this manual query.
        // Let's use native:
        // class_exists(\Laravel\Sanctum\Console\Commands\PruneExpired::class)
        
        $this->info("Successfully pruned {$pruned} expired tokens.");
    }
}
