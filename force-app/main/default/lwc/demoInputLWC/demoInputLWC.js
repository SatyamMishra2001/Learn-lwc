import { LightningElement } from 'lwc';

export default class DemoInputLWC extends LightningElement {


    firstName = '';
    lastName = '';
    age = 0;

    handleAgeChange(event){
        this.age = event.target.value;
    }

    handleFirstNameChange(event){
        this.firstName = event.target.value;
    }

    handleLastNameChange(event){
        this.lastName = event.target.value;
    }


}