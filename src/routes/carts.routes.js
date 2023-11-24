import { Router } from "express";
import Cart from "../models/cart.model.js";


const router = Router()


// Metodo GET: Obtener todos los carritos
router.get('/', async (req, res) => {
    try {
      const carts = await Cart.find();
      res.json(carts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

  // Metodo POST: Agregar un nuevo carrito
  router.post('/', async (req, res) => {
    const cart = new Cart(req.body);
    try {
      const newCart = await cart.save();
      res.status(201).json(newCart);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

  // Meotodo PUT: Actualizar un carrito por ID
  router.put('/:id', async (req, res) => {
      try {
          const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
          if (!cart) {
              return res.status(404).json({ message: 'Carrito no encontrado' });
          }
          res.json(cart);
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
  });
  
  
  // Metodo DELETE: Eliminar un carrito por ID
  router.delete('/:id', async (req, res) => {
      try {
          const cart = await Cart.findByIdAndDelete(req.params.id);
          if (!cart) {
              return res.status(404).json({ message: 'Carrito no encontrado' });
          }
          res.json({ message: 'Carrito eliminado exitosamente' });
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
  });
  

  export default router;
    