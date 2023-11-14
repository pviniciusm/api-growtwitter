import express from "express";
import cors from "cors";
import { userRoutes } from "./routes/user.routes";
import * as dotenv from "dotenv";
dotenv.config();

import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./docs/swagger.json";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRoutes());

app.use("/docs", swaggerUi.serve);
app.get("/docs", swaggerUi.setup(swaggerDoc));

app.listen(process.env.PORT, () => {
    console.log("API is running");
});
