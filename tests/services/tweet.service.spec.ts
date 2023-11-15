import tweetService from "../../src/services/tweet.service";

import { prismaMock } from "../config/prisma.mock";
import { Assert, DataHelper } from "../util";

const user = DataHelper.existentUser;
const tweet = DataHelper.existentTweet;
const like = DataHelper.existentLike;

/**
 * Create tweet unit tests
 */
describe("Tweet service - create tweet unitary tests", () => {
    const sut = tweetService;

    test("should return not found error if user does not exist", async () => {
        prismaMock.user.findUnique.mockResolvedValue(null);

        const result = await sut.create({
            content: "this is a test tweet",
            idUser: "inexistent_user",
        });

        Assert.notFoundError(result);
    });
    test("should return success if tweet is successfully created", async () => {
        prismaMock.user.findUnique.mockResolvedValue(user);
        prismaMock.tweet.create.mockResolvedValue(DataHelper.existentTweet);

        const result = await sut.create({
            content: "this is a test tweet",
            idUser: user.id,
        });

        Assert.success(result);
    });
});

/**
 * Like tweet unit tests
 */
describe("Tweet service - like tweet unitary tests", () => {
    const sut = tweetService;

    test("should return not found error if user does not exist", async () => {
        prismaMock.user.findUnique.mockResolvedValue(null);

        const result = await sut.like({
            idTweet: tweet.id,
            idUser: user.id,
        });

        Assert.notFoundError(result);
    });

    test("should return not found error if tweet does not exist", async () => {
        prismaMock.user.findUnique.mockResolvedValue(user);
        prismaMock.tweet.findUnique.mockResolvedValue(null);

        const result = await sut.like({
            idTweet: tweet.id,
            idUser: user.id,
        });

        Assert.notFoundError(result);
    });

    test("should return error if tweet was already liked by user", async () => {
        prismaMock.user.findUnique.mockResolvedValue(user);
        prismaMock.tweet.findUnique.mockResolvedValue(tweet);
        prismaMock.like.findFirst.mockResolvedValue(like);

        const result = await sut.like({
            idTweet: tweet.id,
            idUser: user.id,
        });

        Assert.genericError(result);
        expect(result.message).toEqual("User already liked this tweet");
    });

    test("should return success if tweet is successfully liked", async () => {
        prismaMock.user.findUnique.mockResolvedValue(user);
        prismaMock.tweet.findUnique.mockResolvedValue(tweet);
        prismaMock.like.findFirst.mockResolvedValue(null);
        prismaMock.like.create.mockResolvedValue(like);

        const result = await sut.like({
            idTweet: tweet.id,
            idUser: user.id,
        });

        Assert.success(result);
    });
});
