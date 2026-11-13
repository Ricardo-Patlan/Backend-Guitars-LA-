import Guitar from "../model/Guitar.model";
import { Request, Response } from "express";
import { check, validationResult } from "express-validator";

export const getGuitars = async (req: Request, res: Response) => {
  try {
    const guitarras = await Guitar.findAll({
      order: [["id", "ASC"]],
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json({ data: guitarras });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al obtener las guitarras" });
  }
};

export const createGuitar = async (req: Request, res: Response) => {
  try {
    await check("marca")
      .notEmpty()
      .withMessage("La marca no puede ir vacía")
      .bail()
      .isString()
      .withMessage("La marca debe ser texto")
      .bail()
      .trim()
      .notEmpty()
      .withMessage("La marca no puede ir vacía")
      .isLength({ max: 100 })
      .withMessage("La marca no puede tener más de 100 caracteres")
      .run(req);
    await check("modelo")
      .notEmpty()
      .withMessage("El modelo no puede ir vacío")
      .bail()
      .isString()
      .withMessage("El modelo debe ser texto")
      .bail()
      .trim()
      .notEmpty()
      .withMessage("El modelo no puede ir vacío")
      .isLength({ max: 100 })
      .withMessage("El modelo no puede tener más de 100 caracteres")
      .run(req);
    await check("precio")
      .notEmpty()
      .withMessage("El precio no puede ir vacío")
      .bail()
      .isNumeric()
      .withMessage("El precio debe ser un número")
      .bail()
      .custom((value) => Number(value) > 0)
      .withMessage("El precio debe ser mayor a 0")
      .run(req);
    await check("descripcion")
      .notEmpty()
      .withMessage("La descripción no puede ir vacía")
      .bail()
      .isString()
      .withMessage("La descripción debe ser texto")
      .bail()
      .trim()
      .notEmpty()
      .withMessage("La descripción no puede ir vacía")
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { marca, modelo, precio, descripcion } = req.body;
    const guitarra = await Guitar.create({
      marca,
      modelo,
      precio,
      descripcion,
    });
    res.status(201).json({ data: guitarra });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear la guitarra" });
  }
};
