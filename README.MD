

E-COMMERCE BACKEND CODER
# Proyecto Backend con Express, Handlebars y WebSocket

Este proyecto es una aplicación backend desarrollada con Node.js y Express que utiliza Handlebars como motor de plantillas y WebSockets para la comunicación en tiempo real. La aplicación permite la gestión de productos y carritos de compras.

## Características

- **Productos**: CRUD de productos, visualización en tiempo real.
- **Carritos**: Gestión de carritos de compras.
- **Plantillas**: Utiliza Handlebars para renderizar vistas dinámicas.
- **WebSockets**: Actualización en tiempo real de productos en la vista.



## Tecnologías Utilizadas

- **Node.js**
- **Express**
- **Express-Handlebars**
- **Socket.IO**
- **UUID**
- **File System (fs)**


## Estructura de Directorios

<pre>
/backend
├── src/
│ ├── data/
│ │ ├── productos.json
│ │ └── carritos.json
│ ├── public/
│ │ └── index.html
│ ├── routes/
│ │ ├── products.router.js
│ │ ├── carts.router.js
│ │ └── views.router.js
│ ├── utils/
│ │ ├── products_utils.js
│ │ └── carts_utils.js
│ └── views/
│ ├── home.handlebars
│ ├── realTimeProducts.handlebars
│ └── layouts/
│ └── main.handlebars
├── app.js
├── package.json
└── README.md
</pre>
   
## Endpoints API

Endpoints API

### Productos
GET /api/products: Listar todos los productos.
GET /api/products/:pid: Obtener un producto por ID.
POST /api/products: Crear un nuevo producto.
PUT /api/products/:pid: Actualizar un producto existente por ID.
DELETE /api/products/:pid: Eliminar un producto por ID.

### Carritos
POST /api/carts: Crear un nuevo carrito.
GET /api/carts/:cid: Obtener productos de un carrito por ID.
POST /api/carts/:cid/product/:pid: Agregar un producto a un carrito por ID.
DELETE /api/carts/:cid/product/:pid: Eliminar un producto de un carrito por ID.
DELETE /api/carts/:cid: Eliminar un carrito por ID.

## Vistas
Home: Muestra la lista de productos actuales.
Real Time Products: Muestra y actualiza automáticamente la lista de productos en tiempo real usando WebSockets.


