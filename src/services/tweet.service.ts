import repository from "../database/prisma.database";
import { Result } from "../dtos/result.dto";
import { Tweet, TweetType } from "../models/tweet.model";

interface CreateTweetDto {
    idUser: string;
    content: string;
}

interface LikeTweetDto {
    idUser: string;
    idTweet: string;
}

class TweetService {
    public async list(idUser: string): Promise<Result> {
        const user = await repository.user.findFirst({
            where: {
                id: idUser,
            },
        });

        if (!user) {
            return {
                code: 404,
                message: "User does not exist",
            };
        }

        const result = await repository.tweet.findMany({
            include: {
                likes: true,
                user: true,
            },
            orderBy: {
                updatedAt: "desc",
            },
        });

        return {
            code: 200,
            message: "Tweets successfully listed",
            data: result,
        };
    }

    public async create(data: CreateTweetDto): Promise<Result> {
        const user = await repository.user.findUnique({
            where: {
                id: data.idUser,
            },
        });

        if (!user) {
            return {
                code: 404,
                message: "User does not exist",
            };
        }

        const tweet = new Tweet(data.content, TweetType.Normal);

        const result = await repository.tweet.create({
            data: {
                ...data,
                id: tweet.id,
                type: tweet.type,
            },
        });

        return {
            code: 201,
            message: "Tweet successfully created",
        };
    }

    public async like(data: LikeTweetDto): Promise<Result> {
        // Check if user exists
        const user = await repository.user.findUnique({
            where: {
                id: data.idUser,
            },
        });

        if (!user) {
            return {
                code: 404,
                message: "User does not exist",
            };
        }

        // Check if tweet exists
        const tweet = await repository.tweet.findUnique({
            where: {
                id: data.idTweet,
            },
        });

        if (!tweet) {
            return {
                code: 404,
                message: "Tweet does not exist",
            };
        }

        // Check if tweet was already liked by user
        const existentLike = await repository.like.findFirst({
            where: {
                idTweet: data.idTweet,
                idUser: data.idUser,
            },
        });

        if (existentLike) {
            return {
                code: 400,
                message: "User already liked this tweet",
            };
        }

        const result = await repository.like.create({
            data,
        });

        return {
            code: 200,
            message: "Tweet successfully liked",
            data: result,
        };
    }

    public async dislike(data: LikeTweetDto): Promise<Result> {
        // Check if user exists
        const user = await repository.user.findUnique({
            where: {
                id: data.idUser,
            },
        });

        if (!user) {
            return {
                code: 404,
                message: "User does not exist",
            };
        }

        // Check if tweet exists
        const tweet = await repository.tweet.findUnique({
            where: {
                id: data.idTweet,
            },
        });

        if (!tweet) {
            return {
                code: 404,
                message: "Tweet does not exist",
            };
        }

        // Check if tweet was already liked by user
        const existentLike = await repository.like.findFirst({
            where: {
                idTweet: data.idTweet,
                idUser: data.idUser,
            },
        });

        if (!existentLike) {
            return {
                code: 404,
                message: "Like does not exist",
            };
        }

        const result = await repository.like.delete({
            where: {
                idTweet_idUser: {
                    idTweet: data.idTweet,
                    idUser: data.idUser,
                },
            },
        });

        return {
            code: 200,
            message: "Tweet successfully disliked",
            data: result,
        };
    }
}

export default new TweetService();
