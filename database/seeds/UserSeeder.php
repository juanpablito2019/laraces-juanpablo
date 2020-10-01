<?php

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $superAdmin = User::create([
            'name'=>'SuperAdmin User',
            'email'=>'super@gmail.com',
            'password'=>Hash::make('super123'),
            'is_active'=>true
        ]);
        $admin = User::create([
            'name'=>'Admin User',
            'email'=>'admin@gmail.com',
            'password'=>Hash::make('admin123'),
            'is_active'=>true
        ]);
        $cordi = User::create([
            'name'=>'Cordinador User',
            'email'=>'cordi@gmail.com',
            'password'=>Hash::make('cordi123'),
            'is_active'=>true
        ]);
        $subdi = User::create([
            'name'=>'Subdirector User',
            'email'=>'subdi@gmail.com',
            'password'=>Hash::make('subdi123'),
            'is_active'=>true
        ]);
        
        $superAdmin->assignRole('SuperAdmin'); // Super Admin
        $admin->assignRole('Administrador'); // Super Admin
        $cordi->assignRole('Coordinador');
        $subdi->assignRole('Subdirector');

        // $roles -> $permisos
        // $users -> $roles
        // $users -> $permisos
    }
}
