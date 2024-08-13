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

Este proyecto es un backend para una tienda en línea que gestiona productos y carritos de compras. Utiliza MongoDB para la base de datos y ofrece funcionalidades para manejar productos y carritos de manera eficiente.

## Tecnologías Utilizadas

- Node.js
- Express.js
- MongoDB
- Mongoose
- express-handlebars
- method-override
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
│   ├── models/
│   │   ├── cart.model.js
│   │   └── product.model.js
│   └── utils/
│       ├── products_utils.js
│       └── carts_utils.js
├── app.js
├── package.json
└── README.md
</pre>

- `/src`: Directorio principal para el código fuente.
- `/src/data`: Archivos JSON para almacenamiento (si se usan en lugar de MongoDB en ciertas partes).
- `/src/public`: Archivos estáticos del frontend (por ejemplo, HTML, CSS, imágenes).
- `/src/routes`: Archivos que manejan las rutas y controladores para productos y carritos.
- `/src/models`: Modelos de datos para productos y carritos.
- `/src/utils`: Archivos de utilidades para manejo de datos.

## Instalación

   ```bash
   git clone git@github.com:Mtofalo22/backend-coder-70065.git


Uso
La aplicación se ejecuta en http://localhost:8080/home.
Puedes interactuar con la API a través de los endpoints especificados a continuación.
Endpoints API
Productos
GET /api/products: Listar todos los productos con paginación y filtros.

Parámetros de consulta:
limit: Número de productos por página (por defecto 5).
page: Número de página actual (por defecto 1).
sort: Ordenar por precio (asc o desc).
query: Filtro por categoría (category=NombreDeLaCategoria).
GET /api/products/
: Obtener un producto por ID.

POST /api/products: Crear un nuevo producto.

PUT /api/products/
: Actualizar un producto existente por ID.

DELETE /api/products/
: Eliminar un producto por ID.

Carritos
POST /api/carts: Crear un nuevo carrito.

GET /api/carts/
: Obtener productos de un carrito por ID.

POST /api/carts/
/product/
: Agregar un producto a un carrito por ID.

DELETE /api/carts/
/product/
: Eliminar un producto de un carrito por ID.

DELETE /api/carts/
: Eliminar un carrito por ID.