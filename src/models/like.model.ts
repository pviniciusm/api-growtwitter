import { v4 } from "uuid";
import { Tweet } from "./tweet.model";

export class User {
    constructor(public user: User, public tweet: Tweet) {}
}
