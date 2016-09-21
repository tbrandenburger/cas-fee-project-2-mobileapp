import { Component } from '@angular/core';
import {Platform, NavController, NavParams} from 'ionic-angular';
import {QRcodeData} from './QRcodeData';

@Component({
    templateUrl: 'build/pages/page1/scan.html'
})

export class ScanPage {
    barcodeData: QRcodeData;
    constructor(private nav: NavController, navParams: NavParams) {
        this.barcodeData = navParams.get('details');
    }
}