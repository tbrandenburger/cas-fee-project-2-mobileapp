import {Component} from '@angular/core';
import {NavController, NavParams, ModalController, ToastController} from 'ionic-angular';
import {AccountsService} from '../../providers/accounts.service';
import {Account} from './account';
import {AccountComponent} from './account.component';
import {AppDataProvider} from '../../providers/app.data.provider';

@Component({
    templateUrl: 'build/pages/accounts/accounts.list.component.html',
    providers: [AccountsService]
})
export class AccountsListComponent {
    selectedItem: any;
    accounts: Account[];

    constructor(
        public navCtrl: NavController,
        public modalCtrl:ModalController,
        public navParams: NavParams,
        public accountService:AccountsService,
        public toastCtrl: ToastController,
        public appDataProvider:AppDataProvider
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
                        this.accounts.push(new Account(item.id, item.siteid, item.sitetitle, item.username, item.password, this.getIcon()));
                    }

                }
            });
    }

    addAccount() {
        let modal = this.modalCtrl.create(AccountComponent);
        modal.present();

    }

    editAccount(account) {
        let modal = this.modalCtrl.create(AccountComponent, { account: account, masterpassword: this.appDataProvider.masterPassword });
        modal.present();

    }

    deleteAccount(account:Account) {
        this.accountService.removeAccount(account);

        this.loadAccounts();
        
        let toast = this.toastCtrl.create({
            message: 'Account: "' + account.sitetitle + '" wurde erfolgreich gelöscht.',
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

    getIcon(): string {
        let imgNr = Math.floor(Math.random() * 4) + 1
        return 'build/assets/img/p' + imgNr + '.png'
    }

    //
    private onPageDidEnter() {
        this.loadAccounts();
    }
}
