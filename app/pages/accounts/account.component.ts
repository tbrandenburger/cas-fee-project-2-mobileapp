import {Component} from '@angular/core';
import {NavController, ViewController, NavParams} from 'ionic-angular';
import {REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup} from '@angular/forms';
import {AccountsService} from '../../providers/accounts.service';
import {Account} from './account';
import {Validators} from '@angular/common';
import * as CryptoJS from 'crypto-js';
import {AppDataProvider} from '../../providers/app.data.provider';


@Component({
    templateUrl: 'build/pages/accounts/account.component.html',
    providers: [AccountsService]
})

export class AccountComponent {

    accountFrm: FormGroup;
    account: Account;
    masterPassword;

    constructor(private formBuilder: FormBuilder,
                private appDataProvider:AppDataProvider,
                private accountService:AccountsService,
                private viewCtrl: ViewController,
                private params: NavParams) {

        this.account = params.get('account');
        this.masterPassword = params.get('masterpassword');

        //Decrypt Password
        var bytes = CryptoJS.AES.decrypt(this.account.password.toString(), this.masterPassword);
        var decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

        this.accountFrm = formBuilder.group({
            'sitetitle': [
                this.account.sitetitle,
                [Validators.required, Validators.minLength(2)]
            ],
            'username': [
                this.account.username,
                [Validators.required, Validators.minLength(2)]
            ],
            'password': [
                decryptedPassword,
                [Validators.required, Validators.minLength(2)]
            ]
        });

    }


    save(){

        if(!this.accountFrm.valid){
            console.log('not valid')
        }
        else {

            // Encrypt Passwort
            let encryptedPassword = CryptoJS.AES.encrypt(this.accountFrm.value.password, this.masterPassword).toString();

            // Update Account Object
            this.account.sitetitle = this.accountFrm.value.sitetitle;
            this.account.username = this.accountFrm.value.username;
            this.account.password = encryptedPassword;

            this.accountService.updateAccount(this.account).then((data) => {
                // Set the automatic created id to our note
                this.viewCtrl.dismiss();
            });
        }
    }
}
