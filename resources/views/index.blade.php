<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Sistema de estoque e vendas - Colméia">
    <meta name="author" content="Matheus Thibau Paulino">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Colméia - Vendas</title>

    <!-- Bootstrap core CSS -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/custom.css') }}" rel="stylesheet">
    <link href="{{ asset('../css/fontawesome-free') }}" rel="stylesheet">

</head>

<body onload="onLoadPageIndex()">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Colméia</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
    </nav>

    <div class="col col-6" style="margin-top: 10%;">
        <div class="col col-4 offset-3">
            <div class="card">
                <div class="card-header">
                    Login
                </div>

                <div class="card-body">
                    <div class="row">
                        <div class="col col-12">
                            <label class="input-group">Usuário</label>
                            <div class="input-group mb-3">
                                <input type="text" id="user" class="form-control" placeholder="Usuário" required>
                            </div>
                            <label class="input-group">Senha</label>
                            <div class="input-group mb-3">
                                <input type="password" id="password" class="form-control" placeholder="Senha" required>
                            </div>
                            <button type="button" class="btn btn-success" id="submit">Entrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="col col-6">
        <!-- <img src="/public/image/logo.jpg"> -->
    </div>

    </div>


    <content>

    </content>

    @section('scripts')
    <script src="{{ asset('js/app.js') }}" type="text/javascript"></script>
    <script src="{{ asset('js/Main.js') }}" type="text/javascript"></script>
    <script src="{{ asset('js/Apis.js') }}" type="text/javascript"></script>
</body>

</html>
