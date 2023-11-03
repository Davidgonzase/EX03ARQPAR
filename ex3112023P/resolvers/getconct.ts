import { Request, Response } from "npm:express@4.18.2";
import { dni } from "../db/dnit.ts";
import DNIModel  from "../db/dnis.ts";

const getconct = async (req: Request, res: Response) => {
  try {
    const dnis = await DNIModel.find({}).exec();
    if (!dnis) {
      res.status(404).send("No hay dnis");
      return;
    }
    res.status(200).send(dnis.map(i=>{return{
      nombre_y_apellidos:i.nombre_y_apellidos,
      DNI:i.DNI
    }}));
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getconct;