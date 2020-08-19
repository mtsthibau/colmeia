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
    <!-- <link href="{{ asset('../css/fontawesome-free') }}" rel="stylesheet"> -->

</head>

<body onload="onLoadPageVenda()">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Colméia</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse float-right" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="venda"><i class="fas fa-user"></i> Vendas </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="estoque">Estoque</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="gastos">Gastos</a>
                </li>
            </ul>
        </div>
        <div class="form-inline my-2 my-lg-0">
            <span class="usuarioName mr-3" style="color: #FFF;"> Matheus Thibau Pauino </span>
            <button class="btn btn-outline-success my-2 my-sm-0">Sair</button>
        </div>
    </nav>
    <panel>
        <panel-header>
            <h3 class="ml-4 mt-4">Vendas </h3>
            <h5 class="ml-4 mt-4">
                Valor total vendas - R$<span id="valorTotalTodasVendas"></span>
                <span class="ml-1 text-danger" style="font-size: 13px"> * Valores Dinâmicos</span>
            </h5>
        </panel-header>
    </panel>

    <content>
        <div class="ml-4 mr-4">
            <div class="alert alert-success d-none" role="alert" id="success"></div>
            <button class="btn btn-success float-right mb-3" id="insConfronto" data-toggle="modal" data-target="#exampleModal">Nova Venda</button>
            <div class="input-group mb-3">
                <input type="text" id="search" class="form-control" placeholder="Busque por fábrica, modelo ou cliente..." min="0">
            </div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Cod. Venda</th>
                        <th scope="col">Fábrica</th>
                        <th scope="col">Produto</th>
                        <th scope="col">N°</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Quantidade</th>
                        <th scope="col">Total Venda(R$)</th>
                        <th scope="col">Forma de Pagamento</th>
                        <th scope="col">Excluir</th>
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
                    <h5 class="modal-title" id="exampleModalLabel"><i class=""></i> Nova Venda</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="alert alert-danger d-none" role="alert" id="error"></div>
                    </div>
                    <div class="row">
                        <div class="col col-12">
                            <label class="input-group">Cliente</label>
                            <div class="input-group mb-3">
                                <input type="text" id="nomeCliente" class="form-control" placeholder="Digite o nome do cliente" min="0">
                            </div>
                            <label class="input-group">Produto</label>
                            <div class="input-group mb-3">
                                <select class="custom-select" id="produto" placeholder="Selecione um produto">
                                    <option selected> - </option>
                                </select>
                            </div>
                            <label class="input-group">Quantidade</label>
                            <div class="input-group mb-3">
                                <input type="number" id="quantidade" class="form-control" placeholder="Selecione o produto" min="0">
                            </div>
                            <label class="input-group">Numeração</label>
                            <div class="input-group mb-3">
                                <input type="number" id="numeracao" class="form-control" placeholder="Selecione o produto" min="0">
                            </div>
                            <label class="input-group">Forma de Pagamento</label>
                            <div class="input-group mb-3">
                                <select class="custom-select" id="formaPagamento" placeholder="Selecione uma forma de pagamento">
                                    <option selected> </option>
                                    <option value="Boleto">Boleto</option>
                                    <option value="Dinheiro">Dinheiro</option>
                                    <option value="Cartão">Cartão</option>
                                </select>
                            </div>
                            <!-- <label class="input-group">Quantidade</label>
                            <div class="input-group mb-3">
                                <input type="number" id="nomeCliente" class="form-control" placeholder="Digite o nome do cliente" min="0">
                            </div> -->
                            <div class="alert alert-info">
                                <strong> Total - R$ <span id="valorTotal"></span></strong>
                            </div>
                            <span id="valorProduto" class="d-none"></span>
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
                        <div class="alert alert-danger d-none" role="alert" id="error"></div>
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
    <!-- <footer class="footer">
      <div class="container">
        <span class="text-muted">Place sticky footer content here.</span>
      </div>
    </footer> -->
    @section('scripts')
    <script src="{{ asset('js/app.js') }}" type="text/javascript"></script>
    <script src="{{ asset('js/Apis.js') }}" type="text/javascript"></script>
    <script src="{{ asset('js/Main.js') }}" type="text/javascript"></script>
    <script src="{{ asset('js/Produto.js') }}" type="text/javascript"></script>
    <script src="{{ asset('js/Venda.js') }}" type="text/javascript"></script>
</body>

</html>
