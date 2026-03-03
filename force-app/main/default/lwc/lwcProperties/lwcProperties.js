import { LightningElement } from 'lwc';

export default class LwcProperties extends LightningElement {

    firstName = 'Satyam';
    lastName = 'Mishra';
    age = 25;

    writeSomething(){
        this.firstName = "Mishra";
        this.lastName = "Satyam";
        this.age = "20";
    }


}