import { Router } from "express";
import { UserController } from "../controllers/user.controller";

export const userRoutes = () => {
    const router = Router();

    router.get("/", new UserController().list);
    router.post("/", new UserController().create);
    router.post("/auth", new UserController().login);

    return router;
};
