<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommitteeSessionStateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('committee_session_states')->insert([
            [
                'id'=>1,
                'name'=>'Registrado'
            ],[
                'id'=>2,
                'name'=>'Comunicación al aprendiz'
            ],[
                'id'=>3,
                'name'=>'Acta de comité'
            ],[
                'id'=>4,
                'name'=>'Acto sancionatorio'
            ]
        ]);
    }
}
