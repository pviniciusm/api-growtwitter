import { User } from "@prisma/client";
import { sign, verify } from "jsonwebtoken";
import { UserTokenDTO } from "../dtos/user-token.dto";

export class AuthService {
    public createToken(data: UserTokenDTO) {
        try {
            return sign(data, process.env.JWT_SECRET!, {
                expiresIn: 3000,
            });
        } catch (error: any) {
            console.log(error);

            return null;
        }
    }

    public decodeToken(token: string): UserTokenDTO | null {
        try {
            const data = verify(token, process.env.JWT_SECRET!);

            return data as UserTokenDTO;
        } catch (error: any) {
            console.log(error);

            return null;
        }
    }
}
