function onLoadPageLogin() {
    usuario = new UsuarioCtrl()
    usuario.load()
}

class UsuarioCtrl {

    constructor(usuario) {
        this.usuario = usuario
    }

    load() {
        var apis = new Apis()
        this.registerEvents()
    }

    registerEvents() {

        $("#submit").click(function(e) {
            var obj = new Object()
            var main = new Main()
            obj.user = $("#usuario").val()
            obj.password = $("#senha").val()

            $("#error").addClass("d-none")

            var apis = new Apis()


            apis.loginUsuario(obj, function(data) {
                if (data.length > 0) {
                    localStorage['user'] = data[0].user
                    window.location.href = "http://127.0.0.1:8000/venda"
                } else {
                    var main = new Main()
                    main.setError("Usuário ou senha incorretos")
                }
            })


            e.stopImmediatePropagation()
        })

    }

    logOff() {
        localStorage['user'] = ""
        window.location.href = "http://127.0.0.1:8000/"
    }

    setError(msg) {
        $("#error").html(msg)
        $("#error").removeClass("d-none")
    }

    getUsuario() {
        return this.Usuario
    }

    setUsuario(Usuario) {
        this.Usuario = Usuario
    }

}