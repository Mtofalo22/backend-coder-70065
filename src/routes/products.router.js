import { Router } from 'express';
import { getProducts, getProductById, addProduct, updateProduct, deleteProduct } from '../utils/products_utils.js';

const router = Router();

router.get('/', (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
  const products = getProducts(limit);
  res.json(products);
});

router.get('/:pid', (req, res) => {
  const product = getProductById(req.params.pid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

router.post('/', (req, res) => {
  const newProduct = addProduct(req.body);
  res.status(201).json(newProduct);
});

router.put('/:pid', (req, res) => {
  const updatedProduct = updateProduct(req.params.pid, req.body);
  if (updatedProduct) {
    res.json(updatedProduct);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

router.delete('/:pid', (req, res) => {
  const isDeleted = deleteProduct(req.params.pid);
  if (isDeleted) {
    res.json({ message: 'Product deleted' });
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

export default router;
