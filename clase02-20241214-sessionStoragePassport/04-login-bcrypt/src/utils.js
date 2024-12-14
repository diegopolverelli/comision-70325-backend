import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from "bcrypt"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;


export const procesaErrores=(res, error)=>{
    console.log(error);
    res.setHeader('Content-Type','application/json');
    return res.status(500).json(
        {
            error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`,
            detalle:`${error.message}`
        }
    )
}

export const generaHash=pass=>bcrypt.hashSync(pass, 10)
export const isValidPassword=(pass, hash)=>bcrypt.compareSync(pass, hash)
