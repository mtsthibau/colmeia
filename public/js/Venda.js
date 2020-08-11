function onLoadPageVenda() {
    venda = new VendaCtrl()
    venda.load()
}

class VendaCtrl {

    constructor(vendas) {
        this.vendas = vendas
    }

    load() {
        var apis = new Apis()
        apis.loadDataVenda()
        this.registerEvents()
    }

    renderData(data) {
        venda.setVendas(data.vendas)
        this.renderTable(venda.getVendas())
    }

    renderTable(data) {
        var html
        for (var i = 0; i < data.length; i++) {
            html += "<tr><th scope='row'>" + (i + 1) + "</th><td>" + data[i].codigo_item + "</td>><td>" + data[i].nome_cliente + "</td><td><b>" + data[i].codigo_item + "</b></td><td>" +
                data[i].total_venda + "</td><td>" + data[i].forma_pagamento + "</td></tr>" +
                "<td><button class='btn btn-outline-info mb-2' data-toggle='modal' data-target='#exampleModal' id='" + data[i].id + "'>Editar</button></td>" +
                "<td><button class='btn btn-outline-danger mb-2' data-toggle='modal' data-target='#modalAlert' id='" + data[i].id + "'>Excluir</button></td></tr>"
        }
        $("#tbody").html(html)
    }

    registerEvents() {

        // $('#valorCompra').mask('#.##0,00', { reverse: true });
        // $('#valorVenda').mask('#.##0,00', { reverse: true });

        $("#submit").click(function() {
            var obj = new Object()
            var main = new Main()
            obj.nomeCliente = $("#nomeCliente").val()
            obj.produto = $("#produto").val()
            obj.quantidade = parseInt($("#quantidade").val())
            obj.numeracao = parseInt($("#numeracao").val())
            obj.formaPagamento = parseFloat($("#formaPagamento").val()).toFixed(2)

            // if (obj.fabrica === "" || obj.modelo === "" || obj.numeracao === NaN || obj.numeracao <= 0 || obj.quantidade === NaN || obj.quantidade <= 0 || obj.valorCompra == NaN || obj.valorVenda == NaN) {
            //     main.setError("Por favor preencha todos os campos.")
            //     return
            // }

            // if (obj.valorCompra <= 0 || obj.valorVenda <= 0 || obj.numeracao <= 0 || obj.quantidade <= 0) {
            //     main.setError("Campos numerais devem ser maiores que zero")
            //     return
            // }

            $("#error").addClass("d-none");

            var apis = new Apis()


            if ($("#submit").attr("meta") == "") {
                apis.postVendaData(obj, function(data) {
                    apis.vendas = data
                    var venda = new VendaCtrl()
                    venda.renderData(apis)

                    $("#exampleModal").modal('hide')
                    main.setSuccess("Cadastro realizado com sucesso!")

                })
            } else {
                apis.updateProdutoData($("#submit").attr("meta-id"), obj, function(data) {
                    apis.produtos = data
                    var produto = new ProdutoCtrl()
                    produto.renderData(apis)

                    $("#exampleModal").modal('hide')
                    main.setSuccess("Atualização realizada com sucesso!")
                })
            }

            event.stopPropagation()
        })

        $(".btn-outline-danger").click(function() {
            var id = $(this).attr("id");
            $("#msgAlert").append("Tem certeza que deseja excluir o registro <strong class='ml-1'> CODIGO: " + id + " ?</strong>")
            $("#submitAlert").attr("meta", id)
        })

        $(".btn-outline-info").click(function() {
            var id = $(this).attr("id");
            var api = new Apis()
            api.getProdutoData(id);
        })

        $("#submitAlert").click(function() {
            var main = new Main()
            var api = new Apis()

            var id = $(this).attr("meta")
            api.deleteProdutoData(id)
        })

        $('#modalAlert').on('hidden.bs.modal', function(e) {
            $("#msgAlert").html("")
            $("#submitAlert").attr("meta", "")
        })

        $('#exampleModal').on('hidden.bs.modal', function(e) {
            $("#submit").attr("meta", "")
            $("#submit").attr("meta-id", "")
        })

        $('#insConfronto').click(function() {
            $("#produto").html("<option selected> - </option")
            var api = new Apis()
            api.loadProdutosData(function(data) {
                data.forEach(i => {
                    $("#produto").append("<option value='" + i.id + "'> " + i.nome_modelo + " N°- " + i.tamanho_numeracao + " </option>")
                });
            })
        })

        $("#produto").change(function() {
            var api = new Apis()

            var id = $("#produto option:selected").val()

            api.getProduto(id, function(data) {
                $("#quantidade").attr("max", data[0].quantidade_produto)
                $("#quantidade").attr("placeholder", "Quantidade em estoque: " +
                    data[0].quantidade_produto)
                $("#numeracao").val(data[0].tamanho_numeracao)
                $("#numeracao").attr("disabled", true)
            })

        })
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
