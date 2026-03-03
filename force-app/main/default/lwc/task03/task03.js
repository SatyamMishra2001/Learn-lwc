import { LightningElement } from 'lwc';

export default class Task03 extends LightningElement {

    DateValue = '';
    ShowButton = false;
    showNames = false;

    onDateHandle(event){
        this.DateValue = event.target.value;
        this.ShowButton = true;
    }

    

    handleClick(){
            this.showNames = true;
    }


   names = [
        { Id: 1, name: "Alice", phone: "123-456-7891" },
        { Id: 2, name: "Bob", phone: "123-456-7892" },
        { Id: 3, name: "Charlie", phone: "123-456-7893" },
        { Id: 4, name: "Diana", phone: "123-456-7894" },
        { Id: 5, name: "Eve", phone: "123-456-7895" }
    ];

}