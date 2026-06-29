<?

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Switch the active role of the authenticated user.
     */
    public function switchRole(Request $request): RedirectResponse
    {
        $request->validate([
            'role' => ['required', 'string', 'exists:roles,name'],
        ]);

        $user = $request->user();

        if (! $user->roles()->where('name', $request->role)->exists()) {
            return back()->withErrors(['role' => 'You do not have permission to switch to this role.']);
        }

        $user->activeRole()->updateOrCreate(
            ['user_id' => $user->id],
            ['active_role' => $request->role]
        );

        // Typical practice is to redirect back or to a unified dashboard that handles role dispatching.
        return redirect()->intended(route('dashboard', absolute: false));
    }
}
