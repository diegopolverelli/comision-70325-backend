import {Command, Option} from "commander"

const program=new Command()


program.option("-p, --port <port>", "Puerto de escucha del server", 3005)
program.option("-d, --debug", "Activa el mode debug" )
program.option("-c, --coleres [colores...]",  "Colores para fondo de pantalla")
program.addOption(new Option("-m, --mode <modo>", "mode de ejecución del script").choices(["prod", "dev", "test"]).default("dev"))
program.requiredOption("-u, --user <user>", "Usuario que corre el script")


program.allowUnknownOption()
program.allowExcessArguments()
program.parse()
let argumentos=program.opts()

console.log(argumentos)
console.log(`Server corriendo en port ${argumentos.port}`)
console.log(program.args)