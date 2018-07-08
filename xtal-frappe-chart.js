import { Chart } from 'frappe-charts/dist/frappe-charts.esm.js';
import { XtallatX } from 'xtal-latx/xtal-latx.js';
const data = 'data';
if (!self['xtal_frappe-chart_css']) {
    //thanks Firefox!
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/frappe-charts@1.1.0/dist/frappe-charts.min.css';
    link.addEventListener('load', e => {
        setTimeout(() => {
            init();
        }, 50);
    });
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
class XtalFrappeChart extends XtallatX(HTMLElement) {
    constructor() {
        super();
        this._pendingNewDataPoints = [];
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
        return super.observedAttributes.concat([
            data,
        ]);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case data:
                this._data = JSON.parse(newValue);
                break;
        }
        super.attributeChangedCallback(name, oldValue, newValue);
        this.onPropsChange();
    }
    onPropsChange() {
        if (this._disabled || !this._data || (typeof (this._data) !== 'object'))
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
        console.log(this._chart.parent);
        this._chart['parent'].addEventListener('data-select', (e) => {
            const selectedData = [];
            this._data['data'].datasets.forEach(dataSet => {
                selectedData.push(dataSet.values[e.index]);
            });
            this['selectedElement'] = selectedData;
            this.value = selectedData;
            const newEvent = new CustomEvent('selected-element-changed', {
                detail: {
                    value: selectedData
                },
                bubbles: true,
                composed: false,
            });
            this.dispatchEvent(newEvent);
        });
        this._pendingNewDataPoints.forEach(dp => {
            this._chart.addDataPoint(dp.label, dp.valueFromEachDataset, dp.index);
        });
    }
    get newDataPoint() {
        return this._newDataPoint;
    }
    set newDataPoint(val) {
        this._newDataPoint = val;
        if (this._chart) {
            this._chart.addDataPoint(val.label, val.valueFromEachDataset, val.index);
        }
        else {
            this._pendingNewDataPoints.push(val);
        }
    }
    get staleDataPoint() {
        return this._staleDataPoint;
    }
    set staleDataPoint(val) {
        this._staleDataPoint = val;
        this._chart.removeDataPoint(val);
    }
    get updateData() {
        return this._updateData;
    }
    set updateData(val) {
        this._updateData = val;
        this._chart.update(val);
    }
    connectedCallback() {
        this._upgradeProperties([data, 'newDataPoint', 'staleDataPoint', 'updateData']);
        this._connected = true;
        this.onPropsChange();
    }
}
function init() {
    customElements.define('xtal-frappe-chart', XtalFrappeChart);
}
//# sourceMappingURL=xtal-frappe-chart.js.map