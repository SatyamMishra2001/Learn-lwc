import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/fetchAccounts.getRecords';

const columns = [
    {label : 'Name', fieldName : 'Name'},
    {label : 'Industry', fieldName : 'Industry'},
];

export default class ShowAccRecords extends LightningElement {

    accounts;
    error;
    columns = columns;

    @wire(getAccounts)
    wiredAccounts({error, data}){
        if(data){
            this.accounts = data;
        }
        if(error){
            this.error = error;
        }
    }

}