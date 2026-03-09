import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/plateformShowToastEvent';


export default class Toast extends LightningElement {

    showToast(){
        this.dispatchEvent(new ShowToastEvent({
        title: 'Success',
        message: 'This is a toast message',
        variant: 'success'
    }));    
    }
  


}