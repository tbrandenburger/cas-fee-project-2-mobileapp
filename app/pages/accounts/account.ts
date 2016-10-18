export class Account {
    id: number;
    siteid: string;
    sitetitle: string;
    username: string;
    password: string;
    profileimg: string;

    constructor(id: number = null, siteid: string = null, sitetitle: string = null, username: string = null, password: string = null, profileimg: string = null) {
        this.id = id;
        this.siteid = siteid;
        this.sitetitle = sitetitle
        this.username = username;
        this.password = password;
        this.profileimg = profileimg;
    }
}