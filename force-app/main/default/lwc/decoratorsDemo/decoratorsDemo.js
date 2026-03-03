import { LightningElement, api } from 'lwc';

export default class DecoratorsDemo extends LightningElement {

    @api 
    firstName;

    @api 
    lastName;

    @api
    recordId;

}