import { Schema, model } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    default: [],
  },
  stock: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
});

//Agrego a paginacion como un plugin del schema products

productSchema.plugin(mongoosePaginate); // Paginación
const productModel = model('Products', productSchema);

export default productModel;
