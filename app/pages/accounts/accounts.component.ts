import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AccountsService} from './accounts.service';
import {Account} from './account';

@Component({
    templateUrl: 'build/pages/accounts/accounts.component.html',
    providers: [AccountsService]
})
export class AccountsComponent {
    selectedItem: any;
    accounts: Account[];

    constructor(public navCtrl: NavController, public navParams: NavParams, public accountService:AccountsService) {
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedItem = navParams.get('item');

        // Load Accounts
        this.getAccounts();
    }

    getAccounts() {
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

        let account = new Account('test', 'asdfasdf', 55);


        this.accountService.saveNote(account).then((data) => {
            // Set the automatic created id to our note
            console.log(data.res["insertId"]);
            this.getAccounts();
        });
    }

    itemTapped(event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(AccountsComponent, {
            item: item
        });
    }
}
