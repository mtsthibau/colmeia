<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Tabela Brasileirão para teste Desenvolvedor Bernoulli">
    <meta name="author" content="Matheus Thibau Paulino">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Colméia - Despesas</title>

    <!-- Bootstrap core CSS -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/custom.css') }}" rel="stylesheet">

</head>

<body onload="onLoadPageDespesa()">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Colméia</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse float-right" id="navbarNav">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="venda">Vendas <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="estoque">Estoque</a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="despesa">Despesas</a>
                </li>
            </ul>
            <div class="form-inline my-2 my-lg-0">
                <span class="usuarioName mr-3" style="color: #FFF;" id="nomeUsuario"></span>
                <button class="btn btn-outline-success my-2 my-sm-0" id="logOff">
                    Sair
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-bar-right" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10.146 4.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L12.793 8l-2.647-2.646a.5.5 0 0 1 0-.708z" />
                        <path fill-rule="evenodd" d="M6 8a.5.5 0 0 1 .5-.5H13a.5.5 0 0 1 0 1H6.5A.5.5 0 0 1 6 8zm-2.5 6a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 1 0v11a.5.5 0 0 1-.5.5z" />
                    </svg>
                </button>
            </div>
        </div>
    </nav>
    <panel>
        <panel-header>
            <h3 class="ml-4 mt-4">Despesas</h3>
            <h5 class="ml-4 mt-4">
                Valor total despesas - R$<span id="valorTotalDespesas"></span>
                <span class="ml-1 text-danger" style="font-size: 13px"> * Valores Dinâmicos</span>
            </h5>
        </panel-header>
    </panel>

    <content>
        <div class="ml-4 mr-4">
            <button class="btn btn-success float-right mb-3" id="insConfronto" data-toggle="modal" data-target="#exampleModal">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-handbag" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M8 1a2 2 0 0 0-2 2v4.5a.5.5 0 0 1-1 0V3a3 3 0 0 1 6 0v4.5a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2z" />
                    <path fill-rule="evenodd" d="M3.405 6a.5.5 0 0 0-.498.45l-.912 6.9A1.5 1.5 0 0 0 3.488 15h9.024a1.5 1.5 0 0 0 1.493-1.65l-.913-6.9a.5.5 0 0 0-.497-.45h-9.19zm-1.493.35A1.5 1.5 0 0 1 3.405 5h9.19a1.5 1.5 0 0 1 1.493 1.35L15 13.252A2.5 2.5 0 0 1 12.512 16H3.488A2.5 2.5 0 0 1 1 13.251l.912-6.9z" />
                </svg>
                Nova Despesa
            </button>
            <div class="input-group mb-3">
                <input type="text" id="search" class="form-control" placeholder="Busque por local ou descrição..." min="0">
            </div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Codigo Despesa</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Local</th>
                        <th scope="col">Valor Despesa(R$)</th>
                        <th scope="col">Forma Pagamento</th>
                        <th scope="col">Data</th>
                        <th scope="col">Editar</th>
                        <th scope="col">Excluir</th>
                        <!-- <th scope="col">Lucro(R$)</th> -->
                    </tr>
                </thead>
                <tbody id="tbody"></tbody>
            </table>
            <button type="button" class="btn btn-primary mb-5" id="listAll" meta="">Listar todos registros</button>
        </div>
    </content>

    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Nova Despesa</h5>
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
                            <label class="input-group">Descrição Despesa</label>
                            <div class="input-group mb-3">
                                <input type="text" id="descricao" class="form-control" placeholder="Descreva a despesa" min="0">
                            </div>
                            <label class="input-group">Local Despesa</label>
                            <div class="input-group mb-3">
                                <input type="text" id="local" class="form-control" placeholder="Digite o nome do local onde a despesa foi realizada" min="0">
                            </div>
                            <label class="input-group">Valor Despesa</label>
                            <div class="input-group mb-3">
                                <input type="text" id="valor" class="form-control" placeholder="Digite o valor da despesa" min="0">
                            </div>
                            <label class="input-group">Forma de Pagamento</label>
                            <div class="input-group mb-3">
                                <select class="custom-select" id="formaPagamento" placeholder="Selecione uma forma de pagamento">
                                    <option selected></option>
                                    <option value="Boleto">Boleto</option>
                                    <option value="Dinheiro">Dinheiro</option>
                                    <option value="Cartão">Cartão</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
                        <button type="button" class="btn btn-primary" id="submit" meta="">Salvar mudanças</button>
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
                        <button type="button" class="btn btn-danger" id="submitAlert" meta="">Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>


    @section('scripts')
    <script src="{{ asset('js/app.js') }}" type="text/javascript"></script>
    <script src="{{ asset('js/Usuario.js') }}" type="text/javascript"></script>
    <script src="{{ asset('js/Main.js') }}" type="text/javascript"></script>
    <script src="{{ asset('js/Mask.js') }}" type="text/javascript"></script>
    <script src="{{ asset('js/Apis.js') }}" type="text/javascript"></script>
    <script src="{{ asset('js/Despesa.js') }}" type="text/javascript"></script>
</body>

</html>
