import { Router } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { fileURLToPath } from 'url';


const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cartsFilePath = path.join(__dirname, '../data/carritos.json');

const leerCarritos = () => {
  try {
    const data = readFileSync(cartsFilePath);
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const guardarCarritos = (carritos) => {
  writeFileSync(cartsFilePath, JSON.stringify(carritos, null, 2));
};

router.post('/', (req, res) => {
  const newCart = {
    id: uuidv4(),
    products: []
  };
  const carritos = leerCarritos();
  carritos.push(newCart);
  guardarCarritos(carritos);
  res.status(201).json(newCart);
});

router.get('/:cid', (req, res) => {
  const carritos = leerCarritos();
  const carrito = carritos.find(c => c.id === req.params.cid);
  if (carrito) {
    res.json(carrito.products);
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

router.post('/:cid/product/:pid', (req, res) => {
  const { pid } = req.params;
  const carritos = leerCarritos();
  const carrito = carritos.find(c => c.id === req.params.cid);
  if (!carrito) {
    return res.status(404).json({ error: 'Carrito no encontrado' });
  }

  const productoEnCarrito = carrito.products.find(p => p.product === pid);
  if (productoEnCarrito) {
    productoEnCarrito.quantity += 1;
  } else {
    carrito.products.push({ product: pid, quantity: 1 });
  }

  guardarCarritos(carritos);
  res.status(201).json(carrito);
});

router.delete('/:cid/product/:pid', (req, res) => {
  const { cid, pid } = req.params;
  const carritos = leerCarritos();
  const carrito = carritos.find(c => c.id === cid);
  if (!carrito) {
    return res.status(404).json({ error: 'Carrito no encontrado' });
  }

  const productoIndex = carrito.products.findIndex(p => p.product === pid);
  if (productoIndex === -1) {
    return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
  }

  carrito.products.splice(productoIndex, 1);
  guardarCarritos(carritos);
  res.status(200).json(carrito);
});


export default router;
