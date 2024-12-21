import bcrypt from "bcrypt"

export const generarHash=pass=>bcrypt.hashSync(pass, 10)