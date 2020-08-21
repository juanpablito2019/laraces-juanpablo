<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NoveltyTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('novelty_types')->insert([
            [
                'id'=>1,
                'name'=>'APLZAMIENTO DE MATRICULA'
            ],[
                'id'=>2,
                'name'=>'RETIRO VOLUNTARIO'
            ],[
                'id'=>3,
                'name'=>'TRASLADO'
            ],[
                'id'=>4,
                'name'=>'REINGRESO'
            ],[
                'id'=>5,
                'name'=>'RETIRO LEGALIZADO'
            ]
        ]);
    }
}
