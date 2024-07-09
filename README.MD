# Nombre del Proyecto

E-COMMERCE BACKEND CODER

## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
3. [Estructura de Directorios](#estructura-de-directorios)
4. [Instalación](#instalación)
5. [Uso](#uso)
6. [Endpoints API](#endpoints-api)



## Introducción

Breve introducción sobre el proyecto y su propósito.

## Tecnologías Utilizadas

- Node.js
- Express.js
- JavaScript (ES6+)
- JSON

## Estructura de Directorios

Explicación de la estructura de directorios del proyecto:

<pre>
/
├── src/
│   ├── data/
│   │   ├── productos.json
│   │   └── carritos.json
│   ├── public/
│   │   └── index.html
│   ├── routes/
│   │   ├── products.router.js
│   │   └── carts.router.js
│   └── utils/
│       ├── products_utils.js
│       └── carts_utils.js
├── app.js
├── package.json
└── README.md
</pre>


- `/src`: Directorio principal para el código fuente.
- `/src/data`: Archivos JSON para almacenar productos y carritos.
- `/src/public`: Archivos estáticos del frontend (por ejemplo, HTML, CSS, imágenes).
- `/src/routes`: Archivos que manejan las rutas y controladores para productos y carritos.
- `/src/utils`: Archivos de utilidades para leer/escribir archivos, etc.

## Instalación

1. Clonar el repositorio:

   ```bash git@github.com:Mtofalo22/backend-coder-70065.git
   
   
## Endpoints API

### Productos

- **GET /api/products**: Listar todos los productos.
- **GET /api/products/:pid**: Obtener un producto por ID.
- **POST /api/products**: Crear un nuevo producto.
- **PUT /api/products/:pid**: Actualizar un producto existente por ID.
- **DELETE /api/products/:pid**: Eliminar un producto por ID.

### Carritos

- **POST /api/carts**: Crear un nuevo carrito.
- **GET /api/carts/:cid**: Obtener productos de un carrito por ID.
- **POST /api/carts/:cid/product/:pid**: Agregar un producto a un carrito por ID.
- **DELETE /api/carts/:cid/product/:pid**: Eliminar un producto de un carrito por ID.
- **DELETE /api/carts/:cid**: Eliminar un carrito por ID.


