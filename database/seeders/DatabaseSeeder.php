<?php

namespace Database\Seeders;

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
      // Create Admin
      User::factory()->create([
         'name' => 'Admin Sureka',
         'email' => 'admin@sureka.com',
         'password' => bcrypt('password'), // Password eksplisit
         'role' => 'admin',
      ]);
   }
}
