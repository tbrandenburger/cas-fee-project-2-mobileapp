export class Account {
    id: number;
    sitename: string;
    username: string;
    password: string;

    constructor(id: number = null, sitename: string = null, username: string = null, password: string = null) {
        this.id = id;
        this.sitename = sitename;
        this.username = username;
        this.password = password;
    }
}