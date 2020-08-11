<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Tabela Brasileirão para teste Desenvolvedor Bernoulli">
    <meta name="author" content="Matheus Thibau Paulino">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Colméia - Estoque</title>

    <!-- Bootstrap core CSS -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/custom.css') }}" rel="stylesheet">

</head>

<body onload="onLoadEstoquePage()">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Colméia</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse float-right" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="venda">Vendas <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="estoque">Estoque</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="gastos">Gastos</a>
                </li>
            </ul>
        </div>
    </nav>
    <panel>
        <panel-header>
            <h3 class="ml-4 mt-4">Estoque</h6>
        </panel-header>
    </panel>

    <content>
        <div class="ml-4 mr-4">
            <div class="alert alert-success d-none ml-3" role="alert" id="success"></div>
            <button class="btn btn-success float-right mb-3" id="insConfronto" data-toggle="modal" data-target="#exampleModal">Novo Produto</button>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Codigo Produto</th>
                        <th scope="col">Fabrica</th>
                        <th scope="col">Modelo</th>
                        <th scope="col">Numeração</th>
                        <th scope="col">Quantidade</th>
                        <th scope="col">Valor Compra(R$)</th>
                        <th scope="col">Valor Venda(R$)</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Excluir</th>
                        <!-- <th scope="col">Lucro(R$)</th> -->
                    </tr>
                </thead>
                <tbody id="tbody"></tbody>
            </table>
        </div>
    </content>

    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Confronto</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="alert alert-danger d-none ml-3" role="alert" id="error"></div>
                    </div>
                    <div class="row">
                        <div class="col col-12">
                            <label class="input-group">Fábrica</label>
                            <div class="input-group mb-3">
                                <input type="text" id="fabrica" class="form-control" placeholder="Digite o nome da fabrica" required>
                            </div>
                            <label class="input-group">Modelo</label>
                            <div class="input-group mb-3">
                                <input type="text" id="modelo" class="form-control" placeholder="Digite o nome do modelo" required>
                            </div>
                            <label class="input-group">Numeração</label>
                            <div class="input-group mb-3">
                                <input type="number" id="numeracao" class="form-control" placeholder="Digite a numeração do modelo" min="0">
                            </div>
                            <label class="input-group">Quantidade</label>
                            <div class="input-group mb-3">
                                <input type="number" id="quantidade" class="form-control" placeholder="Digite a quantidade em estoque" min="0">
                            </div>
                            <label class="input-group">Valor de Compra</label>
                            <div class="input-group mb-3">
                                <input type="text" id="valorCompra" class="form-control" placeholder="Digite o valor de compra" min="1" required>
                            </div>
                            <label class="input-group">Valor de Venda</label>
                            <div class="input-group mb-3">
                                <input type="text" id="valorVenda" class="form-control" placeholder="Digite o valor de venda" min="2" required>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                        <button type="button" class="btn btn-primary" id="submit">Salvar mudanças</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalAlert" tabindex="-1" role="dialog" aria-labelledby="modalAlertLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalAlertLabel">CONFIRMAÇÃO</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="alert alert-danger d-none ml-3" role="alert" id="error"></div>
                    </div>
                    <div class="row">
                        <div class="col col-12">
                            <label class="input-group" id="msgAlert"></label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        <button type="button" class="btn btn-danger" id="submitAlert">Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    @section('scripts')
    <script src="{{ asset('js/app.js') }}" type="text/javascript"></script>
    <script src="{{ asset('js/Main.js') }}" type="text/javascript"></script>
    <script src="{{ asset('js/Apis.js') }}" type="text/javascript"></script>
    <script src="{{ asset('js/Produto.js') }}" type="text/javascript"></script>
    <script src="{{ asset('js/Mask.js') }}" type="text/javascript"></script>

</body>

</html>
