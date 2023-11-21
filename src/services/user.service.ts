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

interface FollowUserDto {
    idUser: string;
    idFollowedUser: string;
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

    public async follow(data: FollowUserDto): Promise<Result> {
        // 1- check if users exist
        const user = await repository.user.findUnique({
            where: {
                id: data.idUser,
            },
            include: {
                following: true,
            },
        });

        if (!user) {
            return {
                code: 404,
                message: "User not found",
            };
        }

        const followedUser = await repository.user.findFirst({
            where: {
                id: data.idFollowedUser,
            },
        });

        if (!followedUser) {
            return {
                code: 404,
                message: "User not found",
            };
        }

        // 2 - check if user already follows followedUser
        if (
            user.following.some(
                (follower) => follower.idFollowedUser == data.idFollowedUser
            )
        ) {
            return {
                code: 400,
                message: `User (${user.id}) already follows user (${data.idFollowedUser})`,
            };
        }

        // 3- create a follower register
        const follow = await repository.follower.create({
            data: {
                idUser: data.idUser,
                idFollowedUser: data.idFollowedUser,
            },
        });

        return {
            code: 201,
            data: follow,
            message: "User successfully followed",
        };
    }

    public async unfollow(data: FollowUserDto): Promise<Result> {
        // 1- check if users exist
        const user = await repository.user.findUnique({
            where: {
                id: data.idUser,
            },
            include: {
                following: true,
            },
        });

        if (!user) {
            return {
                code: 404,
                message: "User not found",
            };
        }

        const followedUser = await repository.user.findFirst({
            where: {
                id: data.idFollowedUser,
            },
        });

        if (!followedUser) {
            return {
                code: 404,
                message: "User not found",
            };
        }

        // 2 - check if user already follows followedUser
        if (
            !user.following.some(
                (follower) => follower.idFollowedUser == data.idFollowedUser
            )
        ) {
            return {
                code: 404,
                message: `User (${user.id}) does not follow user (${data.idFollowedUser})`,
            };
        }

        // 3- create a follower register
        const follow = await repository.follower.delete({
            where: {
                idFollowedUser_idUser: {
                    idFollowedUser: data.idFollowedUser,
                    idUser: data.idUser,
                },
            },
        });

        return {
            code: 201,
            data: follow,
            message: "User successfully followed",
        };
    }
}

export default new UserService();
