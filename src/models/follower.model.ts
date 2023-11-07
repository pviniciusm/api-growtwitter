import { User } from "./user.model";

export class Follower {
    constructor(public whoFollow: User, public whoIsFollowed: User) {}
}
