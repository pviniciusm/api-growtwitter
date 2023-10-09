import { v4 } from "uuid";

export enum TweetType {
    Normal = "N",
    Reply = "R",
}

export class Tweet {
    public id: string;

    constructor(public content: string, public type: TweetType) {
        this.id = v4();
    }

    public toJson() {
        return {
            id: this.id,
            content: this.content,
            type: this.type,
        };
    }
}
