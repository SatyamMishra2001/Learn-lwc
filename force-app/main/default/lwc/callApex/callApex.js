import { LightningElement } from 'lwc';
import getAccounts from '@salesforce/apex/GetAccountsRecord.getRecords';


export default class CallApex extends LightningElement {

    accounts;
    error;
    searchKey;
    limit;
    
    handleSearch(event) {
        this.searchKey = event.target.value;
    }
    handleLimit(event) {
        this.limit = event.target.value;
    }

    handleGetAccounts() {
        getAccounts({ name: this.searchKey, limitSize: this.limit })
            .then(result => {
                this.accounts = result;
            })
            .catch(error => {
                this.error = error;
            });
    }




}