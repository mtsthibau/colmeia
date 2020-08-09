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
                data[i].total_venda + "</td><td>" + data[i].forma_pagamento + "</td><td>" + data[i].created_at + "</td><td>" + data[i].updated_at + "</td></tr>"
        }
        $("#tbody").html(html)
    }

    registerEvents() {

        // $("#insConfronto").click(function() {
        //     var data = main.getVendas()
        //     var html
        //     for (var i = 0; i < data.length; i++) {
        //         html += "<option value='" + data[i].id + "'>" + data[i].nome_clube + "</option>"
        //     }
        //     $("#timeCasa").append(html)
        //     $("#visitante").append(html)

        // })

        // $("#timeCasa").change(this, function() {
        //     $("#visitante option").attr("disabled", false)
        //     $("#visitante option[value=" + this.value + "]").attr("disabled", true)
        // })

        // $("#visitante").change(this, function() {
        //     $("#timeCasa option").attr("disabled", false)
        //     $("#timeCasa option[value=" + this.value + "]").attr("disabled", true)
        // })

        // $("#submit").click(function() {
        //     var obj = new Object()
        //     obj.timeCasa = parseInt($("#timeCasa").val())
        //     obj.visitante = parseInt($("#visitante").val())
        //     obj.golsTimeCasa = parseInt($("#golsTimeCasa").val())
        //     obj.golsVisitante = parseInt($("#golsVisitante").val())

        //     if (obj.timeCasa === 0 || obj.visitante === 0 || obj.golsTimeCasa === NaN || !golsVisitante == NaN) {
        //         main.setError("Por favor preencha todos os campos.")
        //         return
        //     }

        //     $("#error").addClass("d-none");

        //     var apis = new Apis()
        //     apis.postData(obj, function(data) {
        //         apis.Vendas = data
        //         var main = new Main()
        //         main.renderData(apis)

        //         $("#exampleModal").modal('hide')
        //         $("#golsTimeCasa").val("0")
        //         $("#golsVisitante").val("0")
        //         $("#timeCasa").val("0")
        //         $("#visitante").val("0")
        //     })

        //     event.stopPropagation()
        // })

    }

    setError(msg) {
        $("#error").html(msg)
        $("#error").removeClass("d-none")
    }

    setSituacao(index) {
        if (index == 0) return "campeao"

        else if (index > 0 && index <= 6) return "libertadores"

        else if (index > 6 && index <= 13) return "sulamericana"

        else if (index > 15 && index <= 19) return "rebaixamento"

        else return ""
    }

    getVendas() {
        return this.Vendas
    }

    setVendas(Vendas) {
        this.Vendas = Vendas
    }

}