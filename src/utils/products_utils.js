import fs from 'fs';
import path from 'path';

const filePath = path.resolve('src/data/productos.json');

let productos = [];

const leerProductos = () => {
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf-8');
    productos = JSON.parse(data);
  }
};

const guardarProductos = () => {
  fs.writeFileSync(filePath, JSON.stringify(productos, null, 2));
};

export const getProducts = (limit) => {
  leerProductos();
  return limit ? productos.slice(0, limit) : productos;
};

export const getProductById = (pid) => {
  leerProductos();
  return productos.find(product => product.id === pid);
};

export const addProduct = (productData) => {
  leerProductos();
  const newProduct = {
    id: Date.now().toString(),
    ...productData,
    status: productData.status !== undefined ? productData.status : true,
  };
  productos.push(newProduct);
  guardarProductos();
  return newProduct;
};

export const updateProduct = (pid, updateData) => {
  leerProductos();
  const productIndex = productos.findIndex(product => product.id === pid);
  if (productIndex === -1) return null;
  const updatedProduct = { ...productos[productIndex], ...updateData, id: productos[productIndex].id };
  productos[productIndex] = updatedProduct;
  guardarProductos();
  return updatedProduct;
};

export const deleteProduct = (pid) => {
  leerProductos();
  const productIndex = productos.findIndex(product => product.id === pid);
  if (productIndex === -1) return false;
  productos.splice(productIndex, 1);
  guardarProductos();
  return true;
};
