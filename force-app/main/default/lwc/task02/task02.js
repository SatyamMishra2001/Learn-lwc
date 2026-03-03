import { LightningElement } from 'lwc';

export default class Task02 extends LightningElement {

    Button01 = true;
    Button02 = false;
    Button03 = false;
    Button04 = false;

    showButton01(){
        this.Button01 = false;
        this.Button02 = true;
        this.Button03 = false;
        this.Button04 = false;
    }

    showButton02(){
        this.Button01 = false;
        this.Button02 = false;
        this.Button03 = true;
        this.Button04 = true;
    }

    showButton03(){
        this.Button01 = false;
        this.Button02 = false;
        this.Button03 = false;
        this.Button04 = true;
    }

    showButton04(){
        this.Button01 = true;
        this.Button02 = false;
        this.Button03 = false;
        this.Button04 = false;
    }


}