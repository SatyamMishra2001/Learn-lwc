import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';



export default class LwcForms extends LightningElement {

handleWarning(){

    // Show a warning toast message
    
    this.dispatchEvent(new ShowToastEvent({
        title: 'Warning',
        message: 'This is a warning message.',
        variant: 'warning',
    }));


}


}