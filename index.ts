import express, { Express } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import clientRoutes from "./routes/client/index.route";
import methodOverride from "method-override";
import bodyParser from "body-parser";

import adminRoutes from "./routes/admin/index.route";
import { systemConfig } from "./config/config";
import path from "path";

dotenv.config();

database.connect();



const app: Express = express();
const port: number = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(`${__dirname}/public`));

app.use(methodOverride("_method"));

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// TinyMCE
app.use(
  "/tinymce",
  express.static(path.join(__dirname, "node_modules", "tinymce"))
);
// End TinyMCE

// App Local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Routes Admin
adminRoutes(app);

// Routes Client
clientRoutes(app);


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});


