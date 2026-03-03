import { LightningElement } from 'lwc';

export default class HideAndSeek extends LightningElement {

    visible = true;

    handleClick() {
        this.visible = !this.visible;
        console.log('Button clicked. Visible is now: ' + this.visible);
    }


}