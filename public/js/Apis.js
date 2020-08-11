class Apis {

    loadDataProduto() {
        var apis = new Apis()

        this.loadProdutosData(function(data) {
            apis.produtos = data
            var produto = new ProdutoCtrl()
            produto.renderData(apis)
        })
    }

    loadDataVenda() {
        var apis = new Apis()

        this.loadVendasData(function(data) {
            apis.vendas = data
            var venda = new VendaCtrl()
            venda.renderData(apis)
        })
    }

    getProdutoData(id) {
        var apis = new Apis()

        this.getProduto(id, function(data) {
            apis.produto = data
            var produto = new ProdutoCtrl()
            produto.loadProdutoDataModal(apis)
        })
    }

    deleteProdutoData(id) {
        var apis = new Apis()
        var main = new Main()

        this.deleteProduto(id, function(data) {
            apis.produtos = data
            var produto = new ProdutoCtrl()
            produto.renderData(apis)
            $("#modalAlert").modal('hide')
            main.setSuccess("Exclusão realizada com sucesso!")
        })
    }

    loadVendasData(callBack) {
        var url = "http://127.0.0.1:8000/api/vendas"

        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                return callBack(data);
            },
            error: function(data) {
                alert("Erro durante download dos dados. Por favor tente novamente")
                return null;
            }
        });
    }


    loadProdutosData(callBack) {
        var url = "http://127.0.0.1:8000/api/produtos"

        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                return callBack(data);
            },
            error: function(data) {
                alert("Erro durante download dos dados. Por favor tente novamente")
                return null;
            }
        });
    }

    postProdutoData(data, callBack) {
        var url = "http://127.0.0.1:8000/api/novoProduto"

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': "{{ csrf_token() }}"
            }
        });

        $.ajax({
            url: url,
            method: 'POST',
            data: data,
            dataType: 'json',
            success: function(data) {
                if (data.error) {
                    var main = new Main()
                    main.setError(data.error)
                    return
                }
                return callBack(data);
            },
            error: function(data) {
                var main = new Main()
                main.setError("Erro durante a gravação dos dados.Por favor tente novamente!")
                return null
            }
        });
    }

    updateProdutoData(id, data, callBack) {
        var url = "http://127.0.0.1:8000/api/editaProduto/" + id

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': "{{ csrf_token() }}"
            }
        });

        $.ajax({
            url: url,
            method: 'POST',
            data: data,
            dataType: 'json',
            success: function(data) {
                if (data.error) {
                    var main = new Main()
                    main.setError(data.error)
                    return
                }
                return callBack(data);
            },
            error: function(data) {
                var main = new Main()
                main.setError("Erro durante a gravação dos dados.Por favor tente novamente!")
                return null
            }
        });
    }

    deleteProduto(id, callBack) {
        var url = "http://127.0.0.1:8000/api/deletaProduto/" + id

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': "{{ csrf_token() }}"
            }
        });

        $.ajax({
            url: url,
            method: 'POST',
            data: null,
            dataType: 'json',
            success: function(data) {
                if (data.error) {
                    var main = new Main()
                    main.setError(data.error)
                    return
                }
                return callBack(data);
            },
            error: function(data) {
                var main = new Main()
                main.setError("Erro durante a gravação dos dados.Por favor tente novamente!")
                return null
            }
        });

    }

    getProduto(id, callBack) {
        var url = "http://127.0.0.1:8000/api/produto/" + id

        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                return callBack(data);
            },
            error: function(data) {
                alert("Erro durante download dos dados. Por favor tente novamente")
                return null;
            }
        });
    }

    // VENDAS

    postVendaData(data, callBack) {
        var url = "http://127.0.0.1:8000/api/novaVenda"

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': "{{ csrf_token() }}"
            }
        });

        $.ajax({
            url: url,
            method: 'POST',
            data: data,
            dataType: 'json',
            success: function(data) {
                if (data.error) {
                    var main = new Main()
                    main.setError(data.error)
                    return
                }
                return callBack(data);
            },
            error: function(data) {
                var main = new Main()
                main.setError("Erro durante a gravação dos dados.Por favor tente novamente!")
                return null
            }
        });
    }

    updateProdutoData(id, data, callBack) {
        var url = "http://127.0.0.1:8000/api/editaProduto/" + id

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': "{{ csrf_token() }}"
            }
        });

        $.ajax({
            url: url,
            method: 'POST',
            data: data,
            dataType: 'json',
            success: function(data) {
                if (data.error) {
                    var main = new Main()
                    main.setError(data.error)
                    return
                }
                return callBack(data);
            },
            error: function(data) {
                var main = new Main()
                main.setError("Erro durante a gravação dos dados.Por favor tente novamente!")
                return null
            }
        });
    }

    deleteProduto(id, callBack) {
        var url = "http://127.0.0.1:8000/api/deletaProduto/" + id

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': "{{ csrf_token() }}"
            }
        });

        $.ajax({
            url: url,
            method: 'POST',
            data: null,
            dataType: 'json',
            success: function(data) {
                if (data.error) {
                    var main = new Main()
                    main.setError(data.error)
                    return
                }
                return callBack(data);
            },
            error: function(data) {
                var main = new Main()
                main.setError("Erro durante a gravação dos dados.Por favor tente novamente!")
                return null
            }
        });

    }

    getProduto(id, callBack) {
        var url = "http://127.0.0.1:8000/api/produto/" + id

        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                return callBack(data);
            },
            error: function(data) {
                alert("Erro durante download dos dados. Por favor tente novamente")
                return null;
            }
        });
    }
}
