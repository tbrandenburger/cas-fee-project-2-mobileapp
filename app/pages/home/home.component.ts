import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {BarcodeScanner} from 'ionic-native';
import {QRcodeData} from './QRcodeData';
import {ScanPage} from './scan';
import * as CryptoJS from 'crypto-js';
import {AppDataProvider} from '../../providers/app.data.provider';

@Component({
  templateUrl: 'build/pages/home/home.component.html'
})
export class HomeComponent {

    qrData:String = 'no data';
    qrFormat:String = 'no data';
    secretKey = 'your-secret-key';

    constructor(
        private navCtrl:NavController,
        private navParams: NavParams,
        private appDataProvider:AppDataProvider
        ) {

        console.log(appDataProvider.masterPassword)

        // Encrypt
        var encryptedData = CryptoJS.AES.encrypt("hans", this.secretKey).toString();
        console.log(encryptedData);

        // Decyrpt
        var bytes  = CryptoJS.AES.decrypt(encryptedData.toString(), this.secretKey);
        var plaintext = bytes.toString(CryptoJS.enc.Utf8);

        console.log(plaintext);
    }

    scan() {
        BarcodeScanner.scan().then((result) => {
            if (!result.cancelled) {
                const qrcodeData = new QRcodeData(result.text, result.format);
                this.scanDetails(qrcodeData);
            }
        })
            .catch((err) => {
                alert(err);
            })
    }

    scanDetails(details) {
        this.navCtrl.push(ScanPage, {
            details: details
        });
    }


    scanDummy() {
        const qrcodeData = new QRcodeData("tesdtdata", "result.format");
        this.scanDetails(qrcodeData);
    }
}
