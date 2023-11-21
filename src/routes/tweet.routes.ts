import { Router } from "express";
import { TweetController } from "../controllers/tweet.controller";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export const tweetRoutes = () => {
    const router = Router({
        mergeParams: true,
    });

    router.get("/", new TweetController().list);
    router.get("/feed", new TweetController().showFeed);
    router.post("/", [AuthMiddleware.checkUser], new TweetController().create);
    router.delete(
        "/:idTweet",
        [AuthMiddleware.checkUser],
        new TweetController().delete
    );
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
    router.post(
        "/reply/:idTweet",
        [AuthMiddleware.checkUser],
        new TweetController().reply
    );

    return router;
};
