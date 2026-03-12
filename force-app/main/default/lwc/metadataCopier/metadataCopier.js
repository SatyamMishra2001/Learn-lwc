// metadataCopier.js
import { LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

// Apex imports
import getAllObjectNames   from '@salesforce/apex/MetadataCopierController.getAllObjectNames';
import getObjectFields    from '@salesforce/apex/MetadataCopierController.getObjectFields';
import getValidationRules from '@salesforce/apex/MetadataCopierController.getValidationRules';
import getPageLayouts     from '@salesforce/apex/MetadataCopierController.getPageLayouts';
import getRecordTypes     from '@salesforce/apex/MetadataCopierController.getRecordTypes';
import copyMetadata       from '@salesforce/apex/MetadataCopierController.copyMetadata';

// Map DisplayType → SLDS icon
const FIELD_TYPE_ICONS = {
    TEXT: 'utility:text',
    TEXTAREA: 'utility:textarea',
    BOOLEAN: 'utility:check',
    CURRENCY: 'utility:currency',
    DATE: 'utility:date_input',
    DATETIME: 'utility:date_time',
    DOUBLE: 'utility:number_input',
    EMAIL: 'utility:email',
    INTEGER: 'utility:number_input',
    PERCENT: 'utility:percent',
    PHONE: 'utility:call',
    PICKLIST: 'utility:picklist',
    MULTIPICKLIST: 'utility/multi_picklist',
    REFERENCE: 'utility:lookup',
    URL: 'utility:link',
};

export default class MetadataCopier extends LightningElement {

    // ─────────────────────────────────────────────────────────
    // TRACKED STATE
    // ─────────────────────────────────────────────────────────

    @track sourceObject = '';
    @track targetObject = '';
    @track objectOptions = [];

    // Metadata lists
    @track fields = [];
    @track validationRules = [];
    @track pageLayouts = [];
    @track recordTypes = [];

    // Loading flags
    @track isLoadingFields  = false;
    @track isLoadingRules   = false;
    @track isLoadingLayouts = false;
    @track isLoadingRTs     = false;
    @track isCopying        = false;

    // UI state
    @track showMetadataSection = false;
    @track showResult          = false;
    @track sameObjectError     = false;

    // Result
    @track copySuccess    = false;
    @track resultMessage  = '';
    @track resultDetails  = [];

    // Step tracking
    @track currentStep = 1;


    // ─────────────────────────────────────────────────────────
    // WIRE: Load all object names on component init
    // ─────────────────────────────────────────────────────────

    @wire(getAllObjectNames)
    wiredObjects({ error, data }) {
        if (data) {
            this.objectOptions = data.map(name => ({ label: name, value: name }));
        } else if (error) {
            this.showToast('Error', 'Failed to load objects: ' + this.getError(error), 'error');
        }
    }


    // ─────────────────────────────────────────────────────────
    // HANDLERS: Object selection
    // ─────────────────────────────────────────────────────────

    handleSourceChange(event) {
        this.sourceObject = event.detail.value;
        this.sameObjectError = false;
        this.validateAndLoadMetadata();
    }

    handleTargetChange(event) {
        this.targetObject = event.detail.value;
        this.sameObjectError = false;
        this.validateAndLoadMetadata();
    }

    validateAndLoadMetadata() {
        if (!this.sourceObject || !this.targetObject) return;

        if (this.sourceObject === this.targetObject) {
            this.sameObjectError = true;
            this.showMetadataSection = false;
            return;
        }

        this.showMetadataSection = true;
        this.currentStep = 2;
        this.resetSelections();
        this.loadAllMetadata();
    }

    resetSelections() {
        this.fields = [];
        this.validationRules = [];
        this.pageLayouts = [];
        this.recordTypes = [];
        this.showResult = false;
    }

    async loadAllMetadata() {
        await Promise.all([
            this.loadFields(),
            this.loadValidationRules(),
            this.loadPageLayouts(),
            this.loadRecordTypes(),
        ]);
    }


    // ─────────────────────────────────────────────────────────
    // LOADERS
    // ─────────────────────────────────────────────────────────

    async loadFields() {
        this.isLoadingFields = true;
        try {
            const data = await getObjectFields({ objectName: this.sourceObject });
            this.fields = data.map(f => ({
                ...f,
                selected: false,
                cardClass: 'metadata-card slds-box',
                icon: FIELD_TYPE_ICONS[f.dataType] || 'utility:sobject',
            }));
        } catch (error) {
            this.showToast('Error', 'Failed to load fields: ' + this.getError(error), 'error');
        } finally {
            this.isLoadingFields = false;
        }
    }

    async loadValidationRules() {
        this.isLoadingRules = true;
        try {
            const data = await getValidationRules({ objectName: this.sourceObject });
            this.validationRules = data.map(r => ({
                ...r,
                selected: false,
                cardClass: 'metadata-card slds-box',
                activeLabel: r.active === 'true' ? 'Active' : 'Inactive',
                activeBadgeClass: r.active === 'true' ? 'slds-theme_success' : '',
            }));
        } catch (error) {
            this.showToast('Warning', 'Could not load validation rules: ' + this.getError(error), 'warning');
        } finally {
            this.isLoadingRules = false;
        }
    }

    async loadPageLayouts() {
        this.isLoadingLayouts = true;
        try {
            const data = await getPageLayouts({ objectName: this.sourceObject });
            this.pageLayouts = data.map(l => ({
                ...l,
                selected: false,
                cardClass: 'metadata-card slds-box',
            }));
        } catch (error) {
            this.showToast('Warning', 'Could not load page layouts: ' + this.getError(error), 'warning');
        } finally {
            this.isLoadingLayouts = false;
        }
    }

    async loadRecordTypes() {
        this.isLoadingRTs = true;
        try {
            const data = await getRecordTypes({ objectName: this.sourceObject });
            this.recordTypes = data.map(rt => ({
                ...rt,
                selected: false,
                cardClass: 'metadata-card slds-box',
            }));
        } catch (error) {
            this.showToast('Warning', 'Could not load record types: ' + this.getError(error), 'warning');
        } finally {
            this.isLoadingRTs = false;
        }
    }


    // ─────────────────────────────────────────────────────────
    // TOGGLE HANDLERS
    // ─────────────────────────────────────────────────────────

    handleFieldToggle(event) {
        const apiName = event.currentTarget.dataset.api;
        this.fields = this.fields.map(f => f.apiName === apiName
            ? { ...f, selected: !f.selected, cardClass: this.cardClass(!f.selected) }
            : f
        );
    }

    handleRuleToggle(event) {
        const id = event.currentTarget.dataset.id;
        this.validationRules = this.validationRules.map(r => r.id === id
            ? { ...r, selected: !r.selected, cardClass: this.cardClass(!r.selected) }
            : r
        );
    }

    handleLayoutToggle(event) {
        const id = event.currentTarget.dataset.id;
        this.pageLayouts = this.pageLayouts.map(l => l.id === id
            ? { ...l, selected: !l.selected, cardClass: this.cardClass(!l.selected) }
            : l
        );
    }

    handleRTToggle(event) {
        const id = event.currentTarget.dataset.id;
        this.recordTypes = this.recordTypes.map(rt => rt.id === id
            ? { ...rt, selected: !rt.selected, cardClass: this.cardClass(!rt.selected) }
            : rt
        );
    }

    cardClass(selected) {
        return selected
            ? 'metadata-card slds-box slds-theme_shade slds-box_border-default'
            : 'metadata-card slds-box';
    }


    // ─────────────────────────────────────────────────────────
    // SELECT ALL / CLEAR ALL
    // ─────────────────────────────────────────────────────────

    selectAllFields()   { this.fields         = this.selectAll(this.fields);         }
    clearAllFields()    { this.fields         = this.clearAll(this.fields);          }
    selectAllRules()    { this.validationRules = this.selectAll(this.validationRules);}
    clearAllRules()     { this.validationRules = this.clearAll(this.validationRules); }
    selectAllLayouts()  { this.pageLayouts    = this.selectAll(this.pageLayouts);    }
    clearAllLayouts()   { this.pageLayouts    = this.clearAll(this.pageLayouts);     }
    selectAllRTs()      { this.recordTypes    = this.selectAll(this.recordTypes);    }
    clearAllRTs()       { this.recordTypes    = this.clearAll(this.recordTypes);     }

    selectAll(list) {
        return list.map(item => ({ ...item, selected: true, cardClass: this.cardClass(true) }));
    }

    clearAll(list) {
        return list.map(item => ({ ...item, selected: false, cardClass: this.cardClass(false) }));
    }


    // ─────────────────────────────────────────────────────────
    // COPY METADATA
    // ─────────────────────────────────────────────────────────

    async handleCopyMetadata() {
        this.isCopying   = true;
        this.showResult  = false;
        this.currentStep = 3;

        const selectedItems = {
            fields:          this.fields.filter(f => f.selected).map(f => f.apiName),
            validationRules: this.validationRules.filter(r => r.selected).map(r => r.id),
            pageLayouts:     this.pageLayouts.filter(l => l.selected).map(l => l.id),
            recordTypes:     this.recordTypes.filter(rt => rt.selected).map(rt => rt.id),
        };

        try {
            const result = await copyMetadata({
                sourceObject:     this.sourceObject,
                targetObject:     this.targetObject,
                selectedItemsJson: JSON.stringify(selectedItems),
            });

            this.copySuccess   = result.success;
            this.resultMessage = result.message;
            this.resultDetails = result.details || [];
            this.showResult    = true;

            if (result.success) {
                this.showToast('Success', 'Metadata copy initiated!', 'success');
            } else {
                this.showToast('Error', result.message, 'error');
            }
        } catch (error) {
            this.copySuccess   = false;
            this.resultMessage = 'Unexpected error: ' + this.getError(error);
            this.showResult    = true;
            this.showToast('Error', this.resultMessage, 'error');
        } finally {
            this.isCopying = false;
        }
    }


    // ─────────────────────────────────────────────────────────
    // COMPUTED PROPERTIES
    // ─────────────────────────────────────────────────────────

    get totalSelectedCount() {
        return (
            this.fields.filter(f => f.selected).length +
            this.validationRules.filter(r => r.selected).length +
            this.pageLayouts.filter(l => l.selected).length +
            this.recordTypes.filter(rt => rt.selected).length
        );
    }

    get showSummary() {
        return this.showMetadataSection && this.totalSelectedCount >= 0;
    }

    get isCopyDisabled() {
        return this.totalSelectedCount === 0 || this.isCopying;
    }

    get hasFields()       { return this.fields.length > 0; }
    get hasRules()        { return this.validationRules.length > 0; }
    get hasLayouts()      { return this.pageLayouts.length > 0; }
    get hasRecordTypes()  { return this.recordTypes.length > 0; }
    get hasResultDetails(){ return this.resultDetails && this.resultDetails.length > 0; }

    // Tab labels with counts
    get fieldsTabLabel()       { return `Fields (${this.fields.length})`; }
    get validationTabLabel()   { return `Validation Rules (${this.validationRules.length})`; }
    get layoutsTabLabel()      { return `Page Layouts (${this.pageLayouts.length})`; }
    get recordTypesTabLabel()  { return `Record Types (${this.recordTypes.length})`; }

    // Step indicator classes
    get stepClass1() { return this.getStepClass(1); }
    get stepClass2() { return this.getStepClass(2); }
    get stepClass3() { return this.getStepClass(3); }

    getStepClass(step) {
        if (step < this.currentStep)  return 'slds-progress__item slds-is-completed';
        if (step === this.currentStep) return 'slds-progress__item slds-is-active';
        return 'slds-progress__item';
    }


    // ─────────────────────────────────────────────────────────
    // UTILITIES
    // ─────────────────────────────────────────────────────────

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }

    getError(error) {
        if (typeof error === 'string') return error;
        if (error?.body?.message) return error.body.message;
        if (error?.message) return error.message;
        return JSON.stringify(error);
    }
}
