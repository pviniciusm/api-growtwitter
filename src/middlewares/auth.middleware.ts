import { NextFunction, Request, Response } from "express";
import { TokenService } from "../services/jwt.service";

export class AuthMiddleware {
    public static checkLogin(req: Request, res: Response, next: NextFunction) {
        try {
            const { authorization } = req.headers;

            if (!authorization) {
                return res.status(401).send({
                    ok: false,
                    message: "Session expired. Please login and try again.",
                });
            }

            const user = TokenService.validate(authorization);
            if (!user) {
                return res.status(401).send({
                    ok: false,
                    message: "Session expired. Please login and try again.",
                });
            }

            next();
        } catch (error: any) {
            return res.status(401).send({
                ok: false,
                message: "Session expired. Please login and try again.",
            });
        }
    }

    public static checkUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { authorization } = req.headers;
            const { idUser } = req.params;

            if (!authorization) {
                return res.status(401).send({
                    ok: false,
                    message: "Session expired. Please login and try again.",
                });
            }

            const user = TokenService.decode(authorization);

            if (user.id !== idUser) {
                return res.status(403).send({
                    ok: false,
                    message: "You are not allowed to access this service.",
                });
            }

            next();
        } catch (error: any) {
            return res.status(401).send({
                ok: false,
                message: "Session expired. Please login and try again.",
            });
        }
    }
}
