import {v4} from "uuid"

export class UsersDTO{
    constructor(usuario){
        this.firstName=usuario.nombre.toUpperCase()
        this.code=v4()
        this.email=usuario.email
        this.username=usuario.email.split("@")[0]
        this.role=usuario.rol
        this.title="developer"
    }
}

