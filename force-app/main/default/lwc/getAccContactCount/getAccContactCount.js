import { LightningElement } from 'lwc';
import getAccountContactCount from '@salesforce/apex/fetchAccounts.getRecords';


export default class GetAccContactCount extends LightningElement {

    accountList;
    error;


    getContactCount(){
        getAccountContactCount()
        .then(result => {
            console.log(result);
            this.accountList = result;
        })
        .catch(error => {
            this.error = error.body.message;
            console.error(error);
        })
    }


}