import { LightningElement } from 'lwc';

export default class ChildLifeCycleHookCmp extends LightningElement {

    constructor(){
        super();
        console.log('Constructor called');
    }

    connectedCallback(){
        console.log('Connected Callback called');
    }

    renderedCallback(){
        console.log('Rendered Callback called');
    }

    disconnectedCallback(){
        console.log('Disconnected Callback called');
    }

    errorCallback(error, stack){
        console.log('Error Callback called');
    }
    

}