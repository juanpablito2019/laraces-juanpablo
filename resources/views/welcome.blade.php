<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Laravel</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    </head>
    <body>
        <div class="container" style="margin: 200px auto">
            <div class="row">
                <div class="col-12 col-md-8 col-lg-4 mx-auto">
                    <div class="card border">
                        <div class="card-body">
                            <h3>Iniciar sesión</h3>
                            @if (Route::has('password.request'))
                                <a href="{{ route('password.request') }}">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            @endif
                            <form action="{{ route('login') }}" method="POST" class="mt-3">
                                @csrf
                                <div class="form-group">
                                    <label for="email">Correo electronico</label>
                                    <input type="email" name="email" id="email" class="form-control">
                                </div>
                                <div class="form-group">
                                    <label for="email">Contraseña</label>
                                    <input type="password" name="password" id="password" class="form-control">
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
                                    <label class="form-check-label" for="remember">
                                        Recordar mi sesión
                                    </label>
                                </div>
                                <button class="btn btn-outline-primary d-block mx-auto mt-3">Ingresar!</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
