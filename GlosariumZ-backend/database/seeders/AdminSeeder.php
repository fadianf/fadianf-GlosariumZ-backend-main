<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Admin::create([
            'id' => \Illuminate\Support\Str::uuid(),
            'username' => 'admin',
            'password' => Hash::make('password123'), // Replace with a secure password
        ]);
    }
}
