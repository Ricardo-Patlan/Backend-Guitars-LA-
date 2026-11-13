import express from "express";
import router from "./router";
import db from "./config/db";

// Conectar base de datos
async function connectDB() {
  try {
    await db.authenticate();
    await db.sync({ alter: true });
    console.log("Conexion a base de datos exitosa");
  } catch (error) {
    console.log(error);
    console.log("Se registro un error en la conexion");
  }
}
connectDB();

const server = express();

// CORS: permitir que la app de React se comunique con la API
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // el navegador manda OPTIONS antes del POST
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }
  next();
});

server.use(express.urlencoded({ extended: true }));

// Leer JSON en el body de las peticiones
server.use(express.json());

server.use("/api", router);

export default server;
