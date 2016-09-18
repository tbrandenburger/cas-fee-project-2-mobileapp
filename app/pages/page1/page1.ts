import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {BarcodeScanner} from 'ionic-native';
import {QRcodeData} from './QRcodeData';
import {ScanPage} from './scan';

@Component({
  templateUrl: 'build/pages/page1/page1.html'
})
export class Page1 {

    qrData:String = 'no data';
    qrFormat:String = 'no data';

    constructor(private navCtrl:NavController, navParams: NavParams) {

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
        const qrcodeData = new QRcodeData("testdata", "result.format");
        this.scanDetails(qrcodeData);
    }
}
