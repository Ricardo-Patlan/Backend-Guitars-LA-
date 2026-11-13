GuitarsLA - Backend
Es la API de la tienda de guitarras, esta hecha con Node, Express, y PostgreSQL
Sirve para guardar las guitarras en la base de datos y mandarselas al proyecto de React

Lo que se necesita tener instalado antes

Node.js (yo use la version 22)
Una base de datos PostgreSQL, yo use una de Render pero tambien puede ser local

La estructura que tiene es

backend
model
Guitar.model.ts
handlers
Guitar.ts
config
db.ts
index.ts
server.ts
router.ts
.env

Paso 1 instalar las dependencias

Abrimos una terminal dentro de la carpeta backend y ponemos

cd "C:\Sistemas Abiertos Principal\GuitarsLA-ts\backend"
npm install

Con eso se instala todo lo que esta en el package.json. Si se quiere instalar desde cero son estos comandos

npm install express sequelize sequelize-typescript pg pg-hstore dotenv express-validator
npm install -D typescript@^5.2.2 ts-node nodemon @types/express

Paso 2 configurar el archivo .env

En la carpeta backend se crea un archivo que se llame .env con esto

DATABASE_URL=postgresql://usuario:contraseña@servidor/basededatos?ssl=true
PORT=4000

DATABASE_URL es la direccion de la base de datos, se cambia usuario, contraseña, servidor y basededatos por los datos de tu base. En Render viene como External Database URL. Si la base es local no lleva el ?ssl=true
PORT es el puerto donde va a correr la API, tiene que ser 4000 porque el front esta configurado para buscar la API ahi

El .env no se sube a git porque tiene la contraseña, por eso esta en el .gitignore

La tabla no se tiene que crear a mano, cuando arranca el servidor db.sync() la crea sola con los campos marca, modelo, precio y descripcion

Paso 3 arrancar el servidor

En la misma terminal dentro de backend

npm run dev

Si todo salio bien en la terminal sale

Rest api en el puerto 4000
http://localhost:4000/api/guitarras
Conexion a base de datos exitosa

Para apagarlo se presiona Ctrl + C. Con nodemon cada vez que se guarda un archivo el servidor se reinicia solo

Las rutas que tiene la API

GET http://localhost:4000/api/guitarras
Regresa todas las guitarras guardadas en la base de datos

POST http://localhost:4000/api/guitarras
Guarda una guitarra nueva, se manda un JSON asi

{
"marca": "Fender",
"modelo": "Stratocaster",
"precio": 499,
"descripcion": "Guitarra electrica"
}

Antes de guardar valida que ningun campo venga vacio, que marca, modelo y descripcion sean texto y que el precio sea un numero mayor a 0. Si algo esta mal regresa un error 400 con los mensajes y si todo esta bien regresa 201 con la guitarra guardada

CORS

En server.ts hay un middleware que deja que la pagina de React (http://localhost:5173) se comunique con la API sin que el navegador marque error de CORS

Problemas que me salieron

Si sale "Se registro un error en la conexion" hay que revisar que el DATABASE_URL del .env este bien escrito
Si sale que el puerto 4000 esta ocupado es porque ya hay otro servidor corriendo, hay que cerrarlo primero
Si sale error de ts-node revisar que typescript sea la version 5 con npm list typescript
