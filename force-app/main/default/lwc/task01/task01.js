import { LightningElement } from 'lwc';

export default class Task01 extends LightningElement {

    firstName = '';
    lastName = '';
    age = 0;

    handleFirstNameChange(event) {
        this.firstName = event.target.value;
    }

    handleLastNameChange(event) {
        this.lastName = event.target.value;
    }

    handleAgeChange(event) {
        this.age = event.target.value;
    }
}