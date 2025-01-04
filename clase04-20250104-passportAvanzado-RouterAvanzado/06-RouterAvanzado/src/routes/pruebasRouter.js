import { Router } from 'express';
export const router=Router()

router.get('/numero/:numero([0-9]+)',(req,res)=>{

    let {numero}=req.params
    // numero=Number(numero)
    // if(isNaN(numero)){
    //     res.setHeader('Content-Type','application/json');
    //     return res.status(400).json({error:`debe ingresar un dato numerico`})
    // }
    

    res.setHeader('Content-Type','application/json')
    res.status(200).json({numero})
})

router.get('/nombres/:nombre([a-zA-Z%20]+)',(req,res)=>{

    let {nombre}=req.params
    // numero=Number(numero)
    // if(isNaN(numero)){
    //     res.setHeader('Content-Type','application/json');
    //     return res.status(400).json({error:`debe ingresar un dato numerico`})
    // }
    

    res.setHeader('Content-Type','application/json')
    res.status(200).json({nombre})
})

let errores={
    a: "error de seguridad",
    b: "error de hardware", 
    c: "error de software",
}

router.param("error", (req, res, next, valor)=>{
    req.descripError=`error indeterminado`
    if(errores[valor]){
        req.descripError=errores[valor]
    }

    next()
})

router.get("/error/:error", (req, res)=>{
    // let descripError=`error indeterminado`
    // let {error} =req.params
    // if(errores[error]){
    //     descripError=errores[error]
    // }

    res.setHeader('Content-Type','application/json');
    // return res.status(200).json({payload:`Se ha reportado un ${descripError}`});
    return res.status(200).json({payload:`Se ha reportado un ${req.descripError}`});
})

router.get("/error/:usuario/:error", (req, res)=>{
    // let descripError=`error indeterminado`
    // let {error, usuario} =req.params
    let {usuario} =req.params
    // if(errores[error]){
    //     descripError=errores[error]
    // }

    res.setHeader('Content-Type','application/json');
    return res.status(200).json({payload:`${usuario} ha reportado un ${req.descripError}`});
})


router.get("*", (req, res)=>{

    res.setHeader('Content-Type','application/json');
    return res.status(404).json({payload:`Error 404 | page not found`});
})