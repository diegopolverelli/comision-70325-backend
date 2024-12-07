export const logger=(req, res, next)=>{
    console.log(`Peticion recibida: ${req.url} - metodo: ${req.method}`)

    next()
}