export class Account {
    id: number;
    siteid: string;
    sitetitle: string;
    username: string;
    password: string;

    constructor(id: number = null, siteid: string = null, sitetitle: string = null, username: string = null, password: string = null) {
        this.id = id;
        this.siteid = siteid;
        this.sitetitle = sitetitle
        this.username = username;
        this.password = password;
    }
}