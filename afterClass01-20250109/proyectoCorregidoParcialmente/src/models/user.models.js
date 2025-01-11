import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: String, //Agrego una caracteristica, esta es el tipo
  email: {
    type: String,
    unique: true, //Al ser un atributo unico, tambien se implementa por defecto como indice
  },
});
//Nombre de la coleccion / esquema a utilizar
export const userModel = model('users', userSchema);
