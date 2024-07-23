import { Router } from 'express';
import { leerProductos } from '../utils/products_utils.js';

const router = Router();

router.get('/home', (req, res) => {
  const products = leerProductos();
  res.render('home', { products });
});

router.get('/realtimeproducts', (req, res) => {
  const products = leerProductos();
  res.render('realTimeProducts', { products });
});

export default router;
