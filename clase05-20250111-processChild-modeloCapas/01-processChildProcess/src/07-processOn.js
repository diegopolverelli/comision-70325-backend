import fs from "fs"

process.on("exit", code=>{
    console.log(`Programa va a finalizar... con code ${code}; realizando tareas de "limpieza"...`)
    if(code==-7){
        console.log(`Error de sistema 7`)
    }
})

process.on("uncaughtException", error=>{
    console.log(`Se produjo un error: ${error.message}`)
})

let contador=1
const i01=setInterval(() => {
    console.log(`Proceso ${contador}`)
    contador++

    if(contador>10){
        clearInterval(i01)
    }
}, 500);

setTimeout(() => {
    throw new Error(`Error de sistema...`)
}, 3000);

setTimeout(() => {
    process.exit(-7)
}, 5000);