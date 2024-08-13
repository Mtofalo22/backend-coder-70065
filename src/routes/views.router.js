import { Router } from "express";
import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";

const router = Router();

router.get("/home", async (req, res) => {
  const { limit = 5, page = 1, sort = "", query = "" } = req.query;

  let filter = {};
    if (query) {
        const queryParts = query.split('=');
        if (queryParts.length === 2) {
            if (queryParts[0] === 'category') {
                filter.category = { $regex: queryParts[1], $options: 'i' };
            } else if (queryParts[0] === 'status') {
                filter.status = queryParts[1] === 'true';
            }
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
    res.status(500).send("error", { error: err.message });
  }
});

router.get("/cart", async (req, res) => {
  try {
    const cart = await Cart.findOne().populate("products.product");
    res.render("cart", { cart: cart ? cart.products : [] });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener el carrito");
  }
});

export default router;
