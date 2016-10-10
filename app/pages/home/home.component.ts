import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {BarcodeScanner} from 'ionic-native';
import {QRcodeData} from './QRcodeData';
import {ScanComponent} from './scan.component';
import * as CryptoJS from 'crypto-js';
import {AppDataProvider} from '../../providers/app.data.provider';
import {MasterPasswordPage} from '../shared/masterpassword.component';

@Component({
    templateUrl: 'build/pages/home/home.component.html'
})
export class HomeComponent {

    qrData: String = 'no data';
    qrFormat: String = 'no data';

    constructor(private navCtrl: NavController,
                private navParams: NavParams,
                private appDataProvider: AppDataProvider) {

        console.log(appDataProvider.masterPassword)

        // Encrypt
        var encryptedData = CryptoJS.AES.encrypt("hans", this.appDataProvider.masterPassword).toString();
        console.log(encryptedData);

        // Decyrpt
        var bytes = CryptoJS.AES.decrypt(encryptedData.toString(), this.appDataProvider.masterPassword);
        var plaintext = bytes.toString(CryptoJS.enc.Utf8);

        console.log(plaintext);
    }

    onPageWillEnter() {
        this.checkMasterPassword();
    }

    onPageDidEnter() {
        console.log("master:" + this.appDataProvider.masterPassword)
    }

    checkMasterPassword() {
        if (this.appDataProvider.masterPassword == "") {
            this.navCtrl.push(MasterPasswordPage, {});
        }
    }

    scan() {
        BarcodeScanner.scan().then((result) => {
            if (!result.cancelled) {
                /*const qrcodeData = new QRcodeData(result.text, result.format);
                this.scanDetails(qrcodeData);*/
            }
        })
            .catch((err) => {
                alert(err);
            })
    }

    scanDetails(qrcodeData) {
        this.navCtrl.push(ScanComponent, {
            qrcodeData: qrcodeData
        });
    }


    scanDummy() {
        const testCode = {
            siteid: "1234",
            channelid: "OOIUOJ-LKJOI-LKJOI",
            accounttitle: "FastLogin Test Account"
        }
        const qrcodeData = new QRcodeData(testCode.siteid, testCode.accounttitle, testCode.channelid);
        this.scanDetails(qrcodeData);
    }
}
