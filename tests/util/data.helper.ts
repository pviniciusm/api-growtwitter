export class DataHelper {
    public static get existentUser() {
        return {
            id: "123",
            name: "Daphne",
            username: "daphne",
            password: "123456",
            imgUrl: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }

    public static get existentTweet() {
        return {
            id: "any_id",
            idUser: this.existentUser.id,
            content: "test content",
            type: "N",
            repliedTweetId: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
    }

    public static get existentLike() {
        return {
            idTweet: this.existentTweet.id,
            idUser: this.existentUser.id,
            createdAt: new Date(),
        };
    }
}
