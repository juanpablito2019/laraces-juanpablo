<?php

use App\Role;
use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
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
        DB::table('role_user')->truncate();
        $adminRole = Role::where('id', 1)->first();
        $coordinadorRole = Role::where('id', 2)->first();
        $subdirectorRole = Role::where('id', 3)->first();

        $admin = User::create([
            'name'=>'Administrador',
            'email'=>'administrador@gmail.com',
            'password'=>Hash::make('admin123')
        ]);
        $coordinador = User::create([
            'name'=>'Coordinador',
            'email'=>'coordinador@gmail.com',
            'password'=>Hash::make('coordinador2020')
        ]);
        $subdirector = User::create([
            'name'=>'Subdirector',
            'email'=>'subdirector@gmail.com',
            'password'=>Hash::make('subdirector2020')
        ]);

        $admin->roles()->attach($adminRole);
        $coordinador->roles()->attach($coordinadorRole);
        $subdirector->roles()->attach($subdirectorRole);
    }
}
