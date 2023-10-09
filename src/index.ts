import express from "express";
import cors from "cors";
import { userRoutes } from "./routes/user.routes";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRoutes());

app.listen(3333, () => {
    console.log("API is running");
});
