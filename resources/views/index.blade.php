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

<body class="text-center" onload="onLoadPageLogin()">
    <div class="col col-2 offset-5
      " style="margin-top: 100px;">
        <form class="form-signin">
            <img src="{{ asset('/../image/logo.jpg') }}" style="width: 100px;" />
            <h1 class="h3 mb-3 mt-4 font-weight-normal">Faça Login</h1>
            <label class="input-group" id="msgAlert"></label>
            <label for="usuario" class="sr-only">Usuário</label>
            <input type="email" id="usuario" class="form-control" placeholder="Usuário" required autofocus>
            <label for="senha" class="sr-only">Senha</label>
            <input type="password" id="senha" class="form-control" placeholder="Senha" required>
            <button class="btn btn-lg btn-success btn-block mt-3" type="submit">LOGIN</button>
            <p class="mt-5 mb-3 text-muted">
                <a class="navbar-brand" href="http://mtpinovacao.com/">
                    MTPINOVAÇÃO &copy; 2020
                </a>
            </p>
        </form>
    </div>
    @section('scripts')
    <script src="{{ asset('js/app.js') }}" type="text/javascript"></script>
    <script src="{{ asset('js/Main.js') }}" type="text/javascript"></script>
    <script src="{{ asset('js/Apis.js') }}" type="text/javascript"></script>
</body>

</html>
