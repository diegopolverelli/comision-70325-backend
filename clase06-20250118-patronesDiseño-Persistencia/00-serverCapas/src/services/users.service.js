import { UsersManager } from "../dao/UsersManager.js"

class UsersService{
    constructor(dao){
        this.dao=dao
    }

    async getUsers(){
        return await this.dao.get()
    }

    async getUserById(id){
        let users=await this.dao.get()
        users=users.filter(u=>u.id==id)
        return users
    }

    async getUserByEmail(email){
        let users=await this.dao.get()
        users=users.filter(u=>u.email==email)
        return users
    }

    async addUser(user){
        return this.dao.create(user)
    }
}

export const usersService=new UsersService(UsersManager)