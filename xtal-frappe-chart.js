import { Chart } from 'frappe-charts/dist/frappe-charts.esm.js';
const data = 'data';
if (!self['xtal_frappe-chart_css']) {
    //thanks Firefox!
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/frappe-charts@1.1.0/dist/frappe-charts.min.css';
    document.head.appendChild(link);
}
/**
 * `xtal-frappe-charts`
 * Dependency free web component wrapper around frappé charting library
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
*/
class XtalFrappeChart extends HTMLElement {
    constructor() {
        super();
        this.style.display = "block";
    }
    /**
     * @type {object} Data to chart
     */
    get data() {
        return this._data;
    }
    set data(val) {
        this._data = val;
        this.onPropsChange();
    }
    static get observedAttributes() {
        return [
            data,
        ];
    }
    _upgradeProperty(prop) {
        if (this.hasOwnProperty(prop)) {
            let value = this[prop];
            delete this[prop];
            this[prop] = value;
        }
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case data:
                this._data = JSON.parse(newValue);
                break;
        }
        this.onPropsChange();
    }
    onPropsChange() {
        if (!this._data || (typeof (this._data) !== 'object'))
            return;
        this.loadChart();
    }
    loadChart() {
        if (this._previousData && this._data === this._previousData)
            return;
        this._previousData = this._data;
        this._data['parent'] = this;
        if (typeof (Chart) !== 'undefined') {
            this._chart = new Chart(this, this._data);
        }
        else {
            this._chart = new frappe.Chart(this, this._data);
        }
        this._chart['parent'].addEventListener('data-select', (e) => {
            const selectedData = [];
            this._data['data'].datasets.forEach(dataSet => {
                selectedData.push(dataSet.values[e.index]);
            });
            this['selectedElement'] = selectedData;
            const newEvent = new CustomEvent('selected-element-changed', {
                detail: {
                    value: selectedData
                },
                bubbles: true,
                composed: false,
            });
            this.dispatchEvent(newEvent);
        });
    }
    connectedCallback() {
        this._upgradeProperty(data);
        this._connected = true;
        this.onPropsChange();
    }
}
customElements.define('xtal-frappe-chart', XtalFrappeChart);
//# sourceMappingURL=xtal-frappe-chart.js.map