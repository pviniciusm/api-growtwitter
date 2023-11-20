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

interface ReplyTweetDto extends CreateTweetDto {
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
            where: {
                idUser: idUser,
            },
            include: {
                likes: true,
                user: {
                    include: {
                        followers: true,
                    },
                },
                replies: true,
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

    public async showFeed(idUser: string): Promise<Result> {
        const user = await repository.user.findFirst({
            where: {
                id: idUser,
            },
            include: {
                following: true,
            },
        });

        if (!user) {
            return {
                code: 404,
                message: "User does not exist",
            };
        }

        const result = await repository.tweet.findMany({
            where: {
                type: "N",
            },
            include: {
                likes: true,
                replies: {
                    include: {
                        user: true,
                        likes: true,
                    },
                },
                user: true,
            },
            orderBy: {
                updatedAt: "desc",
            },
        });

        const feed = result.filter((item) => {
            if (item.idUser == user.id) {
                return true;
            }

            return user.following.some(
                (follow) => follow.idFollowedUser == item.idUser
            );
        });

        return {
            code: 200,
            message: "Tweets successfully listed",
            data: feed,
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
            data: result,
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

    public async reply(data: ReplyTweetDto) {
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

        if (tweet.type !== "N") {
            return {
                code: 400,
                message: "Replies are only allowed to normal tweets",
            };
        }

        const reply = new Tweet(data.content, TweetType.Reply);

        const result = await repository.tweet.create({
            data: {
                id: reply.id,
                type: reply.type,
                content: reply.content,
                idUser: user.id,
                repliedTweetId: data.idTweet,
            },
        });

        return {
            code: 201,
            message: "Reply successfully created",
            data: result,
        };
    }
}

export default new TweetService();
