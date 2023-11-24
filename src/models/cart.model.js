import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const cartDetailSchema = new Schema({
  producto: { type: Schema.Types.ObjectId, ref: 'Product' },
  cantidad: { type: Number, required: true },
  precio_unitario: { type: Number, required: true },
});

const cartSchema = new Schema({
  detalles: [cartDetailSchema],
});

const Cart = model('Cart', cartSchema);

export default Cart;