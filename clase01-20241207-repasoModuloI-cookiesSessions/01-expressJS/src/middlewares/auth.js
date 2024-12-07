export const auth=(req, res, next)=>{
    let {username, password}=req.query

    if(username!=="admin" || password!=="CoderCoder123"){

        res.setHeader('Content-Type','application/json');
        return res.status(400).json({error:`Credenciales incorrectas!`})
    }


    // let user=req.query.username
    next()
}