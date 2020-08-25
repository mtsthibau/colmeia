function onLoadEstoquePage() {
    produto = new ProdutoCtrl()
    var isAutenticated = produto.vefifyUser()
    if (isAutenticated)
        produto.load()
    else
        window.location.href = "http://127.0.0.1:8000/";
}

class ProdutoCtrl {

    constructor(produtos) {
        this.produtos = produtos
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
        apis.loadDataProduto()
    }

    renderData(data) {
        produto.setProdutos(data.produtos)
        this.renderTable(produto.getProdutos())
    }

    renderTable(data) {
        var html
        var valorTotalInvestido = 0
        var iconTrash = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-trash' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>" +
            "<path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z'/>" +
            "<path fill-rule='evenodd' d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'/></svg>"
        var iconPencil = "<svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-pencil' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>" +
            "<path fill-rule='evenodd' d='M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z'/>" +
            "<path fill-rule='evenodd' d='M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z'/></svg>"

        for (var i = 0; i < data.length; i++) {
            var valorTotalProdutoItem = parseFloat(data[i].quantidade_produto * data[i].valor_venda).toFixed(2)
            valorTotalInvestido = parseFloat(valorTotalInvestido) + parseFloat(valorTotalProdutoItem)
            html += "<tr><th scope='row'>" + data[i].id + "</th><td>" + data[i].nome_fabrica + "</td><td>" + data[i].nome_modelo + "</td><td>" +
                data[i].tamanho_numeracao + "</td><td>" + data[i].quantidade_produto + "</td><td>R$" + data[i].valor_compra + "</td><td>R$" + data[i].valor_venda +
                "</td><td>R$" + valorTotalProdutoItem + "</td>" + "</td><td>" + new Date(data[i].created_at).toLocaleDateString() + "</td>" +
                "<td><button class='btn btn-outline-info mb-2' data-toggle='modal' data-target='#exampleModal' id='" + data[i].id + "'>" + iconPencil + "Editar</button></td>" +
                "<td><button class='btn btn-outline-danger mb-2' data-toggle='modal' data-target='#modalAlert' id='" + data[i].id + "'>" + iconTrash + "Excluir</button></td></tr>"
        }
        $("#tbody").html(html)
        $("#valorTotalInvestido").html(valorTotalInvestido.toFixed(2))

        this.registerEvents()
    }

    registerEvents() {
        $('#valorCompra').mask('#,##0.00', { reverse: true });
        $('#valorVenda').mask('#,##0.00', { reverse: true });

        $("#submit").click(function(e) {
            var obj = new Object()
            var main = new Main()
            obj.fabrica = $("#fabrica").val()
            obj.modelo = $("#modelo").val()
            obj.numeracao = parseInt($("#numeracao").val())
            obj.quantidade = parseInt($("#quantidade").val())
            obj.valorCompra = parseFloat($("#valorCompra").val())
            obj.valorVenda = parseFloat($("#valorVenda").val()) //TODO - Gravando casa decimal sempre = .00

            if (obj.fabrica === "" || obj.modelo === "" || obj.numeracao === NaN || obj.quantidade === NaN || obj.valorCompra == NaN || obj.valorVenda == NaN) {
                main.setError("Por favor preencha todos os campos.")
                return
            }

            if (obj.valorCompra <= 0 || obj.valorVenda <= 0 || obj.numeracao <= 0 || obj.quantidade <= 0) {
                main.setError("Campos numerais devem ser maiores que zero")
                return
            }

            $("#error").addClass("d-none");

            var apis = new Apis()


            if ($("#submit").attr("meta") == "") {
                apis.postProdutoData(obj, function(data) {
                    apis.produtos = data
                    var produto = new ProdutoCtrl()
                    produto.renderTable(apis)

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

            e.stopPropagation()
        })

        $(".btn-outline-danger").click(function(e) {
            var id = $(this).attr("id");
            $("#msgAlert").append("Tem certeza que deseja excluir o registro <strong class='ml-1'> CODIGO: " + id + " ?</strong>")
            $("#submitAlert").attr("meta", id)
            e.stopImmediatePropagation()
        })

        $(".btn-outline-info").click(function(e) {
            var id = $(this).attr("id");
            var api = new Apis()
            api.getProdutoData(id);
            e.stopImmediatePropagation()
        })

        $("#submitAlert").click(function(e) {
            var main = new Main()
            var api = new Apis()

            var id = $(this).attr("meta")
            api.deleteProdutoData(id)
            e.stopImmediatePropagation()
        })

        $("#listAll").click(function(e) {
            var apis = new Apis()
            apis.loadDataAllProdutos(e)
            e.stopImmediatePropagation()
        })

        $('#modalAlert').on('hidden.bs.modal', function(e) {
            $("#msgAlert").html("")
            $("#submitAlert").attr("meta", "")
            e.stopImmediatePropagation()
        })

        $('#exampleModal').on('hidden.bs.modal', function(e) {
            $("#submit").attr("meta", "")
            $("#submit").attr("meta-id", "")
            e.stopImmediatePropagation()
        })

        $("#search").keyup(function(e) {

            var api = new Apis()

            if ($("#search").val() === "") {
                api.loadDataProduto()
            }

            if ($("#search").val().length > 2) {
                api.loadDataProdutosFiltered($(this).val())
                    // $("#search").attr("disabled", true)
                    // $("#search").setCursorPosition()
            }
            e.stopImmediatePropagation()
        })

        $("#logOff").click(function(e) {
            var usuario = new UsuarioCtrl()
            usuario.logOff()
            e.stopImmediatePropagation()
        })
    }

    loadProdutoDataModal(data) {
        $("#fabrica").val(data.produto[0].nome_fabrica)
        $("#modelo").val(data.produto[0].nome_modelo)
        $("#numeracao").val(data.produto[0].tamanho_numeracao)
        $("#quantidade").val(data.produto[0].quantidade_produto)
        $("#valorCompra").val(data.produto[0].valor_compra)
        $("#valorVenda").val(data.produto[0].valor_venda)

        $("#submit").attr("meta", "update")
        $("#submit").attr("meta-id", data.produto[0].id)
    }

    getProdutos() {
        return this.Produtos
    }

    setProdutos(Produtos) {
        this.Produtos = Produtos
    }

}