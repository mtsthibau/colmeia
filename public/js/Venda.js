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
    }

    renderData(data) {
        venda.setVendas(data.vendas)
        this.renderTable(venda.getVendas())
    }

    renderTable(data) {
        var html
        var valorTotalTodasVendas = 0
        if (data.length == 0)
            $("#tbody").html("<tr><td>Nenhum registro encontrado para o filtro aplicado...</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>")

        for (var i = 0; i < data.length; i++) {
            valorTotalTodasVendas = parseFloat(valorTotalTodasVendas) + parseFloat(data[i].total_venda)
            html += "<tr><th scope='row'>" + data[i].id + "</th><td>" + data[i].nome_fabrica + "</td><td>" + data[i].nome_modelo + "</td><td>" + data[i].tamanho_numeracao + "</td><td>" +
                data[i].nome_cliente + "</td><td>" + data[i].quantidade_produto + "</td><td>" + "R$" + data[i].total_venda + "</td><td>" + data[i].forma_pagamento + "</td>" +
                // "<td><button class='btn btn-outline-info mb-2' data-toggle='modal' data-target='#exampleModal' id='" + data[i].id + "'>Editar</button></td>" +
                "<td><button class='btn btn-outline-danger mb-2' data-toggle='modal' data-target='#modalAlert' id='" + data[i].id + "'>Excluir</button></td></tr>"
        }
        $("#tbody").html(html)
        $("#valorTotalTodasVendas").html(valorTotalTodasVendas.toFixed(2))

        this.registerEvents()

    }

    registerEvents() {

        // $('#valorCompra').mask('#.##0,00', { reverse: true });
        // $('#valorVenda').mask('#.##0,00', { reverse: true });

        $("#submit").click(function(e) {
            var obj = new Object()
            var main = new Main()
            obj.nomeCliente = $("#nomeCliente").val()
            obj.produto = $("#produto option:selected").val()
            obj.quantidade = parseInt($("#quantidade").val())
            obj.valorTotal = parseFloat($("#valorTotal").html()).toFixed(2)
            obj.formaPagamento = $("#formaPagamento option:selected").html()

            // if (obj.fabrica === "" || obj.modelo === "" || obj.numeracao === NaN || obj.numeracao <= 0 || obj.quantidade === NaN || obj.quantidade <= 0 || obj.valorCompra == NaN || obj.valorVenda == NaN) {
            //     main.setError("Por favor preencha todos os campos.")
            //     return
            // }

            // if (obj.valorCompra <= 0 || obj.valorVenda <= 0 || obj.numeracao <= 0 || obj.quantidade <= 0) {
            //     main.setError("Campos numerais devem ser maiores que zero")
            //     return
            // }

            $("#error").addClass("d-none")

            var apis = new Apis()


            apis.postVendaData(obj, function(data) {
                apis.vendas = data
                var venda = new VendaCtrl()
                venda.renderData(apis)

                $("#exampleModal").modal('hide')
                main.setSuccess("Venda registrada com sucesso!")
            })


            e.stopImmediatePropagation()
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

            valor = parseFloat(valor)
            quantidade = parseInt(quantidade)
            valor = parseFloat(quantidade * valor).toFixed(2)
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
                $("#search").attr("disabled", true)
            }
            e.stopImmediatePropagation()
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
