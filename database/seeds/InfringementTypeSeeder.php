<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InfringementTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('infringement_types')->insert([
            [
                'id'=>1,
                'name'=>'ACADEMICA'
            ],[
                'id'=>2,
                'name'=>'DISCIPLINARIA'
            ],[
                'id'=>3,
                'name'=>'ACADEMICA Y DISCIPLINARIA'
            ]
        ]);
    }
}
