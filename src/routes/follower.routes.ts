import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { FollowerController } from "../controllers/follower.controller";

export const followerRoutes = () => {
    const router = Router({
        mergeParams: true,
    });

    router.post(
        "/:idFollowedUser",
        [AuthMiddleware.checkUser],
        new FollowerController().follow
    );
    router.delete(
        "/:idFollowedUser",
        [AuthMiddleware.checkUser],
        new FollowerController().unfollow
    );

    return router;
};
