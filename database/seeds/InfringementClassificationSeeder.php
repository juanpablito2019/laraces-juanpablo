<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class InfringementClassificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('infringement_classifications')->insert([
            [
                'id'=>1,
                'name'=>'LEVE'
            ],[
                'id'=>2,
                'name'=>'GRAVE'
            ],[
                'id'=>3,
                'name'=>'GRAVISIMA'
            ]
        ]);
    }
}
