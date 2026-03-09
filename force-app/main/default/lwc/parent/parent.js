import { LightningElement } from 'lwc';

export default class Parent extends LightningElement {

    message = 'Hello from Parent Component';
    sendMessage(event){
        this.message = event.target.value;
    }

}