import fs from "fs"
console.log(`process.pid`, process.pid)
console.log(`process.cwd`, process.cwd())
console.log(`process.platform`, process.platform)
console.log(`process.version`, process.version)

// console.log("variables de entorno", process.env)
console.log("variable de entorno path", process.env.path)
console.log("variable de entorno PRUEBA_PORT", process.env.PRUEBA_PORT)

console.log(process.argv)