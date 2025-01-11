import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  name: String,
  size: {
    type: String,
    //datos enumerados
    enum: ['small', 'medium', 'large'],
    default: 'medium',
  },
  price: Number,
  quantity: Number,
  date: Date,
});

const orderModel = model('orders', orderSchema);

export default orderModel;
