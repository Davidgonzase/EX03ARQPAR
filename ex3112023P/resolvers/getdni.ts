import { Request, Response } from "npm:express@4.18.2";
import { dni } from "../db/dnit.ts";
import DNIModel  from "../db/dnis.ts";
import getciudad from "./getciudad.ts";
import getpais from "./getpais.ts";
import gethora from "./gethora.ts";
import gettiempo from "./gettiempo.ts";

const getdni = async (req: Request, res: Response) => {
  try {
    const DNI=req.params.dni;
    const dnires = await DNIModel.findOne({DNI:DNI}).exec();

    if (!dnires) {
      res.status(404).send("No hay dnis");
      return;
    }
    
    res.status(200).send({
        DNI:dnires.DNI,
        nombre_y_apellidos:dnires.nombre_y_apellidos,
        email:dnires.email,
        codigo_postal:dnires.codigo_postal,
        ciudad:await getciudad(dnires.ISO,dnires.codigo_postal),
        pais:await getpais(dnires.ISO),
        hora:await gethora(dnires.ISO),
        tiempo:await gettiempo(await getciudad(dnires.ISO,dnires.codigo_postal))
    } );
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getdni;