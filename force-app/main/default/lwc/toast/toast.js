import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';


export default class Toast extends LightningElement {

    showToast(){
        this.dispatchEvent(new ShowToastEvent({
        title: 'Success',
        message: 'This is a toast message',
        variant: 'success'
    }));   
    
    

    }


    clickHandler(){
// We can also create a toast event and then dispatch it
    const toastEvent = new ShowToastEvent({
        title: 'Error',
        message: 'This is an error message',
        variant: 'error' 
    })

    this.dispatchEvent(toastEvent);    
}
  


}