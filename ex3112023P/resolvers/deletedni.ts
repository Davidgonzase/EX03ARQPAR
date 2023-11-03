import { Request, Response } from "npm:express@4.18.2";
import { dni } from "../db/dnit.ts";
import DNIModel  from "../db/dnis.ts";

const deletedni = async (req: Request, res: Response) => {
  try {
    const DNI = req.params.dni;
    const person = await DNIModel.findOneAndDelete({ DNI }).exec();
    if (!person) {
      res.status(404).send("Persona no encontrada");
      return;
    }
    res.status(200).send("Persona borrada");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deletedni;