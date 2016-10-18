import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
 Stores APP related data
 */
@Injectable()
export class AppDataProvider {

    public masterPassword = ''; // Temporary stores the User Master key to unlock the Account Passwords. It'll be cleared after closing the app.

    constructor(private http: Http) {


    }

}
