import { Request, Response } from "express";
import tweetService from "../services/tweet.service";

export class TweetController {
    public async list(req: Request, res: Response) {
        try {
            const { idUser } = req.params;

            const result = await tweetService.list(idUser);

            return res.status(result.code).send(result);
        } catch (error: any) {
            return res.status(500).send(error.toString());
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const { content } = req.body;
            const { idUser } = req.params;

            if (!content) {
                return res.status(400).send({
                    code: 400,
                    message: "Fields not provided (content)",
                });
            }

            const result = await tweetService.create({
                idUser,
                content,
            });

            return res.status(result.code).send(result);
        } catch (error: any) {
            return res.status(500).send(error.toString());
        }
    }

    public async like(req: Request, res: Response) {
        try {
            const { idUser, idTweet } = req.params;

            const result = await tweetService.like({
                idUser,
                idTweet,
            });

            return res.status(result.code).send(result);
        } catch (error: any) {
            return res.status(500).send(error.toString());
        }
    }
}
