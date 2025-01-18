
// @decorador(parametro1, parametro2)  // forma habitual de encontrar decoradores (en frameworks)
const suma=(a,b)=>{
    return a+b
}

console.log(suma(4,5))

const decoraLog=(funcion)=>{
    return (...argumentos)=>{    // ... op. rest 
        // suma aquí funcionalidad que necesito
        console.log(`La funcion se ha ejecutado el ${new Date().toLocaleDateString()}`)
        return funcion(...argumentos)
    }
}

const decoradorDuplica=fn=>(...args)=>{
    return fn(...args) * 2
}


const sumaConLog=decoraLog(suma)
console.log(sumaConLog(3, 3))
console.log(suma(5,5))

console.log(decoradorDuplica(sumaConLog)(10, 10))



