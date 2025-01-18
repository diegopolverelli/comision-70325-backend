import {v4} from "uuid"
let users=[]
export class UsersManager{
    static async get(){
        return users
    }

    static async create(user){
        let id=v4()
        let newUser={
            id, ...user
        }
        users.push(newUser)
        return newUser
    }
}