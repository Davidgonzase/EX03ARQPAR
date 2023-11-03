import { Request, Response } from "npm:express@4.18.2";
import { dni } from "../db/dnit.ts";
import DNIModel  from "../db/dnis.ts";

const updatedni = async (req: Request, res: Response) => {
  try {
    const DNI=req.params.dni
    //Conseguimos todos los recursos del body y comprobamos el type
    const {nombre_y_apellidos,email,codigo_postal,ISO} = req.body;
    if (!nombre_y_apellidos||!email||!codigo_postal||!ISO) {
      res.status(500).send("Faltan variables");
      return;
    }
    if(!DNI){
        res.status(500).send("Faltan variables");
      return;
    }
    const updatedPerson = await DNIModel.findOneAndUpdate(
        { DNI },
        { nombre_y_apellidos, email,codigo_postal,ISO},
        { new: true }
      ).exec();
  
    if (!updatedPerson) {
        res.status(404).send("Persona no encontrada");
        return;
    }
    res.status(200).send({
        DNI:updatedPerson.DNI,
        nombre_y_apellidos:updatedPerson.nombre_y_apellidos,
        email:updatedPerson.email,
        codigo_postal:updatedPerson.codigo_postal,
    } );
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default updatedni;