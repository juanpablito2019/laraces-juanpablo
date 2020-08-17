<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FormativeMeasureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('formative_measures')->insert([
            [
                'id'=>1,
                'name'=>'Llamado de atención verbal'
            ],[
                'id'=>2,
                'name'=>'Plan de mejoramiento disciplinario'
            ],[
                'id'=>3,
                'name'=>'Plan de mejoramiento académico'
            ],[
                'id'=>4,
                'name'=>'Plan de mejoramiento académico disciplinario'
            ]
        ]);
    }
}
