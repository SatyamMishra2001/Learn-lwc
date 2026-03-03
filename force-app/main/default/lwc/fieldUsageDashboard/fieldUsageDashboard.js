import { LightningElement, wire, track } from 'lwc';
import getFieldUsage from '@salesforce/apex/FieldUsageDashboardController.getFieldUsage';

export default class FieldUsageDashboard extends LightningElement {

    @track fullData = [];
    @track paginatedData = [];

    pageSize = 10;
    currentPage = 1;
    totalPages = 1;

    @wire(getFieldUsage)
    wiredUsage({ error, data }) {

        if (data) {

            // Map risk class
            this.fullData = data.map(item => {
                return {
                    ...item,
                    riskClass: item.riskColor
                };
            });

            this.totalPages = Math.ceil(this.fullData.length / this.pageSize);

            this.currentPage = 1;

            this.updatePagination();
        }

        else if (error) {
            console.error(error);
        }
    }

    updatePagination() {

        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;

        this.paginatedData = this.fullData
            .slice(start, end)
            .map((item, index) => {

                return {
                    ...item,
                    rowNumber: start + index + 1
                };
            });
    }

    handleNext() {

        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.updatePagination();
        }
    }

    handlePrevious() {

        if (this.currentPage > 1) {
            this.currentPage--;
            this.updatePagination();
        }
    }

    get disablePrevious() {
        return this.currentPage <= 1;
    }

    get disableNext() {
        return this.currentPage >= this.totalPages;
    }
}