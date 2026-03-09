import { LightningElement, api, wire } from 'lwc';
import getObjectHealth from '@salesforce/apex/FieldHealthController.getObjectHealth';

export default class FieldHealthPanel extends LightningElement {
   @api objectApiName = 'Account'; // Defaults to Account, but dynamically updates based on the page
    healthData;
    error;

    // This dynamically creates the title!
    get dynamicTitle() {
        return `${this.objectApiName} Field Health Panel`;
    }
    @wire(getObjectHealth, { objectName: '$objectApiName' })
    metrics;
}