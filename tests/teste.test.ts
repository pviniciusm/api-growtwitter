describe("Hello world tests", () => {
    test("1 + 1 deveria somar 2", () => {
        const result = 1 + 1;

        expect(result).not.toBeNull();
        expect(result).toEqual(2);
    });
});
