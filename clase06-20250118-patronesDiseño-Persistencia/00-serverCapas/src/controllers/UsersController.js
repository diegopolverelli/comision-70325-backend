// import { UsersManager } from "../dao/UsersManager.js"

import { usersService } from "../services/users.service.js";

export const getUsers=async(req, res)=>{
    try {
        // let users=await UsersManager.get()
        let users=await usersService.getUsers()
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({users});
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Error...`})
    }
}

export const getUsersByEmail=async(req, res)=>{
    try {
        let {email}=req.params
        // let users=await UsersManager.get()
        let users=await usersService.getUserByEmail(email)
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({users});
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Error...`})
    }
}

export const createUser=async(req, res)=>{
    let {email, password} =req.body
    if(!email || !password){
        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`email y password son requeridos!`})
    }

    try {
        // let newUser=await UsersManager.create({email, password})
        let newUser=await usersService.addUser({email, password})
        res.setHeader('Content-Type','application/json');
        return res.status(201).json({newUser});
    } catch (error) {
        res.setHeader('Content-Type','application/json');
        return res.status(500).json({error:`Error...`})
    }
}