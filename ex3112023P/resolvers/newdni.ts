import { Request, Response } from "npm:express@4.18.2";
import { dni } from "../db/dnit.ts";
import DNIModel  from "../db/dnis.ts";

const newdni = async (req: Request, res: Response) => {
  try {
    //Conseguimos todos los recursos del body y comprobamos el type
    const {nombre_y_apellidos,DNI,email,codigo_postal,ISO} = req.body;
    if (!nombre_y_apellidos||!DNI||!email||!codigo_postal||!ISO) {
      res.status(500).send("Faltan variables");
      return;
    }

    const alreadyExists = await DNIModel.findOne({ DNI }).exec();
    if (alreadyExists) {
      res.status(400).send("Persona ya existe");
      return;
    }

    const newdni = new DNIModel({nombre_y_apellidos,DNI,email,codigo_postal,ISO});
    await newdni.save();
    //mostramos el resultado
    res.status(200).send({
        DNI:newdni.DNI,
        nombre_y_apellidos:newdni.nombre_y_apellidos,
        email:newdni.email,
        codigo_postal:newdni.codigo_postal,
    } );
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default newdni;