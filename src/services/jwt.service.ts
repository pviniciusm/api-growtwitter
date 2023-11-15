import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET as string;

export class TokenService {
    public static create(payload: any) {
        return jwt.sign(payload, secret);
    }

    public static validate(token: string): any {
        try {
            const decoded = jwt.verify(token, secret);

            return decoded as jwt.JwtPayload;
        } catch {
            return null;
        }
    }

    public static decode(token: string): any {
        return jwt.decode(token);
    }
}
