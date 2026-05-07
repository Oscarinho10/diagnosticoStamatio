# CRUD de Productos con React y MySQL

## Descripción

Aplicación web CRUD para gestionar productos. Permite registrar, listar, editar y eliminar productos desde una interfaz React conectada a un backend Node.js con MySQL.

## Tecnologías utilizadas

- React + Vite
- Node.js + Express
- MySQL
- CORS

## Funcionalidades

- Registrar nuevos productos.
- Consultar lista de productos.
- Editar productos existentes.
- Eliminar productos.
- Cada producto tiene 4 campos: nombre, descripción, precio y stock.

## Instrucciones para ejecutar el proyecto

1. Instalar MySQL y crear la base de datos:

   - Ejecuta `server/init.sql` en tu servidor MySQL.
   - O usa un cliente SQL para crear la base de datos `productos_db` y la tabla `products`.

2. Configurar las variables de entorno en `server/.env`.

   ```env
   DB_HOST=localhost
   DB_USER=root(o el usuario que tengas)
   DB_PASSWORD=((o la contraseña que tengas))
   DB_NAME=productos_db
   PORT=4000
   ```

3. Instalar dependencias del backend:

   ```bash
   cd server
   npm install
   ```

4. Iniciar el backend:

   ```bash
   npm start
   ```

5. Instalar dependencias del frontend:

   ```bash
   cd ../client
   npm install
   ```

6. Iniciar el frontend:

   ```bash
   npm run dev
   ```

7. Abrir la aplicación en el navegador.

## Uso de IA y para qué.

- Se usó IA para empezar con la estructura del proyecto, y continuar con la idea de las tecnologías que se podrían utilizar.