export class Account {
    title: string;
    text: string;
    username: string;
    password: string;
    id: number;

    constructor(title: string, text: string, id: number, username: string = '', password: string = '') {
        this.title = title;
        this.text = text;
        this.id = id;
        this.username = username;
        this.password = password;
    }
}