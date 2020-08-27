function onLoadPageVenda() {
    venda = new VendaCtrl()
    var isAutenticated = venda.vefifyUser()
    if (isAutenticated)
        venda.load()
    else
        window.location.href = "http://127.0.0.1:8000/";

}

class VendaCtrl {

    constructor(vendas) {
        this.vendas = vendas
    }


    vefifyUser() {
        var userStored = localStorage['user'];
        if (userStored) {
            $("#nomeUsuario").html(userStored)
            return true
        } else return false
    }

    load() {
        var apis = new Apis()
        apis.loadDataVenda()
    }

    renderData(data) {
        venda.setVendas(data.vendas)
        this.renderTable(venda.getVendas())
    }

    renderTable(data) {
        var html
        var valorTotalTodasVendas = 0
        var valorTotalTodasVendasMenosDescontos = 0
        var iconTrash = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-trash' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>" +
            "<path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/>" +
            "<path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/></svg>"
        var iconPencil = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-pencil' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>" +
            "<path fill-rule='evenodd' d='M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z'/>" +
            "<path fill-rule='evenodd' d='M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z'/></svg>"

        if (data.length == 0)
            $("#tbody").html("<tr><td>Nenhum registro encontrado para o filtro aplicado...</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>")

        for (var i = 0; i < data.length; i++) {
            valorTotalTodasVendasMenosDescontos = parseFloat(data[i].total_venda - data[i].desconto_venda)
            valorTotalTodasVendas = parseFloat(valorTotalTodasVendas) + parseFloat(valorTotalTodasVendasMenosDescontos)
            html += "<tr><th scope='row'>" + data[i].id + "</th><td>" + data[i].nome_fabrica + "</td><td>" + data[i].nome_modelo + "</td><td>" + data[i].tamanho_numeracao + "</td><td>" +
                data[i].nome_cliente + "</td><td>" + data[i].quantidade_produto + "</td><td>" + "R$" + data[i].total_venda + "</td><td>" + "R$" + data[i].desconto_venda +
                "</td><td>" + "R$" + valorTotalTodasVendasMenosDescontos.toFixed(2) + "</td><td>" + data[i].forma_pagamento +
                "</td><td>" + new Date(data[i].created_at).toLocaleDateString() + "</td>" +
                "<td><button class='btn btn-outline-info mb-2' data-toggle='modal' data-target='#exampleModal' id='" + data[i].id + "'>" + iconPencil + "Editar</button></td>" +
                "<td><button class='btn btn-outline-danger mb-2' data-toggle='modal' data-target='#modalAlert' id='" + data[i].id + "'>" + iconTrash + "Excluir </button></td > < /tr>"
        }
        $("#tbody").html(html)
        $("#valorTotalTodasVendas").html(valorTotalTodasVendas.toFixed(2))

        this.registerEvents()

    }

    registerEvents() {

        $('#desconto').mask('#,##0.00', { reverse: true });
        $('#desconto').val('0');

        $("#submit").click(function(e) {
            var obj = new Object()
            var main = new Main()
            obj.nomeCliente = $("#nomeCliente").val()
            obj.produto = $("#produto option:selected").val()
            obj.quantidade = parseInt($("#quantidade").val())
            obj.valorTotal = parseFloat($("#valorTotal").html())
            obj.desconto = parseFloat($("#desconto").val())
            obj.valorTotal = obj.valorTotal + obj.desconto

            obj.formaPagamento = $("#formaPagamento option:selected").html()

            if (obj.nomeCliente === "" || obj.produto === "-" || obj.quantidade === NaN || obj.valorTotal == NaN || obj.desconto == NaN || obj.formaPagamento == "") {
                main.setError("Por favor preencha todos os campos.")
                return
            }

            if (obj.quantidade <= 0 || obj.valorTotal <= 0) {
                main.setError("Campos numerais devem ser maiores que zero")
                return
            }

            if (obj.desconto < 0) {
                main.setError("Desconto deve ser maior que zero")
                return
            }

            $("#error").addClass("d-none")

            var apis = new Apis()



            if ($("#submit").attr("meta") == "") {
                apis.postVendaData(obj, function(data) {
                    apis.vendas = data
                    var venda = new VendaCtrl()
                    venda.renderData(apis)

                    $("#exampleModal").modal('hide')
                    main.setSuccess("Venda registrada com sucesso!")
                })

            } else {
                apis.updateVendaData($("#submit").attr("meta-id"), obj, function(data) {
                    apis.vendas = data
                    var venda = new VendaCtrl()
                    venda.renderData(apis)

                    $("#exampleModal").modal('hide')
                    main.setSuccess("Atualização realizada com sucesso!")
                })
            }


            e.stopImmediatePropagation()
        })

        $(".btn-outline-info").click(function(e) {
            var id = $(this).attr("id");
            var api = new Apis()
            api.getVendaData(id);
        })

        $(".btn-outline-danger").click(function(e) {
            var id = $(this).attr("id");
            $("#msgAlert").append("Tem certeza que deseja excluir o registro <strong class='ml-1'> CODIGO: " + id + " ?</strong>")
            $("#submitAlert").attr("meta", id)
        })

        $("#submitAlert").click(function(e) {
            var main = new Main()
            var api = new Apis()

            var id = $(this).attr("meta")
            api.deleteVendaData(id)
            e.stopImmediatePropagation()
        })

        $('#modalAlert').on('hidden.bs.modal', function() {
            $("#msgAlert").html("")
            $("#submitAlert").attr("meta", "")
        })

        $('#exampleModal').on('hidden.bs.modal', function() {
            $("#submit").attr("meta", "")
            $("#submit").attr("meta-id", "")
            $("#produto").attr("disabled", false)
        })

        $('#insConfronto').click(function(e) {
            $("#produto").html("<option selected> - </option")
            var api = new Apis()
            api.loadProdutosData(function(data) {
                data.forEach(i => {
                    $("#produto").append("<option value='" + i.id + "'> " + i.nome_modelo + " N°- " + i.tamanho_numeracao + " </option>")
                });
            })
        })

        $("#produto").change(function(e) {
            var api = new Apis()

            var id = $("#produto option:selected").val()

            api.getProduto(id, function(data) {
                $("#quantidade").attr("max", data[0].quantidade_produto)
                $("#quantidade").attr("placeholder", "Quantidade em estoque: " + data[0].quantidade_produto)
                $("#numeracao").val(data[0].tamanho_numeracao)
                $("#numeracao").attr("disabled", true)
                $("#valorTotal").html("")
                $("#valorTotal").append(data[0].valor_venda)
                $("#valorProduto").append(data[0].valor_venda)

            })
            e.stopImmediatePropagation()
        })

        $("#quantidade").change(function(e) {
            var valor = $("#valorProduto").html()
            var quantidade = $("#quantidade").val()
            var desconto = $("#desconto").val()

            valor = parseFloat(valor)
            quantidade = parseInt(quantidade)
            valor = parseFloat(quantidade * valor).toFixed(2)
            valor = parseFloat(valor - desconto).toFixed(2)
            $("#valorTotal").html(valor)
            e.stopImmediatePropagation()
        })


        $("#desconto").change(function(e) {
            var valor = $("#valorProduto").html()
            var quantidade = $("#quantidade").val()
            var desconto = $("#desconto").val()

            valor = parseFloat(valor)
            quantidade = parseInt(quantidade)
            valor = parseFloat(quantidade * valor).toFixed(2)
            valor = parseFloat(valor - desconto).toFixed(2)
            $("#valorTotal").html(valor)
            e.stopImmediatePropagation()
        })

        $("#search").keyup(function(e) {

            var api = new Apis()

            if ($("#search").val() === "") {
                api.loadDataVenda()
            }

            if ($("#search").val().length > 2) {
                api.loadDataVendaFiltered($(this).val())
                    // $("#search").attr("disabled", true)
            }
            e.stopImmediatePropagation()
        })


        $("#logOff").click(function(e) {
            var usuario = new UsuarioCtrl()
            usuario.logOff()
            e.stopImmediatePropagation()
        })

        $("#listAll").click(function(e) {
            var apis = new Apis()
            apis.loadDataAllVendas()
            e.stopImmediatePropagation()
        })

    }

    loadVendaDataModal(data) {
        // $("#fabrica").val(data.venda[0].nome_fabrica)
        $("#produto").html("<option selected value='" + data.venda[0].produtoId + "'> " + data.venda[0].nome_modelo + " N°- " + data.venda[0].tamanho_numeracao + " </option>")
        $("#produto").attr("disabled", true)
        $("#numeracao").val(data.venda[0].tamanho_numeracao)
        $("#quantidade").val(data.venda[0].quantidade_produto)
        $("#valorProduto").html(data.venda[0].valor_venda)
        $("#valorTotal").html(parseFloat(data.venda[0].total_venda - data.venda[0].desconto_venda).toFixed(2))
        $("#desconto").val(data.venda[0].desconto_venda)
        $("#nomeCliente").val(data.venda[0].nome_cliente)
        $("#formaPagamento").val(data.venda[0].forma_pagamento)

        $("#submit").attr("meta", "update")
        $("#submit").attr("meta-id", data.venda[0].id)
    }

    setError(msg) {
        $("#error").html(msg)
        $("#error").removeClass("d-none")
    }

    getVendas() {
        return this.Vendas
    }

    setVendas(Vendas) {
        this.Vendas = Vendas
    }

}
