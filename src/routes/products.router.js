import { Router } from "express";
import Product from "../models/product.model.js";
import { isAdmin, isUser } from "../middlewares/authorization.js";
import isAuthenticated from "../config/passport.js";

const router = Router();


router.post("/", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { title, description, price, category, stock } = req.body;
    const newProduct = new Product({
      title,
      description,
      price,
      category,
      stock,
    });
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Producto creado", product: newProduct });
  } catch (error) {
    res.status(500).json({ error: "No se pudo crear el producto" });
  }
});


router.put("/:id", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProduct) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json({
      message: "Producto actualizado correctamente",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ error: "No se pudo actualizar el producto" });
  }
});


router.post("/delete/:id", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.json({ message: 'Producto eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});


export default router;
