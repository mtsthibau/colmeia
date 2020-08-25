class Apis {

    loadDataProduto() {
        var apis = new Apis()

        this.loadProdutosData(function(data) {
            apis.produtos = data
            var produto = new ProdutoCtrl()
            produto.renderData(apis)
        })
    }

    loadDataAllProdutos() {
        var apis = new Apis()

        this.loadAllProdutosData(function(data) {
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

    loadDataAllVendas() {
        var apis = new Apis()

        this.loadAllVendasData(function(data) {
            apis.vendas = data
            var venda = new VendaCtrl()
            venda.renderData(apis)
        })
    }

    loadDataDespesa() {
        var apis = new Apis()

        this.loadDespesasData(function(data) {
            apis.despesas = data
            var despesa = new DespesaCtrl()
            despesa.renderData(apis)
        })
    }

    loadDataAllDespesas() {
        var apis = new Apis()

        this.loadAllDespesasData(function(data) {
            apis.despesas = data
            var despesa = new DespesaCtrl()
            despesa.renderData(apis)
        })
    }



    loadDataVendaFiltered(filter) {
        var apis = new Apis()

        this.loadVendasDataFiltered(filter, function(data) {
            apis.vendas = data
            var venda = new VendaCtrl()
            venda.renderData(apis)
        })
    }

    loadDataProdutosFiltered(filter) {
        var apis = new Apis()

        this.loadProdutosDataFiltered(filter, function(data) {
            apis.produtos = data
            var produto = new ProdutoCtrl()
            produto.renderData(apis)
        })
    }

    loadDataDespesasFiltered(filter) {
        var apis = new Apis()

        this.loadDespesasDataFiltered(filter, function(data) {
            apis.despesas = data
            var despesa = new DespesaCtrl()
            despesa.renderData(apis)
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

    getDespesaData(id) {
        var apis = new Apis()

        this.getDespesa(id, function(data) {
            apis.despesa = data
            var despesa = new DespesaCtrl()
            despesa.loadDespesaDataModal(apis)
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

    deleteVendaData(id) {
        var apis = new Apis()
        var main = new Main()

        this.deleteVenda(id, function(data) {
            apis.vendas = data
            var venda = new VendaCtrl()
            venda.renderData(apis)
            $("#modalAlert").modal('hide')
            main.setSuccess("Exclusão realizada com sucesso!")
        })
    }

    deleteDespesaData(id) {
        var apis = new Apis()
        var main = new Main()

        this.deleteDespesa(id, function(data) {
            apis.despesas = data
            var despesa = new DespesaCtrl()
            despesa.renderData(apis)
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
                return callBack(data.data);
            },
            error: function(data) {
                alert("Erro durante download dos dados. Por favor tente novamente")
                return null;
            }
        });
    }


    loadAllVendasData(callBack) {
        var url = "http://127.0.0.1:8000/api/todasVendas"

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

    loadVendasDataFiltered(filter, callBack) {
        var url = "http://127.0.0.1:8000/api/vendasFiltered/" + filter

        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                $("#search").attr("disabled", false)
                return callBack(data.data);
            },
            error: function(data) {
                alert("Erro durante download dos dados. Por favor tente novamente")
                return null;
            }
        });
    }

    loadProdutosDataFiltered(filter, callBack) {
        var url = "http://127.0.0.1:8000/api/produtosFiltered/" + filter

        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                $("#search").attr("disabled", false)
                return callBack(data.data);
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
                return callBack(data.data);
            },
            error: function(data) {
                alert("Erro durante download dos dados. Por favor tente novamente")
                return null;
            }
        });
    }

    loadAllProdutosData(callBack) {
        var url = "http://127.0.0.1:8000/api/todosProdutos"

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
                return callBack(data.data);
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

    // VENDAS

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

    deleteVenda(id, callBack) {
        var url = "http://127.0.0.1:8000/api/deletaVenda/" + id

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


    loginUsuario(obj, callBack) {
        var url = "http://127.0.0.1:8000/api/login/"

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': "{{ csrf_token() }}"
            }
        });

        $.ajax({
            url: url,
            method: 'GET',
            data: obj,
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
                main.setError("Erro durante a solicitação, por favor tente novamente ou contate o administrador.")
                return null
            }
        });
    }

    loadDespesasDataFiltered(filter, callBack) {
        var url = "http://127.0.0.1:8000/api/despesasFiltered/" + filter

        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                $("#search").attr("disabled", false)
                return callBack(data.data);
            },
            error: function(data) {
                alert("Erro durante download dos dados. Por favor tente novamente")
                return null;
            }
        });
    }

    loadDespesasData(callBack) {
        var url = "http://127.0.0.1:8000/api/despesas"

        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                return callBack(data.data);
            },
            error: function(data) {
                alert("Erro durante download dos dados. Por favor tente novamente")
                return null;
            }
        });
    }

    loadAllDespesasData(callBack) {
        var url = "http://127.0.0.1:8000/api/todasDespesas"

        $.ajax({
            url: url,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                return callBack(data.data);
            },
            error: function(data) {
                alert("Erro durante download dos dados. Por favor tente novamente")
                return null;
            }
        });
    }

    postDespesaData(data, callBack) {
        var url = "http://127.0.0.1:8000/api/novaDespesa"

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

    updateDespesaData(id, data, callBack) {
        var url = "http://127.0.0.1:8000/api/editaDespesa/" + id

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
                return callBack(data.data);
            },
            error: function(data) {
                var main = new Main()
                main.setError("Erro durante a gravação dos dados.Por favor tente novamente!")
                return null
            }
        });
    }

    deleteDespesa(id, callBack) {
        var url = "http://127.0.0.1:8000/api/deletaDespesa/" + id

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

    getDespesa(id, callBack) {
        var url = "http://127.0.0.1:8000/api/despesa/" + id

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