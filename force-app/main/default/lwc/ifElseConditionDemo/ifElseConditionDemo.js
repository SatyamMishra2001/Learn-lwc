import { LightningElement } from 'lwc';

export default class IfElseConditionDemo extends LightningElement {

inputValue = 0;
isEven = false;
isOdd = false;

handleInputChange(event) {
    this.inputValue = event.target.value;
    if(this.inputValue % 2 === 0) {
        this.isEven = true;
    } else {
        this.isOdd = true;
    }
}
    


}