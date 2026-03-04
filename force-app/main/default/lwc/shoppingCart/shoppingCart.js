import { LightningElement, track, wire } from 'lwc';
import getLatestContacts from '@salesforce/apex/ContactController.getLatestContacts';
//import { refreshApex } from '@salesforce/apex';

export default class ShoppingCart extends LightningElement {
   @track contacts = [];
    @track error;
    @track isLoading = false;

    // -----------------
    // Lifecycle hooks
    // -----------------
    connectedCallback() {
        console.log('connectedCallback: Component inserted in DOM');
        this.loadContacts();
    }

    renderedCallback() {
        console.log('renderedCallback: Component rendered or re-rendered');
    }

    disconnectedCallback() {
        console.log('disconnectedCallback: Component removed from DOM');
    }

    // -----------------
    // Fetch contacts
    // -----------------
    loadContacts() {
        this.isLoading = true;
        console.log('Fetching contacts...');
        getLatestContacts()
            .then((result) => {
                this.contacts = result;
                this.error = undefined;
                console.log('Contacts fetched:', result);
            })
            .catch((error) => {
                this.error = error;
                this.contacts = [];
                console.error('Error fetching contacts:', error);
            })
            .finally(() => {
                this.isLoading = false;
                console.log('Fetching complete, spinner hidden');
            });
    }

    // -----------------
    // Refresh button handler
    // -----------------
    handleRefresh() {
        console.log('Refresh button clicked');
        this.loadContacts();
    }
}