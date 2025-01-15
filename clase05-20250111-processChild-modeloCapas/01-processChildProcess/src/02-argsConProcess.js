let [rutaNode, rutaScript, ...argumentos]=process.argv

console.log({rutaNode})
console.log({rutaScript})
console.log(argumentos)

let indicePort=argumentos.findIndex(a=>a=="--port")
if(indicePort==-1){
    console.log(`Ingrese puerto`)
    process.exit()
}

console.log(`Server corriendo en puerto ${argumentos[indicePort+1]}`)

