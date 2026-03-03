import { LightningElement } from 'lwc';

export default class PrintNames extends LightningElement {

    currentStep = 1;
    showNames = false;

    handleButtonClick1() {
        if (this.currentStep === 1) {
            this.currentStep = 2;
        } else {
            this.reset();
        }
    }

    handleButtonClick2() {
        if (this.currentStep === 2) {
            this.currentStep = 3;
        } else {
            this.reset();
        }
    }

    handleButtonClick3() {
        if (this.currentStep === 3) {
            this.showNames = true;
        } else {
            this.reset();
        }
    }

    handleButtonClick4() { this.reset(); }
    handleButtonClick5() { this.reset(); }
    handleButtonClick6() { this.reset(); }

    reset() {
        this.currentStep = 1;
        this.showNames = false;
    }

    names = [
        { Id: 1, name: "Alice", phone: "123-456-7891" },
        { Id: 2, name: "Bob", phone: "123-456-7892" },
        { Id: 3, name: "Charlie", phone: "123-456-7893" },
        { Id: 4, name: "Diana", phone: "123-456-7894" },
        { Id: 5, name: "Eve", phone: "123-456-7895" }
    ];

}