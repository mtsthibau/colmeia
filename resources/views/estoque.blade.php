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
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <a class="nav-link" href="venda">Vendas <span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item active">
                    <a class="nav-link" href="estoque">Estoque</a>
                </li>
                <li class="nav-item">
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
            <h3 class="ml-4 mt-4">Estoque</h3>
            <h5 class="ml-4 mt-4">
                Valor total investido - R$<span id="valorTotalInvestido"></span>
                <span class="ml-1 text-danger" style="font-size: 13px"> * Valores Dinâmicos</span>
            </h5>
        </panel-header>
    </panel>

    <content>
        <div class="ml-4 mr-4">
            <div class="alert alert-danger d-none" role="alert" id="error"></div>
            <div class="alert alert-success d-none" role="alert" id="success"></div>
            <button class="btn btn-success float-right mb-3" id="insConfronto" data-toggle="modal" data-target="#exampleModal">
                <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-tags-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M3 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 7.586 1H3zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                    <path d="M1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z" />
                </svg>
                Novo Produto
            </button>
            <div class="input-group mb-3">
                <input type="text" id="search" class="form-control" placeholder="Busque por fábrica ou modelo ..." min="0">
            </div>
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
                        <th scope="col">Total Investido(R$)</th>
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
                    <h5 class="modal-title" id="exampleModalLabel">Novo Produto</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="alert alert-danger d-none ml-2" role="alert" id="errorModal"></div>
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
                                <select class="custom-select" id="numeracao" placeholder="Selecione uma forma de pagamento">
                                    <option selected></option>
                                    <option value="PP">PP</option>
                                    <option value="P">P</option>
                                    <option value="G">M</option>
                                    <option value="GG">GG</option>
                                    <option value="33">33</option>
                                    <option value="34">34</option>
                                    <option value="35">35</option>
                                    <option value="36">36</option>
                                    <option value="37">37</option>
                                    <option value="38">38</option>
                                    <option value="39">39</option>
                                    <option value="40">40</option>
                                    <option value="41">41</option>
                                    <option value="42">42</option>
                                    <option value="43">43</option>
                                    <option value="44">44</option>
                                </select>
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
    <script src="{{ asset('js/Main.js') }}" type="text/javascript"></script>
    <script src="{{ asset('js/Apis.js') }}" type="text/javascript"></script>
    <script src="{{ asset('js/Produto.js') }}" type="text/javascript"></script>
    <script src="{{ asset('js/Mask.js') }}" type="text/javascript"></script>

</body>

</html>
