function onLoadEstoquePage() {
    produto = new ProdutoCtrl()
    produto.load()
}

class ProdutoCtrl {

    constructor(produtos) {
        this.produtos = produtos
    }

    load() {
        var apis = new Apis()
        apis.loadDataProduto()
    }

    renderData(data) {
        produto.setProdutos(data.produtos)
        this.renderTable(produto.getProdutos())
    }

    renderTable(data) {
        var html
        for (var i = 0; i < data.length; i++) {
            html += "<tr><th scope='row'>" + data[i].id + "</th><td>" + data[i].nome_fabrica + "</td><td><b>" + data[i].nome_modelo + "</b></td><td>" +
                data[i].tamanho_numeracao + "</td><td>" + data[i].quantidade_produto + "</td><td>" + data[i].valor_compra + "</td><td>" + data[i].valor_venda + "</td>" +
                "<td><button class='btn btn-outline-info my-2 my-sm-0' id='" + data[i].id + "'>Editar</button></td>" +
                "<td><button class='btn btn-outline-danger float-right mb-3' data-toggle='modal' data-target='#modalAlert' id='" + data[i].id + "'>Excluir</button></td></tr>"
        }
        $("#tbody").html(html)

        this.registerEvents()
    }

    registerEvents() {
        $('#valorCompra').mask('#.##0,00', { reverse: true });
        $('#valorVenda').mask('#.##0,00', { reverse: true });

        $("#submit").click(function() {
            var obj = new Object()
            var main = new Main()
            obj.fabrica = $("#fabrica").val()
            obj.modelo = $("#modelo").val()
            obj.numeracao = parseInt($("#numeracao").val())
            obj.quantidade = parseInt($("#quantidade").val())
            obj.valorCompra = parseFloat($("#valorCompra").val()).toFixed(2)
            obj.valorVenda = parseFloat($("#valorVenda").val()).toFixed(2) //TODO - Gravando casa decimal sempre = .00

            if (obj.fabrica === "" || obj.modelo === "" || obj.numeracao === NaN || obj.numeracao <= 0 || obj.quantidade === NaN || obj.quantidade <= 0 || obj.valorCompra == NaN || obj.valorVenda == NaN) {
                main.setError("Por favor preencha todos os campos.")
                return
            }

            if (obj.valorCompra <= 0 || obj.valorVenda <= 0 || obj.numeracao <= 0 || obj.quantidade <= 0) {
                main.setError("Campos numerais devem ser maiores que zero")
                return
            }

            $("#error").addClass("d-none");

            var apis = new Apis()
            apis.postProdutoData(obj, function(data) {
                apis.produtos = data
                var produto = new ProdutoCtrl()
                produto.renderData(apis)

                $("#exampleModal").modal('hide')
                main.setSuccess("Cadastro realizado com sucesso!")

            })

            event.stopPropagation()
        })

        $(".btn-outline-danger").click(function() {
            var id = $(this).attr("id");
            $("#msgAlert").append("Tem certeza que deseja excluir o registro <strong class='ml-1'> CODIGO: " + id + " ?</strong>")
            $("#submitAlert").attr("meta", id)
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
    }

    getProdutos() {
        return this.Produtos
    }

    setProdutos(Produtos) {
        this.Produtos = Produtos
    }

}
