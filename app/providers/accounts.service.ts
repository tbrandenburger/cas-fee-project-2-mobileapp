import {Storage, SqlStorage} from 'ionic-angular';
import {Injectable} from '@angular/core';
import {Account} from '../pages/accounts/account';


@Injectable()
export class AccountsService {
    storage: Storage = null;

    // Init an empty DB if it does not exist by now!
    constructor() {
        this.storage = new Storage(SqlStorage);
        this.storage.query('CREATE TABLE IF NOT EXISTS accounts (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, siteid TEXT, sitetitle TEXT)');
    }

    // Get all accounts from DB
    public getAccounts() {
        return this.storage.query('SELECT * FROM accounts');
    }

    // Save a new account to the DB
    public saveAccount(account: Account) {
        let sql = 'INSERT INTO accounts (siteid, sitetitle, username, password) VALUES (?,?,?,?)';
        return this.storage.query(sql, [account.siteid, account.sitetitle, account.username, account.password]);
    }

    // Update an existing account with a given ID
    public updateAccount(account: Account) {
        let sql = 'UPDATE accounts SET sitetitle = \"' + account.sitetitle + '\", username = \"' + account.username + '\", password = \"' + account.password + '\" WHERE id = \"' + account.id + '\"';
        return this.storage.query(sql);
    }

    // Remove an account with a given ID
    public removeAccount(account: Account) {
        let sql = 'DELETE FROM accounts WHERE id = \"' + account.id + '\"';
        return this.storage.query(sql);
    }

    // Get account from siteid
    public getAccountBySiteId(siteid) {
        return this.storage.query('SELECT * FROM accounts where siteid = \"' + siteid + '\"');
    }
}