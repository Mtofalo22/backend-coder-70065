import express from 'express';
import exphbs from 'express-handlebars';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import productsRouter from './src/routes/products.router.js';
import cartsRouter from './src/routes/carts.router.js';
import viewsRouter from './src/routes/views.router.js';
import { leerProductos, guardarProductos } from './src/utils/products_utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'src', 'public')));

// Handlebars
app.engine('handlebars', exphbs.engine({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src', 'views'));

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// Configurar WebSockets
io.on('connection', (socket) => {
  console.log('Usuario conectado');

  
  socket.emit('updateProducts', leerProductos());

 
  socket.on('newProduct', (product) => {
    const products = leerProductos();
    products.push(product);
    guardarProductos(products);
    io.emit('updateProducts', products);
  });

  
  socket.on('deleteProduct', (productId) => {
    let products = leerProductos();
    products = products.filter((product) => product.id !== productId);
    guardarProductos(products);
    io.emit('updateProducts', products);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

const PORT = 8080;
httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
