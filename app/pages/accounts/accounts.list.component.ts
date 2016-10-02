import {Component} from '@angular/core';
import {NavController, NavParams, ModalController, ToastController} from 'ionic-angular';
import {AccountsService} from './accounts.service';
import {Account} from './account';
import {AccountComponent} from './account.component';

@Component({
    templateUrl: 'build/pages/accounts/accounts.list.component.html',
    providers: [AccountsService, ]
})
export class AccountsListComponent {
    selectedItem: any;
    accounts: Account[];

    constructor(
        public navCtrl: NavController,
        public modalCtrl:ModalController,
        public navParams: NavParams,
        public accountService:AccountsService,
        public toastCtrl: ToastController
    ) {
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
                        this.accounts.push(new Account(item.id, item.sitename, item.username, item.password));
                    }

                }
            });
    }

    addAccount() {
        let modal = this.modalCtrl.create(AccountComponent);
        modal.present();

    }

    deleteAccount(account:Account) {
        console.log("delete");
        this.accountService.removeAccount(account);

        this.loadAccounts();
        
        let toast = this.toastCtrl.create({
            message: 'Account: "' + account.sitename + '" wurde erfolgreich gelöscht.',
            duration: 1000,
            position: 'bottom'
        });

        toast.onDidDismiss(() => {

        });

        toast.present();
    }

    itemTapped(event, item) {
        // That's right, we're pushing to ourselves!
        this.navCtrl.push(AccountsListComponent, {
            item: item
        });
    }

    //
    private onPageDidEnter() {
        console.log("page enterr");
        this.loadAccounts();
    }
}
