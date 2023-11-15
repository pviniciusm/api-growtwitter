import userService from "../../src/services/user.service";
import { Result } from "../../src/dtos/result.dto";
import { prismaMock } from "../config/prisma.mock";

function checkSuccess(result: Result) {
    expect(result.code).toBeGreaterThanOrEqual(200);
    expect(result.code).toBeLessThan(300);
    expect(result.data).toBeDefined();
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

describe("List users unitary tests", () => {
    const sut = userService;

    test("should return an empty list if there are no regitered users", async () => {
        // Mock findMany method from user
        prismaMock.user.findMany.mockResolvedValue([]);

        const result = await userService.list();

        checkSuccess(result);
        expect(result).toHaveProperty("data", []);
    });

    test("should return a filled list if there are regitered users", async () => {
        const users = [existentUser];

        // Mock findMany method from user
        prismaMock.user.findMany.mockResolvedValue(users);

        const result = await userService.list();

        checkSuccess(result);
        expect(result).toHaveProperty("data");
        expect(result.data).toHaveLength(users.length);
        expect(result.data[0]).toEqual(existentUser);
    });
});
