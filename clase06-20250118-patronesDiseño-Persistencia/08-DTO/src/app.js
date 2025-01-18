import { UsersDTO } from "./DTO/UsersDTO.js";
import { getUser } from "./Usuarios.js";


let usuario= new UsersDTO(getUser(2))  

console.log(usuario)