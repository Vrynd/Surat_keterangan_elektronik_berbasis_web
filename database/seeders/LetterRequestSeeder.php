<?php

namespace Database\Seeders;

use App\Models\LetterRequest;
use App\Models\LetterType;
use App\Models\User;
use Illuminate\Database\Seeder;

class LetterRequestSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::where('role', 'user')->get();
        $letterTypes = LetterType::all();

        if ($users->isEmpty() || $letterTypes->isEmpty()) {
            $this->command->warn('Skipping LetterRequestSeeder: No users or letter types found.');
            return;
        }

        $statuses = ['pending', 'approved', 'rejected'];

        $sampleNames = [
            'Ahmad Fauzi', 'Siti Nurhaliza', 'Budi Santoso', 'Dewi Lestari',
            'Eko Prasetyo', 'Fitriani', 'Gunawan Wibisono', 'Hesti Purwanti',
            'Irfan Hakim', 'Joko Widodo', 'Kartini', 'Lukman Hakim',
        ];

        for ($i = 0; $i < 15; $i++) {
            $status = $statuses[array_rand($statuses)];
            $user = $users->random();
            $letterType = $letterTypes->random();
            $submittedAt = now()->subDays(rand(0, 30))->subHours(rand(0, 23));

            LetterRequest::create([
                'user_id' => $user->id,
                'letter_type_id' => $letterType->id,
                'form_data' => [
                    'nama_lengkap' => $sampleNames[array_rand($sampleNames)],
                    'nik' => fake()->numerify('################'),
                    'alamat' => fake()->address(),
                    'keperluan' => fake()->sentence(),
                ],
                'status' => $status,
                'admin_notes' => $status !== 'pending' ? fake()->sentence() : null,
                'submitted_at' => $submittedAt,
                'reviewed_at' => $status !== 'pending' ? $submittedAt->copy()->addHours(rand(1, 48)) : null,
            ]);
        }

        $this->command->info('Created 15 letter request records.');
    }
}
