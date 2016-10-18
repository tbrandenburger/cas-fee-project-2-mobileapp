import {Storage, SqlStorage} from 'ionic-angular';
import {Injectable} from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {AppDataProvider} from '../../providers/app.data.provider';


@Injectable()
export class MasterpasswordService {
    storage: Storage = null;

    // Init an empty DB if it does not exist by now!
    constructor(private appDataProvider: AppDataProvider) {
        this.storage = new Storage(SqlStorage);
        this.storage.query('CREATE TABLE IF NOT EXISTS general (id INTEGER PRIMARY KEY AUTOINCREMENT, mpcheck TEXT)');
    }

    public getMasterPasswordCheck() {
        return this.storage.query('SELECT mpcheck FROM general Limit 1');
    }

    public setMasterPasswordCheck() {
        let encryptedMPCheck = CryptoJS.AES.encrypt('mpOK', this.appDataProvider.masterPassword).toString();
        let sql = 'INSERT INTO general (mpcheck) VALUES (?)';
        return this.storage.query(sql, [encryptedMPCheck]);
    }

    public updateMasterPasswordCheck() {
        let encryptedMPCheck = CryptoJS.AES.encrypt('mpOK', this.appDataProvider.masterPassword).toString();
        let sql = 'UPDATE general SET mpcheck = \"' + encryptedMPCheck + '\"';
        this.storage.query(sql);
    }
}