import repository from "../database/prisma.database";
import { Result } from "../dtos/result.dto";
import { User } from "../models/user.model";
import { hashSync, compareSync } from "bcryptjs";
import { AuthService } from "./auth.service";

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
        const user = new User(data.name, data.username, data.password, data.imgUrl);

        const hashedPassword = hashSync(data.password, 8);

        const result = await repository.user.create({
            data: {
                ...data,
                id: user.id,
                password: hashedPassword,
            },
        });

        return {
            code: 201,
            message: "User succsssfully created",
            data: result,
        };
    }

    public async login(data: CheckCredentialsDto): Promise<Result> {
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

        const validPassword = compareSync(data.password, user.password);

        if (!validPassword) {
            return {
                code: 401,
                message: "Invalid username or password",
            };
        }

        const token = new AuthService().createToken(user);
        if (!token) {
            return {
                code: 401,
                message: "Error creating auth token",
            };
        }

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
