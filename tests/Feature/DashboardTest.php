<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_guests_are_redirected_to_the_login_page()
    {
        $response = $this->get('/client/dashboard');
        $response->assertRedirect(route('login'));
    }

    public function test_authenticated_users_can_visit_the_dashboard()
    {
        /** @var User $user */
        $user = User::factory()->create(['role' => 'user']);
        $this->actingAs($user);

        $response = $this->get(route('dashboard'));
        $response->assertOk();
    }

    public function test_admin_can_visit_the_admin_dashboard()
    {
        /** @var User $user */
        $user = User::factory()->create(['role' => 'admin']);
        $this->actingAs($user);

        $response = $this->get(route('admin.dashboard'));
        $response->assertOk();
    }

    public function test_user_cannot_access_admin_dashboard()
    {
        /** @var User $user */
        $user = User::factory()->create(['role' => 'user']);
        $this->actingAs($user);

        $response = $this->get('/admin/dashboard');
        $response->assertForbidden();
    }

    public function test_admin_cannot_access_client_dashboard()
    {
        /** @var User $user */
        $user = User::factory()->create(['role' => 'admin']);
        $this->actingAs($user);

        $response = $this->get('/client/dashboard');
        $response->assertForbidden();
    }
}
