import { Router } from 'express';
export const router=Router()

router.get('/',(req,res)=>{

    

    res.setHeader('Content-Type','application/json')
    res.status(200).json({villanos:"listado villanos"})
})

router.post('/',(req,res)=>{

    res.setHeader('Content-Type','application/json')
    res.status(201).json({payload:"alta generada...!!!"})
})