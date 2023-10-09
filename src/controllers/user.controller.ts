import { Request, Response } from "express";
import userService from "../services/user.service";

export class UserController {
    public async list(req: Request, res: Response) {
        try {
            const result = await userService.list();

            return res.status(result.code).send(result);
        } catch (error: any) {
            return res.status(500).send(error.toString());
        }
    }

    public async create(req: Request, res: Response) {
        try {
            const { name, username, password } = req.body;

            if (!name || !username || !password) {
                return res.status(400).send({
                    code: 400,
                    message:
                        "Fields not provided (name, username and password)",
                });
            }

            const result = await userService.create(req.body);

            return res.status(result.code).send(result);
        } catch (error: any) {
            return res.status(500).send(error.toString());
        }
    }

    public async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).send({
                    code: 400,
                    message: "Fields not provided (username and password)",
                });
            }

            const result = await userService.checkCredentials(req.body);

            return res.status(result.code).send(result);
        } catch (error: any) {
            return res.status(500).send(error.toString());
        }
    }
}
