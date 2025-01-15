import { Router } from 'express';
export const router = Router()

router.get(
    '/',
    (req, res, next)=>{
        console.log(`Pasó x un middleware!`)
        next()
    },
    (req, res, next)=>{
        console.log(`Pasó x otro un middleware!`)
        next()
    },
    (req, res) => {

        res.setHeader('Content-Type', 'application/json')
        res.status(200).json({ payload: "Pruebas router" })
    }
)

const funciones=[
    (req, res, next)=>{
        console.log(`1...`)
        next()
    },
    (req, res, next)=>{
        console.log(`2...`)
        next()
    },
    (req, res, next)=>{
        console.log(`3...`)
        next()
    },
    (req, res)=>{
        console.log(`handler / controller...`)
        res.setHeader('Content-Type','application/json');
        return res.status(200).json({payload:"datos...!!!"});
    },

]

router.get("/datos", funciones)