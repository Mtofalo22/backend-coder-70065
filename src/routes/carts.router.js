import { Router } from "express";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import Ticket from "../models/ticket.model.js";
import isAuthenticated from "../config/passport.js";
import { isAdmin, isUser } from "../middlewares/authorization.js";
import { v4 as uuidv4 } from "uuid";

const router = Router();

router.get("/", isAuthenticated, isUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("cart")
    const cart = await Cart.findById(user.cart.id).populate("products.product");
    cart

    if (!user.cart) {
      return res.status(404).json({ message: "Carrito no encontrado" });
    }

    cart.products.forEach((item) => {
      item.subtotal = item.product.price * item.quantity;
    });

    const total = cart.products.reduce((sum, item) => {
      return sum + item.subtotal;
    }, 0);

    res.render("cart", { user: req.user, cart: cart.products, total });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener el carrito");
  }
});

router.post("/products/add/:pid", isAuthenticated, isUser, async (req, res) => {
  try {
    const { pid } = req.params;

    const user = await User.findById(req.user.id).populate("cart");
    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }

    if (!user.cart) {
      const newCart = new Cart();
      await newCart.save();
      user.cart = newCart.id;
      await user.save();
    }

    const product = await Product.findById(pid);
    if (!product) {
      return res.status(404).send("Producto no encontrado");
    }

    const cart = await Cart.findById(user.cart);
    if (!cart) {
      return res.status(404).send("Carrito no encontrado");
    }

    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === pid
    );

    if (productIndex >= 0) {
      if (cart.products[productIndex].quantity < product.stock) {
        cart.products[productIndex].quantity += 1;
      } else {
        return res
          .status(400)
          .send("No hay suficiente stock disponible para agregar más unidades");
      }
    } else {
      if (product.stock > 0) {
        cart.products.push({
          product: pid,
          quantity: 1,
        });
      } else {
        return res
          .status(400)
          .send(
            "No hay suficiente stock disponible para agregar este producto"
          );
      }
    }

    await cart.save();

    console.log("Carrito actualizado:", cart);

    res.redirect("/cart");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al agregar el producto al carrito");
  }
});

router.post("/products/delete/:pid", isAuthenticated, isUser, async (req, res) => {
    try {
      const { pid } = req.params;

      const user = await User.findById(req.user.id).populate("cart");
      if (!user || !user.cart) {
        return res.status(404).send("Carrito no encontrado");
      }

      const cart = await Cart.findById(user.cart.id);

      const productInCart = cart.products.find(
        (p) => p.product.toString() === pid
      );
      if (!productInCart) {
        return res.status(404).send("Producto no encontrado en el carrito");
      }

      const product = await Product.findById(pid);
      if (!product) {
        return res
          .status(404)
          .send("Producto no encontrado en la base de datos");
      }

      if (productInCart.quantity > 1) {
        productInCart.quantity -= 1;
        product.stock += 1;
      } else {
        cart.products = cart.products.filter(
          (p) => p.product.toString() !== pid
        );
        product.stock += 1;
      }

      await cart.save();
      await product.save();
      await user.save();

      res.redirect("/cart");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al eliminar el producto del carrito");
    }
  }
);

router.post('/:cid/purchase', isAuthenticated, isUser, async (req, res) => {
  try {
    const { cid } = req.params;
    
    
    const cart = await Cart.findById(cid).populate('products.product');
    
    if (!cart) {
      return res.status(404).send('Carrito no encontrado');
    }

    const productsNotProcessed = [];
    let totalAmount = 0;

    
    for (const cartItem of cart.products) {
      const product = cartItem.product;
      const quantityInCart = cartItem.quantity;

      
      if (product.stock >= quantityInCart) {
        product.stock -= quantityInCart;
        await product.save();

        totalAmount += product.price * quantityInCart;
      } else {
        productsNotProcessed.push(product.id);
      }
    }

    cart.products = cart.products.filter(cartItem => productsNotProcessed.includes(cartItem.product.id));
    await cart.save();

    if (totalAmount > 0) {
      const ticket = new Ticket({
        code: uuidv4(),
        purchase_datetime: new Date(),
        amount: totalAmount,
        purchaser: req.user.email
      });

      await ticket.save();
    }
    
    if (productsNotProcessed.length > 0) {
      return res.status(200).json({
        message: 'Compra realizada parcialmente',
        notProcessed: productsNotProcessed
      });
    }

    res.status(200).json({ message: 'Compra completada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al finalizar la compra');
  }
});
export default router;
