import {Component} from '@angular/core';
import {NavController, NavParams, ModalController} from 'ionic-angular';
import {AccountsService} from './accounts.service';
import {Account} from './account';
import {AccountComponent} from './account.component';

@Component({
    templateUrl: 'build/pages/accounts/accounts.list.component.html',
    providers: [AccountsService]
})
export class AccountsListComponent {
    selectedItem: any;
    accounts: Account[];

    constructor(public navCtrl: NavController,public modalCtrl:ModalController, public navParams: NavParams, public accountService:AccountsService) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');

    }

    loadAccounts() {
        this.accounts = [];
        this.accountService.getAccounts().then(
            data => {
                this.accounts = [];
                if (data.res.rows.length > 0) {
                    for (var i = 0; i < data.res.rows.length; i++) {
                        let item = data.res.rows.item(i);
                        this.accounts.push(new Account(item.title, item.text, item.id));
                    }

                }
            });
    }

    addAccount() {

        let modal = this.modalCtrl.create(AccountComponent);
        modal.present();

        let account = new Account('test', 'asdfasdf', 55, 'test', 'paswd');


        this.accountService.saveNote(account).then((data) => {
            // Set the automatic created id to our note
            console.log(data.res["insertId"]);
            this.loadAccounts();
        });
    }

    itemTapped(event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(AccountsListComponent, {
            item: item
        });
    }

    //
    private onPageDidEnter() {
        console.log("page enter");
        this.loadAccounts();
    }
}
