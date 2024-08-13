import fs from 'fs/promises';
import path from 'path';

const filePath = path.resolve('src/data/carritos.json');

let carritos = [];

const leerCarritos = async () => {
  try {
    if (await fs.stat(filePath)) {
      const data = await fs.readFile(filePath, 'utf-8');
      carritos = JSON.parse(data);
    }
  } catch (error) {
    // Archivo no encontrado o error al leer
    carritos = [];
  }
};

const guardarCarritos = async () => {
  await fs.writeFile(filePath, JSON.stringify(carritos, null, 2));
};

export const createCart = async () => {
  await leerCarritos();
  const newCart = { id: Date.now().toString(), products: [] };
  carritos.push(newCart);
  await guardarCarritos();
  return newCart;
};

export const getCartById = async (cid) => {
  await leerCarritos();
  return carritos.find(cart => cart.id === cid);
};

export const addProductToCart = async (cid, pid) => {
  await leerCarritos();
  const cart = carritos.find(cart => cart.id === cid);
  if (!cart) return null;
  const productIndex = cart.products.findIndex(product => product.id === pid);
  if (productIndex === -1) {
    cart.products.push({ id: pid, quantity: 1 });
  } else {
    cart.products[productIndex].quantity += 1;
  }
  await guardarCarritos();
  return cart;
};

export const deleteProductFromCart = async (cartId, productId) => {
  try {
    await leerCarritos();
    const cartIndex = carritos.findIndex(cart => cart.id === cartId);

    if (cartIndex === -1) {
      throw new Error('Cart not found');
    }

    const updatedProducts = carritos[cartIndex].products.filter(product => product.id !== productId);
    carritos[cartIndex].products = updatedProducts;

    // Eliminar el carrito si está vacío
    if (carritos[cartIndex].products.length === 0) {
      carritos.splice(cartIndex, 1);
    }

    await guardarCarritos();

    return carritos[cartIndex];
  } catch (error) {
    throw new Error('Error deleting product from cart');
  }
};
