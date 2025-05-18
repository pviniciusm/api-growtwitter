import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export const checkUserMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorization } = req.headers;
        const { idUser } = req.params;

        if (!authorization) {
            return res.status(401).send({
                ok: false,
                message: "Token not provided",
            });
        }

        const decoded = new AuthService().decodeToken(authorization);
        if (!decoded) {
            return res.status(401).send({
                ok: false,
                message: "An invalid token was provided",
            });
        }

        console.log(decoded.id);
        console.log(idUser);

        if (decoded.id !== idUser) {
            return res.status(403).send({
                ok: false,
                message: "User not allowed",
            });
        }

        return next();
    } catch (error: any) {
        return res.status(500).send({
            ok: false,
            message: error.toString(),
        });
    }
};
