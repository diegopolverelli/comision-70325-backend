import { Router } from 'express';
import { ProductsDAO } from '../dao/ProductsDAO.js';
export const router=Router()

router.get('/products',async(req,res)=>{

    let {docs:productos}=await ProductsDAO.getPaginado()

    res.render("templates/home", {
        productos
    })

})