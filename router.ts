import { Router } from "express";
import { createGuitar, getGuitars } from "./handlers/Guitar";

const router = Router();

// ---------- Guitarras ----------

// GET
router.get("/guitarras", getGuitars);

// POST
router.post("/guitarras", createGuitar);

export default router;
