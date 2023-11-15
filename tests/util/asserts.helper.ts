import { Result } from "../../src/dtos/result.dto";

export class Assert {
    public static success(result: Result) {
        expect(result.code).toBeGreaterThanOrEqual(200);
        expect(result.code).toBeLessThan(300);
        expect(result.data).toBeDefined();
    }

    public static notFoundError(result: Result) {
        expect(result.code).toEqual(404);
        expect(result.message).toContain("not exist");
        expect(result.data).not.toBeDefined();
    }

    public static genericError(result: Result) {
        expect(result.code).toEqual(400);
        expect(result.data).not.toBeDefined();
    }

    public static inavlidCredentials(result: Result) {
        expect(result.code).toEqual(401);
        expect(result.message).toEqual("Invalid username or password");
        expect(result.data).not.toBeDefined();
    }
}
