import server from "./server";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 4000;

// declarar el puerto
server.listen(port, () => {
  console.log(`Rest api en el puerto ${port}`);
  console.log(`http://localhost:${port}/api/guitarras`);
});
