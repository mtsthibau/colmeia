function onLoadPageIndex() {
    main = new Main()
    main.load()
}

class Main {

    constructor(user) {
        this.user = user
    }

    load() {
        // var apis = new Apis()
        // apis.loadData()
        this.registerEvents()
    }

    setError(msg) {
        $("#error").html(msg)
        $("#error").removeClass("d-none")
    }

    setSuccess(msg) {
        $("#success").html(msg)
        $("#success").removeClass("d-none")
    }

    registerEvents() {
        return null
    }


    getUser() {
        return this.User
    }

    setUser(User) {
        this.User = User
    }

}