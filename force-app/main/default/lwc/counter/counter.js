import { LightningElement } from 'lwc';

export default class Counter extends LightningElement {

count = 0;

isIncrementedOrDecremented = false;
isIncremented = false;
isDecremented = false;

handleIncrement(){
    this.count = this.count + 1;
    this.isIncrementedOrDecremented = true;
    this.isIncremented = true;
    this.isDecremented = false;
}

handleDecrement(){
    this.count = this.count - 1;
    this.isIncrementedOrDecremented = true;
    this.isDecremented = true;
    this.isIncremented = false;
}   

handleIncrementDecrement(){
    if(this.isIncremented){
        this.count = this.count + 2;
    }
    if(this.isDecremented){
        this.count = this.count - 2;
    }
}


}