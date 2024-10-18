

E-COMMERCE BACKEND CODER
# Proyecto Backend con Express, Handlebars y WebSocket

Este proyecto es una aplicación backend desarrollada con Node.js y Express que utiliza Handlebars como motor de plantillas y WebSockets para la comunicación en tiempo real. La aplicación permite la gestión de productos y carritos de compras.

## Características

- **Productos**: CRUD de productos, con filtro por categoría y paginación.
- **Carritos**: Gestión completa de carritos de compras con la opción de finalizar la compra..
- **Tickets**: Generación de tickets con detalles de la compra.
- **Envío de correos**: Envío de un correo con el resumen de la compra al comprador.
- **Autenticación**: Sistema de autenticación JWT para proteger rutas.
- **Plantillas**: Utiliza Handlebars para renderizar vistas dinámicas.
- **DAO y DTO**: Implementación de DAOs y DTOs para la capa de persistencia.
- **Mongoose**: Base de datos MongoDB para la gestión de productos y carritos.



## Tecnologías Utilizadas

- **Node.js**
- **Express**
- **Express-Handlebars**
- **Passport.js con JWT**
- **UUID**
- **Nodemailer (para el envío de correos)**
- **Mongoose**
- **MongoDB Atlas**
- **bycrypt**


## Estructura de Directorios

<pre>
/backend
├── src/
│ ├── config/
│ │ ├── config.js
│ │ └── passport.js
│ ├── dao/
│ │ └── DTOs/
│ │ └──── user.dto.js 
│ │ └── user.dao.js
│ ├── middlewares
│ │ └──authorization.js
│ ├── public/
│ │ └── css/
│ │ └──── stlyes.cee
│ │ └── index.html
│ ├── repositories/
│ │ └── user.repository.js
│ ├── routes/
│ │ ├── products.router.js
│ │ ├── carts.router.js
│ │ ├── user.router.js
│ │ └── views.router.js
│ ├── services/
│ │ └── mailer.js
│ ├── utils/
│ │ ├── products_utils.js
│ │ └── carts_utils.js
│ └── views/
│ ├── layouts/
│   └── main.handlebars
│ ├── admin.handlebars
│ ├── home.handlebars
│ ├── editproduct.handlebars
│ ├── cart.handlebars
│ ├── login.handlebars
│ ├── products.handlebars
│ ├── profile.handlebars
│ └── register.handlebars
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
POST /api/carts/
/product/:pid: Agregar un producto a un carrito por ID.
DELETE /api/carts/
/product/:pid: Eliminar un producto de un carrito por ID.
DELETE /api/carts/:cid: Eliminar un carrito por ID.
POST /api/carts/
/purchase: Finalizar la compra de un carrito.

### Roles y Permisos
**Administrador**
El administrador tiene permisos exclusivos para gestionar los productos y la plataforma. Las funcionalidades incluyen:

*Gestionar productos:*
-Crear, actualizar y eliminar productos.
-Visualizar y gestionar todos los productos.
-Visualización de usuarios: Acceso a la lista de usuarios registrados.
*Gestionar categorías:*
-Crear y editar categorías para organizar productos.
*Autorización avanzada:*
-Solo los administradores pueden acceder a las rutas críticas relacionadas con la administración de productos.


**Usuario**
El usuario tiene permisos para interactuar con los productos y gestionar su propio perfil y carrito de compras. Las funcionalidades incluyen:

*Ver productos:*
-Explorar y buscar productos con filtros por categoría.
-Ver detalles de productos.
*Gestionar carrito:*
-Agregar productos al carrito.
-Actualizar cantidades o eliminar productos del carrito.
-Finalizar la compra y generar un ticket.
*Perfil de usuario:*
-Visualizar y actualizar los datos personales.
-Cambiar contraseña.
*Historial de compras:*
-Ver los tickets de compras anteriores.


## Vistas
Home: Muestra la lista de productos actuales con opciones de filtrado y paginación.
Carrito: Muestra el contenido del carrito con la opción de finalizar la compra.
Perfil: Visualización del perfil de usuario.
Admin: Consola de creación, actualización o eliminación de productos



