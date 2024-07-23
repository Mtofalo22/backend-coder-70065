import fs from 'fs';
import path from 'path';
import fs from 'fs/promises';

const filePath = path.resolve('src/data/carritos.json');

let carritos = [];

const leerCarritos = () => {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf-8');
    carritos = JSON.parse(data);
  }
};

const guardarCarritos = () => {
  fs.writeFileSync(filePath, JSON.stringify(carritos, null, 2));
};

export const createCart = () => {
  leerCarritos();
  const newCart = { id: Date.now().toString(), products: [] };
  carritos.push(newCart);
  guardarCarritos();
  return newCart;
};

export const getCartById = (cid) => {
  leerCarritos();
  return carritos.find(cart => cart.id === cid);
};

export const addProductToCart = (cid, pid) => {
  leerCarritos();
  const cart = carritos.find(cart => cart.id === cid);
  if (!cart) return null;
  const productIndex = cart.products.findIndex(product => product.id === pid);
  if (productIndex === -1) {
    cart.products.push({ id: pid, quantity: 1 });
  } else {
    cart.products[productIndex].quantity += 1;
  }
  guardarCarritos();
  return cart;
};

export async function getCartById(cartId) {
    try {
      const data = await fs.readFile('src/data/carritos.json', 'utf-8');
      const carts = JSON.parse(data);
      const cart = carts.find(cart => cart.id === cartId);
      return cart;
    } catch (error) {
      throw new Error('Error reading cart data');
    }
  }
  
  
  export async function deleteProductFromCart(cartId, productId) {
    try {
      let data = await fs.readFile('src/data/carritos.json', 'utf-8');
      let carts = JSON.parse(data);
      const cartIndex = carts.findIndex(cart => cart.id === cartId);
  
      if (cartIndex === -1) {
        throw new Error('Cart not found');
      }
  
      const updatedProducts = carts[cartIndex].products.filter(product => product.id !== productId);
      carts[cartIndex].products = updatedProducts;
  
      await fs.writeFile('src/data/carritos.json', JSON.stringify(carts, null, 2), 'utf-8');
  
      return carts[cartIndex];
    } catch (error) {
      throw new Error('Error deleting product from cart');
    }
  }