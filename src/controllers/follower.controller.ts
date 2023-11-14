import { Request, Response } from "express";
import userService from "../services/user.service";

export class FollowerController {
    public async follow(req: Request, res: Response) {
        try {
            const { idUser, idFollowedUser } = req.params;

            const result = await userService.follow({
                idUser,
                idFollowedUser,
            });

            return res.status(result.code).send(result);
        } catch (error: any) {
            return res.status(500).send(error.toString());
        }
    }
}
