import { Router } from "express";
import { TweetController } from "../controllers/tweet.controller";

export const tweetRoutes = () => {
    const router = Router({
        mergeParams: true,
    });

    router.get("/", new TweetController().list);
    router.post("/", new TweetController().create);
    router.post("/:idTweet/like", new TweetController().like);
    router.delete("/:idTweet/like", new TweetController().dislike);

    return router;
};
