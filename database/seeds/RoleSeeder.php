<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('rols')->insert([
            [
                'id'=>1,
                'name'=>'Administrador',
                'description'=>'Tiene acceso a todo'
            ],[
                'id'=>2,
                'name'=>'Coordinador',
                'description'=>'Tiene acceso a menos cosas que el admin'
            ],[
                'id'=>3,
                'name'=>'Subdirector',
                'description'=>'Tiene acceso a menos cosas que el coordinador'
            ]
        ]);
    }
}
