import { Component } from '@angular/core';
import {Platform, NavController, NavParams, ViewController} from 'ionic-angular';
import {REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup} from '@angular/forms';
import {Validators} from '@angular/common';
import {AppDataProvider} from '../../providers/app.data.provider';
import {MasterpasswordService} from './masterpassword.service';
import * as CryptoJS from 'crypto-js';
import {MasterpasswordValidator} from './masterpassword.validator';

@Component({
    templateUrl: 'build/pages/shared/masterpassword.component.html',
    providers: [MasterpasswordService]
})

export class MasterPasswordPage {

    mpFrm: FormGroup;
    isCorrect: Boolean = true;

    constructor(private nav: NavController,
                navParams: NavParams,
                private formBuilder: FormBuilder,
                private appDataProvider:AppDataProvider,
                private viewCtrl: ViewController,
                private masterpasswordService: MasterpasswordService) {

        this.mpFrm = formBuilder.group({
            'masterpassword': [
                '',
                [
                    Validators.required,
                    Validators.minLength(5)
                ]
            ]
        });
    }

    onKey(event:any) {
        this.isCorrect = true;
    }

    signin() {

        if (!this.mpFrm.valid) {
            console.log('not valid')
        }
        else {

            this.masterpasswordService.getMasterPasswordCheck().then(
                data => {
                    if (data.res.rows.length > 0) {
                        for (var i = 0; i < data.res.rows.length; i++) {
                            let item = data.res.rows.item(i);

                            var bytes = CryptoJS.AES.decrypt(item.mpcheck.toString(), this.appDataProvider.masterPassword);
                            var decryptedMPCheck = bytes.toString(CryptoJS.enc.Utf8);

                            console.log(decryptedMPCheck);
                            if (decryptedMPCheck == 'mpOK') {
                                this.isCorrect = true;
                                this.viewCtrl.dismiss()
                            } else {
                                this.isCorrect = false;
                            }
                        }
                    } else {
                        this.masterpasswordService.setMasterPasswordCheck().then((data) => {
                            // Set the automatic created id to our note
                            console.log(data.res['insertId']);
                            /*this.viewCtrl.dismiss();*/
                        });
                    }
                });

            this.appDataProvider.masterPassword = this.mpFrm.value.masterpassword;
            /*this.viewCtrl.dismiss();*/
        }
    }
}