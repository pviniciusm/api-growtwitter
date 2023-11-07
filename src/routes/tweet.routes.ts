import { Router } from "express";
import { TweetController } from "../controllers/tweet.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export const tweetRoutes = () => {
    const router = Router({
        mergeParams: true,
    });

    router.get("/", [AuthMiddleware.checkUser], new TweetController().list);
    router.post("/", [AuthMiddleware.checkUser], new TweetController().create);
    router.post(
        "/:idTweet/like",
        [AuthMiddleware.checkUser],
        new TweetController().like
    );
    router.delete(
        "/:idTweet/like",
        [AuthMiddleware.checkUser],
        new TweetController().dislike
    );

    return router;
};
