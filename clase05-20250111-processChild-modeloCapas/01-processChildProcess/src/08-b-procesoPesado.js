process.on("message", (msg)=>{
    console.log(`Proceso hijo pid ${process.pid}; recibí este mensaje: "${msg}"`)

    console.log("Comienza el calculo...")
    console.time("Tiempo de proceso: ")
    let resultado=0

    for(let i=0; i<350_000_000; i++){
        resultado+=Math.floor(Math.random()*(10)+1)      // Math.floor(Math.random()*(cantNrosAGenerar)+aPartirDelNro)
    }

    console.timeEnd("Tiempo de proceso: ")

    // return resultado
    process.send({type:"resultado", resultado})

})

