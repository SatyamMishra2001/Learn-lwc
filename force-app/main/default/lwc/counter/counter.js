import { LightningElement } from 'lwc';

export default class Counter extends LightningElement {

count =0;
isZero = true;

increment() {
    this.count++;
    if(this.count === 0) {
        this.isZero = true;
    }
    else {      
          this.isZero = false;
    }
 

}


decrement() {
    this.count--;
    if(this.count === 0) {
        this.isZero = true;
    }
    else {
        this.isZero = false;
    }
}


}