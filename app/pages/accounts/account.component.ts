import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup} from '@angular/forms';
import {AccountsService} from './accounts.service';
import {Account} from './account';
import {Validators} from '@angular/common';
import * as CryptoJS from 'crypto-js';
import {AppDataProvider} from '../../providers/app.data.provider';



@Component({
    templateUrl: 'build/pages/accounts/account.component.html',
    providers: [AccountsService],
})
export class AccountComponent {

    accountFrm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private appDataProvider:AppDataProvider,
                private accountService:AccountsService,
                private viewCtrl: ViewController) {
        this.accountFrm = formBuilder.group({
            'username': [
                '',
                [Validators.required, Validators.minLength(5)]
            ],
            'password': [
                '',
                [Validators.required, Validators.minLength(5)]
            ]
        });
    }


    logForm(){

        if(!this.accountFrm.valid){
            console.log('not valid')
        }
        else {
            console.log("success!")
            console.log(this.appDataProvider.masterPassword)
            console.log(this.accountFrm.value);

            // Encrypt Passwort
            let encryptedPassword = CryptoJS.AES.encrypt(this.accountFrm.value.password, this.appDataProvider.masterPassword).toString();

            // Create new Account Object
            let newAccount:Account = new Account(null, "facebook", this.accountFrm.value.username, encryptedPassword)

            this.accountService.saveAccount(newAccount).then((data) => {
                // Set the automatic created id to our note
                console.log(data.res["insertId"]);
                this.viewCtrl.dismiss();
            });
        }
    }
}