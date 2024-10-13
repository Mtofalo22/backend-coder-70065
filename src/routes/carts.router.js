import { Router } from 'express';
import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';

const router = Router();


router.get('/', async (req, res) => {
  try {
    let cart = await Cart.findOne().populate('products.product');
    
    if (!cart) {
      cart = new Cart(); 
      await cart.save();
    }

    cart.products.forEach(item => {
      item.subtotal = item.product.price * item.quantity;
    });

    const total = cart.products.reduce((sum, item) => {
      return sum + item.subtotal;
    }, 0);

    res.render('cart', { cart: cart.products, total });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener el carrito');
  }
});


router.post('/products/add/:pid', async (req, res) => {
  try {
    const { pid } = req.params;

    let cart = await Cart.findOne();
    if (!cart) {
      cart = new Cart(); 
    }

    const product = await Product.findById(pid);
    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }

    const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
    if (productIndex >= 0) {
      if (cart.products[productIndex].quantity < product.stock) {
        cart.products[productIndex].quantity += 1;
      } else {
        return res.status(400).send('No hay suficiente stock disponible para agregar más unidades');
      }
    } else {
      if (product.stock > 0) {
        cart.products.push({ product: pid, quantity: 1 });
      } else {
        return res.status(400).send('No hay suficiente stock disponible para agregar este producto');
      }
    }

    await cart.save();
    res.redirect('/cart');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al agregar el producto al carrito');
  }
});


router.post('/products/delete/:pid', async (req, res) => {
  try {
    const { pid } = req.params;

    const cart = await Cart.findOne();

    if (!cart) {
      return res.status(404).send('Carrito no encontrado');
    }

    const productInCart = cart.products.find(p => p.product.toString() === pid);

    if (!productInCart) {
      return res.status(404).send('Producto no encontrado en el carrito');
    }

    const product = await Product.findById(pid);
    if (!product) {
      return res.status(404).send('Producto no encontrado en la base de datos');
    }

    if (productInCart.quantity > 1) {
      productInCart.quantity -= 1;
      product.stock += 1; 
    } else {
      cart.products = cart.products.filter(p => p.product.toString() !== pid);
      product.stock += 1;
    }

    await cart.save();
    await product.save();

    res.redirect('/cart');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar el producto del carrito');
  }
});



export default router;