import mongoose from "npm:mongoose@7.6.3";
import { dni } from "./dnit.ts";


//Esquema que utilizaremos para la bd
const Schema = mongoose.Schema; 
const dnischema = new Schema(
  {
    nombre_y_apellidos:{ type: String, required: true },
    DNI:{ type: String, required: true,unique: true},
    email:{type:String,required:true},
    codigo_postal:{type:String,required:true},
    ISO:{type:String,required:true}
  },
  { timestamps: true }
);

export type DNIModelType = mongoose.Document & Omit<dni,"id">;    //Queremos que el id sea el de mongodb por lo que no hace falta su asignacion
export default mongoose.model<DNIModelType>("Dni", dnischema);