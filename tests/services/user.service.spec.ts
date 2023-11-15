import userService from "../../src/services/user.service";
import { Result } from "../../src/dtos/result.dto";
import { prismaMock } from "../config/prisma.mock";

function success(result: Result) {
    expect(result.code).toBeGreaterThanOrEqual(200);
    expect(result.code).toBeLessThan(300);
    expect(result.data).toBeDefined();
}

function notFoundError(result: Result) {
    expect(result.code).toEqual(404);
    expect(result.message).toContain("not found");
    expect(result.data).not.toBeDefined();
}

function inavlidCredentials(result: Result) {
    expect(result.code).toEqual(401);
    expect(result.message).toEqual("Invalid username or password");
    expect(result.data).not.toBeDefined();
}

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

        success(result);
        expect(result).toHaveProperty("data", []);
    });

    test("should return a filled list if there are regitered users", async () => {
        const users = [existentUser];

        // Mock findMany method from user
        prismaMock.user.findMany.mockResolvedValue(users);

        const result = await userService.list();

        success(result);
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

        inavlidCredentials(result);
    });

    test("should return error if passwords don't match", async () => {
        // Mock findMany method from user
        prismaMock.user.findUnique.mockResolvedValue(existentUser);

        const result = await userService.checkCredentials({
            username: existentUser.username,
            password: "invalid_password",
        });

        inavlidCredentials(result);
    });

    test("should return error if passwords don't match", async () => {
        // Mock findMany method from user
        prismaMock.user.findUnique.mockResolvedValue(existentUser);

        const result = await userService.checkCredentials({
            username: existentUser.username,
            password: existentUser.password,
        });

        success(result);
        expect(result).toHaveProperty("data.token");
    });
});
