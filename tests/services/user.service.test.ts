import userService, { CreateUserDto, UserService } from "../../src/services/user.service";

describe("Testes para o método create do user service", () => {
    const createSut = () => {
        return userService;
    };

    test("deve retornar falha se a senha é menor que 5 caracteres", async () => {
        // 1- arrange
        const sut = createSut();
        const input: CreateUserDto = {
            name: "Daphne",
            username: "daphne",
            password: "1234",
        };

        // 2- act
        const result = await sut.create(input);

        // 3- assert
        expect(result).toBeDefined();
        expect(result.code).toBe(400);
        expect(result.message).toEqual("A senha deve ter pelo menos 5 caracteres");
        expect(result.data).not.toBeDefined();
    });

    test("deve retornar falha se o usuário já existe", async () => {
        // 1- arrange
        const sut = createSut();
        const input: CreateUserDto = {
            name: "Daphne",
            username: "daphne",
            password: "123455",
        };

        jest.spyOn(UserService.prototype, "get").mockResolvedValue({
            id: "12345",
            createdAt: new Date(),
            name: "Aaa",
            password: "111",
            username: "daphne",
            updatedAt: new Date(),
            imgUrl: null,
        });

        // 2- act
        const result = await sut.create(input);

        // 3- assert
        expect(result).toBeDefined();
        expect(result.code).toBe(400);
        expect(result.message).toEqual("Ja existe um usuario com esse username");
        expect(result.data).not.toBeDefined();
    });
});
