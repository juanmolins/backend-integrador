import express from 'express';
import __dirname from './utils.js';
import { Server } from 'socket.io';
import {productRouter} from './routes/product.routes.js';
import {cartRouter} from './routes/carts.routes.js';
import { viewRouter } from './routes/view.routes.js';
import ProductManager from './models/ProductManager.js';
import { db } from "./config/database.js";


const product = new ProductManager()

const port = 8080
const app = express()
const httpServer = app.listen(port, () => {
     console.log(`Servidor Express escuchando en el puerto ${port}`);
});


app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));


app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use(viewRouter)


const socketServer = new Server(httpServer)


socketServer.on('connection', (socket)=> {

    console.log(`Cliente nuevo conectado ${socket.id}`)
    socket.on('new-product', (newProduct) => {
        const newProductCreated = product.addProducts(newProduct);
        socketServer.emit('product-created', newProductCreated)
    })

    socket.on('deleteProduct', (productId)=> {
        product.deleteProduct(productId)
        socketServer.emit('deleting-product', productId)
    })
    
    socketServer.emit('mensajeGeneral', 'Este es un mensaje para todos')
})