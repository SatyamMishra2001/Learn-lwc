import { LightningElement } from 'lwc';
import searchAccountByEmail from '@salesforce/apex/fetchAccounts.getRecords';

export default class SearchEmailOnAccount extends LightningElement {

    email;
    account = [];


    handleEmailChange(event){
        this.email = event.target.value;

    }

    handleSearch(){
        searchAccountByEmail({Email : this.email})
        .then(result => {
            this.account = result;
        })
        .catch(error => {
            console.log(error);
        });
     }
    


}