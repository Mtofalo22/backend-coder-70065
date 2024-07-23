import { Router } from 'express';
import { leerProductos, guardarProductos } from '../utils/products_utils.js';

const router = Router();

router.get('/', (req, res) => {
  const products = leerProductos();
  res.json(products);
});

router.get('/:pid', (req, res) => {
  const products = leerProductos();
  const product = products.find(p => p.id === req.params.pid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

router.post('/', (req, res) => {
  const products = leerProductos();
  const newProduct = req.body;
  products.push(newProduct);
  guardarProductos(products);
  res.status(201).json(newProduct);
});

router.put('/:pid', (req, res) => {
  const products = leerProductos();
  const productIndex = products.findIndex(p => p.id === req.params.pid);
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  products[productIndex] = { ...products[productIndex], ...req.body };
  guardarProductos(products);
  res.json(products[productIndex]);
});

router.delete('/:pid', (req, res) => {
  const products = leerProductos();
  const newProducts = products.filter(p => p.id !== req.params.pid);
  if (newProducts.length === products.length) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  guardarProductos(newProducts);
  res.status(204).send();
});

export default router;
