import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ShowToastMessageDemo extends LightningElement {

    showToastMessage(){
        this.dispatchEvent(new ShowToastEvent({
            title : 'Success',
            message : 'This is a success message',
            variant : 'success'
        }));
    }

    showRedAlert() {
        this.dispatchEvent(new ShowToastEvent({
            title: 'Error',
            message: 'This is an error message',
            variant: 'error'
        }));
    }

    


}