import repository from "../database/prisma.database";
import { Result } from "../dtos/result.dto";
import { User } from "../models/user.model";
import { TokenService } from "./jwt.service";

interface CreateUserDto {
    username: string;
    password: string;
    name: string;
    imgUrl?: string;
}

interface CheckCredentialsDto {
    username: string;
    password: string;
}

class UserService {
    public async list(): Promise<Result> {
        const result = await repository.user.findMany();

        return {
            code: 200,
            message: "Users sucessfully listed",
            data: result,
        };
    }

    public async create(data: CreateUserDto): Promise<Result> {
        const user = new User(
            data.name,
            data.username,
            data.password,
            data.imgUrl
        );

        const result = await repository.user.create({
            data: {
                ...data,
                id: user.id,
            },
        });

        return {
            code: 201,
            message: "User succsssfully created",
            data: result,
        };
    }

    public async checkCredentials(data: CheckCredentialsDto): Promise<Result> {
        const user = await repository.user.findUnique({
            where: {
                username: data.username,
            },
        });

        if (!user) {
            return {
                code: 401,
                message: "Invalid username or password",
            };
        }

        if (user.password !== data.password) {
            return {
                code: 401,
                message: "Invalid username or password",
            };
        }

        const token = TokenService.create({
            id: user.id,
        });

        return {
            code: 200,
            message: "User successfully logged",
            data: {
                ...user,
                token,
            },
        };
    }
}

export default new UserService();
