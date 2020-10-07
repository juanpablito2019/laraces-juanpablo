<?php

namespace App\Http\Middleware;
use Illuminate\Support\Facades\Auth;

use Closure;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Permissions
{
   /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */


    public function handle($request, Closure $next, $name)
    {
        return redirect('/app');
            $user = Auth::user();

            $arreglo = $user->getPermissionsViaRoles();
            $vacio = [];


            foreach ($arreglo as $key => $value) {

                array_push($vacio, $value->name);
            }

            if (!in_array($name, $vacio)) {
                return redirect('/app');
            }
    }

}
