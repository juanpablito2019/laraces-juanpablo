<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommitteeSessionTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('committee_session_types')->insert([
            [
                'id'=>1,
                'name'=>'Estímulos e incentivos'
            ],[
                'id'=>2,
                'name'=>'Novedad del aprendiz'
            ],[
                'id'=>3,
                'name'=>'Académico Disciplinario'
            ]
        ]);
    }
}
