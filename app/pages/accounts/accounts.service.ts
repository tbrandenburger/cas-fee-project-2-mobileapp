import {Storage, SqlStorage} from 'ionic-angular';
import {Injectable} from '@angular/core';
import {Account} from './account';


@Injectable()
export class AccountsService {
    storage: Storage = null;

    // Init an empty DB if it does not exist by now!
    constructor() {
        this.storage = new Storage(SqlStorage);
        this.storage.query('CREATE TABLE IF NOT EXISTS accounts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, text TEXT)');
    }

    // Get all accounts from DB
    public getAccounts() {
        return this.storage.query('SELECT * FROM accounts');
    }

    // Save a new account to the DB
    public saveAccount(account: Account) {
        let sql = 'INSERT INTO accounts (title, text) VALUES (?,?)';
        return this.storage.query(sql, [account.title, account.text]);
    }

    // Update an existing account with a given ID
    public updateAccount(account: Account) {
        let sql = 'UPDATE accounts SET title = \"' + account.title + '\", text = \"' + account.text + '\" WHERE id = \"' + account.id + '\"';
        this.storage.query(sql);
    }

    // Remove an account with a given ID
    public removeAccount(account: Account) {
        let sql = 'DELETE FROM accounts WHERE id = \"' + account.id + '\"';
        return this.storage.query(sql);
    }
}