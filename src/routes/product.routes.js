import { Router } from "express";
import Product from "../models/product.model.js";


const router = Router()


// Metodo GET: Todos los productos
router.get('/', async(req, res)=> {
    try {
        const product = await Product.find();
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message })
    }    
});


// Metodo POST: Crear un producto
router.post('/', async(req, res)=> {
    const product = new Product(req.body);
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({message: error.message})
    }    
});


//Metodo PUT: Actualizar producto 
router.put('/:id', async(req, res)=> {
    try {
        const product = await product.findByIdAndUpdate(req.params.id,req.body,{
                new: true,
        });
        if(!product) {
         return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({message: error.message})
    }    
});


// Metodo DELETE: Eliminar un producto por ID
  router.delete('/:pid', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export {router as productRouter}