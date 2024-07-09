import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import productsRouter from './src/routes/products.router.js';
import cartsRouter from './src/routes/carts.router.js';

const app = express();
const PORT = 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'src/public')));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
