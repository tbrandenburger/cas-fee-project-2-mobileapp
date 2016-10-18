import { Component } from '@angular/core';
import {Platform, NavController, NavParams} from 'ionic-angular';
import {QRcodeData} from './QRcodeData';
import {AccountsService} from '../../providers/accounts.service';
import {REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup} from '@angular/forms';
import {Validators} from '@angular/common';
import * as CryptoJS from 'crypto-js';
import {AppDataProvider} from '../../providers/app.data.provider';
import {Account} from '../accounts/account';

@Component({
    templateUrl: 'build/pages/home/scan.component.html',
    providers: [AccountsService]
})

export class ScanComponent {
    barcodeData: QRcodeData;
    loginFrm: FormGroup;
    username: String;
    password: String;
    accountFound: Boolean;

    constructor(
                private formBuilder: FormBuilder,
                private appDataProvider:AppDataProvider,
                private nav: NavController,
                private navParams: NavParams,
                private accountService:AccountsService
        ) {

        this.barcodeData = navParams.get('qrcodeData');

        this.loginFrm = formBuilder.group({
            'username': [
                '',
                [Validators.required, Validators.minLength(2)]
            ],
            'password': [
                '',
                [Validators.required, Validators.minLength(2)]
            ]
        });

        this.searchAccount();
    }

    searchAccount(){

        this.accountService.getAccountBySiteId(this.barcodeData.siteid).then(
            data => {
                if (data.res.rows.length > 0) {
                    this.accountFound = true;
                    for (var i = 0; i < data.res.rows.length; i++) {
                        let item = data.res.rows.item(i);
                        this.username = item.username;

                        // Decrypt Password
                        var bytes = CryptoJS.AES.decrypt(item.password.toString(), this.appDataProvider.masterPassword);
                        var decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

                        this.password = decryptedPassword;

                    }
                } else {
                    console.log('no account');

                }
            });
    }

    login() {
        if(this.accountFound) {
            this.pushLogin();
        }else {
            // Encrypt Passwort
            let encryptedPassword = CryptoJS.AES.encrypt(this.loginFrm.value.password, this.appDataProvider.masterPassword).toString();

            // Create new Account Object
            let newAccount:Account = new Account(null, this.barcodeData.siteid, this.barcodeData.sitetitle, this.loginFrm.value.username, encryptedPassword);

            console.log(newAccount);

            this.accountService.saveAccount(newAccount).then((data) => {
                this.pushLogin();
            });
        }
    }

    pushLogin() {
        //todo: push logic
    }
}
