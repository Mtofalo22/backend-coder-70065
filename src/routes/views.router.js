import { Router } from 'express';
import Product from '../models/product.model.js';
import Cart from '../models/cart.model.js';
import isAuthenticated from '../config/passport.js';
import { isAdmin, isUser } from "../middlewares/authorization.js"; 

const router = Router();


router.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

router.get("/home", isAuthenticated, async (req, res) => {
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

    res.render("home", {user: req.user,
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

router.get('/register', (req, res) => {
  res.render('register', { user: req.user });  
});

router.get('/login', (req, res) => {
  res.render('login', { user: req.user });  
});

router.get("/auth/profile", isAuthenticated, (req, res) => {
  res.render("profile", { user: req.user });
});

router.get("/admin", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const products = await Product.find();
    res.render("admin", { products, user: req.user });
  } catch (error) {
    res.status(500).json({ error: "Error al recuperar productos" });
  }
});

router.get("/admin/products/:id/edit", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).render("error", { message: "Producto no encontrado" });
    }

    res.render("editproduct", { product, user: req.user });
  } catch (error) {
    res.status(500).render("error", { message: "Error al cargar el producto" });
  }
});

export default router;
