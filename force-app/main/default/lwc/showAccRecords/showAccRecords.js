import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/fetchAccounts.getRecords';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Industry', fieldName: 'Industry' }
];

export default class ShowAccRecords extends LightningElement {

    accounts;
    error;

    clms = columns;

    countOfRecords = 10;
    offsetValueOfAcc = 0;
    accName = '';

    accountname(event){
        this.accName = event.target.value;
    }

    countofrecords(event){
        this.countOfRecords = parseInt(event.target.value, 10);
    }

    prevHandler(){
        if(this.offsetValueOfAcc > 0){
            this.offsetValueOfAcc -= this.countOfRecords;
        }
    }

    nextHandler(){
        this.offsetValueOfAcc += this.countOfRecords;
    }

    @wire(getAccounts, {
        countOfAccRecords : '$countOfRecords',
        offsetValue : '$offsetValueOfAcc',
        accountName : '$accName'
    })
    wiredAccounts({error, data}){

        if(data){
            this.accounts = data;
            this.error = undefined;
        }
        else if(error){
            this.error = error;
            this.accounts = undefined;
        }
    }
}