import userService from "../../src/services/user.service";
import { Result } from "../../src/dtos/result.dto";
import { prismaMock } from "../config/prisma.mock";
import { Assert } from "../util/asserts.helper";

const existentUser = {
    id: "123",
    name: "Daphne",
    username: "daphne",
    password: "123456",
    imgUrl: null,
    createdAt: new Date(),
    updatedAt: new Date(),
};

/**
 * List users
 */
describe("List users unitary tests", () => {
    const sut = userService;

    test("should return an empty list if there are no regitered users", async () => {
        // Mock findMany method from user
        prismaMock.user.findMany.mockResolvedValue([]);

        const result = await userService.list();

        Assert.success(result);
        expect(result).toHaveProperty("data", []);
    });

    test("should return a filled list if there are regitered users", async () => {
        const users = [existentUser];

        // Mock findMany method from user
        prismaMock.user.findMany.mockResolvedValue(users);

        const result = await userService.list();

        Assert.success(result);
        expect(result).toHaveProperty("data");
        expect(result.data).toHaveLength(users.length);
        expect(result.data[0]).toEqual(existentUser);
    });
});

/**
 * Check credentials on login action
 */
describe("Check login unitary tests", () => {
    const sut = userService;

    test("should return error if user does not exist", async () => {
        // Mock findMany method from user
        prismaMock.user.findUnique.mockResolvedValue(null);

        const result = await userService.checkCredentials({
            username: "daphne",
            password: "12345",
        });

        Assert.inavlidCredentials(result);
    });

    test("should return error if passwords don't match", async () => {
        // Mock findMany method from user
        prismaMock.user.findUnique.mockResolvedValue(existentUser);

        const result = await userService.checkCredentials({
            username: existentUser.username,
            password: "invalid_password",
        });

        Assert.inavlidCredentials(result);
    });

    test("should return error if passwords don't match", async () => {
        // Mock findMany method from user
        prismaMock.user.findUnique.mockResolvedValue(existentUser);

        const result = await userService.checkCredentials({
            username: existentUser.username,
            password: existentUser.password,
        });

        Assert.success(result);
        expect(result).toHaveProperty("data.token");
    });
});
