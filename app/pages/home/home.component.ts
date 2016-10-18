import {Component} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
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
                private appDataProvider: AppDataProvider,
                private platform: Platform) {

    }

    onPageWillEnter() {
        this.checkMasterPassword();
    }

    onPageDidEnter() {
        //
    }

    checkMasterPassword() {
        if (this.appDataProvider.masterPassword == '') {
            this.navCtrl.push(MasterPasswordPage, {});
        }
    }

    scan() {
        if (this.platform.is('core')) {
            this.scanDummy();
        } else {
            this.scanQRCode();
        }
    }

    scanDetails(qrcodeData) {
        this.navCtrl.push(ScanComponent, {
            qrcodeData: qrcodeData
        });
    }

    scanQRCode() {
        BarcodeScanner.scan().then((result) => {
            if (!result.cancelled) {
                let qrJson = JSON.parse(result.text);
                const qrcodeData = new QRcodeData(qrJson.siteid, qrJson.sitetitle, qrJson.channelid);
                this.scanDetails(qrcodeData);
            }
        })
            .catch((err) => {
                alert(err);
            })
    }

    scanDummy() {
        const testCode = {
            siteid: '12345',
            channelid: 'OOIUOJ-LKJOI-LKJOI2',
            sitetitle: 'FastLogin Test2 Account'
        }
        const qrcodeData = new QRcodeData(testCode.siteid, testCode.sitetitle, testCode.channelid);
        this.scanDetails(qrcodeData);
    }
}
