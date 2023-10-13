import { v4 } from "uuid";

export class User {
    public id: string;

    constructor(
        public name: string,
        public username: string,
        public password: string,
        public imgUrl?: string
    ) {
        this.id = v4();
    }

    public toJson() {
        return {
            id: this.id,
            name: this.name,
            username: this.username,
            imgUrl: this.imgUrl,
        };
    }
}
