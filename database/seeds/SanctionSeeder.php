<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SanctionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('sanctions')->insert([
            [
                'id'=>1,
                'name'=>'Llamado de atención escrito'
            ],[
                'id'=>2,
                'name'=>'Condicionamiento de matricula'
            ],[
                'id'=>3,
                'name'=>'Cancelación de matricula'
            ]
        ]);
    }
}
