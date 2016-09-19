import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup} from '@angular/forms';
import {AccountsService} from './accounts.service';
import {Account} from './account';
import {Validators} from '@angular/common';



@Component({
    templateUrl: 'build/pages/accounts/account.component.html',
    providers: [AccountsService],
})
export class AccountComponent {

    accountFrm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
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
            console.log(this.accountFrm.value);
        }
    }
}