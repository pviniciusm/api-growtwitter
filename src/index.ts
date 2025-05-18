import express from "express";
import cors from "cors";
import { userRoutes } from "./routes/user.routes";
import * as dotenv from "dotenv";

import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./docs.json";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/user", userRoutes());

app.listen(process.env.PORT, () => {
    console.log("API is running");
});
