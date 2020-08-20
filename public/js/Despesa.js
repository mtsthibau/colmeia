function onLoadPageDespesa() {
    despesa = new DespesaCtrl()
    var isAutenticated = despesa.vefifyUser()
    if (isAutenticated)
        despesa.load()
    else
        window.location.href = "http://127.0.0.1:8000/";
}

class DespesaCtrl {

    constructor(despesas) {
        this.despesas = despesas
    }

    vefifyUser() {
        var userStored = localStorage['user'];
        if (userStored) {
            $("#nomeUsuario").html(userStored)
            return true;
        } else return false
    }

    load() {
        var apis = new Apis()
        apis.loadDataDespesa()
    }

    renderData(data) {
        despesa.setDespesas(data.despesas)
        this.renderTable(despesa.getDespesas())
    }

    renderTable(data) {
        var html
        var valorTotalDespesas = 0
        for (var i = 0; i < data.length; i++) {
            var valorDespesa = parseFloat(data[i].valor_despesa).toFixed(2)
            valorTotalDespesas = parseFloat(valorTotalDespesas) + parseFloat(valorDespesa)
            html += "<tr><th scope='row'>" + data[i].id + "</th><td>" + data[i].descricao_despesa + "</td><td>" + data[i].local_despesa + "</td>" +
                "<td>R$" + valorDespesa + "</td><td>" + data[i].forma_pagamento + "</td>" +
                "<td><button class='btn btn-outline-info mb-2' data-toggle='modal' data-target='#exampleModal' id='" + data[i].id + "'>Editar</button></td>" +
                "<td><button class='btn btn-outline-danger mb-2' data-toggle='modal' data-target='#modalAlert' id='" + data[i].id + "'>Excluir</button></td></tr>"
        }
        $("#tbody").html(html)
        $("#valorTotalDespesas").html(valorTotalDespesas.toFixed(2))

        this.registerEvents()
    }

    registerEvents() {
        $('#valor').mask('#.##0,00', { reverse: true });

        $("#submit").click(function() {
            var obj = new Object()
            var main = new Main()
            obj.descricao_despesa = $("#descricao").val()
            obj.local_despesa = $("#local").val()
            obj.valor_despesa = parseFloat($("#valor").val()).toFixed(2) //TODO - Gravando casa decimal sempre = .00
            obj.forma_pagamento = $("#formaPagamento option:selected").html()

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
                apis.postDespesaData(obj, function(data) {
                    apis.despesas = data
                    var despesa = new DespesaCtrl()
                    despesa.renderData(apis)

                    $("#exampleModal").modal('hide')
                    main.setSuccess("Cadastro realizado com sucesso!")

                })
            } else {
                apis.updateDespesaData($("#submit").attr("meta-id"), obj, function(data) {
                    apis.despesas = data
                    var despesa = new DespesaCtrl()
                    despesa.renderData(apis)

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
            $("#submit").attr("meta", id)
            api.getDespesaData(id);
        })

        $("#submitAlert").click(function() {
            var main = new Main()
            var api = new Apis()

            var id = $(this).attr("meta")
            api.deleteDespesaData(id)
        })

        $('#modalAlert').on('hidden.bs.modal', function(e) {
            $("#msgAlert").html("")
            $("#submitAlert").attr("meta", "")
        })

        $('#exampleModal').on('hidden.bs.modal', function(e) {
            $("#submit").attr("meta", "")
            $("#submit").attr("meta-id", "")
        })

        $("#search").keyup(function(e) {

            var api = new Apis()

            if ($("#search").val() === "") {
                api.loadDataVenda()
            }

            if ($("#search").val().length > 2) {
                api.loadDataDespesasFiltered($(this).val())
                $("#search").attr("disabled", true)
            }
            e.stopImmediatePropagation()
        })
    }

    loadDespesaDataModal(data) {
        $("#descricao").val(data.despesa[0].descricao_despesa)
        $("#local").val(data.despesa[0].local_despesa)
        $("#valor").val(data.despesa[0].valor_despesa)
        $("#formaPagamento").val(data.despesa[0].forma_pagamento)

        $("#submit").attr("meta", "update")
        $("#submit").attr("meta-id", data.despesa[0].id)
    }

    getDespesas() {
        return this.Despesas
    }

    setDespesas(Despesas) {
        this.Despesas = Despesas
    }

}