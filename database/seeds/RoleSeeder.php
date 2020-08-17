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
        DB::table('roles')->insert([
            [
                'id'=>1,
                'name'=>'Administrador',
            ],[
                'id'=>2,
                'name'=>'Coordinador',
            ],[
                'id'=>3,
                'name'=>'Subdirector',
            ]
        ]);
    }
}
