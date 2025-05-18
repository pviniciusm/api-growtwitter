import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { tweetRoutes } from "./tweet.routes";
import { checkUserMiddleware } from "./user.middleware";

export const userRoutes = () => {
    const router = Router();

    router.get("/", new UserController().list);
    router.post("/", new UserController().create);
    router.post("/auth", new UserController().login);

    // Tweet routes
    router.use("/:idUser/tweet", [checkUserMiddleware], tweetRoutes());

    return router;
};
