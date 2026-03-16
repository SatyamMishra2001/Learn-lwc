import { LightningElement } from 'lwc';

export default class ShowOrHideMessage extends LightningElement {


    showMessage = true;
    toggleMessage(){

        this.showMessage = !this.showMessage;

    }

}