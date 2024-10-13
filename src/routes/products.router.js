import { Router } from "express";
import Product from "../models/product.model.js";
import { isAdmin, isUser } from "../middlewares/authorization.js";
import isAuthenticated from "../config/passport.js";

const router = Router();

router.get("/", async (req, res) => {
  const { limit = 5, page = 1, sort, query } = req.query;

  let filter = {};
  if (query) {
    const queryParts = query.split("=");
    if (queryParts.length === 2 && queryParts[0] === "category") {
      filter.category = { $regex: queryParts[1], $options: "i" };
    } else if (queryParts.length === 2 && queryParts[0] === "status") {
      filter.available = queryParts[1] === "true";
    }
  }

  const options = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    sort: sort ? { price: sort === "asc" ? 1 : -1 } : {},
  };

  try {
    const result = await Product.paginate(filter, options);

    res.render("home", {
      products: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      currentPage: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage
        ? `/home?page=${result.prevPage}&limit=${limit}&sort=${sort}&query=${query}`
        : null,
      nextLink: result.hasNextPage
        ? `/home?page=${result.nextPage}&limit=${limit}&sort=${sort}&query=${query}`
        : null,
    });
  } catch (err) {
    res.status(500).render("error", { error: err.message });
  }
});


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

router.post("/:id/add-to-cart", isAuthenticated, isUser, async (req, res) => {
  
  res.json({ message: "Producto agregado al carrito" });
});

export default router;
