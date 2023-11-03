import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import getconct from "./resolvers/getconct.ts";
import getdni from "./resolvers/getdni.ts";
import newdni from "./resolvers/newdni.ts";
import updatedni from "./resolvers/updatedni.ts";
import deletedni from "./resolvers/deletedni.ts";

const env = await load();
const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");
if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}
await mongoose.connect(MONGO_URL);

const app = express();

app.use(express.json())


app
.get("/api/contactos",getconct)
.get("/api/contactos/:dni",getdni)
.post("/api/contactos",newdni)
.put("/api/contactos/:dni",updatedni)
.delete("/api/contactos/:dni",deletedni)


app.listen(3000, () => {
    console.log("Server listening on port 3000");
});