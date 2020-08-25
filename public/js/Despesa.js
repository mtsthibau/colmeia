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
        var iconTrash = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-trash' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>" +
            "<path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/>" +
            "<path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/></svg>"

        var iconPencil = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-pencil' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>" +
            "<path fill-rule='evenodd' d='M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z'/>" +
            "<path fill-rule='evenodd' d='M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z'/></svg>"


        for (var i = 0; i < data.length; i++) {
            var valorDespesa = parseFloat(data[i].valor_despesa).toFixed(2)
            valorTotalDespesas = parseFloat(valorTotalDespesas) + parseFloat(valorDespesa)
            html += "<tr><th scope='row'>" + data[i].id + "</th><td>" + data[i].descricao_despesa + "</td><td>" + data[i].local_despesa + "</td>" +
                "<td>R$" + valorDespesa + "</td><td>" + data[i].forma_pagamento + "</td>" + "</td><td>" + new Date(data[i].created_at).toLocaleDateString() + "</td>" +
                "<td><button class='btn btn-outline-info mb-2' data-toggle='modal' data-target='#exampleModal' id='" + data[i].id + "'>" + iconPencil + "Editar</button></td>" +
                "<td><button class='btn btn-outline-danger mb-2' data-toggle='modal' data-target='#modalAlert' id='" + data[i].id + "'>" + iconTrash + "Excluir</button></td></tr>"
        }
        $("#tbody").html(html)
        $("#valorTotalDespesas").html(valorTotalDespesas.toFixed(2))

        this.registerEvents()
    }

    registerEvents() {
        $('#valor').mask('#,##0.00', { reverse: true });

        $("#submit").click(function() {
            var obj = new Object()
            var main = new Main()
            obj.descricao_despesa = $("#descricao").val()
            obj.local_despesa = $("#local").val()
            obj.valor_despesa = parseFloat($("#valor").val()) //TODO - Gravando casa decimal sempre = .00
            obj.forma_pagamento = $("#formaPagamento option:selected").html()

            if (obj.descricao_despesa === "" || obj.local_despesa === "" || obj.valor_despesa === NaN || obj.forma_pagamento == "") {
                main.setError("Por favor preencha todos os campos.")
                return
            }

            if (obj.valor_despesa <= 0) {
                main.setError("Campo valor da despesa deve ser maior que zero")
                return
            }

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
                api.loadDataDespesa()
            }

            if ($("#search").val().length > 2) {
                api.loadDataDespesasFiltered($(this).val())
                    // $("#search").attr("disabled", true)
            }
            e.stopImmediatePropagation()
        })

        $("#listAll").click(function(e) {
            var apis = new Apis()
            apis.loadDataAllDespesas()
            e.stopImmediatePropagation()
        })

        $("#logOff").click(function(e) {
            var usuario = new UsuarioCtrl()
            usuario.logOff()
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