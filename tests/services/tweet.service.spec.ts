import tweetService from "../../src/services/tweet.service";

import { prismaMock } from "../config/prisma.mock";
import { Assert, DataHelper } from "../util";

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
        const user = DataHelper.existentUser;

        prismaMock.user.findUnique.mockResolvedValue(user);
        prismaMock.tweet.create.mockResolvedValue(DataHelper.existentTweet);

        const result = await sut.create({
            content: "this is a test tweet",
            idUser: user.id,
        });

        Assert.success(result);
    });
});
