import { isValidObjectId } from "mongoose";
import { CartsDAO } from "../dao/CartsDAO.js"
import { ProductosDAO } from "../dao/ProductosDAO.js";
import { procesaErrores } from "../utils.js"

export const getCarts=async(req, res)=>{
    try {
        let carts=await CartsDAO.getCarts()
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({carts});
    } catch (error) {
        procesaErrores(error, res)
    }
}

export const addCart=async(req, res)=>{
    try {
        let nuevoCart=await CartsDAO.addCart()
        res.setHeader('Content-Type','application/json');
        return res.status(201).json({nuevoCart});
    } catch (error) {
        procesaErrores(error, res)
    }
}

export const getPruebas= (req, res)=>{


    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:"prueba"});
}

export const updateCart=async(req,res)=>{

    let {id} =req.params
    let products=req.body   // [{_id: "asdfasdf9asdf9sda", cantidad:5}, {_id: "asdfasdf9asdf9sda", cantidad:5}]

    try {
        let cart=await CartsDAO.getCartBy({_id: id})
        console.log(cart)
        if(!cart){
            res.setHeader('Content-Type','application/json');
            return res.status(404).json({error:`No existe cart con id ${id}`})
        }

        if(!Array.isArray(products)){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`El body tiene que tener un array de productos válidos`})
        }

        let error=false
        for(let i=0; i<products.length; i++){
            if(!products[i].cantidad || typeof products[i].cantidad!="number" ){
                error=true
            }
            if(isValidObjectId(products[i]._id)){
                let existe=await ProductosDAO.getProdcutBy({_id:products[i]._id})
                if(!existe){
                    error=true
                }
            }else{
                error=true
            }
        }

        if(error){
            res.setHeader('Content-Type','application/json');
            return res.status(400).json({error:`Existen problemas con alguno de los ítems del pedido`})
        }
        let carritoActualizado=await CartsDAO.updateCart(id, {products})
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({carritoActualizado});

    } catch (error) {
        procesaErrores(error, res)
    }
}