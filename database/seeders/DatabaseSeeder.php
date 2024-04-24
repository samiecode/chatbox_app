<?php

namespace Database\Seeders;

use App\Enums\RoleEnum;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $this->call(UserRoleSeeder::class);

        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'admin@example.com',
        ]);
        $user->assignRole(RoleEnum::ADMIN);

        $user = User::factory()->create([
            'name' => 'John',
            'email' => 'john@example.com',
        ]);
        $user->assignRole(RoleEnum::USER);
        $user->conversation()->create();

        $user = User::factory()->create([
            'name' => 'Eddy',
            'email' => 'eddy@example.com',
        ]);
        $user->assignRole(RoleEnum::USER);
        $user->conversation()->create();

        $user = User::factory()->create([
            'name' => 'Favour',
            'email' => 'favour@example.com',
        ]);
        $user->assignRole(RoleEnum::USER);
        $user->conversation()->create();

        $user = User::factory()->create([
            'name' => 'Feddy',
            'email' => 'feddy@example.com',
        ]);
        $user->assignRole(RoleEnum::USER);
        $user->conversation()->create();
    }
}
