import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productsFilePath = path.join(__dirname, '../data/productos.json');

export const leerProductos = () => {
  try {
    const data = readFileSync(productsFilePath);
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

export const guardarProductos = (productos) => {
  writeFileSync(productsFilePath, JSON.stringify(productos, null, 2));
};
